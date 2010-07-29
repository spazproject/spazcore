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
 * An image uploader library for SpazCore 
 */
var SpazImageUploader = function(opts) {
    if (opts) {
        this.setOpts(opts);
    }
};


/**
 * this lets us set options after instantiation 
 */
SpazImageUploader.prototype.setOpts = function(opts) {
    this.opts = sch.defaults({
        'extra':{},
        'auth_obj':null,
        'username':null,
        'password':null,
        'auth_method':'echo' // 'echo' or 'basic'
    }, opts);
};

/*
	parseResponse should return one of these key/val pairs:
	- {'url':'http://foo.bar/XXXX'}
	- {'error':'Error message'}
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
	'pikchur' : {
		'url'  : 'http://api.pikchur.com/simple/upload',
		'extra': {
			'api_key':'MzTrvEd/uPNjGDabr539FA',
			'source':'Spaz'
		},
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
    'yfrog' : {
        'url' : 'http://yfrog.com/api/xauth_upload',
        'extra': {
            'key':'579HINUYe8d826dd61808f2580cbda7f13433310'
        },
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
	}
};


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
		auth_header = "Basic " + Base64.encode(user + ":" + pass);
	}
	
	sch.error(auth_header);
	return auth_header;

};



SpazImageUploader.prototype.upload = function() {

	var opts = sch.defaults({
		extra:{}
	}, this.opts);

    alert(sch.enJSON(this.services)+"\n=======================\n"+sch.enJSON(opts));

	var srvc = this.services[opts.service];

	/*
		file url
	*/
	opts.url      = srvc.url;
	if (srvc.extra) {
		opts.extra = jQuery.extend(opts.extra, srvc.extra);
	}
	
	var onSuccess;
	if (srvc.parseResponse) {
		onSuccess = function(data) {
			var rs = srvc.parseResponse.call(srvc, data);
			return opts.onSuccess(rs);
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
	
	if (auth_header.indexOf('Basic ') === 0) {
		opts.username = this.opts.username;
		opts.password = this.opts.password;
	} else {
		opts.headers = {
			'X-Auth-Service-Provider': verify_url,
			'X-Verify-Credentials-Authorization':auth_header
		};
		
	}
	
	sch.error(sch.enJSON(opts));
	
	sc.helpers.HTTPUploadFile(opts, onSuccess, opts.onFailure);
	
};