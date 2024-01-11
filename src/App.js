import React from 'react';
import ChainDataRow from './ChainDataRow';
import './App.css';

const App = () => {
  const apiKey = '3cad063587cd40dcbb2fedcd9ec0f0f6'; // Replace with your Infura API key
  const lineaAddress = '0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7'; // Replace with Linea address

  return (
      <div className="crypto-app">
        <h1>Eth Balance Tracker</h1>
        <ChainDataRow apiKey={apiKey} chainName="Linea" address={lineaAddress} refreshInterval={5 * 60 * 1000} />
        {/* Add more ChainDataRow instances for other chains if needed */}
      </div>
  );
};

export default App;
