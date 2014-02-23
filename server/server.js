'use strict';
var express = require('express');
var cons = require('consolidate');
var swig = require('swig');
var config = require('../config');
var middleware = require('../middleware');

var createServer = function createServer() {
    var server = express();
//    swig.init({
//        root : __dirname + '/../views'
//    });
    server.engine('.html', cons.swig);
    server.set('view engine', 'html');
    server.set('views', __dirname + '/../views');
    server.use('/public', express.static(__dirname + '/../public'));
    server.use(express.favicon(__dirname + '/../public/images/favicon1.ico'));
    server.use(express.bodyParser({
        uploadDir : __dirname + '/../public/uploads'
    }));
    server.use(middleware.Router());
    server.use(middleware.Authenticator());
    server.use(middleware.Validate());
    server.use(middleware.Enforce());
    server.use(middleware.Transact());
    server.listen(config.Server.Port);
    return server;
};
module.exports = createServer;