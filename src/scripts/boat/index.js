const Vehicle = require('../vehicle');
const util = require('../util');

function Boat() {
	Vehicle.call(this);
	this.setType('Boats');
}

util.inherit(Vehicle, Boat);

Boat.prototype.setBoats = function (boatsArr) {
    this.setNames(boatsArr);
}

Boat.prototype.getBoats = function () {
    return this.getNames();
}

module.exports = Boat;