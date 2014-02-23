'use strict';

var urlRoutes = require('../server/urlroutes').URLRoutes;

var Validator = function Validator(req, res, next) {
    var handler = new urlRoutes[req.url].Validator();
    return handler[req.curdMethod](req, res, next);
};

var Validate = function Validate() {
    return Validator;
};

exports.Validate = Validate;