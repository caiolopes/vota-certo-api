'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')
    , sequelize = require('../config/database')().sequelize

/* Import models */
var User = require('./user.js')
	, Tweet = require('./tweet.js')
	, Politician = require('./politician.js')

/**
 * The analysis model
 */
var Analysis = sequelize.define('analysis', {
    sentiment : { type : Sequelize.ENUM('positive', 'negative', 'neutral') }
})

/* Associates Analysis with User */
Analysis.belongsTo(User)

/* Associates Analysis with Tweet */
Analysis.belongsTo(Tweet)

/* Associates Analysis with Politician */
Analysis.belongsTo(Politician)

/**
 * The analysis attributes
 */
Analysis.attr = {
    /* all */
}

/**
 * Expose models/analysis
 */
exports = module.exports = Analysis
