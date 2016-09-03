'use strict'

var g = require('co-express')
    , crypto = require('crypto')
    , moment = require('moment')
    , fbSDK = require('../misc/facebook-auth')

/**
 * Models
 */
var User = require('../models/user')
    , Tweet      = require('../models/tweet')
    , Analysis   = require('../models/analysis')
    , Politician = require('../models/politician')

/**
 * Generates the analysis route
 * @param express.Router router
 */
var analysis = (router) => {

    router.route('/analysis')
        .post(g(User.authenticator), g(create), g(get))
        .get(g(User.authenticator), g(getAll))

    router.route('/analysis/:id')
        .get(g(User.authenticator), g(get))
}

/**
 * Creates a new analysis
 * @post tweet_id The tweet id
 * @post sentiment The sentiment
 */
var create = function* (req, res, next) {
    if (!req.body.tweet_id ||
        !req.body.sentiment) {
        res.err(res.errs.MISSING_PARAMS, 400)
        return
    }

    let tweetId = req.body.tweet_id
    let sentiment = req.body.sentiment

    // Checks the sentiment
    var allowed = ['positive', 'negative', 'neutral']
    if (allowed.indexOf(sentiment) == -1) {
        res.err(res.errs.SENTIMENT_NOT_ALLOWED, 409)
        return
    }

    // Gets the tweet
    var tweet = yield Tweet.findOne({
        attributes : Tweet.attr,
        where : { id : tweetId }
    })

    if (tweet == null) {
        res.err(res.errs.TWEET_NOT_FOUND, 406)
    } else {
        // Creates an analysis
        var analysis = (yield Analysis.create({
            userId       : req.user.id,
            tweetId      : tweet.id,
            politicianId : tweet.politicianId,
            sentiment    : sentiment
        })).dataValues

        req.params.id = analysis.id
        
        next()
    }
}

/**
 * Returns all analyses
 */
var getAll = function* (req, res, next) {
    var analyses = yield Analysis.findAll({
        attributes : Analysis.attr,
        where      : { userId : req.user.id },
        include    : [{
            model      : Tweet,
            attributes : Tweet.attr
        }, {
            model      : Politician,
            attributes : Politician.attr
        }]
    })

    res.spit(analyses, true)
}

/**
 * Routes for '/analysis/:id'
 */

/**
 * Returns a single analysis
 * @attr id
 */
var get = function* (req, res, next) {
    var id = req.params.id

    var analysis = yield Analysis.findOne({
        attributes : Analysis.attr,
        where      : {
            userId : req.user.id,
            id : id
        },
        include    : [{
            model      : Tweet,
            attributes : Tweet.attr
        }, {
            model      : Politician,
            attributes : Politician.attr
        }]
    })

    if (analysis == null) {
        res.err(res.errs.USER_NOT_FOUND, 404)
    } else {
        res.spit(analysis)
    }
}

/**
 * Expose routes/analysis
 */
exports = module.exports = analysis
