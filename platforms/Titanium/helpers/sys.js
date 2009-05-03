/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformsub 
 */

/**
 * @TODO this seems crappy and should probably be rewritten
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj) {

	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		var dumper = function(str) {
			console.debug(str);
		}
	} else {
		var dumper = function(obj) {
			console.dir(obj);
		}
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
		dumper(obj)
	}
}
