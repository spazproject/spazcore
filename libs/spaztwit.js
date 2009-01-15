/*
 * A Twitter API library for Javascript
 * 
 * This requires jQuery. Tested with 1.2.6
 * 
 * 
 * jQuery events raised by this library
 * 
 * 'new_public_timeline_data' (data)
 * 'new_friends_timeline_data' (data)
 * 'new_replies_timeline_data' (data)
 * 'new_dms_timeline_data' (data)
 * 'new_combined_timeline_data' (data)
 * 'verify_credentials_succeeded' (data)
 * 'verify_credentials_failed' (data)
 * 
 * 
 * 
 * @param username string
 * @param password string
 * @class SpazTwit
*/
function SpazTwit(username, password) {
	
	this.username = username;
	this.password = password;
	
	/*
		this is where we store timeline data and settings for persistence
	*/
	this.data = {
		'friends': {
			'lastid':   1,
			'items':   [],
			'newitems':[],
		},
		'replies': {
			'lastid':   1,
			'items':   [],
			'newitems':[]
		},
		'dms': {
			'lastid':   1,
			'items':   [],
			'newitems':[]
		},
		'combined': {
			'rows':    [],
			'newitems':[]
		}
	};
	
	
	this.me = {};
	

	this.baseurl = 'https://twitter.com/';

	/*
		apply defaults for ajax calls
	*/
	jQuery.ajaxSetup( {
        timeout:1000*20, // 20 second timeout
        async:true,
        // type:'POST'
        // cache:false
    });
}






/*
 * sets the base URL
 * @param newurl string
*/
SpazTwit.prototype.setBaseURL= function(newurl) {
	this.baseurl = newurl;
};



/*
 * sets the username and password
 * @param username string
 * @param password string
*/
SpazTwit.prototype.setCredentials= function(username, password) {
	this.username = username;
	this.password = password;	
};



/*
 * given a key, it returns the URL (baseurl+API method path)
 * @param {string} key the key for the URL
 * @param {array|object} urldata data to included in the URL as GET data
*/
SpazTwit.prototype.getAPIURL = function(key, urldata) {
	var urls = {};



    // Timeline URLs
    urls.public_timeline    = "statuses/public_timeline.json";
    urls.friends_timeline   = "statuses/friends_timeline.json";
    urls.user_timeline      = "statuses/user_timeline.json";
    urls.replies_timeline   = "statuses/replies.json";
    urls.show				= "statuses/show.json";
    urls.favorites          = "favorites.json";
    urls.dm_timeline        = "direct_messages.json";
    urls.dm_sent            = "direct_messages/sent.json";
    urls.friendslist        = "statuses/friends.json";
    urls.followerslist      = "statuses/followers.json";
    urls.featuredlist       = "statuses/featured.json";

    // Action URLs
    urls.update           	= "statuses/update.json";
    urls.destroy_status   	= "statuses/destroy/{{ID}}.json";
    urls.follow           	= "friendships/create/{{ID}}.json";
    urls.stop_follow      	= "friendships/destroy/{{ID}}.json";
    urls.start_notifications= "notifications/follow/{{ID}}.json";
    urls.stop_notifications = "notifications/leave/{{ID}}.json";
    urls.favorites_create 	= "favourings/create/{{ID}}.json";
    urls.favorites_destroy	= "favourings/destroy/{{ID}}.json";
    urls.verify_credentials = "account/verify_credentials.json";
    urls.ratelimit_status   = "account/rate_limit_status.json";

    // misc
    urls.test 			  	= "help/test.json";
    urls.downtime_schedule	= "help/downtime_schedule.json";

    if (urls[key]) {
	
		if (urldata && typeof urldata != "string") {
			urldata = '?'+jQuery.param(urldata);
		} else {
			urldata = '';
		}
		
        return this._postProcessURL(this.baseurl + urls[key] + urldata);
    } else {
        return false
    }

};




