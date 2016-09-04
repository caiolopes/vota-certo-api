'use strict'

var Twitter = require('twitter')
 
var client = new Twitter({
    consumer_key: process.env.TWT_CONSUMER_KEY,
    consumer_secret: process.env.TWT_CONSUMER_SECRET,
    bearer_token: process.env.TWT_BEARER
});

/**
 * Expose misc/twitter
 */
exports = module.exports = (id) => {
    return new Promise(function(resolve, reject) {
        client.get('statuses/show/' + id, {}, function(error, tweets, response) {
            if (!error) {
                resolve(tweets)
            } else {
                reject(error)
            }
        })
    })
}
