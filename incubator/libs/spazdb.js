/**
 * Local database storage library for Spaz
 *
 * This class uses the Lawnchair library for local database storage:
 * http://brianleroux.github.com/lawnchair/
 */
function SpazDB() {

	this.db = new Lawnchair('spaz');

};

/**
 * Save a document to the database
 * @param {object} The document to store to the database
 */
SpazDB.prototype.set = function(doc) {

	// While Lawnchair does not require a key, things will work much nicer if
	// we set keys on each document, rather than allowing Lawnchair to
	// dynamically generate the document ID (key). As such, we should be
	// throwing an exception if the key is not present, but we're not doing
	// that just yet.
	if (!doc.key) {
		return false;
	}

	this.db.save(doc);
	return true;

};

/**
 * Get a document from the database
 * @param {string} Document key
 * @param {function} Callback to get the value asynchronusly
 */
SpazDB.prototype.get = function(key, callback) {

	if (!key) {
		return false;
	}

	this.db.get(key, callback);
	return true;

};

/**
 * Deletes a document from the database
 * @param {string} Document key
 */
SpazDB.prototype.remove = function(key) {

	this.db.remove(key);
	return true;

};

/**
 * deletes everything out of the database 
 */
SpazDB.prototype.nuke = function() {
	
	this.db.nuke();
};
