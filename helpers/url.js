/**
 * Takes a key/val pair object and returns a query string 
 */
sc.helpers.objectToQueryString = function(object) {
	var query_string, key, val, pieces = [];
	
	for(key in object) {
		val = object[key];
		pieces.push(encodeURIComponent(key)+'='+encodeURIComponent(val));
	}
	query_string = pieces.join('&');
	return query_string;
};