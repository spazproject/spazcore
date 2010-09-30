/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

/**
 * A library to do url shortening 
 */

/**
 * Constants to refer to services 
 */
/**
 * @constant 
 */
var SPAZCORE_SHORTURL_SERVICE_SHORTIE = 'short.ie';
/**
 * @constant 
 */
var SPAZCORE_SHORTURL_SERVICE_ISGD	  = 'is.gd';
/**
 * @constant 
 */
var SPAZCORE_SHORTURL_SERVICE_BITLY	  = 'bit.ly';
/**
 * @constant 
 */
var SPAZCORE_SHORTURL_SERVICE_JMP     = 'j.mp';

/**
 * @constant 
 */
var SPAZCORE_EXPANDABLE_DOMAINS = [
	"bit.ly",
	"cli.gs",
	"digg.com",
	"fb.me",
	"is.gd",
	"j.mp",
	"kl.am",
	"su.pr",
	"tinyurl.com",
	"goo.gl",
	"307.to",
	"adjix.com",
	"b23.ru",
	"bacn.me",
	"bloat.me",
	"budurl.com",
	"clipurl.us",
	"cort.as",
	"dwarfurl.com",
	"ff.im",
	"fff.to",
	"href.in",
	"idek.net",
	"korta.nu",
	"lin.cr",
	"livesi.de",
	"ln-s.net",
	"loopt.us",
	"lost.in",
	"memurl.com",
	"merky.de",
	"migre.me",
	"moourl.com",
	"nanourl.se",
	"om.ly",
	"ow.ly",
	"peaurl.com",
	"ping.fm",
	"piurl.com",
	"plurl.me",
	"pnt.me",
	"poprl.com",
	"post.ly",
	"rde.me",
	"reallytinyurl.com",
	"redir.ec",
	"retwt.me",
	"rubyurl.com",
	"short.ie",
	"short.to",
	"smallr.com",
	"sn.im",
	"sn.vc",
	"snipr.com",
	"snipurl.com",
	"snurl.com",
	"tiny.cc",
	"tinysong.com",
	"togoto.us",
	"tr.im",
	"tra.kz",
	"trg.li",
	"twurl.cc",
	"twurl.nl",
	"u.mavrev.com",
	"u.nu",
	"ur1.ca",
	"url.az",
	"url.ie",
	"urlx.ie",
	"w34.us",
	"xrl.us",
	"yep.it",
	"zi.ma",
	"zurl.ws",
	"chilp.it",
	"notlong.com",
	"qlnk.net",
	"trim.li",
	"url4.eu"
];


/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.newShortURLSuccess	= 'newShortURLSuccess';
sc.events.newShortURLFailure	= 'newShortURLFailure';
sc.events.newExpandURLSuccess   = 'recoverLongURLSuccess';
sc.events.newExpandURLFailure   = 'recoverLongURLFailure';


/**
 * Constructor
 * @param {string} service	the name of a service. Preferrably one of the SPAZCORE_SHORTURL_SERVICE_* constants
 * @class SpazShortURL
 * @constructor
 */
function SpazShortURL(service) {
	
	this.api = this.getAPIObj(service);
	
	
	this.expanded_cache = {};
	
}

