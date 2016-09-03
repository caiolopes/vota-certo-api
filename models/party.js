'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')
    , sequelize = require('../config/database')().sequelize

/**
 * The party model
 */
var Party = sequelize.define('party', {
    name     : { type : Sequelize.STRING },
    picture  : { type : Sequelize.STRING },
    initials : { type : Sequelize.STRING }
})

/**
 * The party attributes
 */
Party.attr = {
    /* all */
}

/**
 * Expose models/party
 */
exports = module.exports = Party
