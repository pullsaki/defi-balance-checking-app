
# Balance Checker
This Web app checks token balance from given externally owned addresses across different chains.

It internally accesses the network by the RPC url for each chain to retrieve the balance

## How to Run

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository

2. Navigate to the project directory

   ``` cd defi-balance-checking-app ```

3. Install dependencies:
```npm install``` and ```npm install ethers ethers-react```

4. Start the application:

   ```npm start``` 

   The app will be accessible at [http://localhost:3000](http://localhost:3000) in your browser.

## Code Overview

### `src/App.js`
Main App Component which launches a component for each chain

### `src/ChainDataRow.js`
This component contains the logic to find out the balance, percentage change and updates regularly

This file also contains different UI components used to display individual components