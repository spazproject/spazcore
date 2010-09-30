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
 * An image uploader library for SpazCore. Probably this will supercede spazfileuploader.js
 * @param {object} [opts] options hash
 * @param {object} [opts.auth_obj] A SpazAuth object that's filled with proper authentication info
 * @param {string} [opts.username] a username, in case we're doing that kind of thing
 * @param {string} [opts.password] a password, in case we're doing that kind of thing
 * @param {string} [opts.auth_method] the method of authentication: 'echo' or 'basic'. Default is 'echo'
 * @param {object} [opts.extra] Extra params to pass in the upload request
 * @constructor
 */
var SpazImageUploader = function(opts) {
    if (opts) {
        this.setOpts(opts);
    }
};


/**
 * this lets us set options after instantiation 
 * @param {object} opts options hash
 * @param {object} [opts.auth_obj] A SpazAuth object that's filled with proper authentication info
 * @param {string} [opts.username] a username, in case we're doing that kind of thing
 * @param {string} [opts.password] a password, in case we're doing that kind of thing
 * @param {string} [opts.auth_method] the method of authentication: 'echo' or 'basic'. Default is 'echo'
 * @param {string} [opts.statusnet_api_base] the api base URL for statusnet, if that service is used
 * @param {object} [opts.extra] Extra params to pass in the upload request
 */
SpazImageUploader.prototype.setOpts = function(opts) {
    this.opts = sch.defaults({
        'extra':{},
        'auth_obj':null,
        'username':null,
        'password':null,
        'auth_method':'echo', // 'echo' or 'basic'
		'statusnet_api_base':null // only used by statusnet
    }, opts);
};

/**
 * returns an array of labels for the services 
 * @return array
 */
SpazImageUploader.prototype.getServiceLabels = function() {
	var labels = [];
	for(var key in this.services) {
		labels.push(key);
	}
	return labels;
};

/**
 * a hash of service objects. Each object has a URL endpoint, a parseResponse callback, and an optional "extra" set of params to pass on upload
 *	parseResponse should return one of these key/val pairs:
 *	- {'url':'http://foo.bar/XXXX'}
 *	- {'error':'Error message'}
 */
SpazImageUploader.prototype.services = {
	'drippic' : {
		'url' : 'http://drippic.com/drippic2/upload',
		'parseResponse': function(data) {
			
			var parser=new DOMParser();
			xmldoc = parser.parseFromString(data,"text/xml");

			var status;
			var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
			status = rspAttr.getNamedItem("stat").nodeValue;
			
			if (status == 'ok') {
				var mediaurl = $(xmldoc).find('mediaurl').text();
				return {'url':mediaurl};
			} else {
				var errMsg;
				if (xmldoc.getElementsByTagName("err")[0]) {
					errMsg = xmldoc.getElementsByTagName("err")[0].childNodes[0].nodeValue;
				} else {
					errMsg = xmldoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
				}
				
				sch.error(errMsg);
				return {'error':errMsg};
			}
		}
	},
	'pikchur' : {
		'url'  : 'http://api.pikchur.com/simple/upload',
		'extra': {
			'api_key':'MzTrvEd/uPNjGDabr539FA',
			'source':'NjMw'
		},
		'parseResponse': function(data) {
			var parser=new DOMParser();
			xmldoc = parser.parseFromString(data,"text/xml");
	
			var status;
			var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
			if (rspAttr.getNamedItem("status")) {
				status = rspAttr.getNamedItem("status").nodeValue;
			} else if(rspAttr.getNamedItem("stat")) {
				status = rspAttr.getNamedItem("stat").nodeValue;
			} else {
				status = 'fuck I wish they would use the same goddamn nodenames';
			}
			
			if (status == 'ok') {
				var mediaurl = $(xmldoc).find('mediaurl').text();
				return {'url':mediaurl};
			} else {
				var errAttributes;
				if (xmldoc.getElementsByTagName("err")[0]) {
					errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
				} else {
					errAttributes = xmldoc.getElementsByTagName("error")[0].attributes;
				}
				
				sch.error(errAttributes);
				errMsg = errAttributes.getNamedItem("msg").nodeValue;
				sch.error(errMsg);
				return {'error':errMsg};
			}
		}
	},
	/*
		Removed yfrog for now because their oAuth Echo stuff never seems to work.
		Not sure if it's my code or theirs
	*/
    // 'yfrog' : {
    //     'url' : 'http://yfrog.com/api/xauth_upload',
    //     'extra': {
    //         'key':'579HINUYe8d826dd61808f2580cbda7f13433310'
    //     },
    //     'parseResponse': function(data) {
    //         
    //         var parser=new DOMParser();
    //         xmldoc = parser.parseFromString(data,"text/xml");
    // 
    //         var status;
    //         var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
    //         status = rspAttr.getNamedItem("stat").nodeValue;
    //         
    //         if (status == 'ok') {
    //             var mediaurl = $(xmldoc).find('mediaurl').text();
    //             return {'url':mediaurl};
    //         } else {
    //             var errAttributes;
    //             if (xmldoc.getElementsByTagName("err")[0]) {
    //                 errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
    //             } else {
    //                 errAttributes = xmldoc.getElementsByTagName("error")[0].attributes;
    //             }
    //             
    //             sch.error(errAttributes);
    //             errMsg = errAttributes.getNamedItem("msg").nodeValue;
    //             sch.error(errMsg);
    //             return {'error':errMsg};
    //         }
    //         
    //     }
    // },
	'twitpic' : {
		'url' : 'http://api.twitpic.com/2/upload.json',
		'extra': {
			'key':'3d8f511397248dc913193a6195c4a018'
		},
		'parseResponse': function(data) {
			
			if (sch.isString(data)) {
				data = sch.deJSON(data);
			}
			
			if (data.url) {
				return {'url':data.url};
			} else {
				return {'error':'unknown error'};
			}
			
		}
	},
	'twitgoo' : {
		'url'  : 'http://twitgoo.com/api/upload',
		'extra': {
			'format':'xml',
			'source':'Spaz',
			'source_url':'http://getspaz.com'
		},
		'parseResponse': function(data) {
			
			var parser=new DOMParser();
			xmldoc = parser.parseFromString(data,"text/xml");

			var status;
			var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
			status = rspAttr.getNamedItem("status").nodeValue;

			if (status == 'ok') {
				var mediaurl = $(xmldoc).find('mediaurl').text();
				return {'url':mediaurl};
			} else {
				var errAttributes;
				if (xmldoc.getElementsByTagName("err")[0]) {
					errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
				} else {
					errAttributes = xmldoc.getElementsByTagName("error")[0].attributes;
				}

				sch.error(errAttributes);
				errMsg = errAttributes.getNamedItem("msg").nodeValue;
				sch.error(errMsg);
				return {'error':errMsg};
			}
			
		}
	},
	'identi.ca' : {
		'url'  : 'http://identi.ca/api/statusnet/media/upload',
		'parseResponse': function(data) {
			
			var parser=new DOMParser();
			xmldoc = parser.parseFromString(data,"text/xml");

			var status;
			var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
			status = rspAttr.getNamedItem("stat").nodeValue;
			
			if (status == 'ok') {
				var mediaurl = $(xmldoc).find('mediaurl').text();
				return {'url':mediaurl};
			} else {
				var errMsg;
				if (xmldoc.getElementsByTagName("err")[0]) {
					errMsg = xmldoc.getElementsByTagName("err")[0].childNodes[0].nodeValue;
				} else {
					errMsg = xmldoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
				}
				
				sch.error(errMsg);
				return {'error':errMsg};
			}
		}
	},
	'statusnet' : {
		'url'  : '/statusnet/media/upload',
		'prepForUpload':function() {
			if (this.opts.statusnet_api_base) {
				this.services.statusnet.url = this.opts.statusnet_api_base + this.services.statusnet.url;
			} else {
				sch.error('opts.statusnet_api_base must be set to use statusnet uploader service');
			}
		},
		'parseResponse':function(data) {
			var parser=new DOMParser();
			xmldoc = parser.parseFromString(data,"text/xml");

			var status;
			var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
			status = rspAttr.getNamedItem("stat").nodeValue;
			
			if (status == 'ok') {
				var mediaurl = $(xmldoc).find('mediaurl').text();
				return {'url':mediaurl};
			} else {
				var errMsg;
				if (xmldoc.getElementsByTagName("err")[0]) {
					errMsg = xmldoc.getElementsByTagName("err")[0].childNodes[0].nodeValue;
				} else {
					errMsg = xmldoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
				}
				
				sch.error(errMsg);
				return {'error':errMsg};
			}
			
		}
	}
};

