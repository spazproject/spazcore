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
	var dumper;
	
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}
	
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		dumper = function(str) {
			console.debug(str);
		};
	} else {
		dumper = function(obj) {
			console.dir(obj);
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
