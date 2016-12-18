const Vehicle = require('../vehicle');
const util = require('../util');

function Plane () {
    Vehicle.call(this);
    this.setType('Planes');
}

util.inherit(Vehicle, Plane);

Plane.prototype.setPlanes = function (planesArr) {
    this.setNames(planesArr);
}

Plane.prototype.getPlanes = function () {
    return this.getNames();
}

module.exports = Plane;