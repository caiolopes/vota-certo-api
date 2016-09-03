'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')

/**
 * Models
 */
var Politician = require('../models/politician')
    , User     = require('../models/user')
    , Party    = require('../models/party')
    , Tweet    = require('../models/tweet')

/**
 * Generates the politician route
 * @param express.Router router
 */
var politician = (router) => {

    router.route('/politician')
        .get(g(User.authenticator), g(getAll))

    router.route('/politician/tweet')
        .get(g(User.authenticator), g(getRandomTweets))

    router.route('/politician/:id')
        .get(g(User.authenticator), g(get))

    router.route('/politician/:id/tweet')
        .get(g(User.authenticator), g(getTweets))
}

/**
 * Routes for '/politician'
 */

/**
 * Returns all politicians
 */
var getAll = function* (req, res, next) {
    var politicians = yield Politician.findAll({
        attributes : Politician.attr,
        include    : [{
            model      : Party,
            attributes : Party.attr
        }]
    })

    res.spit(politicians)
}

/**
 * Routes for '/politician/tweet'
 */

/**
 * Returns all random tweets
 * @attr id
 */
var getRandomTweets = function* (req, res, next) {
    var tweets = yield Tweet.find({
        attributes : Tweet.attr,
        where : {
            id : {
                $notIn : Sequelize.literal(`\
                    (SELECT tweetId FROM analyses WHERE userId = ${req.user.id})\
                `)
            }
        },
        order: [
            [ Sequelize.fn('RAND', '') ]
        ]
    })

    res.spit(tweets, true)
}

/**
 * Routes for '/politician/:id'
 */

/**
 * Returns a single politician
 * @attr id
 */
var get = function* (req, res, next) {
    var id = req.params.id

    var politician = yield Politician.findOne({
        attributes : Politician.attr,
        where      : { id : id },
        include    : [{
            model      : Party,
            attributes : Party.attr
        }]
    })

    if (politician == null) {
        res.err(res.errs.POLITICIAN_NOT_FOUND, 404)
    } else {
        res.spit(politician)
    }
}

/**
 * Routes for '/politician/:id/tweet'
 */

/**
 * Returns all tweets related to that politician
 * @attr id
 */
var getTweets = function* (req, res, next) {
    var id = req.params.id

    var politician = yield Politician.findOne({
        attributes : Politician.attr,
        where      : { id : id }
    })

    if (politician == null) {
        res.err(res.errs.POLITICIAN_NOT_FOUND, 404)
        return
    }

    var tweets = yield Tweet.find({
        attributes : Tweet.attr,
        where      : { politicianId : id }
    })

    res.spit(tweets, true)
}

/**
 * Expose routes/politician
 */
exports = module.exports = politician
