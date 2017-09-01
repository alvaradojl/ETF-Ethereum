

 function sendToIotDevice(deviceId,payload){
    var config = require('./config');
    var Client = require('azure-iothub').Client; 
    
    var methodName = 'OpenRelay'; 
    
    var client = Client.fromConnectionString(config.iothubConnectionString);
    
    var methodParams = {
        methodName: methodName,
        payload: payload,
        timeoutInSeconds: 30
    };
    
    client.invokeDeviceMethod(deviceId, methodParams, function (err, result) {
        if (err) {
            console.error('Failed to invoke method \'' + methodName + '\': ' + err.message);
        } else {
            console.log(methodName + ' on ' + deviceId + ':');
            console.log(JSON.stringify(result, null, 2));
        }
    });

 
}

module.exports = {
    sendToIotDevice: sendToIotDevice 
};