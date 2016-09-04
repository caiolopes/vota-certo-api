
'use strict'

var g = require('co-express')
    , crypto = require('crypto')
    , moment = require('moment')
    , Twitter = require('../misc/twitter')
    , Scup = require('../misc/scup')
    , Sequelize = require('sequelize')

/**
 * Models
 */
var Tweet        = require('../models/tweet')
    , User       = require('../models/user')
    , Politician = require('../models/politician')

/**
 * Generates the tweet route
 * @param express.Router router
 */
var tweet = (router) => {

    router.route('/tweet')
        .get(g(User.authenticator), g(getRandomTweets))

    router.route('/tweet/seed')
        .get(g(User.authenticator), g(seed), g(getRandomTweets))

}

var replaceData = function(politician, tweet) {
    politician = politician.toLowerCase()

    if (politician.indexOf('haddad') != -1) {
        tweet.politicianId = 2
    } else if (politician.indexOf('joão') != -1) {
        tweet.politicianId = 1
    } else if (politician.indexOf('celso') != -1) {
        tweet.politicianId = 3
    } else if (politician.indexOf('luiza') != -1) {
        tweet.politicianId = 4
    } else if (politician.indexOf('marta') != -1) {
        tweet.politicianId = 5
    } else {
        tweet.politicianId = 6
    }

    var text = tweet.text

    text = text.replace(/Fernando/ig, '[...]')
    text = text.replace(/Haddad/ig, '[...]')
    text = text.replace(/Marta/ig, '[...]')
    text = text.replace(/Martha/ig, '[...]')
    text = text.replace(/Suplicy/ig, '[...]')
    text = text.replace(/Luiza/ig, '[...]')
    text = text.replace(/Erundina/ig, '[...]')
    text = text.replace(/Major/ig, '[...]')
    text = text.replace(/Olimpio/ig, '[...]')
    text = text.replace(/Olímpio/ig, '[...]')
    text = text.replace(/João/ig, '[...]')
    text = text.replace(/Doria/ig, '[...]')
    text = text.replace(/Celso/ig, '[...]')
    text = text.replace(/Russomanno/ig, '[...]')
    text = text.replace(/Russomano/ig, '[...]')
    text = text.replace(/PT/ig, '[...]')
    text = text.replace(/PSDB/ig, '[...]')
    text = text.replace(/PMDB/ig, '[...]')
    text = text.replace(/PSOL/ig, '[...]')
    text = text.replace(/PRB/ig, '[...]')

    tweet.text = text

    return tweet
}

/**
 * Seed the content on database
 */
var seed = function* (req, res, next) {

    var tweets = yield Scup()

    for (var i in tweets.data) {
        var id = tweets.data[i].mention.content.permalink
        id = id.substr(id.lastIndexOf('/') + 1)
        var tweet = yield Twitter(id)

        tweet = replaceData(
            tweets.data[i].search.query,
            tweet
        )

        yield Tweet.create({
            name         : tweet.user.name,
            username     : tweet.user.screen_name,
            picture      : tweet.user.profile_image_url,
            text         : tweet.text,
            politicianId : tweet.politicianId
        })
    }

    next()

}

/**
 * Returns all random tweets
 * @attr id
 */
var getRandomTweets = function* (req, res, next) {
    var tweets = yield Tweet.findAll({
        attributes : Tweet.attr,
        where : {
            id : {
                $notIn : Sequelize.literal(`\
                    (SELECT tweetId FROM analyses WHERE userId = ${req.user.id})\
                `)
            }
        },
        order: [
            [ Sequelize.fn( 'RAND' ) ]
        ]
    })

    res.spit(tweets, true)
}

/**
 * Expose routes/tweet
 */
exports = module.exports = tweet
