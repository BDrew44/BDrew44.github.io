/*
var nums = [9, 3.14, Math.PI, 105, 67, -1, 0];

nums.push(42);

function pickBiggerNum(a, b) {
  return a - b;
}

var sorted = nums.sort(pickBiggerNum);

console.log({ sorted });

var smallNums = nums.filter((num) => num < 50);
return num < 5;
{
}
console.log({ smallNums, nums });
*/

const http = require("http");

let data = [];

const server = http
  .createServer(function (req, res) {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(JSON.stringify(data));
      res.end("Recieved a get request");
    } else if (req.method === "POST") {
      req.on("data", function (chunk) {
        data = chunk.toString();
      });
      req.on("end", function () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("recieved " + data);
      });
    } else if (req.method === "PUT") {
      req.on("data", function (chunk) {
        data = chunk.toString();
      });
      req.on("end", function () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("recieved " + data);
      });
    } else if (req.method === "DELETE") {
      data = null;
      res.writeHead(200, { "Content-Type": "text/plain" });

      res.end("Successfully deleted data!");
    } else {
    }
  })
  .listen(3000);
