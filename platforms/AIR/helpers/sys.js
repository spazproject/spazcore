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
	AIR VERSION
	We load this file to redefine platform-specific methods
*/

/*
	dump an object's first level to console
*/
sc.helpers.dump = function(obj, level) {
	var dumper;
	
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}
	
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
sc.helpers.setEncryptedValue = function(key, val) {
	var bytes = new air.ByteArray();
    bytes.writeUTFBytes(val);
    air.EncryptedLocalStore.setItem(key, bytes);
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

