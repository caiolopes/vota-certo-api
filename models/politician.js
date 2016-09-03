'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')
    , sequelize = require('../config/database')().sequelize

/* Import models */
var Party = require('./party.js')

/**
 * The politician model
 */
var Politician = sequelize.define('politician', {
    name    : { type : Sequelize.STRING },
    picture : { type : Sequelize.STRING },
    office  : { type : Sequelize.STRING }
})

/* Associates Politician with Party */
Politician.belongsTo(Party)

/**
 * The politician attributes
 */
Politician.attr = {
    /* all */
}

/**
 * Expose models/politician
 */
exports = module.exports = Politician
