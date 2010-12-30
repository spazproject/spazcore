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
var sc;
 
 
/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformstub 
 */

/**
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj, level, cb) {
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}

	if (sc.helpers.isString(obj)) {
		obj = sch.truncate(obj, SPAZCORE_DUMP_MAXLEN, '…[TRUNC]');
	}

	if (sc.helpers.isString(obj)) {
		console.log(obj);
	} else if(sc.helpers.isNumber(obj)) {
		console.log(obj.toString());
	} else if (obj === undefined) {
		console.log('UNDEFINED');
	} else if (obj === null) {
		console.log('NULL');
	} else { // this is an object. we hope.
		console.log(obj);
	}
	
	if (cb) {
		cb(obj, level);
	}

};


/*
	Open a URL in the default system web browser
*/
sc.helpers.openInBrowser = function(url) {
	return window.open(url,'SpazCore_new_window','toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes');	
};


