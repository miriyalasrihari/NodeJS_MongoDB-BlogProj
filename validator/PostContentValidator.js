'use strict';

var logger = require('../corelibs').logger;

function PostContentValidator () {
    
};
PostContentValidator.prototype.CREATE = function PostContentValidatorCreate(req, res, next) {
    logger.debug("PostContentValidatorCreate - done...");
    return next();
};
PostContentValidator.prototype.READ = function PostContentValidatorRead(req, res, next) {
    logger.debug("PostContentValidatorRead - done...");
    return next();
};
module.exports = PostContentValidator;