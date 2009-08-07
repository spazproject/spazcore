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
 
/* A wrapper for JSON.parse() that correct Twitter issues and perform logging if JSON data could not be parsed
 * which will help to find out what is wrong
 * @param {String} text 
 */
sc.helpers.deJSON = function(json)
 {

	// Fix twitter data bug
	var re = new RegExp("Couldn\\'t\\ find\\ Status\\ with\\ ID\\=[0-9]+\\,", "g");
	json = json.replace(re, "");

	var done = false;
	try {
		var obj = JSON.parse(json);
		done = true;
	} finally {
		if (!done) {
			sc.helpers.dump("Could not parse JSON text " + json);
		}
	}

	return obj;
};

/**
 * really just a simple wrapper for JSON.stringify	
 * @param  any js construct
 */
sc.helpers.enJSON = function(jsobj) {
	return JSON.stringify(jsobj);
};
