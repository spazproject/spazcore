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
 * @platformstub
 */
sc.helpers.getFileContents = function(url)  {};



/**
 * sets the file contents 
 * @platformstub
 */
sc.helpers.setFileContents = function(url, content, serialize) {};




/**
 * does fileurl exist
 * @platformstub
 */
sc.helpers.fileExists = function (url) {};

/**
 * is given fileurl a file 
 * @platformstub
 */
sc.helpers.isFile = function (url)  {};

/**
 * is given fileurl a directory 
 * @platformstub
 */
sc.helpers.isDirectory = function (url)  {};


/**
 * resolve a path against the given url 
 * @platformstub
 */
sc.helpers.resolvePath = function(url, rel_path)  {};

/**
 * Returns the native file object 
 * @platformstub
 */
sc.helpers.getFileObject = function(url)  {};

/**
 * copy a file 
 * @platformstub
 */
sc.helpers.copyFile = function(url, dest_url) {};

/**
 * move a file 
 * @platformstub
 */
sc.helpers.moveFile = function(url, dest_url) {};

/**
 * delete a file 
 * @platformstub
 */
sc.helpers.deleteFile = function (url)  {};

/**
 * delete a directory 
 * @platformstub
 */
sc.helpers.deleteDirectory = function (url)  {};

/**
 * make a new directory 
 * @platformstub
 */
sc.helpers.createDirectory = function (url) {};

/**
 * make a temporary file 
 * @platformstub
 */
sc.helpers.createTempFile = function() {
	
}

/**
 * make a temporary directory
 * @platformstub
 */
sc.helpers.createTempDirectory = function() {
	
}



/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns true or false
 * @platformstub
 */
sc.helpers.initFile = function (url)  {};
sc.helpers.init_file = sc.helpers.initFile;



/**
 * returns the file URL for the app storage directory
 * @platformstub
 */
sc.helpers.getAppStorageDir = function()  {};
sc.helpers.getAppStoreDir = sc.helpers.getAppStorageDir;


/**
 * get the application's directory 
 * @platformstub
 */
sc.helpers.getAppDir = function()  {};
