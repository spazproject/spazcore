/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, air;

 
/**
 * This really only supports image uploads right now (jpg, gif, png) 
 * 
 * opts = {
 *  content_type:'', // optional
 *  field_name:'', //optional, default to 'media;
 *  file_url:'',
 *  url:'',
 * 	extra:{...}
 * 
 * 
 * mostly taken from http://carefulweb.com/blog/2008/06/24/upload-server-adobe-air-and-javascript/
 * 
 * }
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {

	function callback_for_upload_progress(event) { 

	    var pct = Math.ceil( ( event.bytesLoaded / event.bytesTotal ) * 100 ); 
	    air.trace('Uploaded ' + pct.toString() + '%');
		
		if (opts.onProgress) {
			opts.onProgress({
				'bytesLoaded':event.bytesLoaded,
				'bytesLoaded':event.bytesTotal,
				'percentage':pct
			});
		}
	}

	function callback_for_upload_finish(event) {
		air.trace('File upload complete');
		air.trace(event.data); // output of server response to AIR dev console
		if (onSuccess) {
			onSuccess(event.data);
		}
	}

	var field_name   = opts.field_name || 'media';
	var content_type = opts.content_type || null;
	
	var uploading_file = new air.File(opts.file_url);
	
	var key;

	// creating POST request variables (like in html form fields)
	var variables = new air.URLVariables();

	if (opts.username) {
		variables.username = opts.username;
	}

	if (opts.password) {
		variables.password = opts.password;
	}
	
	if (opts.extra) {
		for(key in opts.extra) {
			variables[key] = opts.extra[key];
		}
	}
	
	var headers = [];
	if (opts.headers) {
		for(key in opts.headers) {
			sch.error(key);
			sch.error(opts.headers[key]);
			headers.push( new air.URLRequestHeader(key, opts.headers[key]) );
		}
	}
	

	// set params for http request
	var tmpRequest = new air.URLRequest(opts.url);
	tmpRequest.authenticate = false;
	tmpRequest.method = air.URLRequestMethod.POST;
	tmpRequest.contentType = 'multipart/form-data';
	tmpRequest.requestHeaders = headers;
	
	// assigning variables to request
	tmpRequest.data = variables;

	// attach events for displaying progress bar and upload complete
	uploading_file.addEventListener(air.ProgressEvent.PROGRESS, callback_for_upload_progress);
	uploading_file.addEventListener(air.DataEvent.UPLOAD_COMPLETE_DATA, callback_for_upload_finish); 

	// doing upload request to server
	uploading_file.upload(tmpRequest, field_name, false);
	

};

