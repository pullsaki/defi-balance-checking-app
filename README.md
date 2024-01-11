
# Crypto Balance Dashboard

The Crypto Balance Dashboard is a React web application that fetches and displays the Ethereum balance of a specified address on the Linea chain. It also calculates and shows the percentage change in balance over the last 12 hours. If the balance has reduced by 10% or more in the last 12 hours, the user is notified with an alert.

## How to Run

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

   ``` git clone https://github.com/your-username/crypto-balance-dashboard.git```
2. Navigate to the project directory:

   ``` cd crypto-balance-dashboard ```

3. Install dependencies:

   ```npm install```

4. Replace the `INFURA_API_KEY` and `ETHEREUM_ADDRESS` variables in `src/App.js` with your Infura API key and the Ethereum address for which you want to check the balance.

5. Start the application:

   ```npm start``` 

   The app will be accessible at [http://localhost:3000](http://localhost:3000) in your browser.

## Code Explanation

### `src/App.js`

- **Dependencies:**
  - React: The JavaScript library for building user interfaces.
  - Web3: A library