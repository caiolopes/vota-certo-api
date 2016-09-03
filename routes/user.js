'use strict'

var g = require('co-express')
    , fbSDK = require('../misc/facebook-auth')

/**
 * Models
 */
var User = require('../models/user')

/**
 * Generates the user route
 * @param express.Router router
 */
var user = (router) => {

    router.route('/user')
        .get(User.authenticator, getAll)

    router.route('/user/auth')
        .post(fbAuth)

    router.route('/user/:id')
        .get(User.authenticator, get)
}

/**
 * Returns all users
 */
var getAll = g(function* (req, res, next) {
    var users = yield User.findAll({
        attributes : User.attr
    })

    res.spit(users)
})

/**
 * Routes for '/user/:id'
 */

/**
 * Returns a single user
 * @attr id
 */
var get = g(function* (req, res, next) {
    var id = req.params.id

    if (id == 'me') {
        id = req.user.id
    }

    var user = yield User.findOne({
        attributes : User.attr,
        where      : { id : id }
    })

    if (user == null) {
        res.err(res.errs.USER_NOT_FOUND, 404)
    } else {
        res.spit(user)
    }
})

/**
 * Authenticates an user from its FB token
 * @post fb_token The facebook token
 */
var fbAuth = g(function* (req, res, next) {
    if (!req.body.fb_token) {
        res.err(res.errors.MISSING_PARAMS, 400)
        return
    }

    let fbToken = req.body.fb_token

    // Gets the user from facebook
    var fbUser = yield fbSDK(fbToken)

    if (fbUser.error) {
        res.err(res.errors.FB_TOKEN_DENIED, 401)
    } else {

        // Finds the user on database
        var user = yield User.findOne({
            attributes : User.attr,
            where : {
                facebookId : fbUser.id
            }
        })

        if (user == null) {
            // Finds the user on database
            var user = yield User.findOne({
                attributes : User.attr,
                where : {
                    email : fbUser.email
                }
            })

            if (user == null) {
                // Creates user if not exists
                user = (yield User.create({
                    name       : fbUser.name,
                    email      : fbUser.email,
                    facebookId : fbUser.id,
                    picture    : fbUser.picture.data.url
                })).dataValues

            } else {
                user.name = fbUser.name
                user.email = fbUser.email
                user.picture = fbUser.picture.data.url
                user.facebookId = fbUser.id

                yield user.save()
            }

        } else {
            user.name = fbUser.name
            user.email = fbUser.email
            user.picture = fbUser.picture.data.url

            yield user.save()
        }

        let accessToken = crypto.createHash('sha512')
        accessToken.update(fbToken)
        accessToken.update(moment().format())

        // Creates a token for session
        var userToken = (yield User.Token.create({
            userId      : user.id,
            accessToken : accessToken.digest('base64')
        })).dataValues

        user = user.dataValues
        user.accessToken = userToken.accessToken

        res.spit(user)
    }
})

/**
 * Expose routes/user
 */
exports = module.exports = user
