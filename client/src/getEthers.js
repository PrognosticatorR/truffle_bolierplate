import { ethers } from 'ethers';

const getEthers = () =>
    new Promise((resolve, reject) => {
        const loadListner = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    resolve(provider);
                } catch (error) {
                    reject(error);
                }
            } else if (window.web3) {
                const provider = window.web3;
                console.log('Injected web3 detected.');
                resolve(provider);
            } else {
                const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
                console.log('No web3 instance injected, using Local web3.');
                resolve(provider);
            }
        };
        window.addEventListener('load', loadListner);
    });

export default getEthers;
