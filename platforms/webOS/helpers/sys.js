/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
regexp: false,
undef: true,
white: false,
onevar: false 
 */
var sc, Mojo, use_palmhost_proxy;
 
 
/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformstub 
 */

/**
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj, level, cb) {
	var dumper;
	
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}
	
	if (sc.helpers.isString(obj)) {
		obj = sch.truncate(obj, SPAZCORE_DUMP_MAXLEN, '…[TRUNC]');
	}
	
	
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		dumper = Mojo.Log.info;
	} else {
		dumper = Mojo.Log.logProperties;
	}

	if (sc.helpers.isString(obj)) {
		dumper(obj);
	} else if(sc.helpers.isNumber(obj)) {
		dumper(obj.toString());
	} else if (obj === undefined) {
		dumper('UNDEFINED');
	} else if (obj === null) {
		dumper('NULL');
	} else { // this is an object. we hope.
		dumper(obj);
	}
	
	if (cb) {
		cb(obj, level);
	}

};


/*
	Open a URL in the default system web browser
*/
sc.helpers.openInBrowser = function(url) {
	var c = Mojo.Controller.getAppController();
	c.serviceRequest('palm://com.palm.applicationManager', {
		method: 'open',
		parameters: {
			id: 'com.palm.app.browser',
			params: {
				target: url
			}
		}
	});
};


/**
 * this is specific to webOS, for retrieving the proper URL prefixed with the Palm Host proxy if needed 
 * @param {string} url
 */
sc.helpers.getMojoURL = function(url) {
	if (typeof Mojo !== "undefined") { // we're in webOS		
		/*
			I would like to apologize for using a global here. ick.
		*/
		if (use_palmhost_proxy) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] !== Mojo.hostingPrefix) {
				url = "/proxy?url=" + encodeURIComponent(url);
			}
			return url;		
		} else {
			return url;
		}

	} else {
		return url;
	}
	
};
