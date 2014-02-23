'use strict';

var dal = require('../dal');
var DAL = dal.DAL;
var logger = require('../corelibs').logger;
var async = require('async');

function GetPageTransacter() {

};
GetPageTransacter.prototype.CREATE = function GetPageTransacterCreate(req,
    res, next) {
    var db = new DAL(), attrs = {};
    attrs.PostID = req.body.PostID;
    attrs.Comment = req.body.Comment;
    attrs.Email = req.body.Email;
    attrs.Author = req.body.Name;
    attrs.Date = new Date();
    async.waterfall([ function(callback) {
        db.doAccountsOperation("USER_SAVECOMMENT", attrs, callback);
    } ], function(error, result) {
        if (error === null) {
            logger.info("GetPageTransacterCreate - done...");
            return res.end(JSON.stringify(result));
        }
        logger.error("GetPageTransacterCreate - ERROR (:~ ");
        throw (new Error(error));
    });
};
GetPageTransacter.prototype.READ = function GetPageTransacterRead(req, res,
    next) {
    var db = new DAL(), attrs = {};
    attrs.PostID = req.body.PostID;
    async.waterfall([
            function(callback) {
                db.doAccountsOperation("USER_GETPOSTBYID", attrs, function(
                    error, result) {
                    if (error === null && result.constructor === Object) {
                        result.PDate = result.Date;
                        result.PostID = req.body.PostID;
                        delete result.Date;
                        return callback(null, result);
                    }
                    return callback(error, result);
                });
            }, function(result, callback) {
                db.doReportsOperation("USER_GETCOMMENTSBYCOUNTANDTIMESTAMP", {
                    Count : 2,
                    PostID : req.body.PostID,
                    Timestamp : new Date()
                }, function(error, comments){
                    if(error === null) {
                        result.Comments = comments;
                        return callback(null, result);
                    }
                    return callback(error, comments);
                });
            }, function(result, callback) {
                db.doReportsOperation("USER_GETPOPULARPOSTSBYCOUNT", {
                    Count : 5
                }, function(error, resul) {
                    if (error === null) {
                        result.Posts = resul;
                        return callback(null, result);
                    }
                    return callback(error, resul);
                });
            } ], function(error, result) {
        if (error === null) {
            logger.info("GetPageTransacterRead - done...");
            return res.render("posttemplate", result);
        }
        logger.error("GetPageTransacterRead - ERROR (:~ ");
        throw (new Error(error));
    });
};
module.exports = GetPageTransacter;