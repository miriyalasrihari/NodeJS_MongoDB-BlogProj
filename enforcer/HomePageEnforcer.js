'use strict';

var logger = require('../corelibs').logger;
function HomePageEnforcer () {
    
};
HomePageEnforcer.prototype.CREATE = function HomePageEnforcerCreate(req, res, next) {
    logger.debug("HomePageEnforcerCreate - done...");
    return next();
};
HomePageEnforcer.prototype.READ = function HomePageEnforcerRead(req, res, next) {
    logger.debug("HomePageEnforcerRead - done...");
    return next();
};
module.exports = HomePageEnforcer;