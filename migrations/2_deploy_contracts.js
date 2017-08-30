
var EnergyTradingContract = artifacts.require("./EnergyTradingContract.sol");

module.exports = function(deployer) {
  deployer.deploy(EnergyTradingContract);
};
