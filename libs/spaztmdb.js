/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, jQuery, sch;
 
/**
 * A library to interact with the API for theMovieDB.org 
 * @see <a href="http://api.themoviedb.org/2.1/">The API docs</a>
 */

/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.tmdbMethodSuccess		= 'tmdbMethodSuccess';
sc.events.tmdbMethodFailure		= 'tmdbMethodFailure';
sc.events.tmdbMovieSearchSuccess		= 'tmdbMovieSearchSuccess';
sc.events.tmdbMovieSearchFailure		= 'tmdbMovieSearchFailure';
sc.events.tmdbMovieIMDBLookupSuccess	= 'tmdbMovieIMDBLookupSuccess';
sc.events.tmdbMovieIMDBLookupFailure	= 'tmdbMovieIMDBLookupFailure';
sc.events.tmdbMovieGetInfoSuccess		= 'tmdbMovieGetInfoSuccess';
sc.events.tmdbMovieGetInfoFailure		= 'tmdbMovieGetInfoFailure';
sc.events.tmdbMovieGetImagesSuccess		= 'tmdbMovieGetImagesSuccess';
sc.events.tmdbMovieGetImagesFailure		= 'tmdbMovieGetImagesFailure';
sc.events.tmdbPersonSearchSuccess		= 'tmdbPersonSearchSuccess';
sc.events.tmdbPersonSearchFailure		= 'tmdbPersonSearchFailure';
sc.events.tmdbPersonGetInfoSuccess		= 'tmdbPersonGetInfoSuccess';
sc.events.tmdbPersonGetInfoFailure		= 'tmdbPersonGetInfoFailure';
sc.events.tmdbHashGetInfoSuccess		= 'tmdbHashGetInfoSuccess';
sc.events.tmdbHashGetInfoFailure		= 'tmdbHashGetInfoFailure';



/**
 * @constructor
 * @param {Object} opts
 * @param {string} opts.apikey the api key
 * @param {string} [opts.lang] a language code. default is 'en'
 * @param {string} [opts.format] the data format to return. default is 'json'
 * @param {DOMElement} [opts.eventTarget] what to target triggered events with. default is the document element
 */
function SpazTMDB(opts) {
	
	/*
		set defaults
	*/
	opts = sch.defaults({
		'apikey':null,
		'lang'  :'en',
		'format':'json',
		'eventTarget':document
	}, opts);
	
	this.apikey = opts.apikey;
	this.lang   = opts.lang;
	this.format = opts.format;
	this.eventTarget = opts.eventTarget;
	
	this.baseURL = 'http://api.themoviedb.org/2.1/';
		
}

/**
 * Sets the API key
 * @param {string} apikey the api key used to access the API 
 */
SpazTMDB.prototype.setAPIKey = function(apikey) {
	this.apikey = apikey;
};

/**
 * Gets the API key
 * @returns {string} the api key that was previously set 
 */
SpazTMDB.prototype.getAPIKey = function() {
	return this.apikey;
};

/**
 * Search for movies by title
 * @param {string} value the value passed to the search method
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieSearch = function(value, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.search',
		'value' :value,
		'successEvent':sc.events.tmdbMovieSearchSuccess,
		'failureEvent':sc.events.tmdbMovieSearchFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Get info for a movie
 * @param {string|number} id The id of the movie (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieInfo = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.getInfo',
		'value' :id,
		'successEvent':sc.events.tmdbMovieGetInfoSuccess,
		'failureEvent':sc.events.tmdbMovieGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Get images for a movie
 * @param {string|number} id The id of the movie (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieImages = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.getImages',
		'value' :id,
		'successEvent':sc.events.tmdbMovieGetInfoSuccess,
		'failureEvent':sc.events.tmdbMovieGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Lookup a movie by IMDB id
 * @param {string} id The IMDB id of the movie. ex "tt0137523"
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieInfoIMDB = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.imdbLookup',
		'value' :id,
		'successEvent':sc.events.tmdbMovieIMDBLookupSuccess,
		'failureEvent':sc.events.tmdbMovieIMDBLookupFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Search for a person
 * @param {string|number} id The id of the person (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.personInfo = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Person.getInfo',
		'value' :id,
		'successEvent':sc.events.tmdbPersonGetInfoSuccess,
		'failureEvent':sc.events.tmdbPersonGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Search for a person
 * @param {string} name The name to search for
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.personSearch = function(name, onSuccess, onFailure) {
	this.callMethod({
		'method':'Person.search',
		'value' :name,
		'successEvent':sc.events.tmdbPersonSearchSuccess,
		'failureEvent':sc.events.tmdbPersonSearchFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};




/**
 * Get movie info by file hash
 * @param {string} hash The hash corresponding to the movie
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 * @see <a href="http://trac.opensubtitles.org/projects/opensubtitles/wiki/HashSourceCodes">Hash Source Codes</a>
 */
SpazTMDB.prototype.movieInfoHash = function(hash, onSuccess, onFailure) {
	this.callMethod({
		'method':'Hash.getInfo',
		'value' :hash,
		'successEvent':sc.events.tmdbHashGetInfoSuccess,
		'failureEvent':sc.events.tmdbHashGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};






/**
 * Method to construct an API URL from the passed method and value strings
 * @param {string} method the string for this parameter. See API docs for list
 * @param {string} value the value we're passing to the API method. This will be encoded using encodeURIComponent() 
 * @returns {string} the URL string
 */
SpazTMDB.prototype.getURL = function(method, value) {
	var url  = this.baseURL + method + "/" + this.lang + "/" + this.format + "/" + this.apikey + "/" + encodeURIComponent(value);
	return url;
};




/**
 * a general purpose method for calling API methods via ajax and raising
 * events on success/failure. callbacks can optionally be set for success
 * or failure as well
 * @param {Object} opts options for the method call
 * @param {string} opts.method the method to call
 * @param {string} opts.value value passed to method
 * @param {string} [opts.successEvent] the type of event to raise on success. default is {@link sc.events.tmdbMethodSuccess}
 * @param {string} [opts.failureEvent] the type of event to raise on failure. default is {@link sc.events.tmdbMethodFailure}
 * @param {function} [opts.onSuccess] a callback function called on success. takes args data, textStatus
 * @param {function} [opts.onFailure] a callback function called on failure. takes args xhr, msg, exc
 * 
 */
SpazTMDB.prototype.callMethod = function(opts) {
	var that = this;
	
	opts = sch.defaults({
		'method'      :'Movie.search',
		'value'       :'Road House',
		'successEvent':sc.events.tmdbMethodSuccess,
		'failureEvent':sc.events.tmdbMethodFailure,
		'onSuccess'   :null, // callback on success
		'onFailure'   :null  // callback on failure
	}, opts);
	
	var url = this.getURL(opts.method, opts.value);
	
	jQuery.ajax({
		'url' :url,
		'type':'GET',
		'success':function(data, textStatus) {
			if (opts.onSuccess) {
				opts.onSuccess.call(that, data, textStatus);
			}
			sch.trigger(opts.successEvent, that.eventTarget, data);
		},
		'error':function(xhr, msg, exc) {
			if (opts.onFailure) {
				opts.onFailure.call(that, xhr, msg, exc);
			}
			sch.trigger(opts.failure, that.eventTarget, {'url':url, 'xhr':xhr, 'msg':msg});
		}
	});
};

