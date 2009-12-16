
/**
 * "constants" for account types 
 */
var SPAZCORE_ACCOUNT_TWITTER	= 'twitter';
var SPAZCORE_ACCOUNT_IDENTICA	= 'identi.ca';
var SPAZCORE_ACCOUNT_STATUSNET	= 'StatusNet';
var SPAZCORE_ACCOUNT_FLICKR		= 'flickr';
var SPAZCORE_ACCOUNT_WORDPRESS	= 'wordpress.com';
var SPAZCORE_ACCOUNT_TUMBLR		= 'tumblr';
var SPAZCORE_ACCOUNT_FACEBOOK	= 'facebook';
var SPAZCORE_ACCOUNT_FRIENDFEED	= 'friendfeed';

/**
 * This creates a new SpazAccounts object, and optionally associates it with an existing preferences object
 * @constructor
 * @param (Object) prefsObj  An existing SpazPrefs object (optional)
 */
var SpazAccounts = function(prefsObj) {
	if (prefsObj) {
		this.prefs = prefsObj;
	} else {
		this.prefs = new SpazPrefs();
		this.prefs.load();
	}
	
	/*
		load existing accounts
	*/
	this.load();

};

/**
 * the key used inside the prefs object 
 */
SpazAccounts.prototype.prefskey = 'users';

/**
 * loads the accounts array from the prefs object 
 */
SpazAccounts.prototype.load	= function() { 
	this._accounts = this.prefs.get(this.prefskey);
};

/**
 * saves the accounts array to the prefs obj 
 */
SpazAccounts.prototype.save	= function() {
	this.prefs.set(this.prefskey, this._accounts);
	sch.debug('saved users to "'+this.prefskey+'" pref');
	for (var x in this._accounts) {
		sch.debug(this._accounts[x].id);
	};
};

/**
 * returns the array of accounts
 * @returns {array} the accounts 
 */
SpazAccounts.prototype.getAll = function() {
	return this._accounts;
};

/**
 * Set all users by passing in a hash. overwrites all existing data!
 * @param {array} accounts_array an array of account objects
 */
SpazAccounts.prototype.setAll = function(accounts_array) {
	this._accounts = accounts_array;
	this.save();
	sch.debug("Saved these accounts:");
	for (var i=0; i < this_accounts.length; i++) {
		sch.debug(this._accounts[x].id);
	};
};


/**
 * wipes the accounts array and saves it
 */
SpazAccounts.prototype.initAccounts	= function() {
	this._accounts = [];
	this.save();
};

/**
 * add a new account
 * @param {string} username the username
 * @param {string} password the password
 * @param {type} type the type of account
 * @returns {string} the UUID of the new account
 */
SpazAccounts.prototype.add = function(username, password, type) {
	
	if (!type) {
		sch.error("Type must be set");
		return false;
	}
	
	var username = username.toLowerCase();
	var id = this.generateID();
	this._accounts.push = {
		'id':id,
		'username':username,
		'password':password,
		'type':type,
		'meta':{}
	};
	this.save();
	
	sch.debug("Added new user:"+id);
	
	return id;
};


/**
 * @param {string} type the type of accounts to retrieve
 * @returns {array} the array of matching accounts
 */
SpazAccounts.prototype.getByType = function(type) {
	var matches = [];
	
	for (var i=0; i < this._accounts.length; i++) {
		if (this._accounts[i].type === type) {
			matches.push(this._accounts[i])
		}
	};
	
	return matches;
};


SpazAccounts.prototype.getByUsername = function(username) {
	
};

SpazAccounts.prototype.getByUsernameAndType = function(username, type) {
	
};


/**
 * retrives the user object by user and type
 * @param {string} id  the user id UUID
 * @param {string} type 
 */
SpazAccounts.prototype.get = function(id) {

	var index = this._findUserIndex(id);

	if (index !== false) {
		return this._accounts[i];		
	}
	
	return false;
	
};


/**
 * a private function to find the user's array index by their UUID
 * @param {string} id the user's UUID
 * @returns {number|boolen} returns the array index or false if DNE 
 */
SpazAccounts.prototype._findUserIndex = function(id) {
	
	for (i=0; i<this._accounts.length; i++) {
		
		if (this._accounts[i].id === id) {
			sch.debug('Found matching user record to '+ id);
			return i;
		}
		
	}
	
	return false;
};



/**
 * @returns {string} returns the generated UUID 
 */
SpazAccounts.prototype.generateID = function() {
	var id = sc.helpers.UUID();
	return id;
};



/**
 * @param {string} id the user's UUID
 * @param {string} key the key for the metadata entry
 * @returns {String|Object|Array|Boolean|Number} returns the set value, or null if user ID or meta entry is not found
 */
SpazAccounts.prototype.getMeta = function(id, key) {
	
	if ( user = this.get(id) ) {
		if (user.meta && user.meta[key] !== null) {
			return user.meta[key];
		}
	}
	
	return null;
	
};

/**
 * @param {string} id the user's UUID
 * @param {string} key the key for the metadata entry
 * @param {String|Object|Array|Boolean|Number} value the value of the metadata entry
 * @returns {String|Object|Array|Boolean|Number} returns the set value, or null if user ID is not found
 */
SpazAccounts.prototype.setMeta = function(id, key, value) {
	
	var index = this._findUserIndex(id);

	if (index !== false) {		
		if (!this._accounts[index].meta) {
			this._accounts[index].meta = {};
		}
		this._accounts[index].meta[key] = value;
		
		this.save();
		
		return this._accounts[index].meta[key];
		
	}
	return null;
	
};