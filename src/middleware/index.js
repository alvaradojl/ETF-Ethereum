var iotMiddleware = require('./iotMiddleware.js'); 

var ethereumMiddleware = require('./ethereumMiddleware.js');


iotMiddleware.sendToIotDevice('device1','this is data sent from the middleware to iothub');