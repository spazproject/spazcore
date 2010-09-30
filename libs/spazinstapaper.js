
/**
 * a library to interact with the Instapaper API
 * 
 * @param {object} opts options
 * @param {string} [opts.username] the username
 * @param {string} [opts.password] the password
 * @constructor
**/
var SpazInstapaper = function(opts) {
	this.opts = sch.defaults({
		'username':null,
		'password':null
	}, opts);
};



SpazInstapaper.prototype.statuses = {
	'200' : 'authenticated',
	'201' : 'saved',
	'400' : 'bad request - missing parameter?',
	'403' : 'Invalid username or password',
	'500' : 'The service encountered an error. Please try again later'
};



SpazInstapaper.prototype.urls = {
	'authenticate' : 'https://www.instapaper.com/api/authenticate',
	'add'          : 'https://www.instapaper.com/api/add'
};


/**
 * Authenticate against the service (not ACTUALLY required -- see http://blog.instapaper.com/post/73123968/read-later-api)
 * 
 * @param {object} data data hash we'll pass to authenticate
 * @param {string} [data.username] the username -- required if not set in constructor
 * @param {string} [data.password] the password -- required if not set in constructor
 * @param {function} onSuccess callback to fire on success. takes no parameters
 * @param {function} onFailure callback to fire on failure. takes parameters errmsg, status_code, xhr
**/
SpazInstapaper.prototype.authenticate = function(data, onSuccess, onFailure) {
	data = sch.defaults({
		'username':this.opts.username,
		'password':this.opts.password
	}, data);
	
	if (data.title) {
		data['auto-title'] = 0;
	}
	
	var errmsg;
	var xhr = jQuery.ajax({
		'url'     : this.urls['authenticate'],
		'type'    : 'POST',
		'data'    : data,
		'complete': function(xhr, status) {
			if (xhr.status == '200') {
				onSuccess();
			} else {
				var status_code = xhr.status;
				if ( (errmsg = this.statuses[status_code]) ) {
					onFailure(errmsg, status_code, xhr);
				} else {
					onFailure('Unknown Error', status_code, xhr);
				}
			}
		},
		'dataType': 'text'
	});
};


/**
 * save a URL
 * 
 * @param {object} data data hash we'll pass to authenticate
 * @param {string} data.url the url to save
 * @param {string} [data.username] the username -- required if not set in constructor
 * @param {string} [data.password] the password -- required if not set in constructor
 * @param {string} [data.title] the title. If set, will not auto-retrieve title
 * @param {string} [data.selection] text to associate with the URL
 * @param {number} [data.auto-title] Whether to try to retrieve the document's title from the URL automatically. 1 or 0
 * @param {function} onSuccess callback to fire on success. takes one param, a hash with 'url' and 'title'
 * @param {function} onFailure callback to fire on failure. takes parameters errmsg, status_code, xhr
**/
SpazInstapaper.prototype.add = function(data) {
	opts = sch.defaults({
		'username':this.opts.username,
		'password':this.opts.password,
		'url':null,
		'title':null,
		'selection':null,
		'auto-title':1
	}, opts);
	
	if (opts.title) {
		opts['auto-title']=0;
	}
	

	var xhr = jQuery.ajax({
		'url'     : this.urls['add'],
		'type'    : 'POST',
		'data'    : data,
		'complete': function(xhr, status) {
			var errmsg;
			
			if (xhr.status === 201) {
				data = {
					'url'   : xhr.getResponseHeader('Content-Location'),
					'title' : xhr.getResponseHeader('X-Instapaper-Title')
				};
				onSuccess(data);
			} else {
				var status_code = xhr.status;
				if ( (errmsg = this.statuses[status_code]) ) {
					onFailure(errmsg, status, xhr);
				} else {
					onFailure('Unknown Error', status_code, xhr);
				}
			}
		},
		'dataType': 'text'
	});
};