/*
 * checks the currently set username and password against the API. Can take
 * a username and password; will use this.username and this.password otherwise
 * 
 * @param {string} username optional
 * @param {string} password optional
*/
SpazTwit.prototype.verifyCredentials = function(username, password) {
	var url = this.getAPIURL('verify_credentials');
	
	if (!username) {
		username = this.username;
	}
	if (!password) {
		password = this.password;
	}
	
	var opts = {
		'url':url,
		'username':username,
		'password':password,
		'process_callback':
		'success_event_type':'verify_credentials_succeeded',
		'failure_event_type':'verify_credentials_failed'
	}

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

SpazTwit.prototype.processAuthenticatedUser = function(data, finished_event) {
	this.me = data;
	jQuery().trigger(finished_event, [this.me]);
}


SpazTwit.prototype.getPublicTimeline = function() {
	var url = this.getAPIURL('public_timeline');
	var username = null;
	var password  = null;
	var data     = null
	
	var xhr = this._getTimeline({
		'url':url,
		'success_event_type': 'new_public_timeline_data'
	});
};


/**
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getFriendsTimeline = function(since_id, count, page) {
	
	if (!page) { page = null;}
	if (!count) { count = 200;}
	if (!since_id) { since_id = 1;}
	
	var data = {};
	data['since_id'] = since_id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('friends_timeline', data);
	this._getTimeline({
		'url':url,
		// 'data':data,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this.processFriendsTimeline,
		'success_event_type': 'new_friends_timeline_data',
	});
};

/**
 *  
 */
SpazTwit.prototype.processFriendsTimeline = function(ret_items, finished_event) {
	// reset .newitems data properties
	this.data.friends.newitems = [];

	
	// sort items
	ret_items.sort(this._sortItemsAscending);
	
	// set lastid
	var lastid = ret_items[ret_items.length-1].id
	this.data.friends.lastid = lastid;
	
	// check each new item to see if exists in existing items. remove if exist
	
	// add new items to data.newitems array
	this.data.friends.newitems = ret_items;
	
	// concat new items onto data.items array
	this.data.friends.items = this.data.friends.items + this.data.friends.newitems

	
	// @todo check length of data.items, and remove oldest extras if necessary
	
	
	// call finished event
	jQuery().trigger(finished_event, [this.data.friends.newitems]);


	/*
		do combined stuff
	*/
	this.data.combined.newitems = [];
	this.data.combined.newitems = ret_items;
	this.data.combined.items = this.data.combined.newitems + this.data.friends.newitems
	jQuery().trigger('new_combined_timeline_data', [this.data.combined.newitems]);
	
}


/**
 *  
 */
SpazTwit.prototype.getReplies = function(since_id, page) {	
	var data = {};
	data['since_id'] = since_id;
	if (page) {
		data['page'] = page;
	}
	
	var url = this.getAPIURL('replies_timeline', data);
	this._getTimeline({
		'url':url,
		// 'data':data,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this.processRepliesTimeline,
		'success_event_type': 'new_friends_timeline_data'		
	});
};


/**
 *  
 */
SpazTwit.prototype.processRepliesTimeline = function(items, finished_event) {
	// reset .newitems data property
	
	// sort items
	
	// check each new item to see if exists in existing items. remove if exist
	
	// add new items to data.newitems array
	
	// push new items onto data.items array
	
	// check length of data.items, and remove oldest extras if necessary
	
	// call finished event
	
}


SpazTwit.prototype.getSent = function(since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getUserTimeline = function(user_id, since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getDirectMessages = function(since_id, page) {};
SpazTwit.prototype.getSentDirectMessages = function(since_id, page) {};
SpazTwit.prototype.getFavorites = function(user_id, page) {};
SpazTwit.prototype.search = function() {};

SpazTwit.prototype._getTimeline = function(opts) {
	
	dump(opts.data);
	
	var xhr = jQuery.ajax({
        'complete':function(xhr, msg){
            dump('complete:'+msg);
        },
        'error':function(xhr, msg, exc) {
            if (xhr && xhr.responseText) {
                dump("Error:"+xhr.responseText+" from "+opts['url']);
            } else {
                dump("Error:Unknown from "+opts['url']);
            }

			try {
				var data = JSON.parse(xhr.responseText);
			} catch(e) {
				data = xhr.responseText;
			}
			
			if (opts.failure_event_type) {
				jQuery().trigger(opts.failure_event_type, [data]);
			}
			
        },
        'success':function(data) {
			// dump("Success! \n\n" + data);
				
			data = JSON.parse(data);
			
			if (opts.process_callback) {
				opts.process_callback(data, opts.success_event_type)
			} else {
				jQuery().trigger(opts.success_event_type, [data]);
			}
			
        },
        'beforeSend':function(xhr){
			dump("beforesend");
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(opts.username + ":" + opts.password));
			}
        },
        'type':"GET",
        'url': 		opts.url,
        'data': 	opts.data,
	});
	
	return xhr;
};



SpazTwit.prototype._callMethod = function(opts) {
	var xhr = jQuery.ajax({
	    'complete':function(xhr, msg){
	        dump('complete:'+msg);
	    },
	    'error':function(xhr, msg, exc) {
	        if (xhr && xhr.responseText) {
	            dump("Error:"+xhr.responseText+" from "+opts['url']);
				try {
					var data = JSON.parse(xhr.responseText);
				} catch(e) {
					data = xhr.responseText;
				}
				if (opts.failure_event_type) {
					jQuery().trigger(opts.failure_event_type, [data]);
				}

	
	        } else {
	            dump("Error:Unknown from "+opts['url']);
				if (opts.failure_event_type) {
					jQuery().trigger(opts.failure_event_type, ["Unknown error!"]);
				}
	        }
	    },
	    'success':function(data) {			
			data = JSON.parse(data);
			if (opts.process_callback) {
				opts.process_callback(data, opts.success_event_type)
			} else {
				jQuery().trigger(opts.success_event_type, [data]);
			}
	    },
	    'beforeSend':function(xhr){
			dump("beforesend");
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(opts.username + ":" + opts.password));
			}
	    },
	    'type':"GET",
	    'url' : opts.url
	});
	return xhr;
};


