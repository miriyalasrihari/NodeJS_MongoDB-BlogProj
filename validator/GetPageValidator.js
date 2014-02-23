'use strict';

var logger = require('../corelibs').logger;

function CommentPageValidator () {
    
};
CommentPageValidator.prototype.CREATE = function CommentPageValidatorCreate(req, res, next) {
    logger.debug("CommentPageValidatorCreate - done...");
    return next();
};
CommentPageValidator.prototype.READ = function CommentPageValidatorRead(req, res, next) {
    logger.debug("CommentPageValidatorRead - done...");
    return next();
};
module.exports = CommentPageValidator;