SpazShortURL.prototype.getAPIObj = function(service) {
	
	var apis = {};
	
	apis[SPAZCORE_SHORTURL_SERVICE_BITLY] = {
		'url'	  : 'http://bit.ly/api',
		'getData' : function(longurl, opts){
			
			/*
				use the api if we're doing multiple URLs
			*/
			if (sc.helpers.isArray(longurl)) {
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple = true;
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].url = 'http://api.bit.ly/shorten';
				opts.longUrl = longurl;
				return opts;
			} else {
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple = false;
				return { 'url':longurl };				
			}
		},
		'processResult' : function(data) {
			if (apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple === true) {
				var result = sc.helpers.deJSON(data);
				var rs = {};
				for (var i in result.results) {
					rs[i] = result.results[i].shortUrl;
				}
				return rs;
			} else {
				return data;
			}
		}
		
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_JMP] = {
		'url'	  : 'http://j.mp/api',
		'getData' : function(longurl, opts){
			
			/*
				use the api if we're doing multiple URLs
			*/
			if (sc.helpers.isArray(longurl)) {
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple = true;
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].url = 'http://api.j.mp/shorten';
				opts.longUrl = longurl;
				return opts;
			} else {
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple = false;
				return { 'url':longurl };				
			}
		},
		'processResult' : function(data) {
			if (apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple === true) {
				var result = sc.helpers.deJSON(data);
				var rs = {};
				for (var i in result.results) {
					rs[i] = result.results[i].shortUrl;
				}
				return rs;
			} else {
				return data;
			}
		}
		
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_SHORTIE] = {
		'url'	  : 'http://short.ie/api?',
		'getData' : function(longurl, opts){
			
			if (longurl.match(/ /gi)) {
				longurl = longurl.replace(/ /gi, '%20');
			}
			
			var shortie = {
				orig: longurl,
				url:  longurl,
				email:	 '',
				'private': 'false',
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
};


/**
 * shortens a URL by making an ajax call
 * @param {string} longurl
 * @param {object} opts   right now opts.event_target (a DOMelement) and opts.apiopts (passed to api's getData() call) are supported
 */
SpazShortURL.prototype.shorten = function(longurl, opts) {
	
	var shortener = this;
	
	if (!opts) { opts = {}; }

	/*
		set defaults if needed
	*/
	opts.event_target = opts.event_target || document;
	opts.apiopts	  = opts.apiopts	  || null;
	
	/*
		we call getData now in case it needs to override anything
	*/
	var apidata = this.api.getData(longurl, opts.apiopts);

	if (sc.helpers.getMojoURL) {
		this.api.url = sc.helpers.getMojoURL(this.api.url);
	}
		

	var xhr = jQuery.ajax({
		'traditional':true, // so we don't use square brackets on arrays in data. Bit.ly doesn't like it
		'dataType':'text',
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(shortener.api.url + ' error:'+msg);
			
			var errobj = {'url':shortener.api.url, 'xhr':null, 'msg':null};
			
			if (xhr) {
				errobj.xhr = xhr;
				sc.helpers.error("Error:"+xhr.status+" from "+ shortener.api.url);
			} else {
				sc.helpers.error("Error:Unknown from "+ shortener.api.url);
				errobj.msg = 'Unknown Error';
			}
			shortener._onShortenResponseFailure(errobj, opts.event_target);
		},
		success:function(data) {
			// var shorturl = trim(data);
			var return_data = {};
			if (shortener.api.processResult) {
				return_data = shortener.api.processResult(data);
			} else {
				return_data = {
					'shorturl':data,
					'longurl' :longurl
				};
			}
			sch.error(return_data);
			shortener._onShortenResponseSuccess(return_data, opts.event_target);
		},
		'type':"POST",
		'url' :this.api.url,
		'data':apidata
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
	var longurl;
	
	if (!opts) {
		opts = {};
	}
	
	opts.event_target = opts.event_target || document;
	
	/*
		Do a lookup in the cache first
	*/
	if ( (longurl = this.getExpandedURLFromCache()) ) {
		shortener._onExpandResponseSuccess({
				'shorturl':shorturl,
				'longurl' :longurl
			},
			opts.event_target
		);
		return;
	}
	
	/*
		if not cached, do query to look it up
	*/
	var xhr = jQuery.ajax({
    	'dataType':'text',
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(this.url + ' error:'+msg);
			
			var errobj = {'url':this.url, 'xhr':null, 'msg':null};
			
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
			
			/*
				save it to cache
			*/
			shortener.saveExpandedURLToCache(shorturl, longurl);
			
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


SpazShortURL.prototype.findExpandableURLs = function(str) {
	var x, i, matches = [], re_matches, key, thisdomain, thisregex, regexes = [];
	
	for (i=0; i < SPAZCORE_EXPANDABLE_DOMAINS.length; i++) {
		thisdomain = SPAZCORE_EXPANDABLE_DOMAINS[i];
		if (thisdomain == 'ff.im') {
			regexes.push(new RegExp("http://"+thisdomain+"/(-?[a-zA-Z0-9]+)", "gi"));
		} else {
			regexes.push(new RegExp("http://"+thisdomain+"/([a-zA-Z0-9]+)", "gi"));
		}
		
	};
	
	for (i=0; i < regexes.length; i++) {
		thisregex = regexes[i];
		sch.dump("looking for "+thisregex+ " in '"+str+"'");
		while( (re_matches = thisregex.exec(sch.trim(str))) != null) {
			matches.push(re_matches[0]);
		}		
	};
	
	sch.dump(matches);
	
	if (matches.length > 0) {
		return matches;
	} else {
		return null;
	}

};


SpazShortURL.prototype.expandURLs = function(urls, target) {
	for (var i=0; i < urls.length; i++) {
		var thisurl = urls[i];
		sch.dump('expanding '+thisurl);
		this.expand(thisurl, { 'event_target':target });
	};
};



/**
 * @param {string} str  the string to replace the URLs in
 * @param {string} shorturl 
 * @param {string} longurl 
 */
SpazShortURL.prototype.replaceExpandableURL = function(str, shorturl, longurl) {
	str = str.replace(shorturl, longurl, 'gi');
	/*
		we also expand the non-http://-prefixed versions. Wonder if this is a bad idea, though -- seems
		possible we could have unexpected consqeuences with this
	*/
	str = str.replace(shorturl.replace('http://', ''), longurl.replace('http://', ''), 'gi');
	return str;
};



SpazShortURL.prototype.getExpandedURLFromCache = function(shortURL) {
	return this.expanded_cache[shortURL];
};

SpazShortURL.prototype.saveExpandedURLToCache  = function(shortURL, longURL) {
	this.expanded_cache[shortURL] = longURL;
};