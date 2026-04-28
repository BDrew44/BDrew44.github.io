// In this file, you will work on TODOs 5d and 6d
var mqPlugin = require("./plugins/internal/mqPlugin");
var dhtPlugin = require("./plugins/internal/dhtPlugin");

const httpServer = require('./servers/http'),
	resources = require('./resources/model');
	mqPlugin.start();
	//dhtPlugin.start({'frequency': 2000});
	

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the PI on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	mqPlugin.stop();
	dhtPlugin.stop();
	process.exit();
});