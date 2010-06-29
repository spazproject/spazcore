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
 *  headers:{...}
 * 
 * 
 * }
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {

	function callback_for_upload_progress(event) { 

	    var pct = Math.ceil( ( event.bytesLoaded / event.bytesTotal ) * 100 ); 
	    sch.error('Uploaded ' + pct.toString() + '%');
		
		if (opts.onProgress) {
			opts.onProgress({
				'bytesLoaded':event.bytesLoaded,
				'bytesLoaded':event.bytesTotal,
				'percentage':pct
			});
		}
	}

	function callback_for_upload_finish(event) {
		sch.error('File upload complete');
		sch.error(event.data); // output of server response to AIR dev console
		if (onSuccess) {
			onSuccess(event.data);
		}
	}
	
    function callback_for_error(event) {
        sch.error('IOError!');
        if (onFailure) {
            onFailure(event);
        }
    }

    opts = sch.defaults({
        'method':'POST',
        'content_type':'multipart/form-data',
        'field_name':'media',
        'file_url':null,
        'url':null,
        'extra':null,
        'headers':null,
        'username':null,
        'password':null
    }, opts);

	var field_name   = opts.field_name;
	var content_type = opts.content_type;
	
	var uploading_file = new air.File(opts.file_url);
	


	// creating POST request variables (like in html form fields)
	var variables = new air.URLVariables();

	if (opts.username) {
		variables.username = opts.username;
	}

	if (opts.password) {
		variables.password = opts.password;
	}

	var key;	
	if (opts.extra) {
		for(key in opts.extra) {
			variables[key] = opts.extra[key];
		}
	}
	
	var headers = [];
	if (opts.headers) {
		for(key in opts.headers) {
			headers.push( new air.URLRequestHeader(key, opts.headers[key]) );
		}
	}
	

	// set params for http request
	var tmpRequest = new air.URLRequest(opts.url);
	tmpRequest.authenticate = false;
	tmpRequest.method = opts.method;
	tmpRequest.contentType = opts.content_type;
	tmpRequest.requestHeaders = headers;
	tmpRequest.data = variables;

	// attach events for displaying progress bar and upload complete
	uploading_file.addEventListener(air.ProgressEvent.PROGRESS, callback_for_upload_progress);
	uploading_file.addEventListener(air.DataEvent.UPLOAD_COMPLETE_DATA, callback_for_upload_finish); 
    uploading_file.addEventListener(air.SecurityErrorEvent.SECURITY_ERROR, callback_for_error);
    uploading_file.addEventListener(air.IOErrorEvent.IO_ERROR, callback_for_error);
    
	// doing upload request to server
	uploading_file.upload(tmpRequest, field_name, false);
	

};

