"use strict";

function Vehicle() {
    this.type = "";
    this.colors = [];
    this.models = [];

    this.setType = function(type) {
        this.type = type;
    }
    this.getType = function() {
        return this.type;
    }
    this.setColors = function (colorsArr) {
        this.colors = [];
        for(var i = 0; i < colorsArr.length; ++i) {
            this.colors.push(colorsArr[i]);
        }
    }
    this.getColors = function() {
        return this.colors;
    }
    this.setModels = function (modelsArr) {
        this.models = [];
        for(var i = 0; i < modelsArr.length; ++i) {
            this.models.push(modelsArr[i]);
        }
    }
    this.getModels = function() {
        return this.models;
    }
}

function Car() {
    Vehicle.call(this);

    this.cars = [];

    this.setCars = function (carsArr) {
        this.cars = [];
        for(var i = 0; i < carsArr.length; ++i) {
            this.cars.push(carsArr[i]);
        }
    }
    this.getCars = function () {
        return this.cars;
    }
}

function Boat() {
    Vehicle.call(this);

    this.boats = [];
    this.color;
    this.model;

    this.setColor = function(color) {
        this.color = color;
    }
    this.setModel = function(model) {
        this.model = model;
    }

    this.setBoats = function (boatsArr) {
        this.boats = [];
        for(var i = 0; i < boatsArr.length; ++i) {
            this.boats.push(boatsArr[i]);
        }
    }
    this.getBoats = function () {
        return this.boats;
    }
}

function Plane() {
    Vehicle.call(this);

    this.planes = [];
    this.color;
    this.model;

    this.setColor = function(color) {
        this.color = color;
    }
    this.setModel = function(model) {
        this.model = model;
    }

    this.setPlanes = function (planesArr) {
        this.planes = [];
        for(var i = 0; i < planesArr.length; ++i) {
            this.planes.push(planesArr[i]);
        }
    }
    this.getPlanes = function () {
        return this.planes;
    }
}

$(document).ready(function () {
    var cars = new Car();
    cars.setType("Car");
    cars.setCars(["mazda", "tayota", "ford", "volvo", "subaru"]);
    cars.setColors(["blue", "green", "silver", "pink", "grey"]);
    cars.setModels(["rx-7", "yaris", "mustang", "s60", "legancy"]);
    var boats = new Boat();
    boats.setType("Boat");
    boats.setBoats(["Studdy Beggar", "Big Foot","Titanik", "Cosos bay", "Red jacket", "Catalonia"]);
    boats.setColors(["orange", "blue", "white", "black", "red", "yellow"]);
    boats.setModels(["cruiser", "destroyer", "linkor", "aircraft carrier", "atomic", "submarine"]);
    var planes = new Plane();
    planes.setType("Plane");
    planes.setPlanes(["Boeing", "F-15", "Mig", "Airbus"]);
    planes.setColors(["striped", "gray", "white", "pink"]);
    planes.setModels(["747", "Strike Eagle", "27", "A 380"]);

    appendVehicle(cars, boats, planes);
    deleteVehicle(cars, boats, planes);

    $(".form-inline").submit(function (event) {
        event.preventDefault();
        var name = $("input:first").val();
        var type = $("#select").val();

        if(type == "Car") {
            var temp = cars.getCars();
            temp.push(name);
            cars.setCars(temp);
        }
        if(type == "Boat") {
            var temp = boats.getBoats();
            temp.push(name);
            boats.setBoats(temp);
        }
        if(type == "Plane") {
            var temp = planes.getPlanes();
            temp.push(name);
            planes.setPlanes(temp);
        }

        deleteOldData();
        appendVehicle(cars, boats, planes);
        deleteVehicle(cars, boats, planes);
    });

    $(".details-form").submit(function (event) {
       event.preventDefault();
       var name = $("#newName").val();
       var color = $("#color").val();
       var model = $("#model").val();

       alert(name + color + model);
    });
});

function deleteOldData() {
    $(".model").remove();
}

function deleteVehicle(cars, boats, planes) {
    $('.btn-delete').each(function () {
        var item = $(this);
        item.on("click", function () {

            var temp = cars.getCars();
            var index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                cars.setCars(temp);
            }

            temp = planes.getPlanes();
            index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                planes.setPlanes(temp);
            }

            temp = boats.getBoats();
            index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                boats.setBoats(temp);
            }

            deleteOldData();
            appendVehicle(cars, boats, planes);
            deleteVehicle(cars, boats, planes);
        });
    });
}

