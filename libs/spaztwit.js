//= require <libs/spazauth>
//= require <libs/spaztwitterstream>

/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
plusplus: false,
regexp: false,
sub: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery, Mojo, use_palmhost_proxy;

/**
 * various constant definitions
 */
/**
 * @constant 
 */
var SPAZCORE_SECTION_FRIENDS = 'friends';
/**
 * @constant 
 */
var SPAZCORE_SECTION_HOME = 'home';
/**
 * @constant 
 */
var SPAZCORE_SECTION_REPLIES = 'replies';
/**
 * @constant 
 */
var SPAZCORE_SECTION_DMS = 'dms';
/**
 * @constant 
 */
var SPAZCORE_SECTION_FAVORITES = 'favorites';
/**
 * @constant 
 */
var SPAZCORE_SECTION_COMBINED = 'combined';
/**
 * @constant 
 */
var SPAZCORE_SECTION_PUBLIC = 'public';
/**
 * @constant 
 */
var SPAZCORE_SECTION_SEARCH = 'search';
/**
 * @constant 
 */
var SPAZCORE_SECTION_USER = 'user-timeline';
/**
 * @constant 
 */
var SPAZCORE_SECTION_FRIENDLIST = 'friendslist';
/**
 * @constant 
 */
var SPAZCORE_SECTION_FOLLOWERSLIST = 'followerslist';
/**
 * @constant 
 */
var SPAZCORE_SECTION_USERLISTS = 'userlists';

/**
 * @constant 
 */
var SPAZCORE_SERVICEURL_TWITTER = 'https://api.twitter.com/1/';
/**
 * @constant 
 */
var SPAZCORE_SERVICEURL_IDENTICA = 'https://identi.ca/api/';
/**
 * @constant 
 */
var SPAZCORE_SERVICEURL_FREELISHUS = 'http://freelish.us/api/';
/**
 * @constant 
 */
var SPAZCORE_SERVICEURL_WORDPRESS_TWITTER = 'https://twitter-api.wordpress.com/';
/**
 * @constant 
 */
var SPAZCORE_SERVICEURL_TUMBLR_TWITTER = 'http://www.tumblr.com/';



/**
 * A Twitter API library for Javascript
 * 
 * 
 * jQuery events raised by this library
 * 
 * <ul>
 *   <li>'spaztwit_ajax_error'</li>
 *   <li>'new_public_timeline_data' (data)</li>
 *   <li>'new_friends_timeline_data' (data)</li>
 *   <li>'error_friends_timeline_data' (data)</li>
 *   <li>'new_replies_timeline_data' (data)</li>
 *   <li>'error_replies_timeline_data' (data)</li>
 *   <li>'new_dms_timeline_data' (data)</li>
 *   <li>'error_dms_timeline_data' (data)</li>
 *   <li>'new_combined_timeline_data' (data)</li>
 *   <li>'error_combined_timeline_data' (data)</li>
 *   <li>'new_favorites_timeline_data' (data)</li>
 *   <li>'error_favorites_timeline_data' (data)</li>
 *   <li>'verify_credentials_succeeded' (data)</li>
 *   <li>'verify_credentials_failed' (data)</li>
 *   <li>'update_succeeded' (data)</li>
 *   <li>'update_failed' (data)</li>
 *   <li>'get_user_succeeded' (data)</li>
 *   <li>'get_user_failed' (data)</li>
 *   <li>'get_one_status_succeeded' (data)</li>
 *   <li>'get_one_status_failed' (data)</li>
 *   <li>'new_search_timeline_data' (data)</li>
 *   <li>'error_search_timeline_data' (data)</li>
 *   <li>'new_trends_data' (data)</li>
 *   <li>'error_trends_data' (data)</li>
 *   <li>'new_saved_searches_data' (data)</li>
 *   <li>'error_saved_searches_data' (data)</li>
 *   <li>'create_saved_search_succeeded' (data)</li>
 *   <li>'create_saved_search_failed' (data)</li>
 *   <li>'destroy_saved_search_succeeded' (data)</li>
 *   <li>'destroy_saved_search_failed' (data)</li>
 *   <li>'create_favorite_succeeded'</li>
 *   <li>'create_favorite_failed'</li>
 *   <li>'destroy_favorite_succeeded'</li>
 *   <li>'destroy_favorite_failed'</li>
 *   <li>'create_friendship_succeeded'</li>
 *   <li>'create_friendship_failed'</li>
 *   <li>'destroy_friendship_succeeded'</li>
 *   <li>'destroy_friendship_failed'</li>
 *   <li>'create_block_succeeded'</li>
 *   <li>'create_block_failed'</li>
 *   <li>'destroy_block_succeeded'</li>
 *   <li>'destroy_block_failed'</li>
 *   <li>'follow_succeeded'</li>
 *   <li>'follow_failed'</li>
 *   <li>'unfollow_succeeded'</li>
 *   <li>'unfollow_failed'</li>
 *   <li>'ratelimit_status_succeeded'</li>
 *   <li>'ratelimit_status_failed'</li>
 *   <li>'destroy_status_succeeded'</li>
 *   <li>'destroy_status_failed'</li>
 *   <li>'destroy_dm_succeeded'</li>
 *   <li>'destroy_dm_failed'</li>
 * </ul>
 * 
 * @param {Object} opts various options
 * @param {Object} [opts.auth] SpazAuth object
 * @param {String} [opts.event_mode] The event mode to use ('jquery' or 'DOM'). Defaults to 'DOM'
 * @param {Object} [opts.event_target] the DOM element to target the event on. Defaults to document
 * @param {Number} [opts.timeout] length of time, in seconds, to timeout
 * @class SpazTwit
 * @constructor
*/
function SpazTwit(opts) {
	
	this.opts = sch.defaults({
		auth:         null,
		username:     null,
		event_mode:   'DOM',
		event_target: document,
		timeout:      this.DEFAULT_TIMEOUT
	}, opts);
	
	
	this.auth                = this.opts.auth;
	
	this.setSource('SpazCore');
	
	this.initializeData();
	
	this.initializeCombinedTracker();
	
	/*
		Cache for one-shot users and posts. Not sure what we'll do with it yet
	*/
	this.cache = {
		users:{},
		posts:{}
	};
	
	this.me = {};
	

	this.setBaseURL(SPAZCORE_SERVICEURL_TWITTER);

	/**
	 * remap dump calls as appropriate 
	 */
	if (sc && sc.helpers && sc.helpers.dump) {
		window.dump = sc.helpers.dump;
	} else { // do nothing!
		var dump = function(input) {
			return;
		};
	}
}

/**
 * the default timeout value (60 seconds) 
 */
SpazTwit.prototype.DEFAULT_TIMEOUT = 1000*60;



/**
 * retrieves the last status id retrieved for a given section
 * @param {string} section  use one of the defined constants (ex. SPAZCORE_SECTION_HOME)
 * @return {integer} the last id retrieved for this section
 */
SpazTwit.prototype.getLastId   = function(section) {
	return this.data[section].lastid;
};

/**
 * sets the last status id retrieved for a given section
 * @param {string} section  use one of the defined constants (ex. SPAZCORE_SECTION_HOME)
 * @param {integer} id  the new last id retrieved for this section
 */
SpazTwit.prototype.setLastId   = function(section, id) {
	// this.data[section].lastid = parseInt(id, 10);
	this.data[section].lastid = id;
};


SpazTwit.prototype.initializeData = function() {
	/*
		this is where we store timeline data and settings for persistence
	*/
	this.data = {};
	this.data[SPAZCORE_SECTION_HOME] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':200,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FRIENDS] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':200,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_REPLIES] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':50,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_DMS] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':50,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FAVORITES] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':100,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_COMBINED] = {
		'items':   [],
		'newitems':[],
		'updates' :[],
		'max':400,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FRIENDLIST] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FOLLOWERSLIST] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_SEARCH] = {
		'lastid':  0, // search api prefers 0, will freak out on "1"
		'items':   [],
		'newitems':[],
		'lastresultdata':{},
		'max':200,
		'min_age':30
	};
	this.data[SPAZCORE_SECTION_USERLISTS] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	// this.data.byid = {};
};


/**
 * resets the combined_finished progress tracker 
 */
SpazTwit.prototype.initializeCombinedTracker = function() {
	this.combined_finished = {};
	this.combined_finished[SPAZCORE_SECTION_HOME] = false;
	this.combined_finished[SPAZCORE_SECTION_REPLIES] = false;
	this.combined_finished[SPAZCORE_SECTION_DMS] = false;
	
	this.combined_errors = [];
};

/**
 * Checks to see if the combined timeline is finished 
 * @return {boolean}
 */
SpazTwit.prototype.combinedTimelineFinished = function() {
	for (var i in this.combined_finished) {
		if (!this.combined_finished[i]) {
			return false;
		}
	}
	return true;
};

/**
 * Checks to see if the combined timeline is finished 
 * @return {boolean}
 */
SpazTwit.prototype.combinedTimelineHasErrors = function() {
	if (this.combined_errors.length > 0) {
		return true;
	} else {
		return false;
	}
};

/**
 * Checks to see if the combined timeline contains sent updates
 * @return {boolean}
 */
SpazTwit.prototype.combinedTimelineHasUpdates = function() {
	return this.data[SPAZCORE_SECTION_COMBINED].updates.length > 0;
};

/**
 * Adds ids of array of statuses to updates
 */
SpazTwit.prototype.combinedTimelineAddUpdates = function(items) {
	if (items.id) {
		items = [items];
	}
	var i;
	for (i in items) {
		this.data[SPAZCORE_SECTION_COMBINED].updates.push(items[i].id);
	}
};

/**
 * Removes the update items from combined newitems
 */
SpazTwit.prototype.combinedNewItemsRemoveUpdates = function() {
	if (!this.combinedTimelineHasUpdates()) {
		return;
	}
	var data = this.data[SPAZCORE_SECTION_COMBINED],
		iStr = ':' + data.updates.join(':') + ':',
		news = data.newitems,
		keep = [],
		i;

	for (i in news) {
		if (!RegExp(':' + news[i].id + ':').test(iStr)) {
			keep.push(news[i]);
		}
	}
	data.newitems = keep;
	data.updates  = [];
};


