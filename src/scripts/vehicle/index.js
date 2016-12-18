function Vehicle() {
    this.type = "";
    this.colors = [];
    this.models = [];
    this.names = [];
}

Vehicle.prototype.setType = function(type) {
    this.type = type;
}
Vehicle.prototype.getType = function() {
    return this.type;
}
Vehicle.prototype.setColors = function (colorsArr) {
    this.colors = [];
    for(var i = 0; i < colorsArr.length; ++i) {
        this.colors.push(colorsArr[i]);
    }
}
Vehicle.prototype.getColors = function() {
    return this.colors;
}
Vehicle.prototype.setModels = function (modelsArr) {
    this.models = [];
    for(var i = 0; i < modelsArr.length; ++i) {
        this.models.push(modelsArr[i]);
    }
}
Vehicle.prototype.getModels = function() {
    return this.models;
}
Vehicle.prototype.setNames = function (namesArr) {
    this.names = namesArr.map(name => name);
}
Vehicle.prototype.getNames = function() {
    return this.names;
}

module.exports = Vehicle;