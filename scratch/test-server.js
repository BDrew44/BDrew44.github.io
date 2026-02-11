const http = require("http");
const port = process.argv[0];
const args = process.argv.slice(2);

http
  .createServer(function (req, res) {
    // handle response

    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.write("Cant wait ");
    res.end("for Mardi Gras break!");
  })
  .listen(port);
