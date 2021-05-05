import React, { Component } from 'react';
import FirstToken from './contracts/FirstToken.json';
import getWeb3 from './getWeb3';

import './App.css';

class App extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FirstToken.networks[networkId];
            const instance = new web3.eth.Contract(FirstToken.abi, deployedNetwork && deployedNetwork.address);

            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    };

    componentWillUnmount() {
        window.removeEventListener('load');
    }

    runExample = async () => {
        const { contract } = this.state;

        // Stores a given value, 5 by default.
        await contract.methods.name().call();
        const totalSupply = await contract.methods.totalSupply().call();
        console.log(totalSupply);
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <h1>Good to Go!</h1>
                <p>Your Truffle Box is installed and ready.</p>
                <h2>Smart Contract Example</h2>
                <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
                <p>
                    Try changing the value stored on <strong>line 40</strong> of App.js.
                </p>
                <div>
                    The stored value is: <b>{this.state.accounts && this.state.accounts[0]}</b>
                </div>
            </div>
        );
    }
}

export default App;
