'use strict';

var logger = require('../corelibs').logger;
function PostContentEnforcer () {
    
};
PostContentEnforcer.prototype.CREATE = function PostContentEnforcerCreate(req, res, next) {
    logger.debug("PostContentEnforcerCreate - done...");
    return next();
};
PostContentEnforcer.prototype.READ = function PostContentEnforcerRead(req, res, next) {
    logger.debug("PostContentEnforcerRead - done...");
    return next();
};

module.exports = PostContentEnforcer;