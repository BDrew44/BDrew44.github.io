const http = require("http");
const async = require("async");

const port = 8686;

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });

    let racers = ["Green Ambler", "Catalack", "Steel Runner", "G.I. Jogger"];

    let d = new Date();
    let startTime = d.getTime();

    // TODO 12: Make the whole thing parallel
    async.parallel(
      // TODO 9: Supply an array of functions
      [
        function (callback) {
          wrapper(callback);
        },
        function (callback) {
          wrapper(callback);
        },
        function (callback) {
          wrapper(callback);
        },
        function (callback) {
          wrapper(callback);
        },
      ],
      function (error, results) {
        res.write("Results:\n");
        var victoryOrder = sortTogether(racers, results);
        for (let racer of victoryOrder) {
          res.write(racer + "\n");
        }
        let d = new Date();
        let endTime = d.getTime();
        let duration = endTime - startTime;
        res.write("Race Duration: " + duration + "ms\n");
        res.end();
      },
    );
  })
  .listen(port);

// TODO 8: create a common function to be called by all functions in the array passed to the async function
function wrapper(callback) {
  setTimeout(() => {
    let d = new Date();
    callback(null, d.getTime());
  }, Math.random() * 1000);
}

// sortTogether takes in an array of racer names and an array of times that the racers finished the race.
// It returns a new array of names, with the list or racers sorted by the time that they finished.
function sortTogether(names, times) {
  var tempList = [];
  for (var i = 0; i < names.length; i++) {
    tempList.push({ name: names[i], time: times[i] });
  }

  tempList.sort(function (a, b) {
    return a.time < b.time ? -1 : a.time == b.time ? 0 : 1;
  });

  for (var i = 0; i < tempList.length; i++) {
    names[i] = tempList[i].name;
  }
  return names;
}
