/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, window;
 
/**
 * These are system-oriented functions, mostly utilizing AIR apis
 * to interact with the OS
 * 
 * NOTE: to use all these helpers, you must additionally load a platform-specific definition file!
 */


var SPAZCORE_PLATFORM_AIR			= 'AIR';
var SPAZCORE_PLATFORM_WEBOS		= 'webOS';
var SPAZCORE_PLATFORM_TITANIUM	= 'Titanium';
var SPAZCORE_PLATFORM_UNKNOWN		= '__UNKNOWN';

/**
 * error reporting levels 
 */
var SPAZCORE_DUMPLEVEL_DEBUG   = 4;
var SPAZCORE_DUMPLEVEL_NOTICE  = 3;
var SPAZCORE_DUMPLEVEL_WARNING = 2;
var SPAZCORE_DUMPLEVEL_ERROR   = 1;
var SPAZCORE_DUMPLEVEL_NONE    = 0; // this means "never ever dump anything!"





/**
* Returns a string identifier for the platform.
* 
* Right now these checks are really, really basic
* 
* @return {String} an identifier for the platform
*/
sc.helpers.getPlatform = function() {
	if (window.runtime) {
		return SPAZCORE_PLATFORM_AIR;
	}
	if (window.Mojo) {
		return SPAZCORE_PLATFORM_WEBOS;
	}
	if (window.Titanium) {
		return SPAZCORE_PLATFORM_TITANIUM;
	}
	return SPAZCORE_PLATFORM_UNKNOWN;
};

/**
* checks to see if current platform is the one passed in
* 
* use one of the defined constants, like SPAZCORE_PLATFORM_AIR
* 
* @param {String} str the platform you're checking for
* 
*/
sc.helpers.isPlatform = function(str) {
	var pform = sc.helpers.getPlatform();
	if ( pform.toLowerCase() === str.toLowerCase() ) {
		return true;
	} else {
		return false;
	}
};


sc.helpers.isAIR = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_AIR);
};

sc.helpers.iswebOS = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_WEBOS);
};

sc.helpers.isTitanium = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_TITANIUM);
};


/**
 * Helper to send a debug dump 
 */
sc.helpers.debug = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_DEBUG);
};

/**
 * helper to send a notice dump 
 */
sc.helpers.note = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_NOTICE);
};

/**
 * helper to send a warn dump 
 */
sc.helpers.warn = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_WARNING);
};

/**
 * helper to send an error dump 
 */
sc.helpers.error = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_ERROR);
};


/**
 * A simple logging function
 * @platformstub
 */
sc.helpers.dump = function(obj, level) {
	console.log(obj);
};

/**
 * Open a URL in the default system web browser
 * @platformstub
 */
sc.helpers.openInBrowser = function(url) {
	// stub
};

/**
 * Gets the contents of a file
 * @platformstub
 */
sc.helpers.getFileContents = function(path) {
	// stub
};

/**
 * Saves the contents to a specified path. Serializes a passed object if 
 * serialize == true
 * @platformstub
 */
sc.helpers.setFileContents = function(path, content, serialize) {
	// stub
};


/**
 * Returns the current application version string
 * @platformstub
 */
sc.helpers.getAppVersion = function() {
	// stub
};


/**
 * Returns the user agent string for the app
 * @platformstub
 */
sc.helpers.getUserAgent = function() {
	// stub
};

/**
 * Sets the user agent string for the app
 * @platformstub
 */
sc.helpers.setUserAgent = function(uastring) {
	// stub
};

/**
 * Gets clipboard text
 * @platformstub
 */
sc.helpers.getClipboardText = function() {
	// stub
};

/**
 * Sets clipboard text
 * @platformstub
 */
sc.helpers.setClipboardText = function(text) {
	// stub
};


/**
 * Loads a value for a key from EncryptedLocalStore
 * @platformstub
 */
sc.helpers.getEncryptedValue = function(key) {
	// stub
};

/**
 * Sets a value in the EncryptedLocalStore of AIR
 * @platformstub
 */
sc.helpers.setEncryptedValue = function(key, val) {
	// stub
};


/**
 * Get the app storage directory
 * @TODO is there an equivalent for this on all platforms?
 * @platformstub
 */
sc.helpers.getAppStoreDir = function() {
	// stub
};

/**
 * Get the preferences file
 * @TODO this should be removed and we rely on the preferences lib 
 */
sc.helpers.getPreferencesFile = function(name, create) {
	// stub
};

/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns the air.File object or false
 * @platformstub
*/
sc.helpers.init_file = function(path, overwrite) {
	// stub
};
