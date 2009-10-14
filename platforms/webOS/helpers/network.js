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
 *  sceneAssistant:{} // REQ; the sceneAssistant we're firing the service req from
 * 	extra:{...} // extra post fields (text/plain only atm)
 * } 
 * @param Function onSuccess 
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {
	var key, val, postparams = [];
	var file_url   = opts.file_url || null;
	var url        = opts.url      || null;
	var field_name = opts.file_url || 'media';
	var content_type = opts.content_type || 'img';
	
	if (opts.extra) {
		for (key in opts.extra) {
			val = opts.extra[key];
			postparams.push({ 'key' :key, 'data':val, contentType:'text/plain' });
		}
	}
	
	sch.debug(postparams);

	
	opts.sceneAssistant.controller.serviceRequest('palm://com.palm.downloadmanager/', {
		method: 'upload', 
		parameters: {
			'url'        : url,
			'contentType': content_type,
			'fileLabel'  : field_name,
			'fileName'   : file_url,
			'postParameters': postparams,
			cookies      : {}, // optional
			customHttpHeaders: [], // optional
			subscribe    : true 
		},
		'onSuccess' : onSuccess,
		'onFailure' : onFailure
	 });
};