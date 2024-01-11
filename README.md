
# Balance Tracker
This Web app tracks token balance from given externally owned addresses accoss different chains.

It internally takes the help of Infura's API to access the info on a given chain. Currently, this app only works for Linea chain but it is extensible to add more chains

## How to Run

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository

2. Navigate to the project directory

   ``` cd defi-balance-checking-app ```

3. Install dependencies:
```npm install``` and ```npm install web3 axios```

4. Replace the `INFURA_API_KEY` and `ETHEREUM_ADDRESS` variables in `src/App.js` with your Infura API key and the Ethereum address for which you want to check the balance.

5. Start the application:

   ```npm start``` 

   The app will be accessible at [http://localhost:3000](http://localhost:3000) in your browser.

## Code Explanation

### `src/App.js`
Main App Component which launches other components

### `src/ChainDataRow.js`
This component contains the logic to find out the balance, percentage change and updates regularly

This file also contains different UI components used to display individual components