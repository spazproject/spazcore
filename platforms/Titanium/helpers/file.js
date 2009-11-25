/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, Titanium;
 
/**
 * the Titanium Desktop version of this platform-specific helper file 
 */

/**
 * Gets the contents of a file
 */
sc.helpers.getFileContents = function(url) {
	var f = Titanium.Filesystem.getFile(url);
	if (f.exists) {
		return f.read();
	} else {
		return false;
	}
};



/**
 * sets the file contents 
 */
sc.helpers.setFileContents = function(url, content, serialize) {
	
	if (serialize) {
		content = JSON.stringify(content);
	}
	
	sc.helpers.debug('setFileContents for '+url+ ' to "' +content+ '"');
	
	try { 
		var f = Titanium.Filesystem.getFile(url);
		f.write(content);
	}
};





/**
 * does fileurl exist
 */
sc.helpers.fileExists = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	return f.exists();
};

/**
 * is given fileurl a file 
 */
sc.helpers.isFile = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	return f.isFile();
};

/**
 * is given fileurl a directory 
 */
sc.helpers.isDirectory = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	return f.isDirectory();
};


/**
 * resolve a path against the given url 
 */
sc.helpers.resolvePath = function(url, rel_path) {
	var f = Titanium.Filesystem.getFile(url);
	return f.resolve(rel_path).toString();
};

/**
 * Returns the native file object 
 */
sc.helpers.getFileObject = function(url) {
	return Titanium.Filesystem.getFile(url);
}

/**
 * copy a file 
 */
sc.helpers.copyFile = function(url, dest_url) {
	var f = Titanium.Filesystem.getFile(url);
	var fnew = Titanium.Filesystem.getFile(dest_url);
	f.copy(fnew);
};

/**
 * move a file 
 */
sc.helpers.moveFile = function(url, dest_url) {
	var f = Titanium.Filesystem.getFile(url);
	var fnew = Titanium.Filesystem.getFile(dest_url);
	f.move(fnew);
};

/**
 * delete a file 
 */
sc.helpers.deleteFile = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	f.deleteFile();
};

/**
 * delete a directory 
 */
sc.helpers.deleteDirectory = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	f.deleteDirectory();
};


/**
 * make a new directory 
 */
sc.helpers.createDirectory = function (url) {
	var f = Titanium.Filesystem.getFile(url);
	f.createDirectory();
};


/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns true or false
 */
sc.helpers.initFile = function (url) {
	var file = Titanium.Filesystem.getFile(url);
	if ( !file.exists || (file.exists && overwrite) ) {
		file.setFileContents('');
		return true;
	} else {
		return false;
	}
};
sc.helpers.init_file = sc.helpers.initFile;



/**
 * returns the file URL for the app storage directory
 */
sc.helpers.getAppStorageDir = function() {
	return Titanium.Filesystem.getApplicationDataDirectory().toString();
};
sc.helpers.getAppStoreDir = sc.helpers.getAppStorageDir;


/**
 * get the application's directory 
 */
sc.helpers.getAppDir = function() {
	return Titanium.Filesystem.getApplicationDirectory().toString();
};