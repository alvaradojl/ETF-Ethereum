var config = require('/config');
var Client = require('azure-iothub').Client; 
 
var methodName = 'openRelay';
var deviceId = 'device1';

var client = Client.fromConnectionString(connectionString);

var methodParams = {
    methodName: methodName,
    payload: 'open',
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