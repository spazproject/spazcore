/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc;

/**
 * A library to interact with Ping.FM 
 */

/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.pingfmGetUserKeySuccess		= 'pingfmGetUserKeySuccess';
sc.events.pingfmGetUserKeyFailure		= 'pingfmGetUserKeyFailure';
sc.events.pingfmValidateUserKeySuccess	= 'pingfmValidateUserKeySuccess';
sc.events.pingfmValidateUserKeyFailure	= 'pingfmValidateUserKeyFailure';
sc.events.pingfmGetServicesSuccess		= 'pingfmGetServicesSuccess';
sc.events.pingfmGetServicesFailure		= 'pingfmGetServicesFailure';
sc.events.pingfmGetTriggersSuccess		= 'pingfmGetTriggersSuccess';
sc.events.pingfmGetTriggersFailure		= 'pingfmGetTriggersFailure';
sc.events.pingfmGetLatestSuccess		= 'pingfmGetLatestSuccess';
sc.events.pingfmGetLatestFailure		= 'pingfmGetLatestFailure';
sc.events.pingfmPostSuccess				= 'pingfmPostSuccess';
sc.events.pingfmPostFailure				= 'pingfmPostFailure';
sc.events.pingfmTriggerPostSuccess		= 'pingfmTriggerPostSuccess';
sc.events.pingfmTriggerPostFailure		= 'pingfmTriggerPostFailure';

 
/**
 * a library for the Ping.fm API 
 * @class SpazPingFM
 * @param {object} opts
 */
function SpazPingFM(opts) {
	
	this.apikey  = opts.apikey  || null;
	this.devkey  = opts.devkey  || null;
	this.userkey = opts.userkey || null;
	
}


SpazPingFM.prototype.getAPIKey = function() {
	return this.apikey;
};
SpazPingFM.prototype.setAPIKey = function(apikey) {
	this.apikey = apikey;
};

SpazPingFM.prototype.getUserKey = function() {
	return this.userkey;
};
SpazPingFM.prototype.setUserKey = function(userkey) {
	this.userkey = userkey;
};


/**
 * Given a mobile key, request a user key via Ajax. Raise event on success or failure
 * Users can get their key from http://ping.fm/key/
 * 
 * All ping.fm responses are in XML. This sucks. Oh well.
 * 
 * @param {string} mobilekey
 * @return void
 */
SpazPingFM.prototype.getUserKeyWithMobileKey = function(mobilekey) {
	
};


SpazPingFM.prototype.validateUserKey = function(userkey) {
	
}; 

/**
 * get the user's set-up services 
 */
SpazPingFM.prototype.getServices = function() {
	
};


SpazPingFM.prototype.getTriggers = function() {};

SpazPingFM.prototype.getLatest = function(limit, order) {};

SpazPingFM.prototype.post = function(msg, opts) {};

SpazPingFM.prototype.triggerPost = function(msg, trigger, opts) {};