'use strict';

var logger = require('../corelibs').logger;

function HomePageValidator () {
    
};
HomePageValidator.prototype.CREATE = function HomePageValidatorCreate(req, res, next) {
    logger.debug("HomePageValidatorCreate - done...");
    return next();
};
HomePageValidator.prototype.READ = function HomePageValidatorRead(req, res, next) {
    logger.debug("HomePageValidatorRead - done...");
    return next();
};
module.exports = HomePageValidator;