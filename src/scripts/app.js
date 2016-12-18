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
    var boats = new Boat();
    var planes = new Plane();
    getDataFromJson(cars, boats, planes);

    $(".add-form").submit(function (event) {
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

        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        var body = {
            "cars": cars,
            "boats": boats,
            "planes": planes
        };
        body = JSON.stringify(body);

        xhr.open("POST", '/addItem', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);

        deleteOldData();
        appendVehicle(cars, boats, planes);
        deleteVehicle(cars, boats, planes);
    });
});

function getDataFromJson(cars, boats, planes) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', '/getJson', true);

    xhr.onload = function() {
        var data = JSON.parse(this.responseText);
        cars.setCars(data.cars.names);
        cars.setType("Cars");
        cars.setColors(data.cars.colors);
        cars.setModels(data.cars.models);

        boats.setBoats(data.boats.names);
        boats.setType("Boats");
        boats.setColors(data.boats.colors);
        boats.setModels(data.boats.models);

        planes.setPlanes(data.planes.names);
        planes.setType("Planes");
        planes.setColors(data.planes.colors);
        planes.setModels(data.planes.models);

        appendVehicle(cars, boats, planes);
        deleteVehicle(cars, boats, planes);
    }
    xhr.onerror = function() {
        alert('Ошибка ' + this.status);
    }
    xhr.send();
}

function deleteOldData() {
    $(".model").remove();
}

function deleteVehicle(cars, boats, planes) {
    $('.btn-delete').each(function () {
        var item = $(this);
        item.on("click", function () {
            var temp = cars.getCars();
            var colors = cars.getColors();
            var models = cars.getModels();
            var index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                colors.splice(index, 1);
                models.splice(index, 1);
                cars.setCars(temp);
                cars.setColors(colors);
                cars.setModels(models);
            }

            temp= boats.getBoats();
            colors = boats.getColors();
            models = boats.getModels();
            index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                colors.splice(index, 1);
                models.splice(index, 1);
                boats.setBoats(temp);
                boats.setColors(colors);
                boats.setModels(models);
            }

            temp= planes.getPlanes();
            colors = planes.getColors();
            models = planes.getModels();
            index = temp.indexOf(item.data().button);
            if(index != -1) {
                temp.splice(index, 1);
                colors.splice(index, 1);
                models.splice(index, 1);
                planes.setPlanes(temp);
                planes.setColors(colors);
                planes.setModels(models);
            }

            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR();
            var body = {
                "cars": cars,
                "boats": boats,
                "planes": planes
            };
            body = JSON.stringify(body);

            xhr.open("POST", '/deleteItem', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);

            deleteOldData();
            appendVehicle(cars, boats, planes);
            deleteVehicle(cars, boats, planes);
        });
    });
}

