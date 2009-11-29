/**
 * THIS IS NOT FINISHED
 * 
 * returns the current geocode location as a string and the full object as second param
 * 
 * raises events: 'location_retrieved_success', 'location_retrieved_error'
 * 
 * @param {Object}   controller  a Mojo scene controller
 * @param {Function} onsuccess
 * @param {Function} onerror
 */
sc.helpers.getCurrentLocation = function(onsuccess, onerror) {

	var success = function(data) {
		if (onsuccess) {
			onsuccess(data);
		}
		var geoloc = data.latitude + ',' + data.longitude;
		// jQuery().trigger('location_retrieved_success', [geoloc,data]);
	};

	var error = function(data) {
		if (onerror) {
			onerror(data);
		}
		// jQuery().trigger('location_retrieved_error', [errorCode]);
	};

	var loc = new Mojo.Service.Request('palm://com.palm.location', {
			method:"getCurrentPosition",
			parameters:{
				'accuracy'     : 1,
				'responseTime' : 1,
				'maximumAge'   : 30 // seconds
			},
			onSuccess:success,
			onFailure:error
		}
	);
};