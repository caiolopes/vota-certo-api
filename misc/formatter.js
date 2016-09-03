'use strict'

var isArray = require('./is-array')

/**
 * Expose misc/format
 */
exports = module.exports = (req, res, next) => {

    res.spit = (data, array) => {
        var spittle = array ? (isArray(data) ? data : [data]) : data

        res.status(200).send(spittle)
    }

    next()
}
