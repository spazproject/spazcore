/**
 * This is an interface to a complex preference stored as a hash
 * @param (Object) prefsObj  An existing SpazPrefs object (optional)
 */
var SpazAccounts = function(prefsObj) {
	if (prefsObj) {
		this.prefs = prefsObj;
	} else {
		this.prefs = new SpazPrefs(default_preferences);
		this.prefs.load();
	}
	
	/*
		load existing accounts
	*/
	this.load();

};


SpazAccounts.prototype.prefskey = 'users';

SpazAccounts.prototype.load	= function() { 
	this._accounts = this.prefs.get(this.prefskey);
};


SpazAccounts.prototype.save	= function() {
	this.prefs.set('users', this._accounts);
	dump('saved users to users pref');
	for (var x in this._accounts) {
		dump(this._accounts[x].id);
	};
};


SpazAccounts.prototype.getAll = function() {
	return this._accounts;
};

/**
 * Set all users by passing in a hash. overwrites all existing data! 
 */
SpazAccounts.prototype.setAll = function(userhash) {
	this._accounts = userhash;
	this.save();
	dump("Saved these users:");
	for (var x in this._accounts) {
		dump(this._accounts[x].id);
	};
};

SpazAccounts.prototype.initAccounts	= function(onSuccess, onFailure) {
	this._accounts = [];
	this.save();
};


SpazAccounts.prototype.add = function(username, password, type) {
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
	dump("Added new user:"+id);
};


/**
 * @TODO 
 */
SpazAccounts.prototype.getByType = function(type) {
	
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


SpazAccounts.prototype._findUserIndex = function(id) {
	
	for (i=0; i<this._accounts.length; i++) {
		
		if (this._accounts[i].id === id) {
			dump('Found matching user record to '+ id);
			return i;
		}
		
	}
	
	return false;
};




// SpazAccounts.prototype.generateID = function(username, type) {
// 	var id = username.toLowerCase()+"_"+type.toLowerCase();
// 	return id;
// };
SpazAccounts.prototype.generateID = function() {
	var id = sc.helpers.UUID();
	return id;
};




SpazAccounts.prototype.getMeta = function(id, key) {
	
	if ( user = this.get(id) ) {
		if (user.meta && user.meta[key] !== null) {
			return user.meta[key];
		}
	}
	
	return null;
	
};

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
	return false;
	
};