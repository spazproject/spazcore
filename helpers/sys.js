/**
 * These are system-oriented functions, mostly utilizing AIR apis
 * to interact with the OS
 * 
 * NOTE: to use all these helpers, you must additionally load a platform-specific definition file!
 */


const SPAZCORE_PLATFORM_AIR			= 'AIR';
const SPAZCORE_PLATFORM_WEBOS		= 'webOS';
const SPAZCORE_PLATFORM_TITANIUM	= 'Titanium';
const SPAZCORE_PLATFORM_UNKNOWN		= '__UNKNOWN';


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
	if ( pform.toLowerCase() == str.toLowerCase() ) {
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
 * A simple logging function
 * @platformstub
 */
sc.helpers.dump = function(obj) {
	// stub
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
sc.helpers.setEncyrptedValue = function(key, val) {
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
