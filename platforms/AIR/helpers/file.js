/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser;
 
/**
 * the AIR version of this platform-specific helper file 
 */

/**
 * Gets the contents of a file
 */
sc.helpers.getFileContents = function(url) {
	var f = new air.File(url);
	sch.error(url);
	sch.error(f.url);
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



/**
 * sets the file contents 
 */
sc.helpers.setFileContents = function(url, content, serialize) {
	
	if (serialize) {
		content = JSON.stringify(content);
	}
	
	sc.helpers.dump('setFileContents for '+url+ ' to "' +content+ '"');
	
	try { 
		var f = new air.File(url);
		var fs = new air.FileStream();
		fs.open(f, air.FileMode.WRITE);
		fs.writeUTFBytes(content);
		fs.close();
	} catch (e) {
		sc.helpers.error(e.name + ":" + e.message);
	}
};





/**
 * does fileurl exist
 */
sc.helpers.fileExists = function (url) {
	var f = new air.File(url);
	return f.exists;
};

/**
 * is given fileurl a file 
 */
sc.helpers.isFile = function (url) {
	var f = new air.File(url);
	return !f.isDirectory;
};

/**
 * is given fileurl a directory 
 */
sc.helpers.isDirectory = function (url) {
	var f = new air.File(url);
	return f.isDirectory;
};


/**
 * resolve a path against the given url 
 */
sc.helpers.resolvePath = function(url, rel_path) {
	var f = new air.File(url);
	return f.resolvePath(rel_path).url;

};

/**
 * Returns the native file object 
 */
sc.helpers.getFileObject = function(url) {
	return new air.File(url);
}

/**
 * copy a file 
 */
sc.helpers.copyFile = function(url, dest_url) {
	var f = new air.File(url);
	sch.error(f.url);
	var fnew = new air.File(dest_url);
	sch.error(fnew.url);
	f.copyTo(fnew, true);
};

/**
 * move a file 
 */
sc.helpers.moveFile = function(url, dest_url) {
	var f = new air.File(url);
	var fnew = new air.File(dest_url);
	f.moveTo(fnew, true);
};

/**
 * delete a file 
 */
sc.helpers.deleteFile = function (url) {
	var f = new air.File(url);
	f.deleteFile();
};

/**
 * delete a directory 
 */
sc.helpers.deleteDirectory = function (url) {
	var f = new air.File(url);
	f.deleteDirectory();
};

/**
 * make a new directory 
 */
sc.helpers.createDirectory = function (url) {
	var f = new air.File(url);
	f.createDirectory();
};


/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns true or false
 */
sc.helpers.initFile = function (url) {
	var file = new air.File(url);
	if ( !file.exists || (file.exists && overwrite) ) {
		var fs = new air.FileStream();
		fs.open(file, air.FileMode.WRITE);
		fs.writeUTFBytes('');
		fs.close();
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
	return air.File.applicationStorageDirectory.url;
};
sc.helpers.getAppStoreDir = sc.helpers.getAppStorageDir;


/**
 * get the application's directory 
 */
sc.helpers.getAppDir = function() {
	return air.File.applicationDirectory.url;
};



/**
 * make a temporary file 
 */
sc.helpers.createTempFile = function() {
	return air.File.createTempFile().url;
}

/**
 * make a temporary directory
 */
sc.helpers.createTempDirectory = function() {
	return air.File.createTempDirectory().url;
}