/**
 * sets the base URL
 * @param {string} newurl
 */
SpazTwit.prototype.setBaseURL= function(newurl) {
	
	var lastchar = newurl.charAt(newurl.length -1);
	if (lastchar !== '/') {
		newurl = newurl + '/';
	}
	
	this.baseurl = newurl;
};


/**
 * sets the base URL by the service type
 * @param {string} service  see SPAZCORE_SERVICE_* 
 */
SpazTwit.prototype.setBaseURLByService= function(service) {
	
	var baseurl = '';
	
	switch (service) {
		case SPAZCORE_SERVICE_TWITTER:
			baseurl = SPAZCORE_SERVICEURL_TWITTER;
			break;
		case SPAZCORE_SERVICE_IDENTICA:
			baseurl = SPAZCORE_SERVICEURL_IDENTICA;
			break;
		case SPAZCORE_SERVICE_FREELISHUS:
			baseurl = SPAZCORE_SERVICEURL_FREELISHUS;
			break;
		case SPAZCORE_SERVICE_WORDPRESS_TWITTER:
			baseurl = SPAZCORE_SERVICEURL_WORDPRESS_TWITTER;
			break;
		case SPAZCORE_SERVICE_TUMBLR_TWITTER:
			baseurl = SPAZCORE_SERVICEURL_TUMBLR_TWITTER;
			break;
		default:
			baseurl = SPAZCORE_SERVICEURL_TWITTER;
			break;
	}
	
	this.baseurl = baseurl;
};


SpazTwit.prototype.getServiceFromBaseURL = function(baseurl) {
	var service;

	if (!baseurl) { baseurl = this.baseurl; }
	
	switch (baseurl) {
		case SPAZCORE_SERVICEURL_TWITTER:
			service = SPAZCORE_SERVICE_TWITTER;
			break;
		case SPAZCORE_SERVICEURL_IDENTICA:
			service = SPAZCORE_SERVICE_IDENTICA;
			break;
		case SPAZCORE_SERVICEURL_FREELISHUS:
			service = SPAZCORE_SERVICE_FREELISHUS;
			break;
		case SPAZCORE_SERVICEURL_WORDPRESS_TWITTER:
			service = SPAZCORE_SERVICE_WORDPRESS_TWITTER;
			break;
		case SPAZCORE_SERVICEURL_TUMBLR_TWITTER:
			service = SPAZCORE_SERVICE_TUMBLR_TWITTER;
			break;
		default:
			service = SPAZCORE_SERVICE_CUSTOM;
			break;
	}
	
	return service;
	
};


SpazTwit.prototype.setCredentials = function(auth_obj) {
	this.auth = auth_obj;
	this.username = this.auth.username;
};


/**
 * set the source string we will pass on updates
 * 
 * @param {string} new_source 
 */
SpazTwit.prototype.setSource = function(new_source) {
	this.source = new_source;
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
	urls.home_timeline	= "statuses/home_timeline.json";
	urls.user_timeline      = "statuses/user_timeline.json";
	urls.replies_timeline   = "statuses/replies.json";
	urls.show		= "statuses/show/{{ID}}.json";
	urls.show_related	= "related_results/show/{{ID}}.json";
	urls.favorites          = "favorites.json";
	urls.user_favorites     = "favorites/{{ID}}.json"; // use this to retrieve favs of a user other than yourself
	urls.dm_timeline        = "direct_messages.json";
	urls.dm_sent            = "direct_messages/sent.json";
	urls.friendslist        = "statuses/friends.json";
	urls.followerslist      = "statuses/followers.json";
	urls.show_user			= "users/show.json";
	urls.featuredlist       = "statuses/featured.json";

	// Action URLs
	urls.update           	= "statuses/update.json";
	urls.destroy_status   	= "statuses/destroy/{{ID}}.json";
	urls.dm_new             = "direct_messages/new.json";
	urls.dm_destroy         = "direct_messages/destroy/{{ID}}.json";
	urls.friendship_create  = "friendships/create/{{ID}}.json";
	urls.friendship_destroy	= "friendships/destroy/{{ID}}.json";
	urls.friendship_show	= "friendships/show.json";
	urls.friendship_incoming	= "friendships/incoming.json";
	urls.friendship_outgoing	= "friendships/outgoing.json";
	urls.graph_friends		= "friends/ids.json";
	urls.graph_followers	= "followers/ids.json";
	urls.block_create		= "blocks/create/{{ID}}.json";
	urls.block_destroy		= "blocks/destroy/{{ID}}.json";
	urls.follow             = "notifications/follow/{{ID}}.json";
	urls.unfollow			= "notifications/leave/{{ID}}.json";
	urls.favorites_create 	= "favorites/create/{{ID}}.json";
	urls.favorites_destroy	= "favorites/destroy/{{ID}}.json";
	urls.saved_searches_create 	= "saved_searches/create.json";
	urls.saved_searches_destroy	= "saved_searches/destroy/{{ID}}.json";
	urls.verify_credentials = "account/verify_credentials.json";
	urls.ratelimit_status   = "account/rate_limit_status.json";
	urls.update_profile		= "account/update_profile.json";
	urls.saved_searches		= "saved_searches.json";
	urls.report_spam		= "report_spam.json";

    // User lists URLs
	urls.lists              = "{{USER}}/lists.json";
	urls.lists_list         = "{{USER}}/lists/{{SLUG}}.json";
	urls.lists_memberships  = "{{USER}}/lists/memberships.json";
	urls.lists_timeline     = "{{USER}}/lists/{{SLUG}}/statuses.json";
	urls.lists_members      = "{{USER}}/{{SLUG}}/members.json";
	urls.lists_check_member = "{{USER}}/{{SLUG}}/members/{{ID}}.json";
	urls.lists_subscribers  = "{{USER}}/{{SLUG}}/subscribers.json";
	urls.lists_check_subscriber = "{{USER}}/{{SLUG}}/subscribers/{{ID}}.json";
	urls.lists_subscriptions = "{{USER}}/lists/subscriptions.json";

	//trends
	urls.trends				= "trends.json";
	urls.trends_current		= "trends/current.json";
	urls.trends_daily		= "trends/daily.json";
	urls.trends_weekly		= "trends/weekly.json";
	
	//retweet
	urls.retweet			= "statuses/retweet/{{ID}}.json";
	urls.retweets			= "statuses/retweets/{{ID}}.json";
	urls.retweeted_by_me	= "statuses/retweeted_by_me.json";
	urls.retweeted_to_me	= "statuses/retweeted_to_me.json";
	urls.retweets_of_me		= "statuses/retweets_of_me.json";
	
	urls.search				= "search.json";

	// misc
	urls.test 			  	= "help/test.json";
	urls.downtime_schedule	= "help/downtime_schedule.json";

	
	if (urls[key].indexOf('{{ID}}') > -1) {
		if (typeof(urldata) === 'string') {
			urls[key] = urls[key].replace('{{ID}}', urldata);
		} else if (urldata && typeof(urldata) === 'object') {
			urls[key] = urls[key].replace('{{ID}}', urldata.id);
		}
		
	}

    // Token replacement for user lists
    if (urls[key].indexOf('{{USER}}') > - 1) {
        if (urldata && typeof(urldata) === 'object') {
            urls[key] = urls[key].replace('{{USER}}', urldata.user);
        }
    }

    if (urls[key].indexOf('{{SLUG}}') > -1) {
        if (urldata && typeof(urldata) === 'object') {
            urls[key] = urls[key].replace('{{SLUG}}', urldata.slug);
        }
    }

    if (urls[key]) {
	
		if (urldata && typeof urldata !== "string") {
			urldata = '?'+jQuery.param(urldata);
		} else {
			urldata = '';
		}

		return this._postProcessURL(this.baseurl + urls[key] + urldata);
		
    } else {
        return false;
    }


};




/*
 * Verify authentication credentials. 
*/
SpazTwit.prototype.verifyCredentials = function(onSuccess, onFailure) {
	var url = this.getAPIURL('verify_credentials');
	
	var opts = {
		'url':url,
		'process_callback': this._processAuthenticatedUser,
		'success_event_type':'verify_credentials_succeeded',
		'failure_event_type':'verify_credentials_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

/**
 * This takes data retrieved from the verifyCredentials method and stores it
 * in this.me. it then fires off the event specified in finished_event
 * 
 * @param {object} data the data returned by a successful call to the verifyCredentials API method
 * @param {string} finished_event the type of event to fire 
 * @private
 */
SpazTwit.prototype._processAuthenticatedUser = function(data, opts) {
	this.me = data;
	this.initializeData();
	
	if (opts.success_callback) {
		opts.success_callback(this.me);
	}
	this.triggerEvent(opts.success_event_type, this.me);
	
};


/**
 * Initiates retrieval of the public timeline. 
 */
SpazTwit.prototype.getPublicTimeline = function(onSuccess, onFailure) {
	var url = this.getAPIURL('public_timeline');
	
	var xhr = this._getTimeline({
		'url':url,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_public_timeline_data'
	});
};


/**
 * Initiates retrieval of the home timeline (all the people you are following)
 * 
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getHomeTimeline = function(since_id, count, page, processing_opts, onSuccess, onFailure) {
	
	if (!page) { page = null;}
	if (!count) { count = 50;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_HOME].lastid && this.data[SPAZCORE_SECTION_HOME].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_HOME].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_HOME;
	}
	
	var data = {};
	if (since_id < -1) {
		data['max_id'] = Math.abs(since_id);
	} else {
		data['since_id'] = since_id;
	}
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('home_timeline', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processHomeTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_home_timeline_data',
		'failure_event_type': 'error_home_timeline_data',
		'processing_opts':processing_opts
	});
};

/**
 * @private
 */
SpazTwit.prototype._processHomeTimeline = function(ret_items, opts, processing_opts) {
	// sc.helpers.dump('Processing '+ret_items.length+' items returned from home method');
	this._processTimeline(SPAZCORE_SECTION_HOME, ret_items, opts, processing_opts);
};



/**
 * Initiates retrieval of the friends timeline (all the people you are following)
 * 
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getFriendsTimeline = function(since_id, count, page, processing_opts, onSuccess, onFailure) {
	
	if (!page) { page = null;}
	if (!count) { count = 50;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_FRIENDS].lastid && this.data[SPAZCORE_SECTION_FRIENDS].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_FRIENDS].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_FRIENDS;
	}
	
	var data = {};
	data['since_id'] = since_id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('friends_timeline', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processFriendsTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_friends_timeline_data',
		'failure_event_type': 'error_friends_timeline_data',
		'processing_opts':processing_opts
	});
};

/**
 * @private
 */
SpazTwit.prototype._processFriendsTimeline = function(ret_items, opts, processing_opts) {
	// sc.helpers.dump('Processing '+ret_items.length+' items returned from friends method');
	this._processTimeline(SPAZCORE_SECTION_FRIENDS, ret_items, opts, processing_opts);
};


/**
 *  
 */
SpazTwit.prototype.getReplies = function(since_id, count, page, processing_opts, onSuccess, onFailure) {	
	if (!page) { page = null;}
	if (!count) { count = null;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_REPLIES].lastid && this.data[SPAZCORE_SECTION_REPLIES].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_REPLIES].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_REPLIES;
	}
	
	
	var data = {};
	if (since_id < -1) {
		data['max_id'] = Math.abs(since_id);
	} else {
		data['since_id'] = since_id;
	}
	if (page) {
		data['page'] = page;
	}
	if (count) {
		data['count'] = count;
	}
	
	var url = this.getAPIURL('replies_timeline', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processRepliesTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_replies_timeline_data',
		'failure_event_type': 'error_replies_timeline_data',
		'processing_opts':processing_opts
	});

};


