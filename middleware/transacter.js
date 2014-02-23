'use strict';

var urlRoutes = require('../server/urlroutes').URLRoutes;

var Transacter = function Transacter(req, res, next) {
    var handler = new urlRoutes[req.url].Transacter();
    return handler[req.curdMethod](req, res, next);
};

var Transact = function Transact() {
    return Transacter;
};

exports.Transact = Transact;