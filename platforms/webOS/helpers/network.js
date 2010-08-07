/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Mojo, use_palmhost_proxy;

/**
 * opts = {
 *  content_type:'', // optional
 *  field_name:'', //optional, default to 'media;
 *  file_url:'',
 *  url:'', // REQ
 *  platform: {
 * 		sceneAssistant:{} // REQ; the sceneAssistant we're firing the service req from
 *  }
 * 	extra:{...} // extra post fields (text/plain only atm)
 * } 
 * @param Function onSuccess 
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {
	
	sch.debug('in HTTPUploadFile ================!!!!!!!!!!!!!!');
	
	opts = sch.defaults({
        'method':'POST',
        'content_type':'img',
        'field_name':'media',
        'file_url':null,
        'url':null,
        'extra':null,
        'headers':null,
        'username':null,
        'password':null
    }, opts);
	
	var key, val, postparams = [], customHttpHeaders = [];
	var file_url   = opts.file_url || null;
	var url        = opts.url      || null;
	var field_name = opts.field_name || 'media';
	var content_type = opts.content_type || 'img';

	if (opts.extra) {
		for (key in opts.extra) {
			val = opts.extra[key];
			postparams.push({ 'key' :key, 'data':val, contentType:'text/plain' });
		}
	}
	
	if (opts.username) {
		postparams.push({ 'key' :'username', 'data':opts.username, contentType:'text/plain' });
	}
	if (opts.password) {
		postparams.push({ 'key' :'password', 'data':opts.password, contentType:'text/plain' });
	}
	
	
	if (opts.platform) {
		var sceneAssistant = opts.platform.sceneAssistant;
	} else {
		sch.error('You must pass the opts.platform.sceneAssistant argument to upload on webOS');
		return;
	}
	
	var headers = [];
	if (opts.headers) {
		for(key in opts.headers) {
			customHttpHeaders.push( key + ': ' + opts.headers[key] );
		}
	}
	
	sch.debug('OPTS =============');
	sch.debug(opts);
	sch.debug('OPTS.EXTRA =============');
	sch.debug(opts.extra);
	sch.debug('ONSUCCESS =============');
	sch.debug(onSuccess);
	sch.debug('ONFAILURE =============');
	sch.debug(onFailure);
	sch.debug('POSTPARAMS =============');
	sch.debug(postparams);
	sch.debug('sceneAssistant =============');
	sch.debug(sceneAssistant);

	var onSuccessCheck = function(resp) {
		if (resp.completed) { // we're actually done
			onSuccess(resp); 
		} else { // fire a progress event
			jQuery(document).trigger('spazcore_upload_progress', [resp]);
		}
	};


	
	sceneAssistant.controller.serviceRequest('palm://com.palm.downloadmanager/', {
		method: 'upload', 
		parameters: {
			'url'        : url,
			'contentType': content_type,
			'fileLabel'  : field_name,
			'fileName'   : file_url,
			'postParameters': postparams,
			cookies      : {}, // optional
			customHttpHeaders: customHttpHeaders, // optional
			subscribe    : true 
		},
		'onSuccess' : onSuccessCheck,
		'onFailure' : onFailure
	 });
};