/**
 * @private
 */
SpazTwit.prototype._processRepliesTimeline = function(ret_items, opts, processing_opts) {
	// sc.helpers.dump('Processing '+ret_items.length+' items returned from replies method');
	this._processTimeline(SPAZCORE_SECTION_REPLIES, ret_items, opts, processing_opts);
};

/**
 *  
 */
SpazTwit.prototype.getDirectMessages = function(since_id, count, page, processing_opts, onSuccess, onFailure) {
	if (!page) { page = null;}
	if (!count) { count = null;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_DMS].lastid && this.data[SPAZCORE_SECTION_DMS].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_DMS].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_DMS;
	}
	
	var data = {};
	if (since_id < -1) {
		data['max_id'] = Math.abs(since_id);
	} else {
		data['since_id'] = since_id;
	}
	if (page) {
		data['page'] = page;
	}
	if (count) {
		data['count'] = count;
	}
	
	var url = this.getAPIURL('dm_timeline', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processDMTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_dms_timeline_data',
		'failure_event_type': 'error_dms_timeline_data',
		'processing_opts':processing_opts		
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processDMTimeline = function(ret_items, opts, processing_opts) {
	// sc.helpers.dump('Processing '+ret_items.length+' items returned from DM method');
	this._processTimeline(SPAZCORE_SECTION_DMS, ret_items, opts, processing_opts);
};

/**
 *  
 */
SpazTwit.prototype.getFavorites = function(page, processing_opts, onSuccess, onFailure) {	
	if (!page) { page = null;}
	if (!processing_opts) {
		processing_opts = {};
	}
	
	var data = {};
	if (page) {
		data['page'] = page;
	}
	
	var url = this.getAPIURL('favorites', data);

	this._getTimeline({
		'url':url,
		'process_callback'	: this._processFavoritesTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_favorites_timeline_data',
		'failure_event_type': 'error_favorites_timeline_data',
		'processing_opts':processing_opts
	});

};
/**
 * @private
 */
SpazTwit.prototype._processFavoritesTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_FAVORITES, ret_items, opts, processing_opts);
};



SpazTwit.prototype.getSent = function(since_id, count, page, onSuccess, onFailure) {}; // auth user's sent statuses
SpazTwit.prototype.getSentDirectMessages = function(since_id, page, onSuccess, onFailure) {};

SpazTwit.prototype.getUserTimeline = function(id, count, page, onSuccess, onFailure) {

	var opts = sch.defaults({
		'id': id,
		'since_id': null,
		'count': count || 10,
		'page': page || null,
		'onSuccess': onSuccess,
		'onFailure': onFailure
	}, id);

	if (!opts.id || 'object' === typeof opts.id) {
		return;
	}

	var data = {};
	data['id']    = opts.id;
	data['count'] = opts.count;
	if (opts.since_id) {
		if (opts.since_id < -1) {
			data['max_id'] = Math.abs(opts.since_id);
		} else {
			data['since_id'] = opts.since_id;
		}
	}
	if (opts.page) {
		data['page'] = opts.page;
	}
	
	
	var url = this.getAPIURL('user_timeline', data);
	
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processUserTimeline,
		'success_callback':opts.onSuccess,
		'failure_callback':opts.onFailure,
		'success_event_type': 'new_user_timeline_data',
		'failure_event_type': 'error_user_timeline_data'
	});
}; // given user's sent statuses


/**
 * @private
 */
SpazTwit.prototype._processUserTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_USER, ret_items, opts, processing_opts);
};



/**
 * this retrieves three different timelines. the event "new_combined_timeline_data"
 * does not fire until ALL async ajax calls are made 
 * 
 * 
 */
SpazTwit.prototype.getCombinedTimeline = function(com_opts, onSuccess, onFailure) {
	var home_count, friends_count, replies_count, dm_count, 
		home_since, friends_since, dm_since, replies_since,
		home_page, friends_page, dm_page, replies_page;

	var opts = {
		'combined':true
	};
	
	if (com_opts) {
		
		if (com_opts.friends_count) {
			friends_count = com_opts.friends_count;
		}
		if (com_opts.home_count) {
			home_count = com_opts.home_count;
		}
		if (com_opts.replies_count) {
			replies_count = com_opts.replies_count; // this is not used yet
		}
		if (com_opts.dm_count) {
			dm_count = com_opts.dm_count; // this is not used yet
		}
		
		if (com_opts.home_since) {
			home_since = com_opts.home_since;
		}
		if (com_opts.friends_since) {
			friends_since = com_opts.friend_since;
		}
		if (com_opts.replies_since) {
			replies_since = com_opts.replies_since;
		}
		if (com_opts.dm_since) {
			dm_since = com_opts.dm_since;
		}
		
		if (com_opts.home_page) {
			home_page = com_opts.home_page;
		}
		if (com_opts.friends_page) {
			friends_page = com_opts.friends_page;
		}
		if (com_opts.replies_page) {
			replies_page = com_opts.replies_page;
		}
		if (com_opts.dm_page) {
			dm_page = com_opts.dm_page;
		}
		
		/*
			we might still only pass in friends_* opts, so we translate those to home_*
		*/
		if (!home_count) { home_count = friends_count; }
		if (!home_since) { home_since = friends_since; }
		if (!home_page) { home_page = friends_page; }
		
		if (com_opts.force) {
			opts.force = true;
		}
	}
	
	this.getHomeTimeline(home_since, home_count, home_page, opts, onSuccess, onFailure);
	this.getReplies(replies_since, replies_count, replies_page, opts, onSuccess, onFailure);
	this.getDirectMessages(dm_since, dm_count, dm_page, opts, onSuccess, onFailure);
};



