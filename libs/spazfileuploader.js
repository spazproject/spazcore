/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, jQuery;


/**
 * A file uploader class for SpazCore 
 */

/**
 * Events used by this library 
 */
if (!sc.events) { sc.events = {}; }
sc.events.fileUploadStart	= 'fileUploadStart';
sc.events.fileUploadSuccess	= 'fileUploadSuccess';
sc.events.fileUploadFailure	= 'fileUploadFailure';



/**
 * Constructor
 * 
 * opts = {
 *   api:'',
 *   startEvent:'',
 *   successEvent:'',
 *   failureEvent:'',
 *   eventTarget:DOMElement
 * } 
 */
function SpazFileUploader(opts) {

	if (!opts) { opts = {}; }
		
	if (opts.api) {
		this.setAPI(opts.api);
	}
	this.startEvent   = opts.startEvent   || sc.events.fileUploadStart;
	this.successEvent = opts.successEvent || sc.events.fileUploadSuccess;
	this.failureEvent = opts.failureEvent || sc.events.fileUploadFailure;
	this.eventTarget  = opts.eventTarget  || document;
	
	this.apis = this.getAPIs();

}

/**
 * returns an array of API labels
 * @return array 
 */
SpazFileUploader.prototype.getAPILabels = function() {
	var labels = [];
	for ( var key in this.getAPIs() ) {
		labels.push(key);
	}
	return labels;
};


/**
 * This builds the apis hash and returns it. All API stuff is defined inside here
 */