function appendVehicle (cars, boats, planes) {
    console.log(cars);
    console.log(boats);
    console.log(planes);

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
                            '<a href="#" ' +
                               'class="list-group-item list-group-item-action list-item" id="cars"><span>' +
                                car[j] +
                                '</span><button class="btn btn-danger btn-delete align-text-top" data-button="' + car[j] + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                                '<form class="form-inline details-form" id="cars' + j + '">' +
                                    '<div class="form-group">' +
                                        '<label for="name">Name:</label>' +
                                        '<input type="text" class="form-control" id="name" name="newName" value="'+ car[j] +'">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="color">Color:</label>' +
                                        '<input type="text" class="form-control" id="color" name="newColor" value="'+ color[j] +'">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="model">Model:</label>' +
                                        '<input type="text" class="form-control" id="model" name="newModel" value="'+ model[j] +'">' +
                                    '</div>' +
                                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                                '</form>' +
                            '</a>'
                        );
                        $("#cars" + j).submit(function (event) {
                            event.preventDefault();
                            var html = $(this).children();
                            var type = html.parent().parent().attr('id');
                            var lastName = html.parent().parent()[0].firstChild.innerText;
                            var name = html[0].lastChild.value;
                            var color = html[1].lastChild.value;
                            var model = html[2].lastChild.value;

                            var temp = cars.getCars();
                            var index = temp.indexOf(lastName);
                            console.log(temp[index]);
                            temp[index] = name;
                            var colors = cars.getColors();
                            colors[index] = color;
                            var models = cars.getModels();
                            models[index] = model;

                            cars.setCars(temp);
                            cars.setColors(colors);
                            cars.setModels(models);

                            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                            var xhr = new XHR();
                            var body = {
                                "cars": cars,
                                "boats": boats,
                                "planes": planes
                            };
                            body = JSON.stringify(body);

                            xhr.open("POST", '/updateItem', true)
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.send(body);

                            console.log("Car has been added!");
                            deleteOldData();
                            appendVehicle(cars, boats, planes);
                            deleteVehicle(cars, boats, planes);
                        });
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
                'class="list-group-item list-group-item-action list-item" id="boats"><span>' +
                 boat[j] +
                '</span><button class="btn btn-danger btn-delete" data-button="' + boat[j] + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                '<form class="form-inline details-form" id="boats' + j + '">' +
                    '<div class="form-group">' +
                        '<label for="name">Name:</label>' +
                        '<input type="text" class="form-control" id="name" value="'+ boat[j] +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="color">Color:</label>' +
                        '<input type="text" class="form-control" id="color" value="'+ color[j] +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="model">Model:</label>' +
                        '<input type="text" class="form-control" id="model" value="'+ model[j] +'">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                '</form>' +
            '</a>'
        );
        $("#boats" + j).submit(function (event) {
            event.preventDefault();
            var html = $(this).children();
            var type = html.parent().parent().attr('id');
            var lastName = html.parent().parent()[0].firstChild.innerText;
            var name = html[0].lastChild.value;
            var color = html[1].lastChild.value;
            var model = html[2].lastChild.value;
            console.log(type);

            var temp = boats.getBoats();
            var index = temp.indexOf(lastName);
            console.log(temp[index]);
            temp[index] = name;
            var colors = boats.getColors();
            colors[index] = color;
            var models = boats.getModels();
            models[index] = model;

            boats.setBoats(temp);
            boats.setColors(colors);
            boats.setModels(models);

            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR();
            var body = {
                "cars": cars,
                "boats": boats,
                "planes": planes
            };
            body = JSON.stringify(body);

            xhr.open("POST", '/updateItem', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);

            console.log("Boat has been added!");
            deleteOldData();
            appendVehicle(cars, boats, planes);
            deleteVehicle(cars, boats, planes);
        });
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
                    'class="list-group-item list-group-item-action list-item" id="planes"><span>' +
                    plane[j] +
                    '</span><button class="btn btn-danger btn-delete" data-button="' + plane[j] + '"><i class="fa fa-times"' +
                ' aria-hidden="true"></i></button>' +
                    '<form class="form-inline details-form" id="planes' + j + '">' +
                        '<div class="form-group">' +
                            '<label for="name">Name:</label>' +
                            '<input type="text" class="form-control" id="name" value="'+ plane[j] +'">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="color">Color:</label>' +
                            '<input type="text" class="form-control" id="color" value="'+ color[j] +'">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="model">Model:</label>' +
                            '<input type="text" class="form-control" id="model" value="'+ model[j] +'">' +
                        '</div>' +
                        '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                    '</form>' +
                '</a>'
            );
            $("#planes" + j).submit(function (event) {
                event.preventDefault();
                var html = $(this).children();
                var type = html.parent().parent().attr('id');
                var lastName = html.parent().parent()[0].firstChild.innerText;
                var name = html[0].lastChild.value;
                var color = html[1].lastChild.value;
                var model = html[2].lastChild.value;
                console.log(type);

                var temp = planes.getPlanes();
                var index = temp.indexOf(lastName);
                console.log(temp[index]);
                temp[index] = name;
                var colors = planes.getColors();
                colors[index] = color;
                var models = planes.getModels();
                models[index] = model;

                planes.setPlanes(temp);
                planes.setColors(colors);
                planes.setModels(models);

                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var xhr = new XHR();
                var body = {
                    "cars": cars,
                    "boats": boats,
                    "planes": planes
                };
                body = JSON.stringify(body);

                xhr.open("POST", '/updateItem', true)
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(body);

                console.log("Plane has been added!");
                deleteOldData();
                appendVehicle(cars, boats, planes);
                deleteVehicle(cars, boats, planes);
            });
        }
        $(".vehicles").append(
                 '</div>' +
                '</div>' +
            '</div>'
    );
}

function addVehicle (vehicle) {

}