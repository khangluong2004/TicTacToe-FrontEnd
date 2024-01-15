import Board from "./Board.jsx"

// AWS Cognito authenticator setup
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure AWS Amplify to connect to AWS Cognito
import {Amplify} from 'aws-amplify'
import awsExport from './aws-export.js'

Amplify.configure({
  Auth: {
    region: awsExport.REGION,
    userPoolId: awsExport.USER_POOL_ID,
    userPoolWebClientId: awsExport.USER_POOL_APP_CLIENT_ID
  }
})

function App() {
  return (
    <Authenticator>
      {({signOut, user}) => {
          console.log(user);

          return( 
            <div className="flex items-center justify-center py-10 h-dvh">
              <h2> Welcome, {user.email} </h2>
              <button onClick={signOut}> Sign out </button>
              <Board />
            </div>
          )
        }
      }
    </Authenticator>
  )
}

export default App
