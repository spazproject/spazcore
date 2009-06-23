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


/**
 * this is specific to webOS, for retrieving the proper URL prefixed with the Palm Host proxy if needed 
 */
sc.helpers.getMojoURL = function(url) {
	if (typeof Mojo != "undefined") { // we're in webOS		
		if (use_palmhost_proxy) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] != Mojo.hostingPrefix) {
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