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
	this.startEvent   = opts.startEvent   || null;
	this.successEvent = opts.successEvent || null;
	this.failureEvent = opts.failureEvent || null;
	this.eventTarget  = opts.eventTarget  || null;
	
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
			'api_key_field': 'api_key', // setting this to non-empty means we MUST set an api key
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					var mediaurl = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					var errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
		'yfrog' : {
		    'upload_url' : 'http://yfrog.com/api/upload',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					var mediaurl = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					var errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
	    'twitpic' : {
			'upload_url' : 'http://twitpic.com/api/upload',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					var mediaurl = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					var errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
		'twitgoo' : {
			'upload_url' : 'http://twitgoo.com/api/upload',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					var mediaurl = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					var errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
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
SpazFileUploader.prototype.setAPIkey = function(api_key) {
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
SpazFileUploader.prototype.getAPIkey = function() {
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
 *   'onSuccessEvent':function(){},
 *   'onFailureEvent':function(){},
 *   'message':''
 *   
 * } 
 */
SpazFileUploader.prototype.upload = function(file_url, opts) {

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
		extraParams[api.api_key_field] = api.getAPIkey();
	}

	/*
		A callback in case we need to massage the data before upload
	*/
	if (api.onBeforeSend) {
		api.onBeforeSend.call(api, extraParams, api.upload_url, file_url);
	}
	
	
	// upload the file
	sc.helpers.HTTPUploadFile({
		'extra'  :extraParams,
		'url'    :api.upload_url,
		'file_url':file_url,
		'onSuccess' : function(event) {},
		'onFailure': function(event) {
			api.processResult.call(thisSFU, event, api);
		}
	});

};
