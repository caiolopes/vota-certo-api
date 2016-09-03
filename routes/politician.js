'use strict'

var g = require('co-express')
    , google = require('googleapis')

/**
 * Models
 */
var Politician = require('../models/politician')

/**
 * Generates the politician route
 * @param express.Router router
 */
var politician = (router) => {

    router.route('/politician')
        .get(getAll)
        .post(create)

    router.route('/politician/:id')
        .get(get)
        .put(update)

}

/**
 * Routes for '/politician'
 */

/**
 * Returns all politicians
 */
var getAll = g(function* (req, res, next) {
    var politicians = yield Politician.findAll({
        attributes : Politician.attr
    })

    res.spit(politicians)
})

/**
 * Creates a new politician
 */
var create = g(function* (req, res, next) {
    res.send('Create Politician')
})

/**
 * Routes for '/politician/:id'
 */

/**
 * Returns a single politician
 * @attr id
 */
var get = g(function* (req, res, next) {
    var id = req.params.id

    var politician = yield Politician.findOne({
        attributes : Politician.attr,
        where      : { id : id }
    })

    if (politician == null) {
        res.err(res.errs.POLITICIAN_NOT_FOUND, 404)
    } else {
        res.spit(politician)
    }
})

/**
 * Expose routes/politician
 */
exports = module.exports = politician