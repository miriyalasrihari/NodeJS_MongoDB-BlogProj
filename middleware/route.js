'use strict';

var urlRoutes = require('../server/urlroutes');
var logger = require('../corelibs').logger;

var urls = Object.keys(urlRoutes.URLRoutes);
var methods = {
    POST : 'CREATE',
    GET : 'READ',
    PUT : 'UPDATE',
    DELETE : 'DELETE'
};
var Router = function Router(req, res, next) {
    req.curdMethod = methods[req.method];
    if (urls.indexOf(req.url) !== -1 && req.method
        && methods.hasOwnProperty(req.method) === true) {
        req.originalURL = req.url;
        logger.debug("Route - done...");
        return next();
    } else if (/^\/post\/[a-z]{24}/i.test(req.url) === true) {
        req.originalURL = req.url;
        req.url.match(/([^\/]*)$/i);
        req.body.PostID = RegExp.$1;
        req.url = '/post/';
        logger.debug("Route - done...");
        return next();
    }
    logger.error("Invalid route: " + req.url);
    return next(new Error("Invalid Route"));
};

var route = function route() {
    return Router;
};

exports.Router = route;