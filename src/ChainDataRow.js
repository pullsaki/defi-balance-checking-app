import React, {useEffect, useRef, useState} from 'react';
import {formatEther, JsonRpcProvider} from 'ethers';
import './ChainDataRow.css';

const ChainDataRow = ({ rpcUrl, chainName, address, refreshInterval }) => {
    const [balance, setBalance] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');

    const hasMounted = useRef(false);

    // Function to fetch data from the blockchain
    const fetchData = async (provider) => {
        try {
            // Get current balance
            const currentBalance = await getBalance(provider, address);

            // Get historical balance 12 hours ago
            const historicalBalance = await getHistoricalBalance(provider, address, 12 * 3600);

            // Calculate percentage change
            const changePercentage = calculatePercentageChange(currentBalance, historicalBalance);

            // Update state with fetched data
            setBalance(currentBalance);
            setPercentageChange(changePercentage.toFixed(2));

            // Check if the balance has reduced by 10% and notify the user
            if (changePercentage < -10) {
                setNotificationMessage(`Your ${chainName} balance fell by more than 10% during the past 12 hours!`);
                alert(`Your ${chainName} balance has reduced by more than 10% in the last 12 hours!`);
            } else {
                setNotificationMessage('');
            }
        } catch (error) {
            console.error(`Error fetching ${chainName} balance:`, error);
        }
    };

    useEffect(() => {
        // Initialize JsonRpcProvider with the provided URL
        const provider = new JsonRpcProvider(rpcUrl);

        if (!hasMounted.current) {
            // Fetch data on initial component mount
            fetchData(provider);
            hasMounted.current = true;
        }

        // Set up interval to fetch data every refreshInterval milliseconds
        const intervalId = setInterval(() => fetchData(provider), refreshInterval);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [chainName, address, refreshInterval]);

    // Function to get the current balance from the blockchain
    const getBalance = async (provider, address) => {
        const currentBalance = await provider.getBalance(address);
        return Number(formatEther(currentBalance));
    };

    // Function to get the historical balance at a specific block number
    const getHistoricalBalance = async (provider, address, timeInSeconds) => {
        const currentBlockNumber = await provider.getBlockNumber();

        // Calculate average time per block
        const averageTimePerBlock = await calculateAverageTimePerBlock(provider);

        // Calculate the block number approximately 'timeInSeconds' seconds ago
        const blocksAgo = Math.floor(timeInSeconds/averageTimePerBlock);
        const pastBlockNumber = currentBlockNumber - blocksAgo;

        // Get balance at that block number
        const pastBalance = await provider.getBalance(address, pastBlockNumber);
        return Number(formatEther(pastBalance));
    };

    // Function to get average time per block
    async function calculateAverageTimePerBlock(provider) {
        // Fetch the 100 blocks past to calculate average time per block
        const currentBlockNumber = await provider.getBlockNumber();
        const startBlockNumber = currentBlockNumber - 100;

        const currentBlock = await provider.getBlock(currentBlockNumber);
        const startBlock = await provider.getBlock(startBlockNumber);

        const timeDifferenceInSeconds = currentBlock.timestamp - startBlock.timestamp;
        return timeDifferenceInSeconds / 100.0;
    }

    // Function to calculate the percentage change in balance
    const calculatePercentageChange = (currentBalance, historicalBalance) => {
        return ((currentBalance - historicalBalance) / historicalBalance) * 100;
    };

    // JSX rendering of the component
    return (
        <div className="chain-data-row">
            <div className="left-section">
                <ChainName chainName={chainName} />
            </div>
            {notificationMessage && (
                <div className="center-section">
                    <Notification message={notificationMessage} />
                </div>
            )}
            <div className="right-section">
                <div className="balance-and-change">
                    <Balance balance={balance} />
                    <ChangePercentage percentageChange={percentageChange} />
                </div>
            </div>
        </div>
    );
};

// Component to display the chain name
const ChainName = ({ chainName }) => (
    <span className="chain-name">{chainName}</span>
);

// Component to display the current balance
const Balance = ({ balance }) => (
    <p className="balance-info">
        {balance} ETH
    </p>
);

// Component to display the percentage change
const ChangePercentage = ({ percentageChange }) => (
    <p className={`percentage-change ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
        {percentageChange}%
    </p>
);

// Component to display notification message
const Notification = ({ message }) => (
    <div className="notification">
        {message}
    </div>
);

export default ChainDataRow;
