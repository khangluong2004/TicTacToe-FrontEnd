import { useEffect, useState } from "react"

const DIM = 4;
const TABLE_SIZE = DIM * DIM;

const EMPTY = null;
const X = 'X';
const O = 'O';

function checkWinning(boardState){
    // Check rows
    for (let i=0; i < DIM; i++){
        let preCell = boardState[i * DIM];
        let count = 1;

        for (let j=1; j < DIM; j++){
            let curCell = boardState[i * DIM + j];

            if (curCell == preCell){
                count++;
            } else {
                preCell = curCell;
                count = 1;
            }

            if (count == 3 && preCell != null){
                return true;
            }
        }
    }

    // Check columns
    for (let j=0; j < DIM; j++){
        let preCell = boardState[j];
        let count = 1;

        for (let i=1; i < DIM; i++){
            let curCell = boardState[i * DIM + j];

            if (curCell == preCell){
                count++;
            } else {
                preCell = curCell;
                count = 1;
            }

            if (count == 3 && preCell != null){
                return true;
            }
        }
    }

    // Check diagonal
    // Right diagonal
    let preCell = boardState[0];
    let count = 1;

    for (let i=1; i < DIM; i++){
        let curCell = boardState[i * DIM + i];

        if (curCell == preCell){
            count++;
        } else {
            preCell = curCell;
            count = 1;
        }

        if (count == 3 && preCell != null){
            return true;
        }
    }

    // Left diagonal
    preCell = boardState[DIM - 1];
    count = 1;

    for (let i=1; i < DIM; i++){
        let curCell = boardState[i * DIM + DIM - 1 - i];

        if (curCell == preCell){
            count++;
        } else {
            preCell = curCell;
            count = 1;
        }

        if (count == 3 && preCell != null){
            return true;
        }
    }

    return false;
}

function checkFull(boardState){
    for (let i=0; i < TABLE_SIZE; i++){
        if (boardState[i] == null){
            return false;
        }
    }

    return true;
}

const Cell = ({value, tickCell}) => {
    return(
        <button className="w-24 h-24 bg-black text-white text-xl font-bold border-2 border-white" onClick={tickCell}>
            {value}
        </button>
    )
}

const Board = (props) => {
    // Internal storage of state
    // Use an array of TABLE_SIZE
    const [boardState, setBoardState] = useState(Array(TABLE_SIZE).fill(EMPTY));
    const [isX, setIsX] = useState(true);
    const [isWin, setWin] = useState(false);
    const [isFull, setFull] = useState(false);

    const tickCell = (i) => {
        // Full board or win
        if (isWin || isFull){
            return;
        }

        // Already filled
        if (boardState[i] != null){
            return;
        }
        
        let newBoardState = [...boardState]
        newBoardState[i] = isX ? X : O
        setIsX(!isX)
        setBoardState(newBoardState)
        setWin(checkWinning(newBoardState))
        setFull(checkFull(newBoardState))
    }

    // Create the structure for the board
    let boardMap = []

    for (let i = 0; i < TABLE_SIZE; i++){
        if (i % DIM == 0){
            boardMap.push([])
        }

        boardMap[boardMap.length - 1].push(i)
    }


    return (
        <div>
            <div>
                <p>Turn of {isX? X: O}</p>
                <p>{isWin? `Winner is ${isX?O:X}` : null}</p>
                <p>{isFull? "Tie" : null}</p>
            </div>
            <br/>

            <div>
                {boardMap.map(row => {
                    return (
                        <div className="flex justify-center h-24">
                            {row.map(cell => <Cell value={boardState[cell]} tickCell={() => tickCell(cell)}/>)}
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default Board