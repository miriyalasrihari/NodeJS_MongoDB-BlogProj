'use strict';

var urlRoutes = require('../server/urlroutes').URLRoutes;

var Enforcer = function Enforcer(req, res, next) {
    var handler = new urlRoutes[req.url].Enforcer();
    return handler[req.curdMethod](req, res, next);
};

var Enforce = function Enforce() {
    return Enforcer;
};

exports.Enforce = Enforce;