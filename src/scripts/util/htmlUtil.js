var util = {};

util.createCell = createCell;

function createCell (name, color, model, type, index) {
	return '<span ' +
                `class="list-group-item list-group-item-action list-item" id="${type}"><span>` +
                 name +
                '</span><button class="btn btn-danger btn-delete" data-button="' + name + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                `<form class="form-inline details-form" id="${type}${index}">` +
                    '<div class="form-group">' +
                        '<label for="name">Name:</label>' +
                        '<input type="text" class="form-control" id="name" value="'+ name +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="color">Color:</label>' +
                        '<input type="text" class="form-control" id="color" value="'+ color +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="model">Model:</label>' +
                        '<input type="text" class="form-control" id="model" value="'+ model +'">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                '</form>' +
            '</span>';
}

module.exports = util;