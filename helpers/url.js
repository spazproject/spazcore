/**
 * Takes a key/val pair object and returns a query string 
 * @member sc.helpers 
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



/**
 * takes a username and service, and returns the profile URL on that service 
 */
sc.helpers.getServiceBaseUrl = function(service) {
	
	var url = null;
	
	switch(service) {
		case SPAZCORE_SERVICE_TWITTER:
			url = SPAZCORE_BASEURL_TWITTER;
			break;
		case SPAZCORE_SERVICE_IDENTICA:
			url = SPAZCORE_BASEURL_IDENTICA;
			break;
		case SPAZCORE_SERVICE_FREELISHUS:
			url = SPAZCORE_BASEURL_FREELISHUS;
			break;
	}
	
	return url;
	
};


/**
 * takes a username and service, and returns the profile URL on that service 
 */
sc.helpers.getServiceProfileUrl = function(username, service) {
	
	var url = null;
	
	switch(service) {
		case SPAZCORE_SERVICE_TWITTER:
			url = SPAZCORE_BASEURL_TWITTER+"/"+username;
			break;
		case SPAZCORE_SERVICE_IDENTICA:
			url = SPAZCORE_BASEURL_IDENTICA+"/"+username;
			break;
		case SPAZCORE_SERVICE_FREELISHUS:
			url = SPAZCORE_BASEURL_FREELISHUS+"/"+username;
			break;
	}
	
	return url;
	
};


/**
 * takes a status id, username and service, and returns the status URL on that service 
 */
sc.helpers.getStatusUrl = function(id, username, service) {
	
	var url = null;

	switch(service) {
		case SPAZCORE_SERVICE_TWITTER:
			url = SPAZCORE_BASEURL_TWITTER+username+'/statuses/'+id;
			break;
		case SPAZCORE_SERVICE_IDENTICA:
			url = SPAZCORE_BASEURL_IDENTICA+'notice/'+id;
			break;
		case SPAZCORE_SERVICE_FREELISHUS:
			url = SPAZCORE_BASEURL_FREELISHUS+'notice/'+id;
			break;
	}
	
	return url;
	
};
