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
 * }
 */
sc.helpers.HTTPUploadFile = function(opts) {

	function getContentType(fileType){
		switch (fileType) {
			  case "JPG": return "image/jpeg";
			 case "JPEG": return "image/jpeg";
			  case "PNG": return "image/png";
			  case "GIF": return "image/gif";
				 default: return "image/jpeg";
		}
	}


	/**
	 * Multipart File Upload Request Helper Function
	 *
	 * A function to help prepare URLRequest object for uploading.
	 * The script works without FileReference.upload().
	 *
	 * @author FreeWizard
	 *
	 * Function Parameters:
	 * void PrepareMultipartRequest(URLRequest request, ByteArray file_bytes,
	 *								string field_name = "file", string native_path = "C:\FILE",
	 *								object data_before = {}, object data_after = {});
	 *
	 * Sample JS Code:
	 * <script>
	 * var request = new air.URLRequest('http://example.com/upload.php');
	 * var loader = new air.URLLoader();
	 * var file = new air.File('C:\\TEST.TXT'); //use file.browseForOpen() on ur wish
	 * var stream = new air.FileStream();
	 * var buf = new air.ByteArray();
	 * var extra = {
	 *	   "id": "abcd"
	 *	   };
	 * stream.open(file, air.FileMode.READ);
	 * stream.readBytes(buf);
	 * MultipartRequest(request, buf, 'myfile', file.nativePath, extra);
	 * loader.load(request);
	 * </script>
	 *
	 * Sample PHP Code:
	 * <?php
	 * $id = $_POST['id'];
	 * move_uploaded_file($_FILES['myfile']['tmp_name'], '/opt/blahblah');
	 * ?>\
	 * @link http://rollingcode.org/blog/2007/11/file-upload-with-urlrequest-in-air.html
	 */
	function prepareMultipartRequest(request, file_bytes, file_type, field_name, native_path, data_before, data_after) {
		var boundary = '---------------------------1076DEAD1076DEAD1076DEAD';
		var header1 = '';
		var header2 = '\r\n';
		var header1_bytes = new air.ByteArray();
		var header2_bytes = new air.ByteArray();
		var body_bytes = new air.ByteArray();
		var n;
		if (!field_name) { field_name = 'file'; }
		if (!file_type) {file_type = 'application/octet-stream';}
		if (!native_path) {native_path = 'C:\\FILE';}
		if (!data_before) {data_before = {};}
		if (!data_after) {data_after = {};}
		for (n in data_before) {
			header1 += '--' + boundary + '\r\n' +
					   'Content-Disposition: form-data; name="' + n + '"\r\n\r\n'+
					    data_before[n] + '\r\n';
		}
		header1 += '--' + boundary + '\r\n' +
				   'Content-Disposition: form-data; name="' + field_name + '"; filename="' + native_path + '"\r\n' +
				   'Content-Type: ' + file_type + '\r\n\r\n';
		for (n in data_after) {
			header2 += '--' + boundary + '\r\n' +
					   'Content-Disposition: form-data; name="' + n + '"\r\n\r\n' +
					   data_after[n] + '\r\n';
		}
		header2 += '--' + boundary + '--';
		header1_bytes.writeMultiByte(header1, "ascii");
		header2_bytes.writeMultiByte(header2, "ascii");
		body_bytes.writeBytes(header1_bytes, 0, header1_bytes.length);
		body_bytes.writeBytes(file_bytes, 0, file_bytes.length);
		body_bytes.writeBytes(header2_bytes, 0, header2_bytes.length);
		request.method = air.URLRequestMethod.POST;
		request.contentType = 'multipart/form-data; boundary='+boundary;
		request.data = body_bytes;
	}



	var field_name = opts.field_name || 'media';
	var content_type = opts.content_type || null;

	var file   = new air.File(opts.file_url); //use file.browseForOpen() on ur wish
	var stream = new air.FileStream();
	var buf    = new air.ByteArray();



	stream.open(file, air.FileMode.READ);
	stream.readBytes(buf);



	
	if (!content_type) {
		content_type = getContentType(file.extension.toUpperCase());
	}
	
	var request = new air.URLRequest(opts.url);
	prepareMultipartRequest(request, buf, content_type, field_name, file.nativePath, opts.extra);

	var loader = new air.URLLoader();
	if (opts.onComplete) {
		loader.addEventListener(air.Event.COMPLETE, opts.onComplete);
	}
	if (opts.onStart) {
		loader.addEventListener(air.Event.OPEN, opts.onStart);
	}
	
	loader.load(request);




};

