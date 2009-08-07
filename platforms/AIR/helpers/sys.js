/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, air, window, DOMParser;
 
/*
	We load this file to redefine platform-specific methods
*/

/*
	dump an object's first level to console
*/
sc.helpers.dump = function(obj) {
	var dumper;
	
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		dumper = air.trace;
	} else {
		dumper = function() {
			for(var x in obj) {
				air.trace("'"+x+"':"+obj[x]);
			}
		};
	}
	
	if (sc.helpers.isString(obj)) {
		dumper(obj);
	} else if(sc.helpers.isNumber(obj)) {
		dumper(obj.toString());
	} else if (obj === undefined) {
		dumper('UNDEFINED');
	} else if (obj === null) {
		dumper('NULL');
	} else { // this should be a "normal" object
		dumper(obj);
	}
};


/*
	Open a URL in the default system web browser
*/
sc.helpers.openInBrowser = function(url) {
	var request = new air.URLRequest(url);
	try {            
	    air.navigateToURL(request);
	} catch (e) {
	    air.trace(e.errorMsg);
	}
};


/*
	Gets the contents of a file
*/
sc.helpers.getFileContents = function(path) {
	var f = new air.File(path);
	if (f.exists) {
		var fs = new air.FileStream();
		fs.open(f, air.FileMode.READ);
		var str = fs.readMultiByte(f.size, air.File.systemCharset);
		fs.close();
		return str;
	} else {
		return false;
	}
};


sc.helpers.setFileContents = function(path, content, serialize) {
	
	if (serialize) {
		content = JSON.stringify(content);
	}
	
	sc.helpers.dump('setFileContents for '+path+ ' to "' +content+ '"');
	
	try { 
		var f = new air.File(path);
		var fs = new air.FileStream();
		fs.open(f, air.FileMode.WRITE);
		fs.writeUTFBytes(content);
		fs.close();
	} catch (e) {
		air.trace(e.errorMsg);
		sc.helpers.dump(e.name + ":" + e.message);
	}
};


/*
	Returns the current application version string
*/
sc.helpers.getAppVersion = function() {
	var appXML = air.NativeApplication.nativeApplication.applicationDescriptor;
	var domParser = new DOMParser();
	appXML = domParser.parseFromString(appXML, "text/xml");
	var version = appXML.getElementsByTagName("version")[0].firstChild.nodeValue;
	return version;
};


/*
	Returns the user agent string for the app
*/
sc.helpers.getUserAgent = function() {
	return window.htmlLoader.userAgent;
};


/*
	Sets the user agent string for the app
*/
sc.helpers.setUserAgent = function(uastring) {
	window.htmlLoader.userAgent = uastring;
	return window.htmlLoader.userAgent;
};



/*
	Gets clipboard text
*/
sc.helpers.getClipboardText = function() {
	if(air.Clipboard.generalClipboard.hasFormat("text/plain")){
	    var text = air.Clipboard.generalClipboard.getData("text/plain");
		return text;
	} else {
		return '';
	}
};

/*
	Sets clipboard text
*/
sc.helpers.setClipboardText = function(text) {
	sc.helpers.dump('Copying "' + text + '" to clipboard');
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT,text,false);
};


/*
	Loads a value for a key from EncryptedLocalStore
*/
sc.helpers.getEncryptedValue = function(key) {
	var storedValue = air.EncryptedLocalStore.getItem(key);
	var val = storedValue.readUTFBytes(storedValue.length);
	return val;
};

/*
	Sets a value in the EncryptedLocalStore of AIR
*/
sc.helpers.setEncyrptedValue = function(key, val) {
	var bytes = new air.ByteArray();
    bytes.writeUTFBytes(val);
    air.EncryptedLocalStore.setItem(key, bytes);
};


/*
	Get the app storage directory
*/
sc.helpers.getAppStoreDir = function() {
	return air.File.applicationStorageDirectory;
};


/**
 * 
 */
sc.helpers.getPreferencesFile = function(name, create) {
	if (!name) {name='preferences';}
	
	var prefsFile = sc.helpers.getAppStoreDir();
	prefsFile = prefsFile.resolvePath(name+".json");
	
	return prefsFile;
};

/*
	initializes a file at the given location. set overwrite to true
	to clear out an existing file.
	returns the air.File object or false
*/
sc.helpers.init_file = function(path, overwrite) {
	var file = new air.File(path);
	if ( !file.exists || (file.exists && overwrite) ) {
		var fs = new air.FileStream();
		fs.open(file, air.FileMode.WRITE);
		fs.writeUTFBytes('');
		fs.close();
		return file;
	} else {
		return false;
	}

};