SpazTwit.prototype.search = function(query, since_id, results_per_page, page, lang, geocode, onSuccess, onFailure) {
	if (!page) { page = 1;}
	// if (!since_id) {
	// 	if (this.data[SPAZCORE_SECTION_SEARCH].lastid && this.data[SPAZCORE_SECTION_SEARCH].lastid > 1) {
	// 		since_id = this.data[SPAZCORE_SECTION_SEARCH].lastid;
	// 	} else {
	// 		since_id = 1;
	// 	}
	// }
	if (!results_per_page) {
		results_per_page = 100;
	}
	
	
	var data = {};
	data['q']        = query;
	data['rpp']      = results_per_page;
	// data['since_id'] = since_id;
	data['page']     = page;
	if (lang) {
		data['lang'] = lang;
	}
	if (geocode) {
		data['geocode'] = geocode;
	}
	
	var url = this.getAPIURL('search', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processSearchTimeline,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_search_timeline_data',
		'failure_event_type': 'error_search_timeline_data'
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processSearchTimeline = function(search_result, opts, processing_opts) {	
	/*
		Search is different enough that we need to break it out and 
		write a custom alternative to _processTimeline
	*/
	if (!processing_opts) { processing_opts = {}; }

	/*
		reset .newitems data properties
	*/
	this.data[SPAZCORE_SECTION_SEARCH].newitems = [];
	
	/*
		put these results in the lastresultdata property
	*/
	this.data[SPAZCORE_SECTION_SEARCH].lastresultdata = search_result;
	
	/*
		grab the array of items
	*/
	var ret_items = search_result.results;

	if (ret_items && ret_items.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processSearchItem(ret_items[k], SPAZCORE_SECTION_SEARCH);
		}

		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
					
		/*
			set lastid
		*/ 
		var lastid = ret_items[ret_items.length-1].id;
		this.data[SPAZCORE_SECTION_SEARCH].lastid = lastid;
		sc.helpers.dump('this.data['+SPAZCORE_SECTION_SEARCH+'].lastid:'+this.data[SPAZCORE_SECTION_SEARCH].lastid);

		/*
			add new items to data.newitems array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].newitems = ret_items;

		/*
			concat new items onto data.items array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].items = this.data[SPAZCORE_SECTION_SEARCH].items.concat(this.data[SPAZCORE_SECTION_SEARCH].newitems);
		
		this.data[SPAZCORE_SECTION_SEARCH].items = this.removeDuplicates(this.data[SPAZCORE_SECTION_SEARCH].items);
		sch.debug('NOT removing extras from search -- we don\'t do that anymore');
		// this.data[SPAZCORE_SECTION_SEARCH].items = this.removeExtraElements(this.data[SPAZCORE_SECTION_SEARCH].items, this.data[SPAZCORE_SECTION_SEARCH].max);


		var search_info = {
			'since_id'         : search_result.since_id,
			'max_id'           : search_result.max_id,
			'refresh_url'      : search_result.refresh_url,
			'results_per_page' : search_result.results_per_page,
			'next_page'        : search_result.next_page,
			'completed_in'     : search_result.completed_in,
			'page'             : search_result.page,
			'query'            : search_result.query
		};
		
		if (opts.success_callback) {
			opts.success_callback(this.data[SPAZCORE_SECTION_SEARCH].newitems, search_info);
		}
		this.triggerEvent(opts.success_event_type, [this.data[SPAZCORE_SECTION_SEARCH].newitems, search_info]);
		


	} else { // no new items, but we should fire off success anyway
		
		if (opts.success_callback) {
			opts.success_callback(null, []);
		}
		this.triggerEvent(opts.success_event_type, []);
	}
	
};



SpazTwit.prototype._processSearchItem = function(item, section_name) {
	
	// remove snowflakeyness
	item = this.deSnowFlake(item);
	
	// set service data
	item.SC_service_baseurl = this.baseurl;
	item.SC_service = this.getServiceFromBaseURL(this.baseurl);
	
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	// sc.helpers.dump(item);
	
	item.SC_is_search = true;

	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at);
	}
	
	/*
		add raw text .SC_raw_text for unmodified text
	*/
	if (!item.SC_text_raw) {
		item.SC_text_raw = item.text;
	}
	
	/*
		add "in_reply_to_screen_name" if it does not exist
	*/
	if (!item.in_reply_to_screen_name && item.in_reply_to_user_id) {
		/**
		 * @todo get this from the Spaz code 
		 */
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	/*
		normalize so we have as much user data in this object as possible
	*/
	item.user = {
		'profile_image_url':item.profile_image_url,
		'screen_name':item.from_user,
		'id':item.from_user_id
	};
	
	/*
		The source info here is encoded differently
	*/
	item.source = sc.helpers.fromHTMLSpecialChars(item.source);
	
	
	return item;
};


SpazTwit.prototype.getTrends = function(onSuccess, onFailure) {
	var url = this.getAPIURL('trends');
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processTrends,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type': 'new_trends_data',
		'failure_event_type': 'error_trends_data'
	});
};


/**
 * @private
 */
SpazTwit.prototype._processTrends = function(trends_result, opts, processing_opts) {

	if (!processing_opts) { processing_opts = {}; }
	
	/*
		grab the array of items
	*/
	var ret_items = trends_result.trends;

	if (ret_items && ret_items.length > 0) {

		for (var k=0; k<ret_items.length; k++) {
			ret_items[k].searchterm = ret_items[k].name;
			if ( /\s+/.test(ret_items[k].searchterm)) { // if there is whitespace, wrap in quotes
				ret_items[k].searchterm = '"'+ret_items[k].searchterm+'"';
			}
		}
		// jQuery().trigger(finished_event, [ret_items]);
		
		if (opts.success_callback) {
			opts.success_callback(ret_items);
		}
		this.triggerEvent(opts.success_event_type, ret_items);
		
	}
};


/**
 * this is a general wrapper for timeline methods
 * @param {obj} opts a set of options for this method 
 * @private
 */
SpazTwit.prototype._getTimeline = function(opts) {
	
	opts = sch.defaults({
		'method':'GET',
		'timeout':this.DEFAULT_TIMEOUT,
		'url':null,
		'data':null,
		'process_callback':null,
		'processing_opts':null,
		'success_event_type':null,
		'failure_event_type':null,
		'success_callback':null,
		'failure_callback':null
	}, opts);
	
	/*
		for closure references
	*/
	var stwit = this;
	
	sch.error('_getTimeline opts:');
	sch.error(opts);
	
	var xhr = jQuery.ajax({
		'timeout' :opts.timeout,
        'complete':function(xhr, msg){
            sch.error(opts.url + ' complete:'+msg);
			if (msg === 'timeout') {
				// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
				stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});				
			}
        },
        'error':function(xhr, msg, exc) {
			sch.error(opts.url + ' error:"'+msg+'"');
			if (msg.toLowerCase().indexOf('timeout') !== -1) {
				stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':null, 'msg':msg});
				/*
					don't fire the callback if this is part of a combined call
				*/
				if (!opts.processing_opts || !opts.processing_opts.combined) {
					if (opts.failure_callback) {
						opts.failure_callback(null, msg, exc);
					}
				}
			} else if (xhr) {
				if (!xhr.readyState < 4) {
					sc.helpers.dump("Error:"+xhr.status+" from "+opts['url']);
					if (xhr.responseText) {
						try {
							var data = sc.helpers.deJSON(xhr.responseText);
						} catch(e) {
							sc.helpers.dump(e.name + ":" + e.message);
							data = xhr.responseText;
						}
					}
				}
				if (opts.failure_callback) {
					opts.failure_callback(xhr, msg, exc);
				}
				if (opts.failure_event_type) {
					sc.helpers.dump("opts.failure_event_type:"+opts.failure_event_type);
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});
					
				}
	
	        } else {
                sc.helpers.dump("Error:Unknown from "+opts['url']);
				if (opts.failure_callback) {
					opts.failure_callback(null, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':null, 'msg':'Unknown Error'}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':'Unknown Error'});
					
				}
            }
			// jQuery().trigger('spaztwit_ajax_error', [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
			stwit.triggerEvent('spaztwit_ajax_error', {'url':opts.url, 'xhr':xhr, 'msg':msg});
			
			if (opts.processing_opts && opts.processing_opts.combined) {
				sc.helpers.dump('adding to combined processing errors');
				if (xhr && xhr.readyState > 3) {
					stwit.combined_errors.push( {'url':opts.url, 'xhr':xhr, 'msg':msg, 'section':opts.processing_opts.section} );
				} else {
					stwit.combined_errors.push( {'url':opts.url, 'xhr':null, 'msg':msg, 'section':opts.processing_opts.section} );
				}
				
				stwit.combined_finished[opts.processing_opts.section] = true;
				sc.helpers.dump(stwit.combined_errors);
				sc.helpers.dump(stwit.combined_finished);
				if (opts.process_callback) {
					opts.process_callback.call(stwit, [], opts, opts.processing_opts);
				}
			}
			
        },
        'success':function(data) {
			// sc.helpers.dump("Success! \n\n" + data);
			sch.error(opts.url + ' success!'+" data:"+data);
			
			try {
				data = sc.helpers.deJSON(data);
			} catch(e) {
				stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':'Error decoding data from server'});
			}

			if (opts.process_callback) {
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts, opts.processing_opts);
			} else {
				if (opts.success_callback) {
					sch.error('CALLING SUCCESS CALLBACK');
					opts.success_callback(data);
				}
				// jQuery().trigger(opts.success_event_type, [data]);
				stwit.triggerEvent(opts.success_event_type, data);
			}			
        },
        'beforeSend':function(xhr){
			sc.helpers.dump(opts.url + ' beforesend');
			if (stwit.auth) {
				sch.debug('signing request');
				xhr.setRequestHeader('Authorization', stwit.auth.signRequest(opts.method, opts.url, opts.data));
			} else {
				sch.debug('NOT signing request -- no auth object provided');
			}
        },
        'type': 	opts.method,
        'url': 		opts.url,
        'data': 	opts.data,
		'dataType':'text'
	});
	
	return xhr;
};



/**
 * general processor for timeline data 
 * @private
 */
SpazTwit.prototype._processTimeline = function(section_name, ret_items, opts, processing_opts) {
	
	sch.debug(opts);
	
	if (!processing_opts) { processing_opts = {}; }

	if (section_name !== SPAZCORE_SECTION_USER) { // the user timeline section isn't persistent
		/*
			reset .newitems data properties
		*/
		this.data[section_name].newitems = [];
		
	}
	
	
	if (ret_items == undefined) {
		sch.error('ret_items is undefined!');
	}
	

	if (ret_items && ret_items.length > 0){
		
		var proc_items = [];
		
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			if (ret_items[k]) {
				proc_items.push(this._processItem(ret_items[k], section_name));
			}
		}
		ret_items = proc_items;
		proc_items = null;


		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
		
		
		if (section_name === SPAZCORE_SECTION_USER) { // special case -- we don't keep this data, just parse and fire it off

			if (opts.success_callback) {
				opts.success_callback(ret_items);
			}

			this.triggerEvent(opts.success_event_type, ret_items);
			
		} else { // this is a "normal" timeline that we want to be persistent
			
			if (opts.is_update_item) {
				/*
					we do not want this to be the lastid, instead remember it in combined.updates
				*/
				this.combinedTimelineAddUpdates(ret_items);
			} else {
				// set lastid
				var lastid = ret_items[ret_items.length-1].id;
				this.data[section_name].lastid = lastid;
				sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);
			}

			// add new items to data.newitems array
			this.data[section_name].newitems = ret_items;

			this._addToSectionItems(section_name, this.data[section_name].newitems);


			// @todo check length of data.items, and remove oldest extras if necessary
			/*
				@todo
			*/

			/*
				Fire off the new section data event
			*/
			if (!processing_opts.combined) {
				
				if (opts.success_callback) {
					opts.success_callback(this.data[section_name].newitems);
				}
				
				this.triggerEvent(opts.success_event_type, this.data[section_name].items);
			} else {
				this.combined_finished[section_name] = true;
				sc.helpers.dump("this.combined_finished["+section_name+"]:"+this.combined_finished[section_name]);
			}
			


			/*
				add on to newitems array for combined section
			*/
			this.data[SPAZCORE_SECTION_COMBINED].newitems = this.data[SPAZCORE_SECTION_COMBINED].newitems.concat(this.data[section_name].newitems);
			
		}


	} else { // no new items, but we should fire off success anyway
		if (!processing_opts.combined) {
			// jQuery().trigger(finished_event, []);
			if (opts.success_callback) {
				opts.success_callback();
			}
			this.triggerEvent(opts.success_event_type);
			
		} else {
			this.combined_finished[section_name] = true;
		}
	}
	
	/*
		Fire off the new combined data event
	*/
	if (this.combinedTimelineFinished()) {
		
		/*
			Remove those updates from combined newitems
		*/
		this.combinedNewItemsRemoveUpdates();

		/*
			we do this stuff here to avoid processing repeatedly
		*/
		
		this._addToSectionItems(SPAZCORE_SECTION_COMBINED, this.data[SPAZCORE_SECTION_COMBINED].newitems, this._sortItemsByDateAsc);
		
		// sort these items -- the timelines can be out of order when combined

		
		// sc.helpers.dump('Removing duplicates in '+SPAZCORE_SECTION_COMBINED+' newitems');
		// 
		this.data[SPAZCORE_SECTION_COMBINED].newitems = this._cleanupItemArray(this.data[SPAZCORE_SECTION_COMBINED].newitems, this.data[SPAZCORE_SECTION_COMBINED].max, this._sortItemsByDateAsc);
		
		if (this.combinedTimelineHasErrors()) {
			if (opts.failure_callback) {
				opts.failure_callback(this.combined_errors);
			}
			
			this.triggerEvent('error_combined_timeline_data', this.combined_errors);
		}
		
		if (opts.success_callback) {
			opts.success_callback(this.data[SPAZCORE_SECTION_COMBINED].newitems);
		}
		sch.debug('this.data[SPAZCORE_SECTION_COMBINED].newitems has '+this.data[SPAZCORE_SECTION_COMBINED].newitems.length+' items');
		this.triggerEvent('new_combined_timeline_data', this.data[SPAZCORE_SECTION_COMBINED].newitems);
		this.data[SPAZCORE_SECTION_COMBINED].newitems = []; // reset combined.newitems
		this.initializeCombinedTracker();
	}
};


