var util = {createCell, editCell};

function createCell (name, color, model, type, index) {
	return '<span ' +
                `class="list-group-item list-group-item-action list-item" id="${type}"><span>` +
                 name +
                '</span><button class="btn btn-danger btn-delete" data-button="' + name + '"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                '<button class="btn btn-default btn-edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>' +
                createCellContent(name, color, model, type, index)
            '</span>';
}

function createEditForm(name, color, model, type, index) {
    return `<form class="form-inline details-form" id="${type}${index}">` +
                    '<div class="form-group">' +
                        '<label for="name">Name:  </label>' +
                        '<input type="text" class="form-control" id="name" value="'+ name +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="color">Color:  </label>' +
                        '<input type="text" class="form-control" id="color" value="'+ color +'">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="model">Model:  </label>' +
                        '<input type="text" class="form-control" id="model" value="'+ model +'">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary btn-save">Save</button>' +
                '</form>';
}

function createCellContent(name, color, model, type, index) {
    return `<form class="form-inline details-form" id="${type}${index}">` +
                    '<div class="form-group">' +
                        '<label for="name">Name: </label>' +
                        `<span id="name">${name}</span>` +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="color">Color: </label>' +
                        `<span id="color">${color}</span>` +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="model">Model: </label>' +
                        `<span id="model">${model}</span>` +
                    '</div>'
                '</form>';
}

function editCell (button, name, color, model, type, index) {
    $(button).next().remove();
    $(button).parent().append(createEditForm(name, color, model, type, index));
}

module.exports = util;