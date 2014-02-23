'use strict';

var logger = require('../corelibs').logger;

function LikePageValidator () {
    
};
LikePageValidator.prototype.CREATE = function LikePageValidatorCreate(req, res, next) {
    logger.debug("LikePageValidatorCreate - done...");
    return next();
};
LikePageValidator.prototype.READ = function LikePageValidatorRead(req, res, next) {
    logger.debug("LikePageValidatorRead - done...");
    return next();
};
module.exports = LikePageValidator;