/**
 * Adds an array of items to the .items property of the appropriate section, then
 * removes dupes, extras, and optionally sorts the section items
 * @param {string} section_name
 * @param {array}  arr  an array of items
 * @param {function}  sortfunc - optional 
 */
SpazTwit.prototype._addToSectionItems = function(section_name, arr, sortfunc) {
	// concat new items onto data.items array
	var data = this.data[section_name];
	data.items = this._cleanupItemArray(data.items.concat(arr), null, sortfunc);
};

/**
 * Sorts (optionally), removes dupes, and removes extra items from a given
 * array of section items
 * 
 * @param {array} arr
 * @param {max} integer
 * @param {func} sortfunc - optional
 * 
 * @return {array} 
 */
SpazTwit.prototype._cleanupItemArray = function(arr, max, sortfunc) {
	if (sortfunc) {
		arr = arr.sort(sortfunc);
	}
	arr = this.removeDuplicates(arr);
	sch.debug('NOT removing extras -- we don\'t do that anymore');
	// arr = this.removeExtraElements(arr, max);
	return arr;
};

/**
 * This modifies a Twitter post, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processItem = function(item, section_name) {
	
	// remove snowflakeyness
	item = this.deSnowFlake(item);
	
	// set service data
	item.SC_service_baseurl = this.baseurl;
	item.SC_service = this.getServiceFromBaseURL(this.baseurl);
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	
	/*
		is reply? Then add .SC_is_reply
	*/
	if ( (item.in_reply_to_screen_name && item.SC_user_received_by) ) {
		if (item.in_reply_to_screen_name.toLowerCase() === item.SC_user_received_by.toLowerCase() ) {
			item.SC_is_reply = true;
		}
	}
	
	/*
		is an official API retweet? then add .SC_is_retweet
	*/
	if ( item.retweeted_status ) {
		item.SC_is_retweet = true;
	}
	
	/*
		If it comes from the replies timeline, it's a reply (aka a mention)
	*/
	if (section_name === SPAZCORE_SECTION_REPLIES) {
		item.SC_is_reply = true;
	}
	
	/*
		Does it contain my name? then it's a reply
	*/
	if (this.username && sc.helpers.containsScreenName(item.text, this.username) ) {
		item.SC_is_reply = true;
	}
	
	if (item.user) {
		item.user = this._processUser(item.user);
	}
	
	
	/*
		is dm?
	*/
	if (item.recipient_id && item.sender_id) {
		item.SC_is_dm = true;
		
		if (item.sender) {
			item.sender = this._processUser(item.sender);
		}
		if (item.recipient) {
			item.recipient = this._processUser(item.recipient);
		}
		
		
	}
	
	
	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at);
	}
	
	/*
		add raw text .SC_raw_text for unmodified text
	*/
	if (!item.SC_text_raw) {
		item.SC_text_raw = item.text;
	}
	
	/*
		add "in_reply_to_screen_name" if it does not exist
	*/
	if (!item.in_reply_to_screen_name && item.in_reply_to_user_id) {
		/**
		 * @todo get this from the Spaz code 
		 */
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	return item;
};



/**
 * This modifies a Twitter post, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processUser = function(item, section_name) {
	
	// remove snowflakeyness
	item = this.deSnowFlake(item);
	
	// set service data
	item.SC_service_baseurl = this.baseurl;
	item.SC_service = this.getServiceFromBaseURL(this.baseurl);
	
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	
	
	if (section_name === SPAZCORE_SECTION_FOLLOWERSLIST) {
		item.SC_is_follower;
	}
	if (section_name === SPAZCORE_SECTION_FRIENDLIST) {
		item.SC_is_followed;
	}
	
	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at)/1000;
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt()/1000;
	}
	
	return item;
};


/**
 * returns the header string for oAuth Echo usage
 */
SpazTwit.prototype.getEchoHeader = function(opts) {
	var url;
	if (opts && opts.verify_url) {
		url = opts.verify_url;
	} else {
		url = this.getAPIURL('verify_credentials');
	}
	
	var method = 'GET';

	var auth_header = this.auth.signRequest(method, url, null);

	return auth_header;
};


/**
 * this is a general wrapper for non-timeline methods on the Twitter API. We
 * use this to call methods that will return a single response 
 * 
 * @param {obj} opts a set of options for this method 
 * @param {string} opts.url The url for the request
 * @param {string} [opts.method] the HTTP method to use. default is POST
 * @param {number} [opts.timeout] the timeout for the request. default is 60 seconds
 * @param {object} [opts.data] data to pass with the request
 * @param {string} [opts.username]
 * @param {string} [opts.password]
 * @param {function} [opts.process_callback] a function to call on the retured data for extra processing on success
 * @param {string} [opts.success_event_type] the event to trigger on success
 * @param {string} [opts.failure_event_type] the event to trigger on failure
 * @param {function} [opts.success_callback] a callback to fire on success
 * @param {function} [opts.failure_callback] a callback to fire on failure
 */
SpazTwit.prototype._callMethod = function(opts) {
	
	opts = sch.defaults({
		'method':'POST',
		'timeout':this.DEFAULT_TIMEOUT,
		'url':null,
		'data':null,
		'process_callback':null,
		'success_event_type':null,
		'failure_event_type':null,
		'success_callback':null,
		'failure_callback':null
	}, opts);
	
	var method;
	
	/*
		for closure references
	*/
	var stwit = this;
	
	if (opts.method) {
		method = opts.method;
	} else {
		method = 'POST';
	}
	
	var xhr = jQuery.ajax({
		'timeout' :this.opts.timeout,
	    'complete':function(xhr, msg){
	        sc.helpers.dump(opts.url + ' complete:'+msg);
	    },
	    'error':function(xhr, msg, exc) {
			sc.helpers.error(opts.url + ' error:'+msg);
	        if (xhr) {
				if (!xhr.readyState < 4) {
					sc.helpers.dump("Error:"+xhr.status+" from "+opts['url']);
					if (xhr.responseText) {
						try {
							var data = sc.helpers.deJSON(xhr.responseText);
						} catch(e) {
							sc.helpers.dump(e.name + ":" + e.message);
							data = xhr.responseText;
						}
					}
				}
				if (opts.failure_callback) {
					opts.failure_callback(xhr, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});
				}
	
	        } else {
	            sc.helpers.dump("Error:Unknown from "+opts['url']);
				if (opts.failure_callback) {
					opts.failure_callback(null, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':null, 'msg':'Unknown Error'}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':null, 'msg':'Unknown Error'});

				}
	        }
			// jQuery().trigger('spaztwit_ajax_error', [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
			stwit.triggerEvent('spaztwit_ajax_error', {'url':opts.url, 'xhr':xhr, 'msg':msg});
	    },
	    'success':function(data) {
			sc.helpers.error(opts.url + ' success');
			data = sc.helpers.deJSON(data);
			if (opts.process_callback) {
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts);
			} else {
				if (opts.success_callback) {
					opts.success_callback(data);
				}
				// jQuery().trigger(opts.success_event_type, [data]);
				stwit.triggerEvent(opts.success_event_type, data);
				
			}
	    },
	    'beforeSend':function(xhr){
			sc.helpers.dump(opts.url + ' beforesend');
			if (stwit.auth) {
				sch.debug('signing request');
				xhr.setRequestHeader('Authorization', stwit.auth.signRequest(method, opts.url, opts.data));
			} else {
				sch.debug('NOT signing request -- no auth object provided');
			}
	    },
	    'type': method,
	    'url' : opts.url,
		'data': opts.data,
		'dataType':'text'
	});
	return xhr;
};



