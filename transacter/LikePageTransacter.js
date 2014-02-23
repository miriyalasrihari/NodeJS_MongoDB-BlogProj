'use strict';

var dal = require('../dal');
var DAL = dal.DAL;
var logger = require('../corelibs').logger;
var async = require('async');

function LikePageTransacter() {

};
LikePageTransacter.prototype.CREATE = function LikePageTransacterCreate(req,
    res, next) {
    var db = new DAL(), attrs = {};
    attrs.PostID = req.body.PostID;
    attrs.Like = req.body.Like;
    async.waterfall([ function(callback) {
        db.doAccountsOperation("USER_LIKEAPOST", attrs, callback);
    } ], function(error, result) {
        if (error === null) {
            logger.info("LikePageTransacterCreate - done...");
            return res.end('{"Likes":' + result + '}');
        }
        logger.error("LikePageTransacterCreate - ERROR (:~ ");
        throw (new Error(error));
    });
};
LikePageTransacter.prototype.READ = function LikePageTransacterRead(req, res,
    next) {
};
module.exports = LikePageTransacter;