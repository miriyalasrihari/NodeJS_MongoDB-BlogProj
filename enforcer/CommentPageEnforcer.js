'use strict';

var logger = require('../corelibs').logger;
function CommentPageEnforcer () {
    
};
CommentPageEnforcer.prototype.CREATE = function CommentPageEnforcerCreate(req, res, next) {
    logger.debug("CommentPageEnforcerCreate - done...");
    return next();
};
CommentPageEnforcer.prototype.READ = function CommentPageEnforcerRead(req, res, next) {
    logger.debug("CommentPageEnforcerRead - done...");
    return next();
};
module.exports = CommentPageEnforcer;