'use strict';

var logger = require('../corelibs').logger;
var Authenticator = function Authenticator(req, res, next) {
    logger.debug("Authenticate - done....");
    return next();
};

var Authenticate = function Authenticate() {
    return Authenticator;
};

exports.Authenticator = Authenticate;