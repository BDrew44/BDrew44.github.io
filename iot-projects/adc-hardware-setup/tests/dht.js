// test-dht.js
const sensor = require("node-dht-sensor-rp5");

const SENSOR_TYPE = 22; // DHT22
const GPIO_PIN = 4; // physical pin 7 ? BCM 4

function readSensor() {
  const result = sensor.read(SENSOR_TYPE, GPIO_PIN);

  const temperature = result.temperature;
  const humidity = result.humidity;

  if (Number.isNaN(temperature) || Number.isNaN(humidity)) {
    console.log("? Read failed (NaN)");
  } else if (temperature === 0 && humidity === 0) {
    console.log("?? Read returned 0s (likely wiring issue)");
  } else {
    console.log(
      `? Temp: ${temperature.toFixed(1)}C | Humidity: ${humidity.toFixed(1)}%`,
    );
  }
}

// Read every 2 seconds (important for DHT22 timing)
setInterval(readSensor, 2000);
