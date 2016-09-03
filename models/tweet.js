'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')
    , sequelize = require('../config/database')().sequelize

/* Import models */
var Politician = require('./politician.js')

/**
 * The tweet model
 */
var Tweet = sequelize.define('tweet', {
    name     : { type : Sequelize.STRING },
    username : { type : Sequelize.STRING },
    picture  : { type : Sequelize.STRING },
    text     : { type : Sequelize.STRING }
})

/* Associates Tweet with Politician */
Tweet.belongsTo(Politician)

/**
 * The tweet attributes
 */
Tweet.attr = {
    /* all */
}

/**
 * Expose models/tweet
 */
exports = module.exports = Tweet
