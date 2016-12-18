"use strict";

const Car = require('./car');
const Plane = require('./plane');
const Boat = require('./boat');

const util = require('./util');

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
        cars.setColors(data.cars.colors);
        cars.setModels(data.cars.models);

        boats.setBoats(data.boats.names);
        boats.setColors(data.boats.colors);
        boats.setModels(data.boats.models);

        planes.setPlanes(data.planes.names);
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
                        $(".cars").append(util.html.createCell(car[j], color[j], model[j], 'cars', j));
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
        $(".boats").append(util.html.createCell(boat[j], color[j], model[j], 'boats', j));
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
            $(".planes").append(util.html.createCell(plane[j], color[j], model[j], 'planes', j));
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