/**
 * A library to do url shortening 
 */

/**
 * Constants to refer to services 
 */
const SPAZCORE_SHORTURL_SERVICE_SHORTIE = 'short.ie';
const SPAZCORE_SHORTURL_SERVICE_ISGD	= 'is.gd';
const SPAZCORE_SHORTURL_SERVICE_BITLY	= 'bit.ly';


/**
 * events raised here 
 */
if (!sc.events) { sc.events = {} };
sc.events.newShortURLSuccess	= 'newShortURLSuccess';
sc.events.newShortURLFailure	= 'newShortURLFailure';
sc.events.newExpandURLSuccess = 'recoverLongURLSuccess';
sc.events.newExpandURLFailure = 'recoverLongURLFailure';


/**
 * Constructor
 * @param {string} service	the name of a service. Preferrably one of the SPAZCORE_SHORTURL_SERVICE_* constants
 */
function SpazShortURL(service) {
	
	this.api = this.getAPIObj(service);
	
}

SpazShortURL.prototype.getAPIObj = function(service) {
	
	var apis = {}
	
	apis[SPAZCORE_SHORTURL_SERVICE_BITLY] = {
		'url'	  : 'http://bit.ly/api',
		'getData' : function(longurl, opts){
			
			/*
				use the api if we're doing multiple URLs
			*/
			if (sc.helpers.isArray(longurl)) {
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].url = 'http://api.bit.ly/shorten';
				opts.longUrl = longurl;
				return opts;
			} else {
				return { 'url':longurl };				
			}
		}
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_SHORTIE] = {
		'url'	  : 'http://short.ie/api?',
		'getData' : function(longurl, opts){
			
			if (longurl.match(/ /gi)) {
				var longurl = longurl.replace(/ /gi, '%20');
			}
			
			var shortie = {
				orig: longurl,
				url:  longurl,
				email:	 '',
				private: 'false',
				format:	 'rest'
			};
			return shortie;
		}
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_ISGD] = {
		'url'	  : 'http://is.gd/api.php',
		'getData' : function(longurl, opts) {
			return { 'longurl':longurl };
		}
	};
	
	return apis[service];
}


/**
 * shortens a URL by making an ajax call
 * @param {string} longurl
 * @param {object} opts   right now opts.event_target (a DOMelement) and opts.apiopts (passed to api's getData() call) are supported
 */
SpazShortURL.prototype.shorten = function(longurl, opts) {
	
	/*
		we call getData now in case it needs to override anything
	*/
	var data = this.api.getData(longurl, opts.apiopts);
	
	var shortener = this;
	
	if (!opts) { opts = {} };
	
	/*
		set defaults if needed
	*/
	opts.event_target = opts.event_target || document;
	opts.apiopts	  = opts.apiopts	  || null;
	

	var xhr = jQuery.ajax({
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(shortener.api.url + ' error:'+msg)
			
			var errobj = {'url':shortener.api.url, 'xhr':null, 'msg':null}
			
			if (xhr) {
				errobj.xhr = xhr;
				sc.helpers.dump("Error:"+xhr.status+" from "+ shortener.api.url);
			} else {
				sc.helpers.dump("Error:Unknown from "+ shortener.api.url);
				errobj.msg = 'Unknown Error';
			}
			shortener._onShortenResponseFailure(errobj, opts.event_target);
		},
		success:function(data) {
			// var shorturl = trim(data);
			var shorturl = data;
			shortener._onShortenResponseSuccess({
					'shorturl':shorturl,
					'longurl' :longurl
				},
				opts.event_target
			);
		},
		beforeSend:function(xhr) {},
		type:"GET",
		url :this.api.url,
		data:data
	});
};

SpazShortURL.prototype._onShortenResponseSuccess = function(data, target) {
	sc.helpers.triggerCustomEvent(sc.events.newShortURLSuccess, target, data);
};
SpazShortURL.prototype._onShortenResponseFailure = function(errobj, target) {
	sc.helpers.triggerCustomEvent(sc.events.newShortURLFailure, target, errobj);
};

/**
 * @TODO 
 */
SpazShortURL.prototype.expand = function(shorturl, opts) {
	
	var shortener = this;
	
	var xhr = jQuery.ajax({
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(this.url + ' error:'+msg)
			
			var errobj = {'url':this.url, 'xhr':null, 'msg':null}
			
			if (xhr) {
				errobj.xhr = xhr;
				sc.helpers.dump("Error:"+xhr.status+" from "+ this.url);
			} else {
				sc.helpers.dump("Error:Unknown from "+ this.url);
				errobj.msg = 'Unknown Error';
			}
			shortener._onExpandResponseFailure(errobj, opts.event_target);
		},
		success:function(data) {
			// var shorturl = trim(data);
			data = sc.helpers.deJSON(data);
			var longurl = data[shorturl];
			shortener._onExpandResponseSuccess({
					'shorturl':shorturl,
					'longurl' :longurl
				},
				opts.event_target
			);
		},
		beforeSend:function(xhr) {},
		type:"GET",
		url :'http://longurlplease.appspot.com/api/v1.1',
		data:{ 'q':shorturl }
	});
};

/**
 * @TODO 
 */
SpazShortURL.prototype._onExpandResponseSuccess = function(data, target) {
	sc.helpers.triggerCustomEvent(sc.events.newExpandURLSuccess, target, data);
};

/**
 * @TODO 
 */
SpazShortURL.prototype._onExpandResponseFailure = function(errobj, target) {
	sc.helpers.triggerCustomEvent(sc.events.newExpandURLFailure, target, errobj);
};
