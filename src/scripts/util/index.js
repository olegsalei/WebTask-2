const htmlUtil = require('./htmlUtil');

var util = {};

util.inherit = (parentCtor, childCtor) => {
    var f = function() {};
    f.prototype = parentCtor.prototype;
    f.prototype.constructor = parentCtor;
    childCtor.prototype = f.prototype;
}

util.html = htmlUtil;

module.exports = util;