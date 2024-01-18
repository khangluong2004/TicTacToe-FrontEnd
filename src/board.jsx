import { useEffect, useState } from "react"
import botApiNextMove from "./botApi.js"

const DIM = 4;
const TABLE_SIZE = DIM * DIM;

const WINNING_ITEMS = 3;

const EMPTY = null;
const X = 'X';
const O = 'O';

function checkWinning(boardState){
    // Check rows
    for (let i=0; i < DIM; i++){
        for (let j=0; j < DIM - 2; j++){
            if (boardState[i * DIM + j] == EMPTY){
                continue;
            }

            if (boardState[i * DIM + j] == boardState[i * DIM + j+1] && boardState[i * DIM + j+1] == boardState[i * DIM + j+2]){
                return true;
            }
        }
    }

    // Check columns
    for (let i=0; i < DIM - 2; i++){
        for (let j=0; j < DIM; j++){
            if (boardState[i * DIM + j] == EMPTY){
                continue;
            }

            if (boardState[i * DIM + j] == boardState[(i+1) * DIM + j] && boardState[(i+1) * DIM + j] == boardState[(i+2) * DIM + j]){
                return true;
            }
        }
    }

    // Check diagonal
    // Right diagonal
    for (let i=0; i < DIM - 2; i++){
        for (let j=0; j < DIM - 2; j++){

            let firstItem = boardState[i * DIM + j]
            let secondItem = boardState[(i + 1) * DIM + (j + 1)]
            let thirdItem = boardState[(i + 2) * DIM + (j + 2)]

            if (firstItem == null){
                continue;
            }

            if (firstItem == secondItem && secondItem == thirdItem){
                return true;
            }
        }
    }   

    // Left diagonal
    for (let i=0; i < DIM - 2; i++){
        for (let j=2; j < DIM; j++){

            let firstItem = boardState[i * DIM + j];
            let secondItem = boardState[(i + 1) * DIM + j - 1];
            let thirdItem = boardState[(i + 2) * DIM + j - 2];

            if (firstItem == null){
                continue;
            }

            if (firstItem == secondItem && secondItem == thirdItem){
                return true;
            }
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

function checkCorner(position){
    return position == 0 || position == (DIM - 1) || position == (DIM) * (DIM - 1) || position == TABLE_SIZE - 1; 
}

const Cell = ({isFirstTurn, position, value, tickCell}) => {
    let backgroundColor = "bg-black";

    if (isFirstTurn && !checkCorner(position)){
        backgroundColor = "bg-red-900";
    }

    let fullClassName = "w-24 h-24 text-white text-xl font-bold border-2 border-white " + backgroundColor;

    return(
        <button className={fullClassName} onClick={tickCell}>
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
    const [isFirstTurn, setFirstTurn] = useState(true);

    // TODO: Check the async sequence and the bot

    const botMove = async(newBoardState, nextX) => {
        let data = await botApiNextMove(newBoardState, nextX);
        console.log(data);

        let nextBoardState = [...newBoardState]
        nextBoardState[data[0] * DIM + data[1]] = nextX ? X : O

        setBoardState(nextBoardState)
        setIsX(!nextX)
        setWin(checkWinning(nextBoardState))
        setFull(checkFull(nextBoardState))
    }

    const tickCell = async (i) => {
        // Bot turn
        if (!isX){
            return;
        }

        // Full board or win
        if (isWin || isFull){
            return;
        }

        // Already filled
        if (boardState[i] != null){
            return;
        }

        if (isFirstTurn && isX && !checkCorner(i)){
            return;
        }
        
        let newBoardState = [...boardState]
        newBoardState[i] = isX ? X : O

        let nextX = !isX;
        let nextIsWin = checkWinning(newBoardState);
        let nextIsFull = checkFull(newBoardState);

        setIsX(nextX);
        setBoardState(newBoardState)
        setWin(nextIsWin)
        setFull(nextIsFull)

        console.log(nextIsWin)

        // Set off firstTurn
        if (isFirstTurn){
            setFirstTurn(!isFirstTurn);
        }

        // Check winning or full
        if (nextIsWin || nextIsFull){
            return;
        }

        // Call the bot
        await botMove(newBoardState, nextX);
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
                <p className="font-bold">{isWin? `Winner is ${isX?O:X}` : null}</p>
                <p>{isFull? "Tie" : null}</p>
            </div>
            <br/>

            <div>
                {boardMap.map(row => {
                    return (
                        <div className="flex justify-center h-24">
                            {row.map(cell => 
                                <Cell isFirstTurn={isFirstTurn}
                                position={cell} 
                                value={boardState[cell]} 
                                tickCell={() => tickCell(cell)}/>
                                )}
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default Board