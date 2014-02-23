'use strict';

var dal = require('../dal');
var DAL = dal.DAL;
var logger = require('../corelibs').logger;
var async = require('async');

function CommentPageTransacter() {

};
CommentPageTransacter.prototype.CREATE = function CommentPageTransacterCreate(req,
    res, next) {
    var db = new DAL(), attrs = {};
    attrs.PostID = req.body.PostID;
    attrs.Timestamp = req.body.Timestamp;
    attrs.Count = 9999;
    async.waterfall([ function(callback) {
        db.doReportsOperation("USER_GETCOMMENTSBYCOUNTANDTIMESTAMP", attrs, callback);
    } ], function(error, result) {
        if (error === null) {
            logger.info("CommentPageTransacterCreate - done...");
            return res.end(JSON.stringify(result));
        }
        logger.error("CommentPageTransacterCreate - ERROR (:~ ");
        throw (new Error(error));
    });
};
CommentPageTransacter.prototype.READ = function CommentPageTransacterRead(req, res,
    next) {
};
module.exports = CommentPageTransacter;