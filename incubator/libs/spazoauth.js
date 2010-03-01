/**
 * OAuth library for Spaz
 * This library wraps the library found at http://oauth.googlecode.com/
 *
 * @param {object} (service string)
 */
function SpazOAuth(args) {

	this.services = {};
	this.requestToken = null;
	this.accessToken = null;
	this.accessTokenSecret = null;

	this.initServices();
	this.setService(args.service);

};

/**
 * Initialize OAuth services that Spaz can use
 */
SpazOAuth.prototype.initServices = function() {
	this.addService('twitter', {
		signatureMethod      : 'HMAC-SHA1',
		consumerKey          : 'jZZNzafe1ixepaFWrnkBg',
		consumerSecret       : '6z2zO3oEUJg4bxOmnNt19KTcK457tiE0KTbDNaJfY',
		requestTokenUrl      : 'https://twitter.com/oauth/request_token',
		accessTokenUrl       : 'https://twitter.com/oauth/access_token',
		userAuthorizationUrl : 'https://twitter.com/oauth/authorize'
	});
};

/**
 * Adds a new OAuth service
 * @param {string} serviceName
 * @param {object} opts (signatureMethod string, consumerKey string, consumerSecret string, requestTokenUrl string, accessTokenUrl string, userAuthorizationUrl string)
 */
SpazOAuth.prototype.addService = function(serviceName, opts) {

	var service = {};
	service.name                 = serviceName;
	service.signatureMethod      = opts.signatureMethod;
	service.consumerKey          = opts.consumerKey;
	service.consumerSecret       = opts.consumerSecret;
	service.requestTokenUrl      = opts.requestTokenUrl;
	service.accessTokenUrl       = opts.accessTokenUrl;
	service.userAuthorizationUrl = opts.userAuthorizationUrl;

	this.services[serviceName] = service;

};

/**
 * Sets the service currently being used by Spaz
 * @param {string} serviceName
 */
SpazOAuth.prototype.setService = function(serviceName) {
	this.service = serviceName;
};

/**
 * Returns the service set on object instantiation
 */
SpazOAuth.prototype.getService = function() {
	return this.services[this.service];
};

/**
 * Gets the request token
 */
SpazOAuth.prototype.getRequestToken = function() {

	var success = false;
	var requestToken = null;
	var userAuthorizationUrl = this.getService().userAuthorizationUrl;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().requestTokenUrl
	});

	$.ajax({
		async: false,
		type: method,
		url: this.getService().requestTokenUrl,
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		},
		complete: function(req, textStatus) {
			if (req.status == 200) {
				var results = OAuth.decodeForm(req.responseText);
				requestToken = OAuth.getParameter(results, 'oauth_token');

				// Open another browser window to allow the user to authorize
				// service access to Spaz and retrieve the authorization PIN
				sc.helpers.openInBrowser(OAuth.addToURL(
					userAuthorizationUrl,
					{oauth_token : requestToken}
				));

				success = true;
			}
		},
	});

	if (success) {
		this.requestToken = requestToken;
	}

	return success;

};

/**
 * Authorize the user with the service and store the access token locally
 * @param {string} accessPIN
 */
SpazOAuth.prototype.getAuthorization = function(accessPIN) {

	if (!accessPIN || !this.requestToken) {
		return false;
	}

	var success = false;
	var accessToken = null;
	var accessTokenSecret = null;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().accessTokenUrl,
		parameters: [
			['oauth_verifier', accessPIN],
			['oauth_token', this.requestToken]
		]
	});

	$.ajax({
		async: false,
		type: method,
		url: this.getService().accessTokenUrl,
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		},
		complete: function(req, textStatus) {
			if (req.status == 200) {
				var results = OAuth.decodeForm(req.responseText);
				accessToken = OAuth.getParameter(results, 'oauth_token');
				accessTokenSecret = OAuth.getParameter(results, 'oauth_token_secret');

				success = true;
			}
		},
	});

	if (success) {
		this.accessToken = accessToken;
		this.accessTokenSecret = accessTokenSecret;
	}

	return success;
};

/**
 * Returns the value of the HTTP authorization header to use for the request
 * @param {array} params The OAuth params to use when creating the auth header
 * @param {array} options Must include method and url, optionally parameters
 */
SpazOAuth.prototype.getAuthHeader = function(options) {

	if (!options.method || !options.url) {
		return false;
	}

	if (!options.parameters) {
		options.parameters = [];
	}

	var message = {
		method: options.method,
		action: options.url,
		parameters: options.parameters
	};

	OAuth.completeRequest(message, {
		consumerKey: this.getService().consumerKey,
		consumerSecret: this.getService().consumerSecret,
		token: this.accessToken,
		tokenSecret: this.accessTokenSecret
	});

	var authHeader = OAuth.getAuthorizationHeader(
		this.getService().name,
		message.parameters
	);

	return authHeader;
};

