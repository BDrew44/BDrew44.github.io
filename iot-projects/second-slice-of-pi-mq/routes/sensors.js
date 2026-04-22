const express = require('express'),
	router = express.Router(),
	resources = require('../resources/model');

router.route("/").get(function (req, res, next){
	res.send (resources.pi.sensors);
});

router.route("/dht").get(function (req, res, next){
	res.send (resources.pi.sensors.dht);
});
router.route("/dht/temperature").get(function (req, res, next){
	res.send (resources.pi.sensors.dht.temperature);
});

router.route("/dht/humidity").get(function (req, res, next){
	res.send (resources.pi.sensors.dht.humidity);
});

router.route("/mq").get(function (req, res, next){
	res.send (resources.pi.sensors.mq);
});
// TODO: add routes to expose the sensors on the Pi (MQ / DHT etc.)

module.exports = router;