SpazTwit.prototype.getUser = function(user_id, onSuccess, onFailure) {
	var data = {};
	var that = this;

	if (sch.isString(user_id) && user_id.indexOf('@') === 0) {
		data.screen_name = user_id.substr(1);
	} else {
		data.user_id = user_id;
	}
	
	var url = this.getAPIURL('show_user');
	
	var opts = {
		'url':url,
		'data':data,
		'success_event_type':'get_user_succeeded',
		'failure_event_type':'get_user_failed',
		'success_callback': function(data) {
			sch.error('BEFORE PROCESSING');
			sch.error(data);
			data = that._processUser(data, SPAZCORE_SECTION_HOME);
			sch.error('AFTER PROCESSING');
			sch.error(data);
			onSuccess(data);
		},
		'failure_callback':onFailure,
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};



SpazTwit.prototype.getFriendsList = function(user_id, cursor, onSuccess, onFailure) {

	var url = this.getAPIURL('friendslist');

	var data = {};

    if (sch.isString(user_id) && user_id.indexOf('@') === 0) {
		data.screen_name = user_id.substr(1);
    } else {
        data.user_id = user_id;
    }

    if (cursor) {
        data.cursor = cursor;
    } else {
        data.cursor = -1;
    }

	var opts = {
		'url':url,
		'data':data,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'process_callback': this._processFriendsList,
		'success_event_type':'get_friendslist_succeeded',
		'failure_event_type':'get_friendslist_failed',
		'method':'GET'
	};

	var xhr = this._getTimeline(opts);
};
/**
 * @private
 */
SpazTwit.prototype._processFriendsList = function(ret_items, opts, processing_opts) {
	this._processUserList(SPAZCORE_SECTION_FRIENDLIST, ret_items, opts, processing_opts);
};






SpazTwit.prototype.getFollowersList = function(user_id, cursor, onSuccess, onFailure) {
	var url = this.getAPIURL('followerslist');
	
	var data = {};

	if (sch.isString(user_id) && user_id.indexOf('@') === 0) {
		data.screen_name = user_id.substr(1);
	} else {
	    data.user_id = user_id;
	}
	
    if (cursor) {
        data.cursor = cursor;
    } else {
        data.cursor = -1;
    }

	var opts = {
		'url':url,
		'data':data,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'process_callback': this._processFollowersList,
		'success_event_type':'get_followerslist_succeeded',
		'failure_event_type':'get_followerslist_failed',
		'method':'GET'
	};

	var xhr = this._getTimeline(opts);
};
/**
 * @private
 */
SpazTwit.prototype._processFollowersList = function(ret_items, opts, processing_opts) {
	this._processUserList(SPAZCORE_SECTION_FOLLOWERSLIST, ret_items, opts, processing_opts);
};



/**
 * general processor for userlist data. results are not sorted
 * @private
 */
SpazTwit.prototype._processUserList = function(section_name, ret_items, opts, processing_opts) {
	
	var users = [], next = -1, prev = -1;
	
	if (!processing_opts) { processing_opts = {}; }

    if (ret_items.users) {
        users = ret_items.users;
        next  = ret_items.next_cursor_str;
        prev  = ret_items.previous_cursor_str;
    } else {
        users = ret_items;
    }

	if (users.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<users.length; k++) {
			users[k] = this._processUser(users[k], section_name);
			sch.dump(users[k]);
		}
		
			
		// set lastid
		var lastid = users[users.length-1].id;
		this.data[section_name].lastid = lastid;
		sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

		// add new items to data.newitems array
		this.data[section_name].newitems = users;

		this._addToSectionItems(section_name, this.data[section_name].newitems);

		if (opts.success_callback) {
			opts.success_callback(this.data[section_name].newitems, { 'next':next, 'prev':prev });
		}
		this.triggerEvent(opts.success_event_type, this.data[section_name].newitems );

	} else { // no new items, but we should fire off success anyway
		if (opts.success_callback) {
			opts.success_callback(users, { 'next':next, 'prev':prev });
		}
		this.triggerEvent(opts.success_event_type);
	}

};


