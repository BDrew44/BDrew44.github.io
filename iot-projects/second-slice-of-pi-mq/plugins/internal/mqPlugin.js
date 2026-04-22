// mq_mcp3008_plugin.js
// Simple MQ sensor plugin using MCP3008 (SPI)

const spi = require("spi-device");
const model = require("../../resources/model");

let device = null;
let interval = null;
let window = [];

const pluginName = "mq";
const CHANNEL = 0;
const WINDOW_SIZE = 20;
const POLL_MS = 250;

// TODO 5a: connectHardware, 5b: start, 5c: stop
function connectHardware(){
  device = spi.openSync(0,0, {maxSpeedHz: 1350000});
  
}
function start(){
  connectHardware();
  interval = setInterval(readSensor, POLL_MS);
}

function stop(){
  device.closeSync();
  clearInterval(interval);
}

function readMCP3008(channel) {
  const message = [
    {
      sendBuffer: Buffer.from([0x01, (0x08 | channel) << 4, 0x00]),
      receiveBuffer: Buffer.alloc(3),
      byteLength: 3,
      speedHz: 1350000,
    },
  ];

  device.transferSync(message);

  const rx = message[0].receiveBuffer;
  return ((rx[1] & 0x03) << 8) | rx[2];
}

function avg(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
}

function readSensor() {
  try {
    const raw = readMCP3008(CHANNEL);

    window.push(raw);
    if (window.length > WINDOW_SIZE) window.shift();

    const mean = avg(window);
    const volts = (mean / 1023) * 3.3;

    // Ensure structure exists
    if (!model.pi) model.pi = {};
    if (!model.pi.sensors) model.pi.sensors = {};
    if (!model.pi.sensors.mq) model.pi.sensors.mq = {};

    model.pi.sensors.mq.value = {
      raw,
      avg: mean,
      volts,
    };
  } catch (err) {
    console.error("MQ read error:", err);
  }
}

exports.start = start;
exports.stop = stop;