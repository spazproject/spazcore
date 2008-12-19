/*
	These are system-oriented functions, mostly utilizing AIR apis
	to interact with the OS
*/

/*
	dump an object's first level to console
*/
function dump(obj) {
	for(var x in obj) {
		air.trace("'"+x+"':"+obj[x]);
	}
}

/*
	Open a URL in the default system web browser
*/
function openInBrowser(url) {
	var request = new air.URLRequest(url);
	try {            
	    air.navigateToURL(request);
	} catch (e) {
	    air.trace(e.errorMsg);
	}
}

/*
	Gets the contents of a file
*/
function getFileContents(path) {
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
function setFileContents(path, content, serialize) {
	
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
	}
};


/*
	Returns the current application version string
*/
function getVersion() {
		var appXML = air.NativeApplication.nativeApplication.applicationDescriptor
		var domParser = new DOMParser();
		appXML = domParser.parseFromString(appXML, "text/xml");
		var version = appXML.getElementsByTagName("version")[0].firstChild.nodeValue;
		return version;
};


/*
	Returns the user agent string for the app
*/
function getUserAgent() {
	return window.htmlLoader.userAgent
};

/*
	Sets the user agent string for the app
*/
function setUserAgent(uastring) {
	window.htmlLoader.userAgent = uastring
	// air.URLRequestDefaults.userAgent = uastring
	return window.htmlLoader.userAgent
};

/*
	Gets clipboard text
*/
function getClipboardText() {
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
function setClipboardText(text) {
	Spaz.dump('Copying "' + text + '" to clipboard');
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT,text,false);
}


/*
	Loads a value for a key from EncryptedLocalStore
*/
function getEncryptedValue(key) {
	var storedValue = air.EncryptedLocalStore.getItem(key);
	var val = storedValue.readUTFBytes(storedValue.length);
	return val;
}

/*
	Sets a value in the EncryptedLocalStore of AIR
*/
function setEncyrptedValue(key, val) {
	var bytes = new air.ByteArray();
    bytes.writeUTFBytes(val);
    air.EncryptedLocalStore.setItem(key, bytes);
}


/*
	Get the app storage directory
*/
function getAppStoreDir() {
	return air.File.applicationStorageDirectory;
}


function getPreferencesFile(name, create) {
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
function init_file(path, overwrite) {
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