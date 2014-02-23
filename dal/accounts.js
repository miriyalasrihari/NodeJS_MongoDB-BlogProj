'use strict';

var dalutils = require('./dalutils');
var CONSTANT_STRING = "MRIYJLSHKN";

function Accounts() {

}

var savePost = function savePost(attributes, callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance;
    reqAttrs = [ 'Title', 'Author', 'Post' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    dalutils.GenerateUniqueID(function(error, uuid) {
        if (error === null) {
            var i = 0;
            attributes.PostID = "";
            for (i; i < uuid.length; i++) {
                if (isNaN(uuid[i]) === false) {
                    attributes.PostID += CONSTANT_STRING[uuid[i]];
                } else {
                    attributes.PostID += uuid[i];
                }
            }
            attributes.ShortPost = (attributes.Post).substring(0, 200);
            attributes.TotalComments = 0;
            db.posts.insert(attributes, function(error, result) {
                if (error === null) {
                    return callback(null, true);
                }
                return callback(error, false);
            });
        } else {
            return callback(error, false);
        }
    });
};

var getPostByPostID = function getPostByPostID(attributes, callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance;
    reqAttrs = [ 'PostID' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    db.posts.findOne(attributes, {
        _id : 0,
        Comments : 0
    }, function(error, result) {
        if (error === null) {
            return callback(null, result);
        }
        return callback(error, false);
    });
};

var saveComment = function saveComment(attributes, callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance;
    reqAttrs = [ 'PostID', 'Comment', 'Author', 'Date' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    db.posts.findAndModify({
        query : {
            PostID : attributes.PostID
        },
        update : {
            $push : {
                Comments : {
                    Author : attributes.Author,
                    Comment : attributes.Comment,
                    Date : attributes.Date,
                    Email : attributes.Email
                }
            },
            $inc : {
                TotalComments : 1
            }
        }
    }, function(error, result) {
        if (error === null) {
            return callback(null, {
                Comment : attributes.Comment,
                Author : attributes.Author,
                Date : attributes.Date
            });
        }
        return callback(error, false);
    });
};

var likeaPost = function likeaPost(attributes, callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance, val = 0;
    reqAttrs = [ 'PostID', 'Like' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    if (attributes.Like === true || attributes.Like === 'true') {
        val = 1;
    } else {
        val = -1;
    }
    db.posts.findAndModify({
        query : {
            PostID : attributes.PostID
        },
        update : {
            $inc : {
                Likes : val
            }
        },
        'new' : true
    }, function(error, result) {
        if (error === null) {
            return callback(null, result.Likes);
        }
        return callback(error, false);
    });
};

Accounts.prototype.SavePost = savePost;
Accounts.prototype.GetPostByID = getPostByPostID;
Accounts.prototype.SaveComment = saveComment;
Accounts.prototype.LikeaPost = likeaPost;

module.exports = Accounts;