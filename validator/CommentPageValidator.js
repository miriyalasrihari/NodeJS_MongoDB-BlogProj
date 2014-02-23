'use strict';

var logger = require('../corelibs').logger;

function GetPageValidator () {
    
};
GetPageValidator.prototype.CREATE = function GetPageValidatorCreate(req, res, next) {
    logger.debug("GetPageValidatorCreate - done...");
    return next();
};
GetPageValidator.prototype.READ = function GetPageValidatorRead(req, res, next) {
    logger.debug("GetPageValidatorRead - done...");
    return next();
};
module.exports = GetPageValidator;