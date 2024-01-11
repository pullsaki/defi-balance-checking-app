import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

const INFURA_API_KEY = '3cad063587cd40dcbb2fedcd9ec0f0f6'; // Replace with your Infura API key
const ETHEREUM_ADDRESS = '0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7'; // Replace with the Ethereum address

const App = () => {
  const [balance, setBalance] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  useEffect(() => {
    const web3 = new Web3(`https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`);

    const fetchData = async () => {
      try {
        const currentBalance = await getBalance(web3, ETHEREUM_ADDRESS);
        const historicalBalance = await getHistoricalBalance(web3, ETHEREUM_ADDRESS, 12 * 3600); // 12 hours ago
        const changePercentage = calculatePercentageChange(currentBalance, historicalBalance);

        setBalance(currentBalance);
        setPercentageChange(changePercentage.toFixed(2));

        if (changePercentage < -10) {
          alert('Your balance has reduced by more than 10% in the last 12 hours!');
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getBalance = async (web3, address) => {
    const currentBalance = await web3.eth.getBalance(address);
    return Number(web3.utils.fromWei(currentBalance, 'ether'));
  };

  const getHistoricalBalance = async (web3, address, timeInSeconds) => {
    const currentBlockNumber = Number(await web3.eth.getBlockNumber());
    // Get last 10 blocks to calculate average time per block
    const startBlockNumber = currentBlockNumber - 10;
    const currentBlock = await web3.eth.getBlock(currentBlockNumber);
    const startBlock = await web3.eth.getBlock(startBlockNumber);
    const timeDifferenceInSeconds = Number(currentBlock.timestamp - startBlock.timestamp);
    const averageTimePerBlock = timeDifferenceInSeconds / 10;
    // Calculate the block number approximately 12 hours ago
    const blocksAgo = Math.floor(timeInSeconds / averageTimePerBlock);
    const historicalBlockNumber = currentBlockNumber - blocksAgo;
    const historicalBalance = await web3.eth.getBalance(address, historicalBlockNumber);

    return Number(web3.utils.fromWei(historicalBalance, 'ether'));
  };

  const calculatePercentageChange = (currentBalance, historicalBalance) => {
    return ((currentBalance - historicalBalance) / historicalBalance) * 100;
  };

  return (
      <div className="crypto-app">
        <h1>Crypto Balance Dashboard</h1>
        <div>
          <p className="balance">Linea : {balance} ETH</p>
          <p className={`percentage-change ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
            Percentage Change (Last 12 hours): {percentageChange}%
          </p>
        </div>
      </div>
  );
};

export default App;
