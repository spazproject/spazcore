/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformsub 
 */

/**
 * @TODO this seems crappy and should probably be rewritten
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj) {
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		var dumper = Mojo.Log.info;
	} else {
		var dumper = Mojo.Log.logProperties;
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
		if (dump) { // we really prefer to use dump if it is available
			dumper(obj);
		} else {
			dumper(obj)
		}

	}

}