SpazTwit.prototype.addFriend = function(user_id, onSuccess, onFailure) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('friendship_create', data);
	
	var opts = {
		'url':url,
		'success_event_type':'create_friendship_succeeded',
		'failure_event_type':'create_friendship_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};
SpazTwit.prototype.removeFriend = function(user_id, onSuccess, onFailure) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('friendship_destroy', data);
	
	var opts = {
		'url':url,
		'success_event_type':'destroy_friendship_succeeded',
		'failure_event_type':'destroy_friendship_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

/**
 * @param {string|number} target_id the target user id, or screen name if prefixed with a "@" 
 * @param {string|number} [source_id] the surce user id, or screen name if prefixed with a "@" 
 * @param {function} [onSuccess] success callback
 * @param {function} [onFailure] failure callback
 */
SpazTwit.prototype.showFriendship = function(target_id, source_id, onSuccess, onFailure) {
	var data = {};
	
	if (sch.isString(target_id) && target_id.indexOf('@')===0) {
		data['target_screen_name'] = target_id.substr(1);
	} else {
		data['target_id'] = target_id;
	}
	
	if (source_id) {
		if (sch.isString(source_id) && source_id.indexOf('@')===0) {
			data['source_screen_name'] = source_id.substr(1);
		} else {
			data['source_id'] = source_id;
		}
		
	}
	
	
	var url = this.getAPIURL('friendship_show', data);
	
	var opts = {
		'url':url,
		'method':'GET',
		'success_event_type':'show_friendship_succeeded',
		'failure_event_type':'show_friendship_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.getIncomingFriendships = function(cursor, onSuccess, onFailure) {
	var data = {};
	if (!cursor) {
		cursor = -1;
	}
	data['cursor'] = cursor;
	
	var url = this.getAPIURL('friendship_incoming', data);
	
	var opts = {
		'url':url,
		'method':'GET',
		'success_event_type':'get_incoming_friendships_succeeded',
		'failure_event_type':'get_incoming_friendships_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.getOutgoingFriendships = function(cursor, onSuccess, onFailure) {
	var data = {};
	if (!cursor) {
		cursor = -1;
	}
	data['cursor'] = cursor;
	
	var url = this.getAPIURL('friendship_outgoing', data);
	
	var opts = {
		'url':url,
		'method':'GET',
		'success_event_type':'get_outgoing_friendships_succeeded',
		'failure_event_type':'get_outgoing_friendships_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.getFriendsGraph = function(user_id, cursor, onSuccess, onFailure) {
	var data = {};
	if (!cursor) {
		cursor = -1;
	}
	data['cursor'] = cursor;
	data['user_id'] = user_id;
	
	var url = this.getAPIURL('graph_friends', data);
	
	var opts = {
		'url':url,
		'method':'GET',
		'success_event_type':'get_friends_graph_succeeded',
		'failure_event_type':'get_friends_graph_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.getFollowersGraph = function(user_id, cursor, onSuccess, onFailure) {
	var data = {};
	if (!cursor) {
		cursor = -1;
	}
	data['cursor'] = cursor;
	data['user_id'] = user_id;
	
	var url = this.getAPIURL('graph_followers', data);
	
	var opts = {
		'url':url,
		'method':'GET',
		'success_event_type':'get_followers_graph_succeeded',
		'failure_event_type':'get_followers_graph_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.block = function(user_id, onSuccess, onFailure) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('block_create', data);
	
	var opts = {
		'url':url,
		'success_event_type':'create_block_succeeded',
		'failure_event_type':'create_block_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.unblock = function(user_id, onSuccess, onFailure) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('block_destroy', data);
	
	var opts = {
		'url':url,
		'success_event_type':'destroy_block_succeeded',
		'failure_event_type':'destroy_block_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.follow = function(user_id, onSuccess, onFailure) { // to add notification
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('follow', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'follow_succeeded',
		'failure_event_type':'follow_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
    
};

SpazTwit.prototype.unfollow = function(user_id, onSuccess, onFailure) { // to remove notification
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('unfollow', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'unfollow_succeeded',
		'failure_event_type':'unfollow_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
    
};


SpazTwit.prototype.update = function(status, source, in_reply_to_status_id, onSuccess, onFailure) {

	var url = this.getAPIURL('update');
	
	var data = {};
	if (in_reply_to_status_id) {
		data.in_reply_to_status_id = in_reply_to_status_id;
	}
	if (source) {
		data.source = source;
	} else {
		data.source = this.source;
	}
	data.status = status;
	
	var opts = {
		'url':url,
		'data':data,
		'process_callback': this._processUpdateReturn,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type':'update_succeeded',
		'failure_event_type':'update_failed'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

	
};

SpazTwit.prototype._processUpdateReturn = function(data, opts) {
	
	/*
		Add this to the HOME section and fire off the event when done
	*/	
	opts.is_update_item = true;
	this._processTimeline(SPAZCORE_SECTION_HOME, [data], opts);
};

/**
 * @param {string|number} user_id a string or number. if a screen name, prefix with '@'; else assumed to be a numeric user_id 
 * @param {string} text the message to send to the user_id
 */
SpazTwit.prototype.sendDirectMessage = function(user_id, text, onSuccess, onFailure) {
    var url = this.getAPIURL('dm_new');
	
	var data = {};
	
	if (sch.isString(user_id) && user_id.indexOf('@') === 0) {
	    data.screen_name = user_id.substr(1);
	} else {
	    data.user_id = user_id;
	}
	
	data.text = text;
	
	var opts = {
		'url':url,
		'data':data,
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'success_event_type':'sent_dm_succeeded',
		'failure_event_type':'sent_dm_failed'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};


/**
 * destroy/delete a status
 * @param {Number|String} id the id of the status 
 */
SpazTwit.prototype.destroy = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('destroy_status', data);
	
	var opts = {
		'url':url,
		'data':data,
		'success_event_type':'destroy_status_succeeded',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'failure_event_type':'destroy_status_failed'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

/**
 * destroy/delete a direct message
 * @param {Number|String} id the id of the status 
 */
SpazTwit.prototype.destroyDirectMessage = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('dm_destroy', data);
	
	var opts = {
		'url':url,
		'data':data,
		'success_event_type':'destroy_dm_succeeded',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'failure_event_type':'destroy_dm_failed'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};


SpazTwit.prototype.getOne = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('show', data);
	
	var opts = {
		'url':url,
		'process_callback': this._processOneItem,
		'success_event_type':'get_one_status_succeeded',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'failure_event_type':'get_one_status_failed',
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};


SpazTwit.prototype._processOneItem = function(data, opts) {
	
	/*
		this item needs to be added to the friends timeline
		so we can avoid dupes
	*/
	data = this._processItem(data);
	if (opts.success_callback) {
		opts.success_callback(data);
	}
	this.triggerEvent(opts.success_event_type, data);
	
};



/**
 * get related messages to the given message id
 * 
 * @param {string|number} id message id
 * @param {function} onSuccess callback function(data)
 * @param {function} onFailure callback function(xhr, message, exc)
 */
SpazTwit.prototype.getRelated = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('show_related', data);
	
	var opts = {
		'url':url,
		'success_event_type':'get_related_success',
		'failure_event_type':'get_related_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};





// Retweet API

/*
 * Retweets a tweet.
 * id: the numeric id of a tweet
 */
 
SpazTwit.prototype.retweet = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('retweet', data);
	
	var opts = {
		'url' : url,
		'username' : this.username,
		'password' : this.password,
		'success_event_type' : 'retweet_succeeded',
		'failure_event_type' : 'retweet_failed',
		'success_callback' : onSuccess,
		'failure_callback' : onFailure,
		'data' : data
	};
	
	var xhr = this._callMethod(opts);
};

/*
 * Gets up to 100 of the latest retweets of a tweet.
 * id: the tweet to get retweets of
 * count: the number of retweets to get
 */

SpazTwit.prototype.getRetweets = function(id, count) {
	var url = this.getAPIURL('retweets', {
		'id' : id,
		'count' : count
	});
	
	var opts = {
		'url' : url,
		'username' : this.username,
		'password' : this.password,
		'success_event_type' : 'get_retweets_succeeded',
		'failure_event_Type' : 'get_retweets_failed',
		'method' : 'GET'
	};
	
	var xhr = this._getTimeline(opts);
};

/*
 * Returns up to 200 of the most recent retweets by the user
 * since: the numeric id of the tweet serving as a floor
 * max: the numeric id of the tweet serving as a ceiling
 * count: the number of tweets to return. Cannot be over 200.
 * page: the page of results to return.
 */
 
SpazTwit.prototype.retweetedByMe = function(since, max, count, page){
	var params = {};
	if(since != null){
		params['since_id'] = since;
	}
	if(max != null){
		params['max_id'] = max;
	}
	if(count == null){
		count = 20;
	}
	params['count'] = count;
	if(page == null){
		page = 1;
	}
	params['page'] = page;
	var url = this.getAPIURL('retweeted_by_me', params);
	
	var opts = {
		'url' : url,
		'username' : this.username,
		'password' : this.password,
		'success_event_type' : 'retweeted_by_me_succeeded',
		'failure_event_type' : 'retweeted_by_me_failed',
		'method' : 'GET'
	};
	
	var xhr = this._getTimeline(opts);
};

/*
 * Returns up to 200 of the most recent retweets by the user's friends
 * since: the numeric id of the tweet serving as a floor
 * max: the numeric id of the tweet serving as a ceiling
 * count: the number of tweets to return. Cannot be over 200.
 * page: the page of results to return.
 */
 
SpazTwit.prototype.retweetedToMe = function(since, max, count, page){
	var params = {};
	if(since != null){
		params['since_id'] = since;
	}
	if(max != null){
		params['max_id'] = max;
	}
	if(count == null){
		count = 20;
	}
	params['count'] = count;
	if(page == null){
		page = 1;
	}
	params['page'] = page;
	var url = this.getAPIURL('retweeted_to_me', params);
	
	var opts = {
		'url' : url,
		'username' : this.username,
		'password' : this.password,
		'success_event_type' : 'retweeted_to_me_succeeded',
		'failure_event_type' : 'retweeted_to_me_failed',
		'method' : 'GET'
	};
	
	var xhr = this._getTimeline(opts);
};

/*
 * Returns up to 200 of the most recent retweets of the user's tweets
 * since: the numeric id of the tweet serving as a floor
 * max: the numeric id of the tweet serving as a ceiling
 * count: the number of tweets to return. Cannot be over 200.
 * page: the page of results to return.
 */
 
SpazTwit.prototype.retweetsOfMe = function(since, max, count, page){
	var params = {};
	if(since != null){
		params['since_id'] = since;
	}
	if(max != null){
		params['max_id'] = max;
	}
	if(count == null){
		count = 20;
	}
	params['count'] = count;
	if(page == null){
		page = 1;
	}
	params['page'] = page;
	var url = this.getAPIURL('retweets_of_me', params);
	
	var opts = {
		'url' : url,
		'username' : this.username,
		'password' : this.password,
		'success_event_type' : 'retweets_of_me_succeeded',
		'failure_event_type' : 'retweets_of_me_failed',
		'method' : 'GET'
	};
	
	var xhr = this._getTimeline(opts);
};

SpazTwit.prototype.favorite = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('favorites_create', data);
	
	var opts = {
		'url':url,
		'success_event_type':'create_favorite_succeeded',
		'failure_event_type':'create_favorite_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.unfavorite = function(id, onSuccess, onFailure) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('favorites_destroy', data);
	
	var opts = {
		'url':url,
		'success_event_type':'destroy_favorite_succeeded',
		'failure_event_type':'destroy_favorite_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};




SpazTwit.prototype.updateLocation = function(location_str, onSuccess, onFailure) {
	var data = {};
	data.location = location_str;
	
	this.setBaseURL(SPAZCORE_SERVICEURL_TWITTER);
	
	var url = this.getAPIURL('update_profile');
	
	var opts = {
		'url':url,
		'success_event_type':'update_location_succeeded',
		'failure_event_type':'update_location_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.updateProfile = function(name, email, url, location, description) {
	
};



/**
 * get the current rate limit status
 * @param {Function} onSuccess callback for success 
 * @param {Function} onFailure callback for failure 
 */
SpazTwit.prototype.getRateLimitStatus = function(onSuccess, onFailure) {
	
	var url = this.getAPIURL('ratelimit_status');
	
	var opts = {
		'method':'GET',
		'url':url,
		'success_event_type':'ratelimit_status_succeeded',
		'failure_event_type':'ratelimit_status_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

SpazTwit.prototype.test = function() {};


/**
 * @private 
 */
SpazTwit.prototype._postProcessURL = function(url) {
	
	if (typeof Mojo !== "undefined") { // we're in webOS		
		if (use_palmhost_proxy) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] !== Mojo.hostingPrefix) {
				url = "/proxy?url=" + encodeURIComponent(url);
			}
			return url;		
		} else {
			return url;
		}
		
	} else {
		return url;
	}
};


/**
 * sorting function for an array of tweets. Asc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsAscending) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsAscending = function(a,b) {
	if (a.id < b.id) {
		return -1;
	}

	if (a.id > b.id) {
		return 1;
	}

	return 0;
};

/**
 * sorting function for an array of tweets. Desc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsDescending) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsDescending = function(a,b) {
	if (a.id < b.id) {
		return 1;
	}

	if (a.id > b.id) {
		return -1;
	}

	return 0;

};



/**
 * sorting function for an array of tweets. Asc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateAsc) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsByDateAsc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_a - time_b);
};

/**
 * sorting function for an array of tweets. Desc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateDesc)
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object 
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsByDateDesc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_b - time_a);
};


/**
 * this takes an array of messages and returns one with any duplicates removed
 * 
 * This is based on the jQuery.unique() method
 * 
 * @param {array} array an array of Twitter message objects
 * @return {array}
 */
SpazTwit.prototype.removeDuplicates = function(arr) {
	
	var ret = [], done = {}, length = arr.length;

	try {
		for ( var i = 0; i < length; i++ ) {
			var id = arr[i].id;
			
			if ( !done[ id ] ) {
				done[ id ] = true;
				ret.push( arr[ i ] );
			} else {
				sc.helpers.dump("removing dupe " + arr[i].id + ', "'+arr[i].text+'"');
			}
		}

	} catch( e ) {
		sc.helpers.dump(e.name + ":" + e.message);
		ret = arr;
	}
	return ret;
	
};


/**
 * removes extra elements from a timeline array.
 * @param {array} items the timeline array
 * @param {integer} max the max # of items we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE 
 */
SpazTwit.prototype.removeExtraElements = function(items, max, remove_from_top) {
	
	if (!remove_from_top) {
		remove_from_top = false;
	}
	
	var diff = items.length - max;
	if (diff > 0) {
		
		if (!remove_from_top) {
			sc.helpers.dump("array length is " + items.length + " > " + max + "; removing last " + diff + " entries");
	        items.splice(diff * -1, diff);
		} else {
			sc.helpers.dump("array length is " + items.length + " > " + max + "; removing first " + diff + " entries");
	        items.splice(0, diff);
		}
	}
	
	return items;
};


/**
 * gets the saved searches the authenticating user has 
 */
SpazTwit.prototype.getSavedSearches = function(onSuccess, onFailure) {
	var url = this.getAPIURL('saved_searches');
	
	var opts = {
		'url':url,
		'success_event_type':'new_saved_searches_data',
		'failure_event_type':'error_saved_searches_data',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

/**
 * Saves the search query to the Twitter servers
 * 
 * @param {String} search_query 
 */
SpazTwit.prototype.addSavedSearch = function(search_query, onSuccess, onFailure) {
	var url = this.getAPIURL('saved_searches_create');
	
	var opts = {
		'url':url,
		'success_event_type':'create_saved_search_succeeded',
		'failure_event_type':'create_saved_search_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':{'query':search_query},
		'method':'POST'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

/**
 * Delete the saved search corresponding to the given ID
 * 
 * @param {String} search_id  Note that this is converted to a string via search_id.toString()
 */
SpazTwit.prototype.removeSavedSearch = function(search_id, onSuccess, onFailure) {
	var url = this.getAPIURL('saved_searches_destroy', search_id.toString());
	
	var opts = {
		'url':url,
		'success_event_type':'destroy_saved_search_succeeded',
		'failure_event_type':'destroy_saved_search_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'data':{'id':search_id},
		'method':'POST'
	};
	
	sch.debug('opts for removeSavedSearch');
	sch.debug(opts);

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};




/**
 * retrieves the list of lists 
 */
SpazTwit.prototype.getLists = function(user, onSuccess, onFailure) {
	if (!user && !this.username) {
		return;
	} else if (!user) {
	    user = this.username;
	}

	var url = this.getAPIURL('lists', {
	    'user':user
	});
	
	var opts = {
		'url':url,
		'success_event_type':'get_lists_succeeded',
		'failure_event_type':'get_lists_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	var xhr = this._callMethod(opts);
};




/**
 * general processor for user lists data
 * @private
 */
SpazTwit.prototype._processUserLists = function(section_name, ret_items, opts, processing_opts) {
  
    if (!processing_opts) { processing_opts = {}; }

	if (ret_items.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processList(ret_items[k], section_name);
			sch.dump(ret_items[k]);
		}

		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);

		// set lastid
		var lastid = ret_items[ret_items.length-1].id;
		this.data[section_name].lastid = lastid;
		sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

		// add new items to data.newitems array
		this.data[section_name].newitems = ret_items;

		this._addToSectionItems(section_name, this.data[section_name].newitems);

		if (opts.success_callback) {
			opts.success_callback(this.data[section_name].newitems);
		}
		this.triggerEvent(opts.success_event_type, this.data[section_name].newitems );

	} else { // no new items, but we should fire off success anyway
		
		if (opts.success_callback) {
			opts.success_callback();
		}
		this.triggerEvent(opts.success_event_type);
	}
};

/**
 * This modifies a Twitter user list, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processList = function(item, section_name) {	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	return item;
};


/**
 * retrieves a given list timeline
 * @param {string} list 
 */
SpazTwit.prototype.getListInfo = function(list, user, onSuccess, onFailure) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_list', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'get_list_succeeded',
		'failure_event_type':'get_list_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	var xhr = this._callMethod(opts);
};


/**
 * retrieves a given list timeline
 * @param {string} list 
 * @param {string} user the user who owns this list
 * @param {function} [onSuccess] function to call on success
 * @param {function} [onFailure] function to call on failure
 */
SpazTwit.prototype.getListTimeline = function(list, user, onSuccess, onFailure) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_timeline', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'get_list_timeline_succeeded',
		'failure_event_type':'get_list_timeline_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET',
		'process_callback':this._processListTimeline,
		'processing_opts': {
			'user':user,
			'slug':list
		}
	};

	var xhr = this._getTimeline(opts);
};


SpazTwit.prototype._processListTimeline = function(data, opts, processing_opts) {
	if (!processing_opts) { processing_opts = {}; }
	
	var user = processing_opts.user || null;
	var slug = processing_opts.slug || null;
	
	var rdata = {
		'statuses':data,
		'user':user,
		'slug':slug
	};
	
	/*
		grab the array of items
	*/
	// jQuery().trigger(finished_event, [ret_items]);
	
	if (opts.success_callback) {
		opts.success_callback(rdata);
	}
	this.triggerEvent(opts.success_event_type, rdata);
};

/**
 * retrieves a given list's members
 * @param {string} list 
 */
SpazTwit.prototype.getListMembers = function(list, user) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_members', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'get_list_members_succeeded',
		'failure_event_type':'get_list_members_failed',
		'method':'GET',
		'process_callback':this._processListTimeline,
		'processing_opts': {
			'user':user,
			'slug':list
		}
	};

	var xhr = this._getTimeline(opts);
};

/**
 * create a new list for the authenticated user
 * @param {string} list  The list name
 * @param {string} visibility   "public" or "private"
 * @param {string} [description]  The list description
 */
SpazTwit.prototype.addList = function(list, visibility, description) {
	var data = {};
	data['name'] = list;
	data['mode'] = visibility;
	data['description'] = description;
	
	var url = this.getAPIURL('lists', {
		'user': this.username
	});
	
	var opts = {
		'url':url,
		'success_event_type':'create_list_succeeded',
		'failure_event_type':'create_list_failed',
		'success_callback':null,
		'failure_callback':null,
		'data':data
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.updateList = function(list, name, visibility, description){
	var data = {};
	data['name'] = name;
	data['mode'] = visibility;
	data['description'] = description;
	
	var url = this.getAPIURL('lists_list', {
		'user': this.username,
		'slug': list
	});
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'update_list_succeeded',
		'failure_event_type':'update_list_failed',
		'data':data
	};
	
	var xhr = this._callMethod(opts);
};

/**
 * delete a list
 * @param {string} list  The list name 
 */
SpazTwit.prototype.removeList = function(list, user) {
	
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to remove list');
		return;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_list', {
		'user': user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'remove_list_succeeded',
		'failure_event_type':'remove_list_failed',
		'method':'DELETE'
	};
	
	var xhr = this._callMethod(opts);
};

/**
 * add a user to a list
 */
SpazTwit.prototype.addUserToList = function(user, list, list_user) {
	var data = {};
	data['list_id'] = list;
	data['id'] = list_user;
	
	
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to add a user to a list');
		return;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_members', {
		'user': user,
		'slug': list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'add_list_user_succeeded',
		'failure_event_type':'add_list_user_failed',
		'data':data
	};
	
	var xhr = this._callMethod(opts);
};

/**
 * delete a user from a list 
 */
SpazTwit.prototype.removeUserFromList = function(user, list, list_user) {
	var data = {};
	data['list_id'] = list;
	data['id'] = list_user;
	
	
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to remove a user from a list');
		return;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_members', {
		'user': user,
		'slug': list
	});
	
	var opts = {
		'url':url,
		'success_event_type':'create_list_succeeded',
		'failure_event_type':'create_list_failed',
		'success_event_type':'remove_list_user_succeeded',
		'failure_event_type':'remove_list_user_failed',
		'data':data,
		'method':'DELETE'
	};
	
	var xhr = this._callMethod(opts);
};


SpazTwit.prototype.listsSubscribedTo = function(user) {
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to retrieve subscribed lists');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_subscriptions', {
		'user': user
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'get_subscriptions_succeeded',
		'failure_event_type':'get_subscriptions_failed'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.listMemberships = function(user) {
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to retrieve list memberships');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_memberships', {
		'user': user
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'get_list_memberships_succeeded',
		'failure_event_type':'get_list_memberships_failed'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.getListSubscribers = function(list, user){
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to retrieve list subscribers');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_subscribers', {
		'user': user,
		'slug': list
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'get_list_subscribers_succeeded',
		'failure_event_type':'get_list_subscribers_failed',
		'method':'GET'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.isSubscribed = function(list, list_user, user){
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to retrieve list subscribers');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_check_subscriber', {
		'user': user,
		'slug': list,
		'id': list_user
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'check_list_subscribers_succeeded',
		'failure_event_type':'check_list_subscribers_failed',
		'method':'GET'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.subscribe = function(list, user){
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to subscribe to a list');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_subscribers', {
		'user': user,
		'slug': list
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'list_subscribe_succeeded',
		'failure_event_type':'list_subscribe_failed',
		'method':'POST'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.unsubscribe = function(list, user){
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to unsubscribe');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_subscribers', {
		'user': user,
		'slug': list,
		'id': list_user
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'list_unsubscribe_succeeded',
		'failure_event_type':'list_unsubscribe_failed',
		'method':'DELETE'
	};
	
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.isMember = function(list, list_user, user){
	if(!user && !this.username) {
		sch.error('must pass a username or have one set to retrieve list memberships');
		return false;
	}
	
	user = user || this.username;
	
	var url = this.getAPIURL('lists_check_member', {
		'user': user,
		'slug': list,
		'id': list_user
	});
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_event_type':'check_list_members_succeeded',
		'failure_event_type':'check_list_members_failed',
		'method':'GET'
	};
	
	var xhr = this._callMethod(opts);
};

/*
 * Marks a user as a spammer and blocks them
 * @param {integer} user_id a user_id (not a screen name!)
 * @param {function} onSuccess callback
 * @param {function} onFailure callback
 */
SpazTwit.prototype.reportSpam = function(user_id, onSuccess, onFailure) {
	var url = this.getAPIURL('report_spam');
	
	var data = {};
	data['user_id'] = user_id;
	
	var opts = {
		'url':url,
		'username': this.username,
		'password': this.password,
		'success_callback': onSuccess,
		'failure_callback': onFailure,
		'success_event_type':'report_spam_succeeded',
		'failure_event_type':'report_spam_failed',
		'method':'POST',
		'data':data
	};
	
	var xhr = this._callMethod(opts);
};



SpazTwit.prototype.openUserStream = function(onData, onFailure) {
	var that = this;

	/*
		close existing stream
	*/
	this.closeUserStream();
	
	/*
		open new stream
	*/
	this.userstream = new SpazTwitterStream({
		'auth'   : this.auth,
		'onData' : function(data) {
			var item;
			data = sch.trim(data);
			if (data) {
				sch.debug('new stream data:'+data);
				item = sch.deJSON(data);
				
				if (item.source && item.user && item.text) { // is "normal" status
					item = that._processItem(item, SPAZCORE_SECTION_HOME);
					if (onData) {
						onData(item);
					}
				}

				if (item.direct_message) { // is DM
					item = that._processItem(item.direct_message, SPAZCORE_SECTION_HOME);
					if (onData) {
						onData(item);
					}
				}
				
			}
		}
	});
	this.userstream.connect();
	return this.userstream;
};


SpazTwit.prototype.closeUserStream = function() {
	if (this.userstream) {
		sch.error('userstream exist… disconnecting');
		this.userstream.disconnect();
		this.userstream = null;
	}
};


SpazTwit.prototype.userStreamExists = function() {
	if (this.userstream) {
		return true;
	}
	return false;
};


/**
 * scans an object for _str values and assigns them back to the non-string id properties 
 */
SpazTwit.prototype.deSnowFlake = function(obj) {
	
	if (obj.id_str) {
		obj.id = obj.id_str;
	}
	
	if (obj.in_reply_to_user_id_str) {
		obj.in_reply_to_user_id = obj.in_reply_to_user_id_str;
	}
	
	if (obj.in_reply_to_status_id_str) {
		obj.in_reply_to_status_id = obj.in_reply_to_status_id_str;
	}
	
	// search item stuff	
	if (obj.to_user_id_str) {
		obj.to_user_id = obj.to_user_id_str;
	}

	if (obj.from_user_id_str) {
		obj.from_user_id = obj.from_user_id_str;
	}
	
	// descend into the underworld
	if (obj.user) {
		obj.user = this.deSnowFlake(obj.user);
	}
	
	if (obj.recipient) {
		obj.recipient = this.deSnowFlake(obj.recipient);
	}
	
	if (obj.sender) {
		obj.sender = this.deSnowFlake(obj.sender);
	}
	
	if (obj.retweeted_status) {
		obj.retweeted_status = this.deSnowFlake(obj.retweeted_status);
	}
	
	return obj;
};


/**
 *  
 */
SpazTwit.prototype.triggerEvent = function(type, data) {
	var target = this.opts.event_target || document;
	data   = data || null;
	
	sc.helpers.dump('TriggerEvent: target:'+target.toString()+ ' type:'+type+ ' data:'+data);
	
	if (this.opts.event_mode === 'jquery') {
		data = [data];
		jQuery(target).trigger(type, data);
	} else {
		sc.helpers.trigger(type, target, data);	
	}
	
};

/**
 * shortcut for SpazTwit if the SpazCore libraries are being used
 * 
 */
if (sc) {
	var scTwit = SpazTwit;
}

