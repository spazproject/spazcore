/**
 * A library for performing authentication.
 * Currently supports both Basic and oAuth.
 */
/**
 * @constant 
 */
var SPAZCORE_AUTHTYPE_BASIC  = 'basic';
/**
 * @constant 
 */
var SPAZCORE_AUTHTYPE_OAUTH  = 'oauth';

/**
 * @constant 
 */
var SPAZAUTH_SERVICES = {};

SPAZAUTH_SERVICES[SPAZCORE_ACCOUNT_STATUSNET] = {
	'authType': SPAZCORE_AUTHTYPE_BASIC
};
SPAZAUTH_SERVICES[SPAZCORE_ACCOUNT_TUMBLR_TWITTER] = {
	'authType': SPAZCORE_AUTHTYPE_BASIC
};
SPAZAUTH_SERVICES[SPAZCORE_ACCOUNT_WORDPRESS_TWITTER] = {
	'authType': SPAZCORE_AUTHTYPE_BASIC
};
SPAZAUTH_SERVICES[SPAZCORE_ACCOUNT_IDENTICA] = {
    'authType': SPAZCORE_AUTHTYPE_BASIC
};
SPAZAUTH_SERVICES[SPAZCORE_ACCOUNT_CUSTOM] = {
    'authType': SPAZCORE_AUTHTYPE_BASIC
};
SPAZAUTH_SERVICES['default'] = {
	'authType': SPAZCORE_AUTHTYPE_BASIC
};

/**
 * Construct a new authentication object.
 *
 * @param {string} service name of the service to authenticate (ex: twitter, identica)
 * @class SpazAuth
 * @constructor
 */
