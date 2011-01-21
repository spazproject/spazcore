/**
* This library ONLY WORKS IN AIR atm 
* 
* This is a conversion of the actionscript library from twstreamer <http://github.com/r/twstreamer/> into JavaScript.
* No license was listed on the git repo, so I am assuming something public domain or new-BSD-ish.
* 
* @constructor
*/
var SpazTwitterStream = function(opts) {
	var that = this;

	var isReading    = false;
	var amountRead   = 0;
	var streamBuffer = '';
	
	this.opts = sch.defaults({
		'auth'		: null,
		'userstream_url': "https://userstream.twitter.com/2/user.json",
		'onData'	: null,
		'onError'	: null
	}, opts);
	
	this.stream = new air.URLStream;
	
	/**
	 * holds timeout ID for reconnect timer 
	 */
	this.timeout;

	/**
	 * 
	 * @function 
	 */
	this.connect = function() {
		that.restartTimer();
		
		// reset these values on connection
		isReading    = false;		
		amountRead   = 0;
		streamBuffer = "";
		
		var request = createStreamRequest(that.opts.userstream_url, that.opts.auth);
		that.stream = new air.URLStream();
		that.stream.addEventListener(air.IOErrorEvent.IO_ERROR, errorReceived);
		that.stream.addEventListener(air.ProgressEvent.PROGRESS, dataReceived);
		that.stream.load(request);
	};

	/**
	 * 
	 * @function 
	 */
	this.disconnect = function() {
		if (that.timeout) {
			clearTimeout(that.timeout);
		}
		
		that.stream.close();
		that.stream = null;
	};
	
	/**
	 * 
	 * @function 
	 */
	this.restartTimer = function() {
		sch.debug('Restarting streaming timer');
		
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		
		this.timeout = setTimeout(
			function() {
				sch.error('Reconnecting to stream!');
				that.disconnect();
				that.connect();
			},
			90000 // 90 second timeout
		);
	};

	function createStreamRequest(username, pass) {
		var request = new air.URLRequest(that.opts.userstream_url);
		var auth_header = that.opts.auth.signRequest(air.URLRequestMethod.POST, that.opts.userstream_url, '');
		sch.debug('auth_header:'+auth_header);
		request.requestHeaders = new Array(new air.URLRequestHeader("Authorization", auth_header));
		request.method = air.URLRequestMethod.POST;
		request.data = '';
		return request;
	}

	function errorReceived(e) {
		sch.error("errorReceived in stream");
		if (that.opts.onError) {
			that.opts.onError.call(this, e);
		}
	}


	function dataReceived(e) {
		sch.debug("dataReceived");
		sch.debug(e.toString());
		
		that.restartTimer();
		
		var toRead = e.bytesLoaded - amountRead;
		sch.debug("toRead:"+toRead);
		var buffer = that.stream.readUTFBytes(toRead);
		sch.debug("buffer:"+buffer);
		amountRead = e.bytesLoaded;
		sch.debug("amountRead:"+amountRead);
		
		var parts = [];
		if (!isReading) {
			parts = buffer.split(/\n/);
			var firstPart = parts[0].replace(/[\s\n]*/, "");
			sch.debug("firstPart:"+firstPart);
			buffer = parts.slice(1).join("\n");
			sch.debug("buffer:"+buffer);
			isReading = true;
		}
		
		// pump the JSON pieces through
		if ((toRead > 0) && (amountRead > 0)) {
			streamBuffer += buffer;
			sch.debug("streamBuffer:"+streamBuffer);
			parts = streamBuffer.split(/\n/);
			sch.debug("parts:"+parts);
			var lastElement = parts.pop();
			for (var i=0; i < parts.length; i++) {
				sch.debug('parts['+i+']:'+parts[i]);
				if (that.opts.onData) {
					that.opts.onData.call(this, parts[i]);
				}
			}
			streamBuffer = lastElement;
			sch.debug("streamBuffer:"+streamBuffer);
		}
	}
};
