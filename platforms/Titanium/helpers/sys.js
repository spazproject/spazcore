/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Titanium;
 
/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformsub 
 */

/**
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj, level) {
	var dumper, tilogger;
	
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}
	
	switch(level) {
		case SPAZCORE_DUMPLEVEL_DEBUG:
			tilogger = Titanium.API.debug;
			break;
		case SPAZCORE_DUMPLEVEL_NOTICE:
			tilogger = Titanium.API.notice;
			break;
		case SPAZCORE_DUMPLEVEL_WARNING:
			tilogger = Titanium.API.warn;
			break;
		case SPAZCORE_DUMPLEVEL_ERROR:
			tilogger = Titanium.API.error;
			break;
		case SPAZCORE_DUMPLEVEL_NONE:
			return;
		default:
			tilogger = Titanium.API.debug;
	}
	
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		dumper = function(str) {
			tilogger(str);
		};
	} else {
		dumper = function() {
			for(var x in obj) {
				tilogger("'"+x+"':"+obj[x]);
			}
		};
	}
	
	if (sc.helpers.isString(obj)) {
		dumper(obj);
	} else if(sc.helpers.isNumber(obj)) {
		dumper(obj.toString());
	} else if (obj === undefined) {
		dumper('UNDEFINED');
	} else if (obj === null) {
		dumper('NULL');
	} else { // this should be a "normal" object
		dumper(obj);
	}
};


/*
	Open a URL in the default system web browser
*/
sc.helpers.openInBrowser = function(url) {
	// This works on Titanium Desktop only
	Titanium.Desktop.openURL(url);
};