/**
 * Retrieves the auth_header 
 */
SpazImageUploader.prototype.getAuthHeader = function() {
	
	var opts = sch.defaults({
		'getEchoHeaderOpts':{}
	}, this.opts);
	
	var auth_header;
	var user = opts.username;
	var pass = opts.password;
	
	if (opts.auth_method === 'echo') { // this is Twitter. hopefully

		var twit	= new SpazTwit({'auth':opts.auth_obj});
		auth_header = twit.getEchoHeader(opts.getEchoHeaderOpts);

	} else {
		auth_header = opts.auth_obj.signRequest(); // returns basic auth header
	}
	
	sch.error(auth_header);
	return auth_header;

};


/**
 * this actually does the upload. Well, really it preps the data and uses sc.helpers.HTTPFileUpload 
 */
SpazImageUploader.prototype.upload = function() {

	var opts = sch.defaults({
		extra:{}
	}, this.opts);
	
	var srvc = this.services[opts.service];

	if (srvc.prepForUpload) {
		srvc.prepForUpload.call(this);
	}

	/*
		file url
	*/
	opts.url      = srvc.url;
	if (srvc.extra) {
		opts.extra = jQuery.extend(opts.extra, srvc.extra);
	}
	
	var onSuccess, rs;
	if (srvc.parseResponse) {
		/** @ignore */
		onSuccess = function(data) {
			if (sch.isString(data)) {
				rs = srvc.parseResponse.call(srvc, data);
				return opts.onSuccess(rs);
			} else if (data && data.responseString) { // webOS will return an object, not just the response string
				rs = srvc.parseResponse.call(srvc, data.responseString);
				return opts.onSuccess(rs);
			} else { // I dunno what it is; just pass it to the callback
				return opts.onSuccess(data);
			}
		};
	} else {
		onSuccess = opts.onSuccess;
	}
	
	/*
		get auth stuff
	*/
	var auth_header;
    if (opts.service === 'yfrog') {
		verify_url  = 'https://api.twitter.com/1/account/verify_credentials.xml';
		auth_header = this.getAuthHeader({
			'getEchoHeaderOpts': {
				'verify_url':verify_url
			}
		});
	} else {
		verify_url  = 'https://api.twitter.com/1/account/verify_credentials.json';
		auth_header = this.getAuthHeader();
	}
	
	sch.error(auth_header);
	if (auth_header.indexOf('Basic ') === 0) {
		
		opts.username = this.opts.auth_obj.getUsername();
		opts.password = this.opts.auth_obj.getPassword();

	} else {
		opts.headers = {
			'X-Auth-Service-Provider': verify_url,
			'X-Verify-Credentials-Authorization':auth_header
		};
		
	}
	
	sc.helpers.HTTPUploadFile(opts, onSuccess, opts.onFailure);
	
};