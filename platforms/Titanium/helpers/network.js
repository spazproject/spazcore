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
 *	content_type:'', // optional
 *	field_name:'', //optional, default to 'media;
 *	file_url:'',
 *	url:'',
 *	extra:{...}
 *	headers:{...}
 * 
 * 
 * }
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {

	function callback_for_upload_progress(event) { 
		var pct;
		console.log(events);
		if (event.bytesLoaded && event.bytesTotal) {
			pct = Math.ceil( ( event.bytesLoaded / event.bytesTotal ) * 100 ); 
			sch.error('Uploaded ' + pct.toString() + '%');
		}
		
		sch.debug('onsendstream', e.progress);
		sch.debug(http.dataSent());
		if (opts.onProgress) { opts.onProgress(e, pct); }
		
		// 
		// if (opts.onProgress) {
		//	opts.onProgress({
		//		'bytesLoaded':event.bytesLoaded,
		//		'bytesLoaded':event.bytesTotal,
		//		'percentage':pct
		//	});
		// }
	}

	function callback_for_upload_finish(event) {
		console.log('File upload complete');
		sch.error('http.responseText:');
		sch.error(http.responseText);
		if (onSuccess) {
			onSuccess(http.responseText, http);
		}
	}
	
	function callback_for_error(event) {
		sch.error('IOError!', event);
		console.log(http.responseText);
		if (onFailure) {
			onFailure(http.responseText, http);
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

	
	
	
	var http = Titanium.Network.createHTTPClient();
	var uploading_fs = Titanium.Filesystem.getFileStream(opts.file_url);
	uploading_fs.open(Titanium.Filesystem.MODE_READ);
	var file_data = uploading_fs.read();
	uploading_fs.close();
	
	
	http.onsendstream = function(e) {
		console.log('onsendstream', e.progress);
		console.log(http.dataReceived);
	};
	http.onerror = callback_for_error;
	http.onload = callback_for_upload_finish;

	http.open(opts.method, opts.url, true);

	
	// build data hash
	var data = {};

	if (opts.username) {
		data.username = opts.username;
	}

	if (opts.password) {
		data.password = opts.password;
	}

	var key;	
	if (opts.extra) {
		for(key in opts.extra) {
			data[key] = opts.extra[key];
		}
	}
	
	// set uploading file data
	data[opts.field_name] = file_data;
	
	// set headers
	http.setRequestHeader("content-type", opts.content_type);
	if (opts.headers) {
		for(key in opts.headers) {
			http.setRequestHeader( key, opts.headers[key] );
		}
	}

	http.send(data);	

};

