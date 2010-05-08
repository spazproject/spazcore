/**
 * A library for performing authentication.
 * Currently supports both Basic and oAuth.
 */

var SPAZAUTH_SERVICES = {
    'twitter': {
        authType: 'oauth',
        consumerKey: 't94eBtc4Pz2zqo4KhABseQ',
        consumerSecret: 'PMEkuk4xQpQMY7HqpHZqddzg9TYr4MyJxd8kujivE',
        accessURL: 'https://twitter.com/oauth/access_token'
    },
    'identica': {
        authType: 'basic'
    }
};

/**
 * Construct a new authentication object.
 *
 * @param {string} service name of the service to authenticate (ex: twitter, identica)
 * @class SpazAuth
 */
function SpazAuth(service) {
    var serviceInfo = SPAZAUTH_SERVICES[service];
    if (serviceInfo == undefined) {
        sch.error("Invalid authentication service: " + service);
        return;
    }

    switch (serviceInfo.authType) {
        case 'oauth':
            return new SpazOAuth(service, serviceInfo);
        case 'basic':
            return new SpazBasicAuth();
    }
};

/**
 * Construct a new OAuth authentication object.
 *
 * @param {string} realm
 * @param {object} options
 * @class SpazOAuth
 */
function SpazOAuth(realm, options) {
    this.realm = realm;
    this.opts = options;
}

/**
 * Authorize access to the service by fetching an OAuth access token.
 *
 * @param {string} username
 * @param {string} password
 * @returns {boolean} true if authorization successful, otherwise false
 * @class SpazOAuth
 */
SpazOAuth.prototype.authorize = function(username, password) {
    // Fill in xAuth parameters
    var parameters = {
        'x_auth_username': username,
        'x_auth_password': password,
        'x_auth_mode': 'client_auth'
    };

    // Sign the request
    OAuth.completeRequest({
        method: 'post',
        action: this.opts.accessURL,
        parameters: parameters
    }, this.opts);

    // Perform request to fetch access token
    var accessToken = null;
    jQuery.ajax({
        async: false,
        type: 'post',
        url: this.opts.accessURL,
        data: parameters,
        success: function(data, textStatus) {
            var results = OAuth.decodeForm(data);
            accessToken = {};
            accessToken.key = OAuth.getParameter(results, 'oauth_token');
            accessToken.secret = OAuth.getParameter(results, 'oauth_token_secret');
        },
        error: function(req, textStatus, error) {
            sch.error("Failed to fetch oAuth access token: " + req.responseText);
        }
    });

    if (accessToken != null) {
        this.accessToken = accessToken;
        this.signingCredentials = {
            consumerKey: this.opts.consumerKey,
            consumerSecret: this.opts.consumerSecret,
            token: accessToken.key,
            tokenSecret: accessToken.secret
        };
        return true;
    } else {
        return false;
    }
}

/**
 * Sign a HTTP request
 *
 * If parameters is provided, it will be filled with the oauth_* values.
 * You do not need to then include the Authorziation header if you include
 * those parameters in the body of the request.
 *
 * @param {string} method HTTP method of the request
 * @param {string} url the URL of the request
 * @param {object} parameters map of all parameters in the request
 * @returns {string} Authorization header value
 * @class SpazOAuth
 */
SpazOAuth.prototype.signRequest = function(method, url, parameters) {
    OAuth.completeRequest({
        method: method,
        action: url,
        parameters: parameters
    }, this.signingCredentials);

    return OAuth.getAuthorizationHeader(this.realm, parameters);
}
