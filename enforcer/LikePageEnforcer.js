'use strict';

var logger = require('../corelibs').logger;
function LikePageEnforcer () {
    
};
LikePageEnforcer.prototype.CREATE = function LikePageEnforcerCreate(req, res, next) {
    logger.debug("LikePageEnforcerCreate - done...");
    return next();
};
LikePageEnforcer.prototype.READ = function LikePageEnforcerRead(req, res, next) {
    logger.debug("LikePageEnforcerRead - done...");
    return next();
};
module.exports = LikePageEnforcer;