function appendVehicle (cars, boats, planes) {
        $(".vehicles").append(
                '<div class="model">' +
                    '<p>' +
                        '<button class="btn btn-primary" ' +
                                'type="button"' +
                                'data-toggle="collapse" ' +
                                'data-target="#collapse1" ' +
                                'aria-expanded="false" ' +
                                'aria-controls="collapse1">' +
                            cars.getType() +
                        '</button>' +
                    '</p>' +
                    '<div class="collapse in" id="collapse1">' +
                        '<div class="card list-group cars">');
                    for (var j = 0, car = cars.getCars(), color = cars.getColors(), model = cars.getModels(); j < car.length; ++j) {
                        $(".cars").append(
                            '<div href="#" ' +
                               'class="list-group-item list-group-item-action list-item">' +
                                car[j] +
                                '<button class="btn btn-danger btn-delete align-text-top" data-button="' + car[j] + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                                '<form class="form-inline details-form">' +
                                    '<div class="form-group">' +
                                        '<label for="name">Name</label>' +
                                        '<input type="text" class="form-control" id="name" value="'+ car[j] +'">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="color">Color</label>' +
                                        '<input type="text" class="form-control" id="color" value="'+ color[j] +'">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="model">Model</label>' +
                                        '<input type="text" class="form-control" id="model" value="'+ model[j] +'">' +
                                    '</div>' +
                                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                                '</form>' +
                            '</a>'
                        );
                    }
        $(".vehicles").append(
                    '</div>' +
                '</div>' +
            '</div>'
        );

    $(".vehicles").append(
        '<div class="model">' +
            '<p>' +
                '<button class="btn btn-primary" ' +
                    'type="button"' +
                    'data-toggle="collapse" ' +
                    'data-target="#collapse2" ' +
                    'aria-expanded="false" ' +
                    'aria-controls="collapse2">' +
                 boats.getType() +
                '</button>' +
            '</p>' +
            '<div class="collapse in" id="collapse2">' +
                '<div class="card list-group boats">');
    for (var j = 0, boat = boats.getBoats(), color = boats.getColors(), model = boats.getModels(); j < boat.length; ++j) {
        $(".boats").append(
            '<a href="#" ' +
                'class="list-group-item list-group-item-action list-item">' +
                 boat[j] +
                '<button class="btn btn-danger btn-delete" data-button="' + boat[j] + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                '<form class="form-inline details-form">' +
                    '<div class="form-group">' +
                        '<label for="name">Name</label>' +
                        '<input type="text" class="form-control" id="name" value="'+ boat[j] +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="color">Color</label>' +
                        '<input type="text" class="form-control" id="color" value="'+ color[j] +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="model">Model</label>' +
                        '<input type="text" class="form-control" id="model" value="'+ model[j] +'">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                '</form>' +
            '</a>'
        );
    }
        $(".vehicles").append(
                    '</div>' +
                '</div>' +
            '</div>'
        );

    $(".vehicles").append(
        '<div class="model">' +
            '<p>' +
                '<button class="btn btn-primary" ' +
                    'type="button"' +
                    'data-toggle="collapse" ' +
                    'data-target="#collapse3" ' +
                    'aria-expanded="false" ' +
                    'aria-controls="collapse3">' +
                    planes.getType() +
                '</button>' +
            '</p>' +
            '<div class="collapse in" id="collapse3">' +
                '<div class="card list-group planes">');
        for (var j = 0, plane = planes.getPlanes(), color = planes.getColors(), model = planes.getModels(); j < plane.length; ++j) {
            $(".planes").append(
                '<a href="#" ' +
                    'class="list-group-item list-group-item-action list-item">' +
                    plane[j] +
                    '<button class="btn btn-danger btn-delete" data-button="' + plane[j] + '"><i class="fa fa-times"' +
                ' aria-hidden="true"></i></button>' +
                    '<form class="form-inline details-form">' +
                        '<div class="form-group">' +
                            '<label for="name">Name</label>' +
                            '<input type="text" class="form-control" id="name" value="'+ plane[j] +'">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="color">Color</label>' +
                            '<input type="text" class="form-control" id="color" value="'+ color[j] +'">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="model">Model</label>' +
                            '<input type="text" class="form-control" id="model" value="'+ model[j] +'">' +
                        '</div>' +
                        '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                    '</form>' +
                '</a>'
            );
        }
        $(".vehicles").append(
                 '</div>' +
                '</div>' +
            '</div>'
    );
}

function addVehicle (vehicle) {

}