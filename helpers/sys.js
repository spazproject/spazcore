/*
	These are system-oriented functions, mostly utilizing AIR apis
	to interact with the OS
*/


const SPAZCORE_PLATFORM_AIR			= 'AIR';
const SPAZCORE_PLATFORM_WEBOS		= 'webOS';
const SPAZCORE_PLATFORM_TITANIUM	= 'Titanium';


/**
* returns a string identifier for the platform
* 
* Right now these checks are really, really basic
* 
* @return {String} an identifier for the platform
*/
sc.helpers.getPlatform = function() {
	if (window.runtime) {
		return SPAZCORE_PLATFORM_AIR;
	}
	if (Mojo) {
		return SPAZCORE_PLATFORM_WEBOS;
	}
	if (ti) {
		return SPAZCORE_PLATFORM_TITANIUM
	}
}

/**
* checks to see if current platform is the one passed in
* 
* use one of the defined constants, like SPAZCORE_PLATFORM_AIR
* 
* @param {String} str the platform you're checking for
* 
*/
sc.helpers.isPlatform = function(str) {
	platform = sc.helpers.getPlatform();
	if ( platform.toLowerCase() == str.toLowerCase() ) {
		return true;
	} else {
		return false;
	}
}


sc.helpers.isAIR = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_AIR);
}

sc.helpers.iswebOS = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_WEBOS);
}

sc.helpers.isTitanium = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_TITANIUM);
}


/*
	dump an object's first level to console
*/
sc.helpers.dump = function(obj) {

	
	var dumper = function(obj) {
		return false
	};
	
	/*
		for AIR
	*/
	if (sc.helpers.isAIR()) {
		dumper = function() {
			for(var x in obj) {
				air.trace("'"+x+"':"+obj[x]);
			}
		}
	}
	
	/*
		for Mojo
	*/
	if (sc.helpers.iswebOS()) {
		if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
			dumper = Mojo.Log.info;
		} else {
			dumper = Mojo.Log.logProperties;
		}
		
	}
	
	/*
	* for Titanium
	* 
	* @todo this needs to be tested
	*
	*/
	if (sc.helpers.isTitanium()) {
		dumper = window.dump;
	}
	
	
	if (sc.helpers.isString(obj)) {
		dumper(obj);
	} else if(sc.helpers.isNumber(obj)) {
		dumper(obj.toString());
	} else if (obj === undefined) {
		dumper('UNDEFINED');
	} else if (obj === null) {
		dumper('NULL');
	} else { // this is an object. we hope.
		if (dump) { // we really prefer to use dump if it is available
			dumper(obj);
		} else {
			dumper(obj)
		}
		
	}

	
}

/*
	Open a URL in the default system web browser
*/
sc.helpers.openInBrowser = function(url) {
	var request = new air.URLRequest(url);
	try {            
	    air.navigateToURL(request);
	} catch (e) {
	    air.trace(e.errorMsg);
		dump(e.name + ":" + e.message);
	}
}

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
}

/*
	Saves the contents to a specified path. Serializes a passed object if 
	serialize == true
*/
sc.helpers.setFileContents = function(path, content, serialize) {
	
	if (serialize) {
		content = JSON.stringify(content);
	}
	
	Spaz.dump('setFileContents for '+path+ ' to "' +content+ '"');
	
	try { 
		var f = new air.File(path);
		var fs = new air.FileStream();
		fs.open(f, air.FileMode.WRITE);
		fs.writeUTFBytes(content);
		fs.close();
	} catch (e) {
		air.trace(e.errorMsg)
		dump(e.name + ":" + e.message);
	}
};


/*
	Returns the current application version string
*/
sc.helpers.getAppVersion = function() {
	var appXML = air.NativeApplication.nativeApplication.applicationDescriptor
	var domParser = new DOMParser();
	appXML = domParser.parseFromString(appXML, "text/xml");
	var version = appXML.getElementsByTagName("version")[0].firstChild.nodeValue;
	return version;
};


/*
	Returns the user agent string for the app
*/
sc.helpers.getUserAgent = function() {
	return window.htmlLoader.userAgent
};

/*
	Sets the user agent string for the app
*/
sc.helpers.setUserAgent = function(uastring) {
	window.htmlLoader.userAgent = uastring
	// air.URLRequestDefaults.userAgent = uastring
	return window.htmlLoader.userAgent
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
}

/*
	Sets clipboard text
*/
sc.helpers.setClipboardText = function(text) {
	Spaz.dump('Copying "' + text + '" to clipboard');
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT,text,false);
}


/*
	Loads a value for a key from EncryptedLocalStore
*/
sc.helpers.getEncryptedValue = function(key) {
	var storedValue = air.EncryptedLocalStore.getItem(key);
	var val = storedValue.readUTFBytes(storedValue.length);
	return val;
}

/*
	Sets a value in the EncryptedLocalStore of AIR
*/
sc.helpers.setEncyrptedValue = function(key, val) {
	var bytes = new air.ByteArray();
    bytes.writeUTFBytes(val);
    air.EncryptedLocalStore.setItem(key, bytes);
}


/*
	Get the app storage directory
*/
sc.helpers.getAppStoreDir = function() {
	return air.File.applicationStorageDirectory;
}


sc.helpers.getPreferencesFile = function(name, create) {
	if (!name) {name='preferences';}
	
	var prefsFile = getAppStoreDir();
	prefsFile = prefsFile.resolvePath(name+".json");
	
	// if 
	
	return prefsFile;
}

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
	
}









// var fs = new air.FileStream();
// 
// if (prefsFile.exists) {
//     fs.open(prefsFile, air.FileMode.READ);
//     var prefsJSON = fs.readUTFBytes(prefsFile.size);
//     var loadedpreferences = JSON.parse(prefsJSON);
// 
//     for (key in loadedpreferences) {
// 
//         Spaz.Prefs.preferences[key] = loadedpreferences[key];
//         if (Spaz.Prefs.changeMethods[key] && Spaz.Prefs.changeMethods[key].check) {
//             Spaz.Prefs.changeMethods[key].check();
//         }
//     }
// } else {
//     fs.open(prefsFile, air.FileMode.WRITE);
//     fs.writeUTFBytes(JSON.stringify(Spaz.Prefs.defaultPreferences));
//     Spaz.Prefs.preferences = clone(Spaz.Prefs.defaultPreferences);
// }
// fs.close()