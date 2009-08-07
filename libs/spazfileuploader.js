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
		'yfrog' : {
		    'upload_url' : 'http://yfrog.com/api/upload',
			'gethumb_url': '',
			'getfull_url': '',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue == 'ok')
				{
					var mediaurl = $(xmldoc).find('mediaurl').text();
					prepPhotoPost(mediaurl);
					$('#status-text').html('Complete');
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
	    'twitpic' : {
			'upload_url' : 'http://twitpic.com/api/upload'
			'gethumb_url': '',
			'getfull_url': '',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue == 'ok')
				{
					var mediaurl = $(xmldoc).find('mediaurl').text();
					prepPhotoPost(mediaurl);
					$('#status-text').html('Complete');
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
		'twitgoo' : {
			'upload_url' : 'http://twitgoo.com/api/upload'
			'gethumb_url': '',
			'getfull_url': '',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue == 'ok')
				{
					var mediaurl = $(xmldoc).find('mediaurl').text();
					prepPhotoPost(mediaurl);
					$('#status-text').html('Complete');
				} 
				else
				{
					var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
					errMsg = errAttributes.getNamedItem("msg").nodeValue;
				}
			}
		},
		
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

	var thisSFU = this;

	if (opts.api) {
		var api = this.apis.api;
	} else {
		var api = this.api;
	}
	
	var username = opts.username || null;
	var password = opts.password || null;
	var source   = opts.source   || null;
	var message  = opts.message  || null;

	var onStart = opts.onStart || null;



	// upload the file
	sc.helpers.uploadFile({
		'extra'  :{
			"username": username,
			"password": password,
			"source":   source,
			"message":  message
		},
		'url'    :api.upload_url,
		'file_url':file_url,
		'onStart' : function(event) {},
		'onComplete': function(event) {
			api.processResult.call(thisSFU, event, api);
		}
	});

};
