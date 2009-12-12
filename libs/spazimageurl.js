/**
 * a library to get direct image urls for various image hosting servces 
 */
function SpazImageURL(args) {
	
	this.apis = {};
	
	this.initAPIs();
	
};

/**
 * Creates the initial default set of API descriptions 
 */
SpazImageURL.prototype.initAPIs = function() {
	this.addAPI('twitpic', {
		'url_regex'       : new RegExp("http://twitpic.com/([a-zA-Z0-9]+)", "gi"),
		'getThumbnailUrl' : function(id) {
			var url = 'http://twitpic.com/show/thumb/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://twitpic.com/show/large/'+id;
			return url;
		}
	});


	this.addAPI('yfrog', {
		'url_regex'       : new RegExp("http://yfrog.(?:com|us)/([a-zA-Z0-9]+)", "gim"),
		'getThumbnailUrl' : function(id) {
			var url = 'http://yfrog.com/'+id+'.th.jpg';
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://yfrog.com/'+id+':iphone';
			return url;
		}
	});
	
	
	this.addAPI('twitgoo', {
		'url_regex'       : /http:\/\/twitgoo.com\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			var url = 'http://twitgoo.com/show/thumb/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://twitgoo.com/show/img/'+id;
			return url;
		}
	});
	
	
	
	this.addAPI('pikchur', {
		'url_regex'       : /http:\/\/(?:pikchur\.com|pk\.gd)\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://img.pikchur.com/pic_GPT_t.jpg
			var url = 'http://img.pikchur.com/pic_'+id+'_s.jpg';
			return url;
		},
		'getImageUrl'     : function(id) {
			//http://img.pikchur.com/pic_GPT_l.jpg
			var url = 'http://img.pikchur.com/pic_'+id+'_l.jpg';
			return url;
		}
	});
	
	
	this.addAPI('tweetphoto', {
		'url_regex'       : /http:\/\/tweetphoto.com\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/json/imagefromurl?size=thumbnail&url=http://tweetphoto.com/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://tweetphoto.com/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://tweetphoto.com/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://tweetphoto.com/'+id;
			return url;
		}
	});
	
	
	this.addAPI('pic.gd', {
		'url_regex'       : /http:\/\/pic.gd\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/json/imagefromurl?size=thumbnail&url=http://pic.gd/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://pic.gd/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://pic.gd/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://pic.gd/'+id;
			return url;
		}
	});	
};


/**
 * retrieve APIs 
 * @return {array}
 */
SpazImageURL.prototype.getAPIs = function() {
	return this.apis;	
};

/**
 * get an api for a service
 * @param {string} service_name 
 * @return {object}
 */
SpazImageURL.prototype.getAPI = function(service_name) {
	
	return this.apis[service_name];
	
};

/**
 * add a new API for a service
 * @param {string} service_name
 * @param {object} opts (url_regex regexp, getThumbnailUrl method, getImageUrl method)
 */
SpazImageURL.prototype.addAPI = function(service_name, opts) {
	
	var newapi = {};
	newapi.url_regex       = opts.url_regex;       // a regex used to look for this service's urls, must provide a parens match for image ID code
	newapi.getThumbnailUrl = opts.getThumbnailUrl; // a function
	newapi.getImageUrl     = opts.getImageUrl;     // a function
	
	this.apis[service_name] = newapi;
	
};

/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {string} str
 * @return {object|null} an object of services (keys) and an array of their matches (vals)
 */
SpazImageURL.prototype.findServiceUrlsInString = function(str) {
	
	var matches = {}, num_matches = 0, re_matches, key, thisapi;
	
	for (key in this.apis) {
		
		thisapi = this.getAPI(key);
		sch.dump(key);
		sch.dump(thisapi.url_regex);
		while( (re_matches = thisapi.url_regex.exec(sch.trim(str))) != null) {
			sch.dump(re_matches);
			matches[key] = re_matches;
			num_matches++;
		}
	}
	sch.dump('num_matches:'+num_matches);
	sch.dump(matches);	
	if (num_matches > 0) {
		return matches;
	} else {
		return null;
	}
	
};

/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {object} matches
 * @return {object|null} fullurl:thumburl key:val pairs
 * 
 */
SpazImageURL.prototype.getThumbsForMatches = function(matches) {
	var x, service, api, thumburl, thumburls = {}, num_urls = 0;
	
	for (service in matches) {
		sch.dump('SERVICE:'+service);
		api = this.getAPI(service);
		urls = matches[service]; // an array
		sch.dump("URLS:"+urls);
		thumburls[urls[0]] = api.getThumbnailUrl(urls[1]);
		num_urls++;
	}

	sch.dump('num_urls:'+num_urls);
	sch.dump(thumburls);	
	
	if (num_urls > 0) {
		return thumburls;
	} else {
		return null;
	}
};


/**
 * given a string, this returns a set of key:val pairs of main url:thumbnail url
 * for image hosting services for urls within the string
 * @param {string} str
 * @return {object|null} fullurl:thumburl key:val pairs
 */
SpazImageURL.prototype.getThumbsForUrls = function(str) {
	var matches = this.findServiceUrlsInString(str);
	if (matches) {
		return this.getThumbsForMatches(matches);
	} else {
		return null;
	}
	
};

/**
 * given a single image hosting service URL, this returns a URL to the thumbnail image itself
 * @param {string} url
 * @return {string|null}
 */
SpazImageURL.prototype.getThumbForUrl = function(url) {
	var urls = this.getThumbsForUrls(url);
	if (urls) {
		return urls[url];
	} else {
		return null;
	}
};



/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {object} matches
 * @return {object|null} fullurl:thumburl key:val pairs
 */
SpazImageURL.prototype.getImagesForMatches = function(matches) {
	var x, service, api, imageurl, imageurls = {}, num_urls = 0;
	
	for (service in matches) {
		sch.dump('SERVICE:'+service);
		api = this.getAPI(service);
		urls = matches[service]; // an array
		sch.dump("URLS:"+urls);
		imageurls[urls[0]] = api.getImageUrl(urls[1]);
		num_urls++;
	}

	sch.dump('num_urls:'+num_urls);
	sch.dump(imageurls);	
	
	if (num_urls > 0) {
		return imageurls;
	} else {
		return null;
	}
};


/**
 * given a string, this returns a set of key:val pairs of main url:image url
 * for image hosting services for urls within the string
 * @param {string} str
 * @return {object|null} fullurl:imageurl key:val pairs
 */
SpazImageURL.prototype.getImagesForUrls = function(str) {
	var matches = this.findServiceUrlsInString(str);
	if (matches) {
		return this.getImagesForMatches(matches);
	} else {
		return null;
	}
};


/**
 * given a single image hosting service URL, this returns a URL to the image itself
 * @param {string} url
 * @return {string|null}
 */
SpazImageURL.prototype.getImageForUrl = function(url) {
	var urls = this.getImagesForUrls(url);
	if (urls) {
		return urls[url];
	} else {
		return null;
	}
};
