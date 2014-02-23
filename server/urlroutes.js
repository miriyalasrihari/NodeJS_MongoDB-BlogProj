'use strict';

var validator = require('../validator');
var enforcer = require('../enforcer');
var transacter = require('../transacter');

// TODO: Framework change for get posts by ID ex: /post/:id
// TODO: Error Handling
// TODO: Role Based
// TODO: Field Validation
var urlroutes = {
    '/' : {
        Validator : validator.HomePageValidator,
        Enforcer : enforcer.HomePageEnforcer,
        Transacter : transacter.HomePageTransacter
    },
    '/postcontent' : {
        Validator : validator.PostContentValidator,
        Enforcer : enforcer.PostContentEnforcer,
        Transacter : transacter.PostContentTransacter
    },
    '/post/' : {
        Validator : validator.GetPageValidator,
        Enforcer : enforcer.GetPageEnforcer,
        Transacter : transacter.GetPageTransacter
    },
    '/like' : {
        Validator : validator.LikePageValidator,
        Enforcer : enforcer.LikePageEnforcer,
        Transacter : transacter.LikePageTransacter
    },
    '/comments' : {
        Validator : validator.CommentPageValidator,
        Enforcer : enforcer.CommentPageEnforcer,
        Transacter : transacter.CommentPageTransacter
    }
};

exports.URLRoutes = urlroutes;