function SpazAuth(service) {
    var serviceInfo = SPAZAUTH_SERVICES[service];
    if (serviceInfo == undefined) {
        sch.error("Invalid authentication service: " + service);
        return null;
    }

    switch (serviceInfo.authType) {
        case SPAZCORE_AUTHTYPE_OAUTH:
            return new SpazOAuth(service, serviceInfo);
        case SPAZCORE_AUTHTYPE_BASIC:
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
 * @constructor
 */
function SpazBasicAuth() {
};

/**
 * Set username and password of account to access service.
 *
 * @param {string} username
 * @param {string} password
 * @param {function} [onComplete] a callback to fire when complete. Currently just passed TRUE all the time; for compatibility with oAuth need for callbacks
 * @return {Boolean} true. ALWAYS returns true!
 */
SpazBasicAuth.prototype.authorize = function(username, password, onComplete) {
    this.username = username;
    this.password = password;
    this.authHeader = "Basic " + sc.helpers.Base64.encode(username + ":" + password);
    
    if (onComplete) {
        onComplete.call(this, true);
    }
	return true;
};


/**
 * Returns the authentication header
 * @returns {string} Authentication header value
 */
SpazBasicAuth.prototype.signRequest = function() {
    return this.authHeader;
};

/**
  * Load basic auth credentials from a serialized string
  *
  * @param {string} pickle the serialized data string returned by save()
  * @returns {boolean} true if successfully loaded
  */
SpazBasicAuth.prototype.load = function(pickle) {
    var credentials = pickle.split(':', 2);
    if (credentials.length != 2) {
        sch.error("Invalid basic auth pickle: " + pickle);
        return false;
    }

    this.authorize(credentials[0], credentials[1]);
    return true;
};

/**
  * Save basic auth credentials into a serialized string
  *
  * @returns {string} serialized string
  */
SpazBasicAuth.prototype.save = function() {
    return this.username + ":" + this.password;
};


SpazBasicAuth.prototype.getUsername = function() {
	return this.username;
};

SpazBasicAuth.prototype.getPassword = function() {
	return this.password;
};


/**
 * Construct a new OAuth authentication object.
 *
 * @param {string} realm
 * @param {object} options
 * @class SpazOAuth
 * @constructor
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
 * @param {function} [onComplete] a callback to fire on complete. If this is set, the request is asynchronous
 * @returns {boolean} true if authorization successful, otherwise false
 */
SpazOAuth.prototype.authorize = function(username, password, onComplete) {
	
	var that = this;
	
	var async_mode = false;
	
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

	if (onComplete) {
		async_mode = true;
	}

    // Perform request to fetch access token
    var accessToken = null;
	jQuery.ajax({
		async: async_mode,
		type: 'post',
		url: this.opts.accessURL,
		data: parameters,
		dataType: 'text',
		success: function(data, textStatus, xhr) {

			sch.error(xhr);

			sch.error("xhr.responseText:" + xhr.responseText);
			sch.error("xhr.responseXML:" + xhr.responseXML);
			sch.error('getAllResponseHeaders:n' + xhr.getAllResponseHeaders());


			sch.error("OAuth Data return");
			sch.error(sch.enJSON(data));

			var results = OAuth.decodeForm(data);
			sch.error("results");
			sch.error(sch.enJSON(results));
			accessToken = {};
			accessToken.key = OAuth.getParameter(results, 'oauth_token');
			accessToken.secret = OAuth.getParameter(results, 'oauth_token_secret');
			
			that.setAccessToken(accessToken.key, accessToken.secret);
			
			if (onComplete) {
				onComplete.call(this, true, accessToken);
			}

		},
		error: function(req, textStatus, error) {
			sch.error("Failed to fetch oAuth access token: " + req.responseText);

			if (onComplete) {
				onComplete.call(this, false);
			}
			
		},
		complete: function(xhr, textStatus) {
			sch.error('COMPLETE:');
			sch.error("xhr.responseText:" + xhr.responseText);
			sch.error("xhr.responseXML:" + xhr.responseXML);
			sch.error('getAllResponseHeaders:n' + xhr.getAllResponseHeaders());

		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Accept-Encoding', 'none');

		}

	});
	
	if (async_mode !== true) {
		if (accessToken != null) {
			return true;
	    } else {
			return false;
		}
	} else {
		return null;
	}
	// var request = new Ajax.Request(this.opts.accessURL, {
	// 	'asynchronous':true,
	// 	'method':'post',
	// 	'parameters':parameters,
	// 	'onSuccess': function(xhr, foo) {
	// 		sch.error('onSuccess=====================================================');
	// 		var data = xhr.responseText;
	// 		sch.error('foo');
	// 		sch.error(foo);
	// 		sch.error(xhr);
	// 	
	// 		sch.error("xhr.responseText:"+xhr.responseText);
	// 		sch.error("xhr.responseXML:"+xhr.responseXML);
	// 		sch.error('getAllResponseHeaders:\n'+xhr.getAllResponseHeaders());		
	// 	
	// 		sch.error("OAuth Data return");
	// 		sch.error(data);
	// 	
	//             var results = OAuth.decodeForm(data);
	// 		sch.error("results");
	// 		sch.error(sch.enJSON(results));
	//             accessToken = {};
	//             accessToken.key = OAuth.getParameter(results, 'oauth_token');
	//             accessToken.secret = OAuth.getParameter(results, 'oauth_token_secret');
	// 		sch.error('==============================================================');
	// 		if (accessToken != null) {
	// 			that.setAccessToken(accessToken.key, accessToken.secret);
	// 			onComplete(true);
	// 	    } else {
	// 			onComplete(false);
	// 		}
	// 	},
	// 	'onFailure': function(xhr) {
	// 		sch.error('onFailure=====================================================');
	// 		sch.error("xhr.responseText:"+xhr.responseText);
	// 		sch.error('getAllResponseHeaders:\n'+xhr.getAllResponseHeaders());
	// 		sch.error('==============================================================');
	// 		onComplete(false);
	// 	}
	// });
};


/**
  * Set the access token
  *
  * @param {string} key
  * @param {string} secret
  */
SpazOAuth.prototype.setAccessToken = function(key, secret) {
    this.accessToken = {key: key, secret: secret};
    this.signingCredentials = {
        consumerKey: this.opts.consumerKey,
        consumerSecret: this.opts.consumerSecret,
        token: key,
        tokenSecret: secret
    };
};

/**
 * Sign a HTTP request and return oAuth header
 *
 * @param {string} method HTTP method of the request
 * @param {string} url the URL of the request
 * @param {object} parameters map of all parameters in the request
 * @returns {string} Authorization header value
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

/**
  * Load OAuth credentials from a serialized string
  *
  * @param {string} pickle the serialized string returned by save()
  * @returns {boolean} true if successfully loaded
  */
SpazOAuth.prototype.load = function(pickle) {
    var credentials = pickle.split(':', 3);
    if (credentials.length != 3) {
        sch.error("Invalid oauth pickle: " + pickle);
        return false;
    }

    this.username = credentials[0];
    this.setAccessToken(credentials[1], credentials[2]);
    return true;
};

/**
  * Save OAuth credentials to a serialized string
  *
  * @returns {string} serialized string
  */
SpazOAuth.prototype.save = function() {
    return this.username + ":" + this.accessToken.key + ":" + this.accessToken.secret;
};

