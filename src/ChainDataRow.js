import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './ChainDataRow.css';

const ChainDataRow = ({ apiKey, chainName, address, refreshInterval }) => {
    const [balance, setBalance] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const web3 = new Web3(`https://${chainName}-mainnet.infura.io/v3/${apiKey}`);

        const fetchData = async () => {
            try {
                const currentBalance = await getBalance(web3, address);
                const historicalBalance = await getHistoricalBalance(web3, address, 12 * 3600);
                const changePercentage = calculatePercentageChange(currentBalance, historicalBalance);

                setBalance(currentBalance);
                setPercentageChange(changePercentage.toFixed(2));

                if (changePercentage < -10) {
                    setNotificationMessage(`Your ${chainName} balance has reduced by more than 10% in the last 12 hours!`);
                } else {
                    setNotificationMessage('');
                }
            } catch (error) {
                console.error(`Error fetching ${chainName} balance:`, error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, refreshInterval);

        return () => clearInterval(intervalId);
    }, [apiKey, chainName, address, refreshInterval]);

    const getBalance = async (web3, address) => {
        const currentBalance = await web3.eth.getBalance(address);
        return Number(web3.utils.fromWei(currentBalance, 'ether'));
    };

    const getHistoricalBalance = async (web3, address, timeInSeconds) => {
        const currentBlockNumber = Number(await web3.eth.getBlockNumber());
        const startBlockNumber = currentBlockNumber - 10;
        const currentBlock = await web3.eth.getBlock(currentBlockNumber);
        const startBlock = await web3.eth.getBlock(startBlockNumber);
        const timeDifferenceInSeconds = Number(currentBlock.timestamp - startBlock.timestamp);
        const averageTimePerBlock = timeDifferenceInSeconds / 10;
        const blocksAgo = Math.floor(timeInSeconds / averageTimePerBlock);
        const historicalBlockNumber = currentBlockNumber - blocksAgo;
        const historicalBalance = await web3.eth.getBalance(address, historicalBlockNumber);

        return Number(web3.utils.fromWei(historicalBalance, 'ether'));
    };

    const calculatePercentageChange = (currentBalance, historicalBalance) => {
        return ((currentBalance - historicalBalance) / historicalBalance) * 100;
    };

    return (
        <div className="chain-data-row">
            <ChainName chainName={chainName} />
            <div className="data-info">
                <div className="balance-and-change">
                    <Balance balance={balance} />
                    <ChangePercentage percentageChange={percentageChange} />
                </div>
            </div>
            {notificationMessage && <Notification message={notificationMessage} />}
        </div>
    );
};

const ChainName = ({ chainName }) => (
    <span className="chain-name">{chainName}</span>
);

const Balance = ({ balance }) => (
    <p className="balance-info">
        {balance} ETH
    </p>
);

const ChangePercentage = ({ percentageChange }) => (
    <p className={`percentage-change ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
        {percentageChange}%
    </p>
);

const Notification = ({ message }) => (
    <div className="notification">
        {message}
    </div>
);

export default ChainDataRow;