SpazTwit.prototype.getFriends = function() {};
SpazTwit.prototype.getFollowers = function() {};

SpazTwit.prototype.addFriend = function(user_id) {};
SpazTwit.prototype.removeFriend = function(user_id) {};

SpazTwit.prototype.block = function(user_id) {};

SpazTwit.prototype.follow = function(user_id) {}; // to add notification
SpazTwit.prototype.unfollow = function(user_id) {}; // to remove notification


SpazTwit.prototype.update = function(status, in_reply_to_status_id) {};
SpazTwit.prototype.destroy = function(id) {};
SpazTwit.prototype.destroyDirectMessage = function(id) {};
SpazTwit.prototype.getOne = function(id) {};
SpazTwit.prototype.favorite = function(id) {};
SpazTwit.prototype.unfavorite = function(id) {};


SpazTwit.prototype.updateLocation = function(location_str) {};
SpazTwit.prototype.updateProfile = function(name, email, url, location, description) {};




SpazTwit.prototype.getRateLimitStatus = function() {};

SpazTwit.prototype.test = function() {};



SpazTwit.prototype._postProcessURL = function(url) {
	if (Luna) { // we're in webOS
		var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
		var match = url.match(re);
		if (match && match[0] != Luna.hostingPrefix) {
			url = "/proxy?url=" + encodeURIComponent(url);
		}
		return url;		
	} else {
		return url;
	}
}


/**
 * sorting function for an array of tweets. Asc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsAscending) 
 */
SpazTwit.prototype._sortItemsAscending = function(a,b) {
	return (a.id - b.id);
}

/**
 * sorting function for an array of tweets. Desc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsDescending) 
 */
SpazTwit.prototype._sortItemsDescending = function(a,b) {
	return (b.id - a.id);
}



/**
 * sorting function for an array of tweets. Asc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateAsc) 
 */
SpazTwit.prototype._sortItemsByDateAsc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_a - time_b);
}

/**
 * sorting function for an array of tweets. Desc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateDesc) 
 */
SpazTwit.prototype._sortItemsByDateDesc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_b - time_a);
}



/**
 * remap dump calls as appropriate 
 */
if (sc && sc.helpers && sc.helpers.dump) {
	var dump = sc.helpers.dump;
} else if(console && console.log) {
	var dump = console.log;
} else { // do nothing!
	var dump = function(input) {
		return;
	}
}


/**
 * shortcut for SpazTwit if the SpazCore libraries are being used
 * 
 */
if (SpazTwit) {
	scTwit = SpazTwit;
}