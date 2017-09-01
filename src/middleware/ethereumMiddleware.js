
function UpdateCapacity(newCapacity)
{
    Web3 = require('web3')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var newCapacity=newCapacity;
    var me='0x29225070e932f9fdb56680e36e79735adb039abd';
    web3.personal.unlockAccount(me,'azurepassword',1);

    //Contract instance creation in Rinkeby
    abi=JSON.parse('[{"constant":true,"inputs":[],"name":"getCapacityAvailability","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"disable","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"close","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getCreationDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_oracle","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pricePerKwh","type":"uint256"}],"name":"trade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_lastMeasure","type":"uint256"}],"name":"updateCapacity","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"HasBeenPayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"HasBeenDisabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"HasBeenClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"trader","type":"address"},{"indexed":false,"name":"capacity","type":"uint256"},{"indexed":false,"name":"pricePerKwh","type":"uint256"}],"name":"BidAccepted","type":"event"}]')
    flexchain = web3.eth.contract(abi);
    flexchain_inst = flexchain.at('0x5ed61b3dd7d6f799ba4731ccd827432e9315f76e');
    flexchain_inst.updateCapacity(newCapacity,{from:me})

    console.log(flexchain_inst.getCapacityAvailability());
}

module.exports={
    updateCapacity:UpdateCapacity
};
