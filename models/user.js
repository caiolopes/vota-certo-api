'use strict'

var g = require('co-express')
    , Sequelize = require('sequelize')
    , sequelize = require('../config/database')().sequelize

/**
 * The user model
 */
var User = sequelize.define('user', {
    name       : { type : Sequelize.STRING },
    email      : { type : Sequelize.STRING },
    picture    : { type : Sequelize.STRING },
    facebookId : { type : Sequelize.STRING }
})

/**
 * The user token model
 */
var UserToken = sequelize.define('userToken', {
  userId      : { type : Sequelize.INTEGER },
  accessToken : { type : Sequelize.STRING  }
})

/**
 * Creates the relationship
 */
User.hasMany(UserToken)

/**
 * Creates the relationship
 */
UserToken.belongsTo(User)

/**
 * The user attributes
 */
User.attr = {
    /* all */
}

/**
 * The userToken attributes
 */
UserToken.attr = {
    /* all */
}

// Associates UserToken with User
User.Token = UserToken

/**
 * Associates an authenticator
 */
User.authenticator = function* (req, res, next) {

    let accessToken = req.query.access_token || null

    var userToken = yield UserToken.findOne({
        attributes : User.Token.attr,
        include    : [{
            model      : User,
            attributes : User.attr
        }],
        where : {
            accessToken : accessToken
        }
    })

    if (userToken == null) {
        res.err(res.errs.ACCESS_DENIED, 401)
    } else {
        req.user = userToken.dataValues.user

        next()
    }
  
}

/**
 * Expose models/user
 */
exports = module.exports = User
