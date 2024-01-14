import { useEffect, useState } from "react"

const DIM = 4;
const TABLE_SIZE = DIM * DIM;

const EMPTY = null;
const X = 'X';
const O = 'O';

const Cell = ({value, tickCell}) => {
    return(
        <button className="w-24 h-24 bg-black text-white" onClick={tickCell}>
            {value}
        </button>
    )
}

const Board = (props) => {
    // Internal storage of state
    // Use an array of TABLE_SIZE
    const [boardState, setBoardState] = useState(Array(TABLE_SIZE).fill(EMPTY));
    const [isX, setIsX] = useState(true);

    const tickCell = (i) => {
        let newBoardState = [...boardState]
        newBoardState[i] = isX ? X : O
        setIsX(!isX)
        setBoardState(newBoardState)
    }

    // Create the structure for the board
    boardMap = []

    for (let i = 0; i < TABLE_SIZE; i++){
        if (i % 4 == 0){
            boardMap.push([])
        }

        boardMap[boardMap.length - 1].push(i)
    }

    return (
        <div>
            {boardMap.map(row => {
                return (
                    <div>
                        {row.map(cell => <Cell value={boardState[cell]} tickCell={tickCell}/>)}
                    </div>
                )
            })}
        </div>
    )
}
