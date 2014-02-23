'use strict';

var logger = require('../corelibs').logger;
function GetPageEnforcer () {
    
};
GetPageEnforcer.prototype.CREATE = function GetPageEnforcerCreate(req, res, next) {
    logger.debug("GetPageEnforcerCreate - done...");
    return next();
};
GetPageEnforcer.prototype.READ = function GetPageEnforcerRead(req, res, next) {
    logger.debug("GetPageEnforcerRead - done...");
    return next();
};
module.exports = GetPageEnforcer;