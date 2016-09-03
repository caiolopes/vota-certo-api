'use strict'

var errors = {
    '100' : 'Unknown error',
    '101' : 'Query cannot be empty',
    '107' : 'Access denied (token might be expired)',
    '108' : 'Facebook token denied',
    '111' : 'A given parameter is too short',
    '112' : 'Missing required parameters',
    '113' : 'Access denied (needs higher level)',
    '120' : 'User not found',
    '121' : 'Password is incorrect',
    '122' : 'Email address already exists',
    '123' : 'Politician not found',

    /**
    * Helpers
    */
    UNKNOWN_ERROR         : 100,
    QUERY_IS_EMPTY        : 101,
    ACCESS_DENIED         : 107,
    FB_TOKEN_DENIED       : 108,
    PARAM_TOO_SHORT       : 111,
    MISSING_PARAMS        : 112,
    NOT_ENOUGH_PERMISSION : 113,
    USER_NOT_FOUND        : 120,
    PASSWORD_INCORRECT    : 121,
    EMAIL_ALREADY_EXISTS  : 122,
    POLITICIAN_NOT_FOUND  : 123
}

/**
 * Expose misc/erros
 *
 * It modifies the response when an error is found.
 *
 * @param res The response handler.
 * @param code The intern error code.
 * @param status The HTTP/1.1 response code.
 */
exports = module.exports = (req, res, next) => {

    res.err = (code, status) => {
        var description = '[ \'#' + code + '\', \''

        description += errors[code] + '\' ]'

        res.writeHead(status, description, {'content-type' : 'text/plain'})
        res.end()
    }

    res.errs = errors

    next()
}
