'use strict'

var g = require('co-express')

/**
 * Models
 */
var Politician = require('../models/politician')
    , Party    = require('../models/party')
    , Tweet    = require('../models/tweet')

/**
 * Generates the politician route
 * @param express.Router router
 */
var politician = (router) => {

    router.route('/politician')
        .get(g(getAll))
        .post(g(create))

    router.route('/politician/:id')
        .get(g(get))

    router.route('/politician/:id/tweet')
        .get(g(getTweets))
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
 * Creates a new politician
 */
var create = function* (req, res, next) {
    res.send('Create Politician')
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
