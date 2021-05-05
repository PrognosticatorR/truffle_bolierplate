import React, { useState, useEffect } from 'react';
import './App.css';
import getEthers from './getEthers';
import { Web3Context } from './Contexts';
import FirstToken from './contracts/FirstToken.json';
import { ethers } from 'ethers';

const AppEthers = () => {
    const [signer, setsigner] = useState(null);
    const [contract, setcontract] = useState(null);
    const [provider, setprovider] = useState(null);
    const [signedContract, setsignedContract] = useState(null);
    const [accounts, setaccounts] = useState(null);

    useEffect(() => {
        initData();
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);

    async function initData() {
        try {
            const networkIds = Object.keys(FirstToken.networks);
            const provider = await getEthers();
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            const deployedNetwork = FirstToken.networks[networkIds[0]];
            const instance = new ethers.Contract(deployedNetwork.address, FirstToken.abi, provider);
            const signedContract = instance.connect(signer);

            setprovider(provider);
            setcontract(instance);
            setsignedContract(signedContract);
            setsigner(signer);
            setaccounts(accounts);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    }
    if (!contract && !provider) {
        return <div>Loading Web3, accounts, and contract...</div>;
    } else {
        return (
            <Web3Context.Provider value={{ accounts, provider, signedContract, contract, signer }}>
                <div className="App">
                    <h1>Good to Go!</h1>
                    <p>Your Truffle Box is installed and ready.</p>
                    <h2>Smart Contract Example</h2>
                    <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
                    <p>
                        Try changing the value stored on <strong>line 40</strong> of App.js.
                    </p>
                    <div>
                        The stored value is: <b>{accounts && accounts[0]}</b>{' '}
                    </div>
                </div>
            </Web3Context.Provider>
        );
    }
};

export default AppEthers;
