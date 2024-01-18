# TicTacToe Front-end

Using React JS for the TicTacToe front-end on a 4x4 Board

## Tech Stack
ReactJS (Vite) + Tailwind CSS

## Libraries
1. aws-amplify
2. @aws-amplify/ui-react

## Components
3 main components:
1. Cell (a button which changes value when clicked)
2. Board (an array of 16 cells, managing the winning check and cells' states)
3. Code handling authentication + calling the api with OAuth 2 IdToken and bitmasked boardState (explained in Backend)

Nothing unusual. The only tricky part was to set up the Authenticator element and configure AWS Cognito details. 