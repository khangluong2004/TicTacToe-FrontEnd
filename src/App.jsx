import Board from "./Board.jsx"

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
              <div className="flex justify-center items-center pt-10">
                <h2 className="font-bold p-2"> Welcome </h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4" onClick={signOut}> Sign out </button>
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
