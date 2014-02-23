'use strict';

var Accounts = require('./accounts');
var Reports = require('./reports');
function Dal() {

}

var doUserAccountsOperation = function doUserAccountsOperation(type,
    attributes, callback) {
    var accounts = new Accounts();

    switch (type.toUpperCase()) {
    case 'USER_SAVEPOST':
        accounts.SavePost(attributes, callback);
        break;
    case 'USER_GETPOSTBYID':
        accounts.GetPostByID(attributes, callback);
        break;
    case 'USER_SAVECOMMENT':
        accounts.SaveComment(attributes, callback);
        break;
    case 'USER_LIKEAPOST':
        accounts.LikeaPost(attributes, callback);
        break;
    default:
        break;
    }
};

var doUserReportsOperation = function doUserReportsOperation(type, attributes,
    callback) {
    var reports = new Reports();

    switch (type.toUpperCase()) {
    case 'USER_GETPOPULARPOSTSBYCOUNT':
        reports.GetPopularPostsByCount(attributes, callback);
        break;
    case 'USER_GETPOSTSBYCOUNT':
        reports.GetPostsByCount(attributes, callback);
        break;
    case 'USER_GETCOMMENTSBYCOUNTANDTIMESTAMP':
        reports.GetPostsByCountAndTime(attributes, callback);
        break;
    default:
        break;
    }
};
var doAccountsOperation = function doAccountsOperation(type, attributes,
    callback) {
    var user = type.split("_");
    switch (user[0].toUpperCase()) {
    case 'USER':
        doUserAccountsOperation(type, attributes, callback);
        break;

    default:
        callback(new Error('Invalid Operation'), false);
        break;
    }
};

var doReportsOperation = function doReportsOperation(type, attributes, callback) {
    var user = type.split("_");
    switch (user[0].toUpperCase()) {
    case 'USER':
        doUserReportsOperation(type, attributes, callback);
        break;

    default:
        callback(new Error('Invalid Operation'), false);
        break;
    }
};

Dal.prototype.doAccountsOperation = doAccountsOperation;
Dal.prototype.doReportsOperation = doReportsOperation;
module.exports = Dal;