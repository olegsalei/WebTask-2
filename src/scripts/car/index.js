const Vehicle = require('../vehicle');
const util = require('../util');

function Car() {
    Vehicle.call(this);
    this.setType('Cars');
}

util.inherit(Vehicle, Car);

Car.prototype.setCars = function (carsArr) {
    this.setNames(carsArr);
}

Car.prototype.getCars = function () {
    return this.getNames();
}

module.exports = Car;