// mq_mcp3008.js
// Reads an MQ sensor via MCP3008 ADC (SPI) and prints raw + averaged value.

const spi = require("spi-device");

console.log(spi)

// Open SPI bus 0, device 0 (CE0)
const device = spi.openSync(0, 0, { maxSpeedHz: 1350000 });

function readMCP3008(channel) {
  if (channel < 0 || channel > 7) throw new Error("Channel must be 0-7");

  // MCP3008 command:
  // Byte1: 0x01 (start bit)
  // Byte2: (0x08 | channel) << 4  (single-ended + channel)
  // Byte3: 0x00
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
  const value = ((rx[1] & 0x03) << 8) | rx[2]; // 10-bit result (0..1023)
  return value;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function avg(arr) {
  const s = arr.reduce((a, b) => a + b, 0);
  return s / arr.length;
}

async function main() {
  const channel = 0;
  const windowSize = 20;
  const window = [];

  console.log("Reading... Ctrl+C to stop");
  while (true) {
    const raw = readMCP3008(channel);

    window.push(raw);
    if (window.length > windowSize) window.shift();

    const mean = avg(window);
    const volts = (mean / 1023) * 3.3; // because MCP3008 VREF is 3.3V

    console.log(
      `raw=${raw.toString().padStart(4)} avg=${mean.toFixed(2).padStart(7)} voltsï¿½${volts.toFixed(3)}`,
    );
    await sleep(250);
  }
}

process.on("SIGINT", () => {
  console.log("\nClosing SPI...");
  device.closeSync();
  process.exit(0);
});

main().catch((err) => {
  console.error(err);
  device.closeSync();
  process.exit(1);
});
