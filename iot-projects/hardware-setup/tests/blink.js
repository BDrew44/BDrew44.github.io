const onoff = require("onoff");

const g = onoff.Gpio;
//15e 17e
//  Gpio 22 3.3V
//23e 24e
// gpio 11 gpio 11
const l1 = new g(587, "out");
const l2 = new g(592, "out");
let i;

i = setInterval(function () {
  const value = (l1.readSync() + 1) % 2;
  l1.write(value, function () {
    console.log(`Changed LED 1 state to: ${value}`);
  });
  l2.write((value + 1) % 2, function () {
    console.log(`Changed LED 2 state to: ${(value + 1) % 2}`);
  });
}, 1000);

process.on("SIGINT", function () {
  clearInterval(i);
  l1.writeSync(0);
  l1.unexport()
  l2.writeSync(0);
  l2.unexport()

  console.log('adios')

  process.exit();
});
