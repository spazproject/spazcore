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
 * @member sc.helpers 
 */
sc.helpers.getFileContents = function(url)  {};



/**
 * sets the file contents 
 * @platformstub
 * @member sc.helpers 
 */
sc.helpers.setFileContents = function(url, content, serialize) {};




/**
 * does fileurl exist
 * @platformstub
 * @member sc.helpers 
 */
sc.helpers.fileExists = function (url) {};

/**
 * is given fileurl a file 
 * @platformstub
 * @member sc.helpers 
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
 * @member sc.helpers 
  */
sc.helpers.resolvePath = function(url, rel_path)  {};

/**
 * Returns the native file object 
 * @platformstub
 * @member sc.helpers
  */
sc.helpers.getFileObject = function(url)  {};

/**
 * copy a file 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.copyFile = function(url, dest_url) {};

/**
 * move a file 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.moveFile = function(url, dest_url) {};

/**
 * delete a file 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.deleteFile = function (url)  {};

/**
 * delete a directory 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.deleteDirectory = function (url)  {};

/**
 * make a new directory 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.createDirectory = function (url) {};

/**
 * make a temporary file 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.createTempFile = function() {
	
};

/**
 * make a temporary directory
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.createTempDirectory = function() {
	
};



/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns true or false
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.initFile = function (url)  {};
sc.helpers.init_file = sc.helpers.initFile;



/**
 * returns the file URL for the app storage directory
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getAppStorageDir = function()  {};
sc.helpers.getAppStoreDir = sc.helpers.getAppStorageDir;


/**
 * get the application's directory 
 * @platformstub
 * @member sc.helpers
 */
sc.helpers.getAppDir = function()  {};
