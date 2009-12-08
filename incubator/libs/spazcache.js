/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, sch, SpazCacheStorageAdapters;



/**
 * a simple key/val store. keys are strings, vals are strings. Objects are converted to JSON before insertion
 * 
 * Stores are kept in memory. They are saved to file or another backend with a SpazCacheStorageAdapter
 * 
 * @param {object} opts options
 * @param {string} opts.storeid a unique id used for the cache store
 * @param {string} [opts.storeagetype] the way we're storing this. using file by default
 */
function SpazCache(opts) {
	
	opts = sch.defaults({
		'storeid':null,
		'storagetype':'file'
	}, opts);
	
	/*
		load the store into memory
	*/
	this._store = this.load();
	this._storeid = opts.storeid;
	
	
	switch(opts.storeagetype) {
		case 'file':
			this._storageAdapter = new SpazCacheStorageAdapters.file();
			break;
		/*
			more cases will fill in when we have more adapters
		*/
		default:
			sch.error('Only file storage is supported');
			return false;
	}
	
}

/**
 * @param {string} key the key for the value you want to retrieve
 * @returns {object|undefined} the value of the key, or undefined if it does not exist
 */
SpazCache.prototype.get = function(key) {
	if (this._store[key]) {
		return this._store[key].val;
	} else {
		return undefined;
	}	
};

/**
 * returns the type of the value stored 
 */
SpazCache.prototype.getType = function(key) {
	return this._getMeta(key, 'type');
};

/**
 * returns the modified date of the value stored 
 */
SpazCache.prototype.getModDate = function(key) {
	return this._getMeta(key, 'mod_date');
};

/**
 * this returns the entire entry object, not just the value 
 * @param {string} key the cache entry key
 * @returns {object} an object like this: { 'val':the encoded value, '_meta': { 'type':the type stored, 'mod_date':timestamp } }
 */
SpazCache.prototype.getObj = function(key) {
	return this._store[key];
};


/**
 * sets a cache entry. existing entries are overwritten 
 */
SpazCache.prototype.set = function(key, val) {
	var encobj, encval, timestamp, type, entry;
	
	/*
		make a new entry
	*/
	entry = this._store[key] = {};
	
	encobj = this._encodeVal(val);
	encval = encobj.val;
	type   = encobj.type;
	timestamp = (new Date()).getTime();
	
	entry.val = encval;
	this._setMeta(key, {
		'type':type,
		'mod_date':timestamp
	});
	
};

/**
 * destroys a given entry 
 */
SpazCache.prototype.remove = function(key) {
	delete this._store[key];
};

/**
 * 
 * @param {function} search_func a method that takes a value and returns true or false to evaluate a match 
 */
SpazCache.prototype.find = function(search_func) {};

/**
 * loads the store into memory 
 */
SpazCache.prototype.load = function() {};

/**
 * saves the store 
 */
SpazCache.prototype.save = function() {};


/**
 * saves closes the store (removes it from memory)
 */
SpazCache.prototype.close = function() {
	delete this._store;
};


SpazCache.prototype._decodeVal = function(encval) {
	var val, valtype;
	
	valtype = typeof encval;
	
	if (valtype === 'json') { // if it's a string, it could be json. decode it.
		return sch.deJSON(encval);
	} else {
		return val;
	}
};

/**
 * takes the value, and returns an object of { 'type':'thetype} 
 */
SpazCache.prototype._encodeVal = function(val) {
	var encval, valtype, retobj;
	
	valtype = typeof val;

	if (valtype === 'object') {
		if (!val) { // this is null, NOT an object
			valtype = null;
			encval  = null;
		} else { // this is an array or an object, so encode it
			valtype= 'json';
			encval = sch.enJSON(val);
		}
	} else if (valtype === 'function') { // we don't store functions in cache
		sch.error('Cannot store functions in SpazCache');
		valtype = null;
		encval  = null;
	} else { // no encoding required
		encval = val;
	}
	
	retobj = {
		'type':valtype,
		'val':encval
	};
	
	return retobj;
};


/**
 * @param {string} key
 * @param {object} meta the meta object
 * @param {number} [meta.mod_date] the last modified date. Should be the timestamp of when .set was last called on it
 * @param {string} [meta.type] the type of this value
 */
SpazCache.prototype._setMeta = function(key, meta) {
	var metakey;
	
	for(metakey in meta) {
		this._store[metakey] = meta[metakey];
	}
};


/**
 * @param {string} key the cache value's key
 * @param {string} [metakey] a particular value to retrieve from this cache entry's metadata. If not set, the entire meta object is returned
 * @returns {string|number|object} either the value for the given metakey, or the entire meta object
 */
SpazCache.prototype._getMeta = function(key, metakey) {
	var meta = this._store[key]._meta;
	if (metakey) {
		return meta[metakey];
	} else {
		return meta;
	}
};


/**
 * base definition for SpazCacheStorageAdapter. This object handles permanent storage of the cache store 
 */
function SpazCacheStorageAdapter(opts) {
	this.setStore(opts.store);
	this.setStoreID(opts.storeid);
	
}



SpazCacheStorageAdapter.prototype.setStore = function(store) {
	this.store = store;
};

SpazCacheStorageAdapter.prototype.getStore = function() {
	return this.store;
};

SpazCacheStorageAdapter.prototype.setStoreID = function(storeid) {
	this.storeid = storeid;
};

SpazCacheStorageAdapter.prototype.getStoreID = function() {
	return this.storeid;
};


/**
 * The storage id is what's used to ID the cache in the storage system. For File, this would be the base filename. It's just "SpazCache-"+the storeid
 * @returns {string} the storage id
 */
SpazCacheStorageAdapter.prototype.getStorageID = function() {
	var storeid, storageid;
	
	storeid = this.getStoreID();
	storageid = 'SpazCache-' + storeid;
	return storageid;
};

SpazCacheStorageAdapter.prototype.loadStore = function() {};
SpazCacheStorageAdapter.prototype.saveStore = function() {};


/*
	Adapter implementations
*/
var SpazCacheStorageAdapters = {};


/**
 * The file storage adapter 
 */
SpazCacheStorageAdapters.file.prototype = SpazCacheStorageAdapter.prototype;
SpazCacheStorageAdapters.file.prototype.loadStore = function() {
	var storageid, path;
	
	storageid = this.getStorageID();
	
	/*
		@todo write code to determine path, load, and evaluate store
	*/
};

SpazCacheStorageAdapters.file.prototype.loadStore = function() {
	var storageid, path;
	
	storageid = this.getStorageID();
	
	/*
		@todo write code to determine path, load, and evaluate store
	*/
};




SpazCacheStorageAdapters.airSQL.prototype = SpazCacheStorageAdapter.prototype;

SpazCacheStorageAdapters.titaniumSQL.prototype = SpazCacheStorageAdapter.prototype;

SpazCacheStorageAdapters.html5db.prototype = SpazCacheStorageAdapter.prototype;

