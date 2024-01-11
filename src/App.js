import React from 'react';
import ChainDataRow from './ChainDataRow';
import './App.css';

const App = () => {
    // Array containing information about different chains
    const chains = [
        { name: 'Mantle', rpcUrl: 'https://rpc.mantle.xyz', address: '0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7' },
        { name: 'Linea', rpcUrl: 'https://1rpc.io/linea', address: '0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7' },
        { name: 'Kroma', rpcUrl: 'https://api.kroma.network', address: '0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859' },
    ];

    return (
        <div className="crypto-app">
            {/* Main heading */}
            <h1>Ethereum Balance Checker</h1>

            {/* Map over the array of chains and render ChainDataRow for each */}
            {chains.map((chain) => (
                <ChainDataRow
                    key={chain.name}  // Using the chain name as the key
                    rpcUrl={chain.rpcUrl}  // RPC URL for the chain
                    chainName={chain.name}  // Name of the chain
                    address={chain.address}  // Address for the chain
                    refreshInterval={5 * 60 * 1000}  // Refresh interval in milliseconds (5 minutes)
                />
            ))}
        </div>
    );
};

export default App;
