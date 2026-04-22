const express = require('express'),
	router = express.Router(),
	resources = require('../resources/model');

router.route("/").get(function (req, res, next){
	req.result = resources.pi.sensors;
	next()
});

router.route("/dht").get(function (req, res, next){
	req.result = resources.pi.sensors.dht;
	next()
});
router.route("/dht/temperature").get(function (req, res, next){
	req.result = resources.pi.sensors.dht.temperature;
	next()
});

router.route("/dht/humidity").get(function (req, res, next){
	req.result = resources.pi.sensors.dht.humidity;
	next()
});

router.route("/mq").get(function (req, res, next){
	req.result = resources.pi.sensors.mq;
next()
});
// TODO: add routes to expose the sensors on the Pi (MQ / DHT etc.)

module.exports = router;
