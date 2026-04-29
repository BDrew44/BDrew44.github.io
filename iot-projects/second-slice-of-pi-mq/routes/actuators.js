const express = require('express');

const resources = require('./../resources/model');

const router = express.Router();

router.route("/").get(function (req, res, next){
	req.result = resources.pi.actuators;
	next();
});

router.route("/leds").get(function (req, res, next){
	req.result = resources.pi.actuators.leds;
	next();
});

router.route("/leds/:id").get(function (req, res, next){
	req.result = resources.pi.actuators.leds[req.params.id];
	next();
});

// TODO: add routes to expose the actuators on the Pi (LEDs / relays etc.)

module.exports = router;
