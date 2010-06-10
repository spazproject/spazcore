/**
 * A library for performing authentication.
 * Currently supports both Basic and oAuth.
 */

var SPAZAUTH_SERVICES = {
    'statusnet': {
        authType: 'basic'
    },
    'identica': {
        authType: 'basic'
    },
    'default': {
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
        return null;
    }

    switch (serviceInfo.authType) {
        case 'oauth':
            return new SpazOAuth(service, serviceInfo);
        case 'basic':
            return new SpazBasicAuth();
        default:
            return new SpazBasicAuth();
    }
};

/**
 * use this to add services that aren't in by default (like, say, stuff with secrets)
 */
SpazAuth.addService = function(label, opts) {
    SPAZAUTH_SERVICES[label] = opts;
};



/**
 * Construct a new basic authentication object.
 *
 * @class SpazBasicAuth
 */
function SpazBasicAuth() {
};

/**
 * Set username and password of account to access service.
 *
 * @param {string} username
 * @param {string} password
 * @class SpazBasicAuth
 */
SpazBasicAuth.prototype.authorize = function(username, password) {
    this.username = username;
    this.authHeader = "Basic " + sc.helpers.Base64.encode(username + ":" + password);
};

/**
 * Returns the authentication header
 * @returns {string} Authentication header value
 * @class SpazBasicAuth
 */
SpazBasicAuth.prototype.signRequest = function() {
    return this.authHeader;
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
};

/**
 * Authorize access to the service by fetching an OAuth access token.
 *
 * @param {string} username
 * @param {string} password
 * @returns {boolean} true if authorization successful, otherwise false
 * @class SpazOAuth
 */
SpazOAuth.prototype.authorize = function(username, password) {
    this.username = username;

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
};

/**
 * Sign a HTTP request and return oAuth header
 *
 * @param {string} method HTTP method of the request
 * @param {string} url the URL of the request
 * @param {object} parameters map of all parameters in the request
 * @returns {string} Authorization header value
 * @class SpazOAuth
 */
SpazOAuth.prototype.signRequest = function(method, url, parameters) {
    // We need to copy parameters because OAuth.js modifies it.
    var param = jQuery.extend({}, parameters);

    OAuth.completeRequest({
        method: method,
        action: url,
        parameters: param
    }, this.signingCredentials);

    return OAuth.getAuthorizationHeader(this.realm, param);
};

