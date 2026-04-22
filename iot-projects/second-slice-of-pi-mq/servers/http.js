
const express = require('express'),
	cors = require('cors');
var sensorRoutes = require('./../routes/sensors');

var actuatorRoutes = require('./../routes/actuators');

var app = express();

app.use(cors());
app.use('/pi/sensors', sensorRoutes);

app.use('/pi/actuators', actuatorRoutes);

app.get("/", function (req, res){
	console.log("im erhe");
	res.send("awiuriwuieruiwueriweuir");	
});

app.get("/pi", function (req, res){
	res.send("wewer");
});

// TODO: set up the express http server to serve the pi endpoints (sensors / actuators)




//I HAVE READ EVERYTIHNG

module.exports = app;
