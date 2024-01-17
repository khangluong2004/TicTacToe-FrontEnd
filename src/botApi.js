import { fetchAuthSession } from "aws-amplify/auth";

const EMPTY = null;
const X ="X";
const O = "O";

function bitMaskBoard(boardState){
    let numX = 0;
    let numO = 0;

    for (let i=0; i < boardState.length; i++){
        if (boardState[i] == X){
            numX |= 1 << i;
        } else if (boardState[i] == O){
            numO |= 1 << i;
        }
    }

    return {
        numX: numX,
        numO: numO
    };
}

async function botApiNextMove(boardState, isX) {
    // console.log(boardState);

    let objSent = bitMaskBoard(boardState);
    objSent["isX"] = isX;

    // Get the id token
    let idToken;
    try {
        idToken = (await fetchAuthSession()).tokens.idToken.toString(); 
    } catch(error){
        console.log(error);
    }

    // console.log(idToken);
    // console.log(objSent);



    // Fetch the bot answer
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", idToken);

    const options = {
        method: 'POST',
        body: JSON.stringify(objSent),
        headers: myHeaders
    }

    try {
        let res = await fetch('https://uwb8iy9op2.execute-api.ap-southeast-2.amazonaws.com/production/bot', options);
        let data = await res.json();
        console.log(data);

        return data;

    } catch(error){
        console.log(error);
    }
    
}

export default botApiNextMove;