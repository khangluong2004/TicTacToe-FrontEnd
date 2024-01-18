import Board from "./board.jsx";

// AWS Cognito authenticator setup
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure AWS Amplify to connect to AWS Cognito
import {Amplify} from 'aws-amplify'
import awsExport from './aws-export.js'

Amplify.configure({
  Auth: {
      Cognito: {
        region: awsExport.REGION,
        userPoolId: awsExport.USER_POOL_ID,
        userPoolClientId: awsExport.USER_POOL_APP_CLIENT_ID,
        loginWith: { 
          oauth: {
            domain: 'https://tictactoe.auth.ap-southeast-2.amazoncognito.com',
            scopes: ['openid email phone'],
            redirectSignIn: ['http://localhost:5173/'],
            redirectSignOut: ['https://www.google.com/'],
            responseType: 'code',
          },
          username: 'false',
          email: 'true', 
          phone: 'true', 
        }
      }
  }
})

function App() {
  return (
    <Authenticator>
      {({signOut, user}) => {
          console.log(user);

          return(
            <div>
              <div className="flex items-center justify-center pt-10">
                <h2 className="font-bold p-2"> Welcome to 4x4 TicTacToe </h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4" onClick={signOut}> Sign out </button>
              </div>

              <div className="flex flex-col items-center justify-center pt-10 px-10">
                <div>
                  <p> 
                    <strong> Good news: </strong> When move to 4x4, the bot turns from unbeatable to definitely beatable, 
                    despite being a pain to implement :0  
                  </p>
                  <p>
                    The first player is guaranteed to win. It's a bit mean to let the bot goes first, so I let you go 
                    first :D In exchange, don't be too harsh with my bot
                  </p>
                  <p>
                    <strong> Disclaimer: </strong> When there are multiple way to "lose", the bot behaviour might be 
                    random, since it detects that all moves suck, and just pick one pseudo-randomly.
                  </p>
                  <br/>

                  <h3 className="font-bold"> Rules: </h3>
                  <ol className="list-decimal">
                    <li> In the first move, you could only move in the 4 corner </li>
                    <li> Same as TicTacToe: Get 3 in a row, column, diagonal to win </li>
                    <li> Since winning is not too hard, try to give a bot some advantage </li>
                  </ol>
                </div>
              </div>


              <div className="flex items-center justify-center pb-10 h-dvh">
                <Board />
              </div>
            </div> 
          )
        }
      }
    </Authenticator>
  )
}

export default App
