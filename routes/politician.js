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
    , Analysis = require('../models/analysis')

/**
 * Generates the politician route
 * @param express.Router router
 */
var politician = (router) => {

    router.route('/politician')
        .get(g(User.authenticator), g(getAll))

    router.route('/politician/me')
        .get(g(User.authenticator), g(getAnalysis))

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
 * Returns all analysis
 * @attr id
 */
var getAnalysis = function* (req, res, next) {
    var id = req.params.id

    var analyses = yield Analysis.findAll({
        attributes : Politician.attr,
        where      : { userId : req.user.id },
        include    : [{
            model      : Politician,
            attributes : Politician.attr,
            include: [ Party ]
        }]
    })

    if (analyses.length < 30) {
        res.spit(null, true)
        return
    }

    var politicians = []

    for (var i in analyses) {
        let found = -1

        for (var j in politicians) {
            if (politicians[j].politician.id == analyses[i].politician.id) {
                found = j
                break
            }
        }

        if (found == -1) {
            politicians.push({
                politician : analyses[i].politician,
                positive   : 0,
                negative   : 0,
                neutral    : 0
            })

            found = politicians.length - 1
        }

        politicians[found][analyses[i].sentiment] ++
    }

    politicians.sort(
        function(a, b) {
            var aP = (a.positive * 100) / (a.positive + a.negative)
            var bP = (b.positive * 100) / (b.positive + b.negative)

            return bP - aP
        }
    )

    res.spit(politicians, true)
}

/**
 * Expose routes/politician
 */
exports = module.exports = politician
