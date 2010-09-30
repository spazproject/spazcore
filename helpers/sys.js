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
 * These are system-oriented functions, mostly utilizing AIR apis
 * to interact with the OS
 * 
 * NOTE: to use all these helpers, you must additionally load a platform-specific definition file!
 */

/**
 * @constant 
 */
var SPAZCORE_PLATFORM_AIR			= 'AIR';
/**
 * @constant 
 */
var SPAZCORE_PLATFORM_WEBOS		= 'webOS';
/**
 * @constant 
 */
var SPAZCORE_PLATFORM_TITANIUM	= 'Titanium';
/**
 * @constant 
 */
var SPAZCORE_PLATFORM_UNKNOWN		= '__UNKNOWN';


/**
 * @constant 
 */
var SPAZCORE_OS_WINDOWS		= 'Windows';
/**
 * @constant 
 */
var SPAZCORE_OS_LINUX		= 'Linux';
/**
 * @constant 
 */
var SPAZCORE_OS_MACOS		= 'MacOS';
/**
 * @constant 
 */
var SPAZCORE_OS_UNKNOWN		= '__OS_UNKNOWN';


/**
 * error reporting levels 
 */
/**
 * @constant 
 */
var SPAZCORE_DUMPLEVEL_DEBUG   = 4;
/**
 * @constant 
 */
var SPAZCORE_DUMPLEVEL_NOTICE  = 3;
/**
 * @constant 
 */
var SPAZCORE_DUMPLEVEL_WARNING = 2;
/**
 * @constant 
 */
var SPAZCORE_DUMPLEVEL_ERROR   = 1;
/**
 * @constant 
 */
var SPAZCORE_DUMPLEVEL_NONE    = 0; // this means "never ever dump anything!"





/**
* Returns a string identifier for the platform.
* 
* Right now these checks are really, really basic
* 
* @return {String} an identifier for the platform
* @member sc.helpers
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
* @member sc.helpers
*/
sc.helpers.isPlatform = function(str) {
	var pform = sc.helpers.getPlatform();
	if ( pform.toLowerCase() === str.toLowerCase() ) {
		return true;
	} else {
		return false;
	}
};

/**
 * @member sc.helpers 
 */
sc.helpers.isAIR = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_AIR);
};

/**
 * @member sc.helpers 
 */
sc.helpers.iswebOS = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_WEBOS);
};

/**
 * @member sc.helpers 
 */
sc.helpers.isTitanium = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_TITANIUM);
};



/**
 * Helper to send a debug dump 
 * @member sc.helpers
 */
sc.helpers.debug = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_DEBUG);
};

/**
 * helper to send a notice dump 
 * @member sc.helpers
 */
sc.helpers.note = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_NOTICE);
};

/**
 * helper to send a warn dump 
 * @member sc.helpers
 */
sc.helpers.warn = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_WARNING);
};

/**
 * helper to send an error dump 
 * @member sc.helpers
 */
sc.helpers.error = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_ERROR);
};


/**
 * A simple logging function
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.dump = function(obj, level) {
	console.log(obj);
};

/**
 * Open a URL in the default system web browser
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.openInBrowser = function(url) {
	window.open(url);
};


/**
 * Returns the current application version string
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getAppVersion = function() {
	// stub
};


/**
 * Returns the user agent string for the app
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getUserAgent = function() {
	// stub
};

/**
 * Sets the user agent string for the app
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.setUserAgent = function(uastring) {
	// stub
};

/**
 * Gets clipboard text
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getClipboardText = function() {
	// stub
};

/**
 * Sets clipboard text
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.setClipboardText = function(text) {
	// stub
};


/**
 * Loads a value for a key from EncryptedLocalStore
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getEncryptedValue = function(key) {
	// stub
};

/**
 * Sets a value in the EncryptedLocalStore of AIR
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.setEncryptedValue = function(key, val) {
	// stub
};


/**
 * Get the app storage directory
 * @TODO is there an equivalent for this on all platforms?
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getAppStoreDir = function() {
	// stub
};

/**
 * Get the preferences file
 * @TODO this should be removed and we rely on the preferences lib 
 * @member sc.helpers
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


/**
* Returns a string identifier for the OS.
* 
* @return {String} an identifier for the OS.  See the SPAZCORE_OS_* variables
*/
sc.helpers.getOS = function() {
	// stub
	return SPAZCORE_OS_UNKNOWN;
};

/**
* checks to see if current platform is the one passed in. Use one of the defined constants, like SPAZCORE_OS_WINDOWS
* 
* @param {String} str the platform you're checking for
* @member sc.helpers
*/
sc.helpers.isOS = function(str) {
	var type = sc.helpers.getOS();
	if (type === str) {
		return true;
	}
	return false;
};

/**
 * @member sc.helpers 
 */
sc.helpers.isWindows = function() {
	return sc.helpers.isOS(SPAZCORE_OS_WINDOWS);
};

/**
 * @member sc.helpers 
 */
sc.helpers.isLinux = function() {
	return sc.helpers.isOS(SPAZCORE_OS_LINUX);
};

/**
 * @member sc.helpers 
 */
sc.helpers.isMacOS = function() {
	return sc.helpers.isOS(SPAZCORE_OS_MACOS);
};
