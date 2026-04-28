const { param } = require('../../routes/sensors');
const resources = require('../../resources/model');
const sensorDriver = require('node-dht-sensor');

let interval, sensor;
const device = resources.pi.sensors.dht;
let localParams = {'frequency': 2000};

// TODO 6a: connectHardware, 6b: start, 6c: stop
function connectHardware(){
    sensor = {
        initialize:function(){
            sensorDriver.initialize(device.model, device.gpio);
        },
        
        read:function(){
            tempResult = sensorDriver.read(device.model, device.gpio);
            device.temperature.value=parseFloat(tempResult.temperature);
            humidResult = sensorDriver.read(device.model, device.gpio);
            device.humidity.value=parseFloat(humidResult.humidity);
        }
    }
    sensor.initialize();
    sensor.read();

    interval = setInterval(function(){
        sensor.read();
    },
        localParams.frequency);
    
}
function start(){
    localParams=param?param:localParams;
    connectHardware();
}

function stop(){
    clearInterval(interval);
    
}
exports.start = start;
exports.stop = stop;