SpazFileUploader.prototype.getAPIs = function() {

	var thisSFU = this;

	var apis = {
		'pikchur' : {
		    'upload_url' : 'http://api.pikchur.com/simple/upload',
		    'post_url' : 'http://api.pikchur.com/simple/uploadAndPost',
			'api_key_field': 'api_key', // setting this to non-empty means we MUST set an api key
			'processResult': function(event, apiobj) {
				var loader = event.target;
				
				var returnobj = {}

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
		'yfrog' : {
		    'upload_url' : 'http://yfrog.com/api/upload',
		    'post_url' : 'http://yfrog.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
	    'twitpic' : {
			'upload_url' : 'http://twitpic.com/api/upload',
		    'post_url'   : 'http://twitpic.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;
				
				sch.debug('PROCESSING: EVENT');
				sch.debug(event);

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(event.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
		'twitgoo' : {
			'upload_url' : 'http://twitgoo.com/api/upload',
			'post_url'   : 'http://twitgoo.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		}//,
		/*
			Not sure if we should continue to support tweetphoto; API is complex
		*/
		// 'tweetphoto': {
		// 	'upload_url' : 'http://tweetphotoapi.com/api/tpapi.svc/upload2',
		// 	'api_key_field': 'TPAPIKEY', // this means we need to set the api key
		// 	'onBeforeSend' : function(extraParams, api.upload_url, file_url) {
		// 	
		// 	},
		// 	'processResult': function(event, apiobj) {
		// 		var loader = event.target;
		// 
		// 		var parser=new DOMParser();
		// 		var xmldoc = parser.parseFromString(loader.data,"text/xml");
		// 
		// 		if (jQuery(xmldoc).find('Status').text().toLowerCase() === 'ok')
		// 		{
		// 			var mediaurl = jQuery(xmldoc).find('MediaUrl').text();
		// 		} 
		// 		else
		// 		{
		// 			sch.error('There was an error uploading to TweetPhoto')
		// 			var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
		// 			var errMsg = errAttributes.getNamedItem("msg").nodeValue;
		// 		}
		// 	}	
		// }
		
	};

	return apis;

};

/**
 * Pass the api you want to use as a string
 * @param {string} apilabel 
 */
SpazFileUploader.prototype.setAPI = function(apilabel) {
	this.api = this.apis[apilabel];
};

/**
 * some services require an api key or app identifier. This sets that.
 * @param {string} api_key
 */
SpazFileUploader.prototype.setAPIKey = function(api_key) {
	if (this.api) {
		this.api.api_key = api_key;
	} else {
		sch.error('Must set the API before setting API key');
	}
};

/**
 * some services require an api key or app identifier. This sets that.
 * @param {string} api_key
 */
SpazFileUploader.prototype.getAPIKey = function() {
	if (this.api) {
		return this.api.api_key;
	} else {
		sch.error('Must set the API before getting API key');
	}
};

/**
 * opts = {
 *   'api':'', // use if not set already
 *   'username':'xxx',
 *   'password':'xxx',
 *   'source':'xxx',
 *   'message':''
 *   
 * } 
 * 
 * This uploads a file located at the given file_url. It uses the
 * sc.helpers.HTTPUploadFile as defined for your given platform.  Events are
 * raised as set in the constructor on start, success and failure.
 * 
 * Note that in the webOS implementation, success events are raised every time
 * progress is reported, NOT just when completion happens. Check for the
 * "completed" boolean property in the response object. This may change in the
 * future.
 * 
 * @param {string} post_url  the url we're uploading the file to
 * @param {string} file_url  the local url of the file we're uploading
 * @param {object} opts  a set of key/val pairs
 */
SpazFileUploader.prototype.uploadFile = function(post_url, file_url, opts) {

	var api, api_key;

	var thisSFU = this;

	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	var username = opts.username || null;
	var password = opts.password || null;
	var source   = opts.source   || null;
	var message  = opts.message  || null;
	
	/*
		platform opts are for platform-specific options. For now we're using
		this because webOS requires the scene controller to call the service
		request, so we pass a reference to the scene assistant
	*/
	var platformOpts = opts.platform || null;

	var onStart = opts.onStart || null;

	var extraParams = {
		"username": username,
		"password": password,
		"source":   source,
		"message":  message
	};
	
	/**
	 * if we have an API key field, then we need the api key 
	 */
	if ( (api.api_key_field) ) {
		extraParams[api.api_key_field] = this.getAPIKey();
	}

	/*
		A callback in case we need to massage the data before upload
	*/
	if (api.onBeforeSend) {
		api.onBeforeSend.call(api, extraParams, api.upload_url, file_url);
	}
	
	/*
		trigger upload start event
	*/
	sc.helpers.triggerCustomEvent(thisSFU.startEvent, thisSFU.eventTarget);
	
	// upload the file
	sc.helpers.HTTPUploadFile({
			'extra'   : extraParams,
			'url'     : post_url,
			'file_url': file_url,
			'platform': platformOpts
		},
		function(event) {
			sch.debug('UPLOAD SUCCESS, PROCESSING');
			/*
				For now we're not using the processResult methods, as the 
				implementation can vary by platform. For now, process response
				externally.
			*/
			// var data = api.processResult.call(thisSFU, event, api);
			// sch.debug(data);
			sc.helpers.triggerCustomEvent(thisSFU.successEvent, thisSFU.eventTarget, event);
		},
		function(event) {
			sch.debug('UPLOAD FAILURE, PROCESSING');
			/*
				For now we're not using the processResult methods, as the 
				implementation can vary by platform. For now, process response
				externally.
			*/
			// var data = api.processResult.call(thisSFU, event, api);
			// sch.debug(data);
			sc.helpers.triggerCustomEvent(thisSFU.failureEvent, thisSFU.eventTarget, event);
		}
	);
};



/**
 * a wrapper for uploadFile that uses the post_url from the API definition 
 */
SpazFileUploader.prototype.uploadAndPost = function(file_url, opts) {
	var api;
	
	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	this.uploadFile(api.post_url, file_url, opts);
	
};

/**
 * a wrapper for uploadFile that uses the upload_url from the API definition 
 */
SpazFileUploader.prototype.upload = function(file_url, opts) {
	
	var api;
	
	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	this.uploadFile(api.upload_url, file_url, opts);
	
};

