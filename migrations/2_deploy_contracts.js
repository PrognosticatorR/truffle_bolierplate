var FirstToken = artifacts.require('./FirstToken.sol');

module.exports = function (deployer) {
    deployer.deploy(FirstToken, 10000000);
};
