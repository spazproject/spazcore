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
 * Gets the contents of a file
 */
sc.helpers.getFileContents = function(url)  {};



/**
 * sets the file contents 
 */
sc.helpers.setFileContents = function(url, content, serialize) {};




/**
 * does fileurl exist
 */
sc.helpers.fileExists = function (url) {};

/**
 * is given fileurl a file 
 */
sc.helpers.isFile = function (url)  {};

/**
 * is given fileurl a directory 
 */
sc.helpers.isDirectory = function (url)  {};


/**
 * resolve a path against the given url 
 */
sc.helpers.resolvePath = function(url, rel_path)  {};

/**
 * Returns the native file object 
 */
sc.helpers.getFileObject = function(url)  {};

/**
 * copy a file 
 */
sc.helpers.copyFile = function(url, dest_url) {};

/**
 * move a file 
 */
sc.helpers.moveFile = function(url, dest_url) {};

/**
 * delete a file 
 */
sc.helpers.deleteFile = function (url)  {};

/**
 * delete a directory 
 */
sc.helpers.deleteDirectory = function (url)  {};

/**
 * make a new directory 
 */
sc.helpers.createDirectory = function (url) {};

/**
 * make a temporary file 
 */
sc.helpers.createTempFile = function() {
	
}

/**
 * make a temporary directory
 */
sc.helpers.createTempDirectory = function() {
	
}



/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns true or false
 */
sc.helpers.initFile = function (url)  {};
sc.helpers.init_file = sc.helpers.initFile;



/**
 * returns the file URL for the app storage directory
 */
sc.helpers.getAppStorageDir = function()  {};
sc.helpers.getAppStoreDir = sc.helpers.getAppStorageDir;


/**
 * get the application's directory 
 */
sc.helpers.getAppDir = function()  {};
