// fetchServer.js file
var args = process.argv.slice(2);

const http = require("http");

const port = 3000; // Port to listen on

http
  .createServer(async function (req, res) {
    const response = await fetch(url);

    var url = args[0] ? args[0] : "https://Bdrew44.github.io";

    console.log(response);

    if (response.ok) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("response received");
    } else {
      res.write(fetchResponse.statusText);
    }
    res.end();
  })
  .listen(port);
