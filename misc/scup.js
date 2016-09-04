'use strict'

var Request = require('request')
    , md5 = require('md5')

/**
 * Expose misc/scup
 */
exports = module.exports = () => {
    return new Promise(function(resolve, reject) {
        var time = Math.floor(Date.now() / 1000)
        var signature = md5(time + process.env.SCUP_PRIVATE_KEY)

        Request(`http://api.scup.com/1.1/mentions/128991/\
?publickey=${process.env.SCUP_PUBLIC_KEY}\
&time=${time}\
&signature=${signature}\
&tags_ids=1345018\
&page=3`, function(err, response, body) {
            if (!err) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}
