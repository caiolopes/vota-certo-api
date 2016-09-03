'use strict'

var isArray = require('./is-array')

/**
 * Expose misc/format
 */
exports = module.exports = (req, res, next) => {

    res.spit = (data, array) => {
        var spittle = data

        if (array) {
            var spittle = isArray(data) ? data : [data]

            if (data == null) spittle = []
        }

        res.status(200).send(spittle)
    }

    next()
}
