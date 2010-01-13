/**
 * OAuth library for Spaz
 * This library wraps the library found at http://oauth.googlecode.com/
 *
 * @param {object} (service string)
 */
function SpazOAuthConsumer(args) {

	this.services = {};

	this.initServices();
	this.setService(args.service);

};

/**
 * Initialize OAuth services that Spaz can use
 */
SpazOAuthConsumer.prototype.initServices = function() {
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
 * @param {string} service_name
 * @param {object} opts (signatureMethod string, consumerKey string, consumerSecret string, requestTokenUrl string, accessTokenUrl string, userAuthorizationUrl string)
 */
SpazOAuthConsumer.prototype.addService = function(service_name, opts) {

	var service = {};
	service.name                 = service_name;
	service.signatureMethod      = opts.signatureMethod;
	service.consumerKey          = opts.consumerKey;
	service.consumerSecret       = opts.consumerSecret;
	service.requestTokenUrl      = opts.requestTokenUrl;
	service.accessTokenUrl       = opts.accessTokenUrl;
	service.userAuthorizationUrl = opts.userAuthorizationUrl;

	this.services[service_name] = service;

};

/**
 * Sets the service currently being used by Spaz
 * @param {string} service_name
 */
SpazOAuthConsumer.prototype.setService = function(service_name) {
	this.service = service_name;
};

/**
 * Returns the service set on object instantiation
 */
SpazOAuthConsumer.prototype.getService = function() {
	return this.services[this.service];
};

