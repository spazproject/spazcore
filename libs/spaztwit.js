/**
 * various const definitions
 */
const SPAZCORE_SECTION_FRIENDS = 'friends';
const SPAZCORE_SECTION_REPLIES = 'replies';
const SPAZCORE_SECTION_DMS = 'dms';
const SPAZCORE_SECTION_COMBINED = 'combined';
const SPAZCORE_SECTION_PUBLIC = 'public';
const SPAZCORE_SECTION_SEARCH = 'search';
const SPAZCORE_SECTION_USER = 'user-timeline';


/**
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
 * 'update_succeeded' (data)
 * 'update_failed' (data)
 * 'get_user_succeeded' (data)
 * 'get_user_failed' (data)
 * 'new_search_timeline_data' (data)
 * 'error_search_timeline_data' (data)
 * 'new_trends_data' (data)
 * 'error_trends_data' (data)
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
	
	this.setSource('SpazCore')
	
	
	this.initializeData();
	
	this.initializeCombinedTracker();
	
	/*
		Cache for one-shot users and posts. Not sure what we'll do with it yet
	*/
	this.cache = {
		users:{},
		posts:{},
	}
	
	this.me = {};
	

	this.setBaseURL('https://twitter.com/');

	/*
		apply defaults for ajax calls
	*/
	jQuery.ajaxSetup( {
        timeout:1000*60,
        async:true,
    });
}



SpazTwit.prototype.initializeData = function() {
	/*
		this is where we store timeline data and settings for persistence
	*/
	this.data = {};
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
	this.data[SPAZCORE_SECTION_COMBINED] = {
		'items':   [],
		'newitems':[],
		'max':400,
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
	// this.data.byid = {};
};


/**
 * resets the combined_finished progress tracker 
 */
SpazTwit.prototype.initializeCombinedTracker = function() {
	this.combined_finished = {};
	this.combined_finished[SPAZCORE_SECTION_FRIENDS] = false;
	this.combined_finished[SPAZCORE_SECTION_REPLIES] = false;
	this.combined_finished[SPAZCORE_SECTION_DMS] = false;
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
    urls.user_timeline      = "statuses/user_timeline.json";
    urls.replies_timeline   = "statuses/replies.json";
    urls.show				= "statuses/show.json";
    urls.favorites          = "favorites.json";
    urls.dm_timeline        = "direct_messages.json";
    urls.dm_sent            = "direct_messages/sent.json";
    urls.friendslist        = "statuses/friends.json";
    urls.followerslist      = "statuses/followers.json";
    urls.show_user			= "users/show.json";
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

	// search
	urls.search				= "http://search.twitter.com/search.json";
	urls.trends				= "http://search.twitter.com/trends.json";

    // misc
    urls.test 			  	= "help/test.json";
    urls.downtime_schedule	= "help/downtime_schedule.json";

    if (urls[key]) {
	
		if (urldata && typeof urldata != "string") {
			urldata = '?'+jQuery.param(urldata);
		} else {
			urldata = '';
		}
		
		if (key == 'search' || key == 'trends') {
			return this._postProcessURL(urls[key] + urldata);
		} else {
			return this._postProcessURL(this.baseurl + urls[key] + urldata);
		}
        
    } else {
        return false
    }

};




/*
 * checks the currently set username and password against the API. Can take
 * a username and password; will use this.username and this.password otherwise.
 * Calls this._processAuthenticatedUser() if successful
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
		'process_callback': this._processAuthenticatedUser,
		'success_event_type':'verify_credentials_succeeded',
		'failure_event_type':'verify_credentials_failed',
		'method':'GET'
	}

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
SpazTwit.prototype._processAuthenticatedUser = function(data, finished_event) {
	this.me = data;
	this.initializeData();
	jQuery().trigger(finished_event, [this.me]);
}


/**
 * Initiates retrieval of the public timeline. 
 */
SpazTwit.prototype.getPublicTimeline = function() {
	var url = this.getAPIURL('public_timeline');
	
	var xhr = this._getTimeline({
		'url':url,
		'success_event_type': 'new_public_timeline_data'
	});
};


/**
 * Initiates retrieval of the friends timeline (all the people you are following)
 * 
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getFriendsTimeline = function(since_id, count, page, processing_opts) {
	
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
	
	var data = {};
	data['since_id'] = since_id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('friends_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processFriendsTimeline,
		'success_event_type': 'new_friends_timeline_data',
		'processing_opts':processing_opts
	});
};

/**
 * @private
 */
SpazTwit.prototype._processFriendsTimeline = function(ret_items, finished_event, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_FRIENDS, ret_items, finished_event, processing_opts);
}


/**
 *  
 */
SpazTwit.prototype.getReplies = function(since_id, page, processing_opts) {	
	if (!page) { page = null;}
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
	
	var data = {};
	data['since_id'] = since_id;
	if (page) {
		data['page'] = page;
	}
	
	var url = this.getAPIURL('replies_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processRepliesTimeline,
		'success_event_type': 'new_replies_timeline_data',
		'processing_opts':processing_opts
	});

};


/**
 * @private
 */
SpazTwit.prototype._processRepliesTimeline = function(ret_items, finished_event, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_REPLIES, ret_items, finished_event, processing_opts);
}

/**
 *  
 */
SpazTwit.prototype.getDirectMessages = function(since_id, page, processing_opts) {
	if (!page) { page = null;}
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
	
	var data = {};
	data['since_id'] = since_id;
	if (page) {
		data['page'] = page;
	}
	
	var url = this.getAPIURL('dm_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processDMTimeline,
		'success_event_type': 'new_dms_timeline_data',
		'processing_opts':processing_opts		
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processDMTimeline = function(ret_items, finished_event, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_DMS, ret_items, finished_event, processing_opts);
}


SpazTwit.prototype.getSent = function(since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getSentDirectMessages = function(since_id, page) {};

SpazTwit.prototype.getUserTimeline = function(id, count, page) {
	if (!id) {
		return false;
	}
	if (!page) { page = null;}
	if (!count) { count = 10;}
	
	var data = {};
	data['id']  = id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('user_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processUserTimeline,
		'success_event_type': 'new_user_timeline_data',
		'failure_event_type': 'error_user_timeline_data'
	});
}; // given user's sent statuses


/**
 * @private
 */
SpazTwit.prototype._processUserTimeline = function(ret_items, finished_event, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_USER, ret_items, finished_event, processing_opts);
}



/**
 * this retrieves three different timelines. the event "new_combined_timeline_data"
 * does not fire until ALL async ajax calls are made 
 * 
 * 
 */
SpazTwit.prototype.getCombinedTimeline = function(force) {
	var opts = {
		'combined':true
	}
	if (force) {
		opts.force = true;
	}
	
	this.getFriendsTimeline(null, null, null, opts);
	this.getReplies(null, null, opts);
	this.getDirectMessages(null, null, opts);
};


SpazTwit.prototype.getFavorites = function(user_id, page) {};


SpazTwit.prototype.search = function(query, since_id, results_per_page, page, lang, geocode) {
	if (!page) { page = 1;}
	// if (!since_id) {
	// 	if (this.data[SPAZCORE_SECTION_SEARCH].lastid && this.data[SPAZCORE_SECTION_SEARCH].lastid > 1) {
	// 		since_id = this.data[SPAZCORE_SECTION_SEARCH].lastid;
	// 	} else {
	// 		since_id = 1;
	// 	}
	// }
	if (!results_per_page) {
		results_per_page = 50;
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
		'success_event_type': 'new_search_timeline_data',
		'failure_event_type': 'error_search_timeline_data'
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processSearchTimeline = function(search_result, finished_event, processing_opts) {	
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

	if (ret_items.length > 0){
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
		var lastid = ret_items[ret_items.length-1].id
		this.data[SPAZCORE_SECTION_SEARCH].lastid = lastid;
		dump('this.data['+SPAZCORE_SECTION_SEARCH+'].lastid:'+this.data[SPAZCORE_SECTION_SEARCH].lastid);

		/*
			add new items to data.newitems array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].newitems = ret_items;

		/*
			concat new items onto data.items array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].items = this.data[SPAZCORE_SECTION_SEARCH].items.concat(this.data[SPAZCORE_SECTION_SEARCH].newitems);
		this.data[SPAZCORE_SECTION_SEARCH].items = this.removeDuplicates(this.data[SPAZCORE_SECTION_SEARCH].items);
		this.data[SPAZCORE_SECTION_SEARCH].items = this.removeExtraElements(this.data[SPAZCORE_SECTION_SEARCH].items, this.data[SPAZCORE_SECTION_SEARCH].max);

		dump('New '+SPAZCORE_SECTION_SEARCH+' items: ('+this.data[SPAZCORE_SECTION_SEARCH].newitems.length+')');
		dump(this.data[SPAZCORE_SECTION_SEARCH].newitems);
		dump('All '+SPAZCORE_SECTION_SEARCH+' items ('+this.data[SPAZCORE_SECTION_SEARCH].items.length+'):');
		dump(this.data[SPAZCORE_SECTION_SEARCH].items);


		jQuery().trigger(finished_event, [this.data[SPAZCORE_SECTION_SEARCH].newitems]);
			


	} else { // no new items, but we should fire off success anyway
		if (!processing_opts.combined) {
			jQuery().trigger(finished_event, []);
		} else {
			this.combined_finished[section_name] = true;
		}
	}
	
}



SpazTwit.prototype._processSearchItem = function(item, section_name) {
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	dump(item);
	
	item.CS_is_search = true;

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
}


SpazTwit.prototype.getTrends = function() {
	var url = this.getAPIURL('trends');
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processTrends,
		'success_event_type': 'new_trends_data',
		'failure_event_type': 'error_trends_data'
	});
};


/**
 * @private
 */
SpazTwit.prototype._processTrends = function(trends_result, finished_event, processing_opts) {

	if (!processing_opts) { processing_opts = {}; }
	
	/*
		grab the array of items
	*/
	var ret_items = trends_result.trends;

	if (ret_items.length > 0) {

		for (var k=0; k<ret_items.length; k++) {
			ret_items[k].searchterm = ret_items[k].name;
			if ( /\s+/.test(ret_items[k].searchterm)) { // if there is whitespace, wrap in quotes
				ret_items[k].searchterm = '"'+ret_items[k].searchterm+'"';
			}
		}
		jQuery().trigger(finished_event, [ret_items]);
	}
}


/**
 * this is a general wrapper for timeline methods
 * @param {obj} opts a set of options for this method 
 * @private
 */
SpazTwit.prototype._getTimeline = function(opts) {
	
	dump(opts.data);
	
	/*
		for closure references
	*/
	var stwit = this;
	
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
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts.success_event_type, opts.processing_opts)
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


/**
 * general processor for timeline data 
 * @private
 */
SpazTwit.prototype._processTimeline = function(section_name, ret_items, finished_event, processing_opts) {
	
	if (!processing_opts) { processing_opts = {}; }

	if (!section_name === SPAZCORE_SECTION_USER) { // the user timeline section isn't persistent
		/*
			reset .newitems data properties
		*/
		this.data[section_name].newitems = [];
		
	}
	

	if (ret_items.length > 0){
		
		
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processItem(ret_items[k], section_name);
		}


		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
		
		
		if (section_name === SPAZCORE_SECTION_USER) { // special case -- we don't keep this data, just parse and fire it off

			dump('New '+section_name+' items: ('+ret_items.length+')');
			dump(ret_items);
			
			jQuery().trigger(finished_event, [ret_items]);
			
		} else { // this is a "normal" timeline that we want to be persistent
			
			// set lastid
			var lastid = ret_items[ret_items.length-1].id
			this.data[section_name].lastid = lastid;
			dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

			// add new items to data.newitems array
			this.data[section_name].newitems = ret_items;

			// concat new items onto data.items array
			this.data[section_name].items = this.data[section_name].items.concat(this.data[section_name].newitems);
			this.data[section_name].items = this.removeDuplicates(this.data[section_name].items);
			this.data[section_name].items = this.removeExtraElements(this.data[section_name].items, this.data[section_name].max);


			dump('New '+section_name+' items: ('+this.data[section_name].newitems.length+')');
			dump(this.data[section_name].newitems);
			dump('All '+section_name+' items ('+this.data[section_name].items.length+'):');
			dump(this.data[section_name].items);

			// @todo check length of data.items, and remove oldest extras if necessary
			/*
				@todo
			*/

			/*
				Fire off the new section data event
			*/
			if (!processing_opts.combined) {
				jQuery().trigger(finished_event, [this.data[section_name].newitems]);
			} else {
				this.combined_finished[section_name] = true;
			}
			


			/*
				do combined stuff
			*/
			this.data[SPAZCORE_SECTION_COMBINED].newitems = this.data[SPAZCORE_SECTION_COMBINED].newitems.concat(this.data[section_name].newitems);
			
			// sort these items -- the timelines can be out of order when combined
			this.data[SPAZCORE_SECTION_COMBINED].newitems = this.data[SPAZCORE_SECTION_COMBINED].newitems.sort(this._sortItemsByDateAsc)
			
			this.data[SPAZCORE_SECTION_COMBINED].items = this.data[SPAZCORE_SECTION_COMBINED].items.concat(this.data[SPAZCORE_SECTION_COMBINED].newitems);
			this.data[SPAZCORE_SECTION_COMBINED].items = this.removeDuplicates(this.data[SPAZCORE_SECTION_COMBINED].items);
			this.data[SPAZCORE_SECTION_COMBINED].items = this.removeExtraElements(this.data[SPAZCORE_SECTION_COMBINED].items, this.data[SPAZCORE_SECTION_COMBINED].max);

			dump('Combined new items ('+this.data[SPAZCORE_SECTION_COMBINED].newitems.length+'):');
			dump(this.data[SPAZCORE_SECTION_COMBINED].newitems);
			dump('Combined all items ('+this.data[SPAZCORE_SECTION_COMBINED].items.length+'):');
			dump(this.data[SPAZCORE_SECTION_COMBINED].items);
			
		}


	} else { // no new items, but we should fire off success anyway
		if (!processing_opts.combined) {
			jQuery().trigger(finished_event, []);
		} else {
			this.combined_finished[section_name] = true;
		}
	}
	
	/*
		Fire off the new combined data event
	*/
	if (this.combinedTimelineFinished()) {

		jQuery().trigger('new_combined_timeline_data', [this.data[SPAZCORE_SECTION_COMBINED].newitems]);
		this.data[SPAZCORE_SECTION_COMBINED].newitems = []; // reset combined.newitems
		this.initializeCombinedTracker();
	}
};


/**
 * This modifies a Twitter post, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this == the item 
 */
SpazTwit.prototype._processItem = function(item, section_name) {
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	dump(item);
	
	/*
		is reply? Then add .SC_is_reply
	*/
	if (item.in_reply_to_screen_name && item.SC_user_received_by) {
		if (item.in_reply_to_screen_name == item.SC_user_received_by) {
			item.SC_is_reply = true;
		}
	}
	
	/*
		is dm?
	*/
	if (item.recipient_id && item.sender_id) {
		item.SC_is_dm = true;
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
 * this is a general wrapper for non-timeline methods on the Twitter API. We
 * use this to call methods that will return a single response 
 * 
 * @param {obj} opts a set of options for this method 
 * @private
 */
SpazTwit.prototype._callMethod = function(opts) {
	/*
		for closure references
	*/
	var stwit = this;
	
	if (opts.method) {
		var method = opts.method;
	} else {
		var method = 'POST'
	}
	
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
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts.success_event_type)
			} else {
				jQuery().trigger(opts.failure_event_type, [data]);
			}
	    },
	    'beforeSend':function(xhr){
			dump("beforesend");
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(opts.username + ":" + opts.password));
			}
	    },
	    'type': method,
	    'url' : opts.url,
		'data': opts.data
	});
	return xhr;
};



SpazTwit.prototype.getUser = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('verify_credentials', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback': this._processUserData,
		'success_event_type':'get_user_succeeded',
		'failure_event_type':'get_user_failed',
		'method':'GET'
	}

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};



SpazTwit.prototype.getFriends = function() {};
SpazTwit.prototype.getFollowers = function() {};

SpazTwit.prototype.addFriend = function(user_id) {};
SpazTwit.prototype.removeFriend = function(user_id) {};

SpazTwit.prototype.block = function(user_id) {};

SpazTwit.prototype.follow = function(user_id) {}; // to add notification
SpazTwit.prototype.unfollow = function(user_id) {}; // to remove notification


SpazTwit.prototype.update = function(status, source, in_reply_to_status_id) {

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
	
	var username = this.username;
	var password = this.password;
	
	var opts = {
		'url':url,
		'username':username,
		'password':password,
		'data':data,
		'process_callback': this._processUpdateReturn,
		'success_event_type':'update_succeeded',
		'failure_event_type':'update_failed'
	}

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

	
};

SpazTwit.prototype._processUpdateReturn = function(data, finished_event) {
	
	/*
		this item needs to be added to the friends timeline
		so we can avoid dupes
	*/
	this._processTimeline(SPAZCORE_SECTION_FRIENDS, [data], finished_event);
};

SpazTwit.prototype.destroy = function(id) {};
SpazTwit.prototype.destroyDirectMessage = function(id) {};


SpazTwit.prototype.getOne = function(id) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('show', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback': this._processOneItem,
		'success_event_type':'get_one_status_succeeded',
		'failure_event_type':'get_one_status_failed',
		'method':'GET'
	}

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};


SpazTwit.prototype._processOneItem = function(data, finished_event) {
	
	/*
		this item needs to be added to the friends timeline
		so we can avoid dupes
	*/
	data = this._processItem(data);
	jQuery().trigger(finished_event, [data]);
};

SpazTwit.prototype.favorite = function(id) {};
SpazTwit.prototype.unfavorite = function(id) {};


SpazTwit.prototype.updateLocation = function(location_str) {};
SpazTwit.prototype.updateProfile = function(name, email, url, location, description) {};




SpazTwit.prototype.getRateLimitStatus = function() {};

SpazTwit.prototype.test = function() {};


/**
 * @private 
 */
SpazTwit.prototype._postProcessURL = function(url) {

	if (Luna) { // we're in webOS		
		this.audioPlayer = new Audio();
		if (!this.audioPlayer.palm) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] != Luna.hostingPrefix) {
				url = "/proxy?url=" + encodeURIComponent(url);
			}
			return url;		
		} else {
			return url;
		}
		
	} else {
		return url;
	}
}


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
	return (a.id - b.id);
}

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
	return (b.id - a.id);
}



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
}

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
}


/**
 * this takes an array of messages and returns one with any duplicates removed
 * 
 * This is based on the jQuery.unique() method
 * 
 * @param {array} array an array of Twitter message objects
 * @return {array}
 */
SpazTwit.prototype.removeDuplicates = function(array) {
	
	var ret = [], done = {};

	try {

		for ( var i = 0, length = array.length; i < length; i++ ) {
			var id = array[i].id;

			if ( !done[ id ] ) {
				done[ id ] = true;
				ret.push( array[ i ] );
			}
		}

	} catch( e ) {
		ret = array;
	}

	return ret;
	
}


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
			dump("array length is " + items.length + " > " + max + "; removing last " + diff + " entries");
	        items.splice(diff * -1, diff);
		} else {
			dump("array length is " + items.length + " > " + max + "; removing first " + diff + " entries");
	        items.splice(0, diff);
		}
	}
	
	return items;
}



/**
 * remap dump calls as appropriate 
 */
if (sc && sc.helpers && sc.helpers.dump) {
	var dump = sc.helpers.dump;
} else if(console && dump) {
	var dump = dump;
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



/*
* EXAMPLES OF JS OBJECTS RETURNED BY TWITTER
* /statuses/public_timeline.json
	{
        "user": {
            "followers_count": 1144,
            "description": "フツーですよ。",
            "url": "http:\/\/camellia.jottit.com\/",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/66954592\/20081210071932_normal.jpg",
            "protected": false,
            "location": "あかし",
            "screen_name": "camellia",
            "name": "かめ",
            "id": "6519832"
        },
        "text": "@sugatch おはよう、すがっち！ *Tw*",
        "truncated": false,
        "favorited": false,
        "in_reply_to_user_id": 10116882,
        "created_at": "Sat Jan 17 00:53:27 +0000 2009",
        "source": "<a href=\"http:\/\/cheebow.info\/chemt\/archives\/2007\/04\/twitterwindowst.html\">Twit<\/a>",
        "in_reply_to_status_id": 1125158879,
        "id": "1125159824"
    }
* 
* 
* From authenticated /statuses/friends_timeline.json
* {
    "text": "@elazar I don't know about the pony - but a lot of that is in CSS3 - only browsers are crap ;)",
    "user": {
        "description": "PHP Windows Geek (not Oxymoron)",
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/25760052\/headshot_normal.jpg",
        "url": "http:\/\/elizabethmariesmith.com",
        "name": "auroraeosrose",
        "protected": false,
        "screen_name": "auroraeosrose",
        "followers_count": 242,
        "location": "",
        "id": 8854222 
    },
    "in_reply_to_screen_name": "elazar",
    "in_reply_to_user_id": 9105122,
    "truncated": false,
    "favorited": false,
    "in_reply_to_status_id": 1125164128,
    "created_at": "Sat Jan 17 00:59:04 +0000 2009",
    "id": 1125170241,
    "source": "<a href=\"http:\/\/twitterfox.net\/\">TwitterFox<\/a>"
 }
* 
* 
* From authenticated /direct_messages.json
* 
* {
    "recipient_screen_name": "funkatron",
    "created_at": "Fri Jan 16 13:43:16 +0000 2009",
    "recipient_id": 65583,
    "sender_id": 808824,
    "sender": {
        "description": "Impoverished Ph.D. student at the Indiana University School of Informatics",
        "screen_name": "kmakice",
        "followers_count": 671,
        "url": "http:\/\/www.blogschmog.net",
        "name": "Kevin Makice",
        "protected": false,
        "location": "Bloomington, Indiana",
        "id": 808824,
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/69221803\/2009avatar_normal.jpg"
    },
    "sender_screen_name": "kmakice",
    "id": 51212447,
    "recipient": {
        "description": "Supernerd, Dad, Webapp security dude, Spaz developer, webmonkey, designer, musician, ego-ho. See also: @funkalinks",
        "screen_name": "funkatron",
        "followers_count": 1143,
        "url": "http:\/\/funkatron.com",
        "name": "Ed Finkler",
        "protected": false,
        "location": "iPhone: 40.423752,-86.907547",
        "id": 65583,
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/67512037\/cat_with_hat_and_monocle_normal.jpg"
    },
    "text": "[REDACTED]"
}
* 
* 
* 
* From http://search.twitter.com/search.json?q=javascript
* 
* {
    "results": [
        {
            "text": "Updated the Wiki page on JavaScript development to reflect latest changes in Orbeon Forms. http:\/\/tinyurl.com\/axtu5u",
            "to_user_id": null,
            "from_user": "orbeon",
            "id": 1125204181,
            "from_user_id": 279624,
            "iso_language_code": "en",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/53169511\/Picture_1_normal.png",
            "created_at": "Sat, 17 Jan 2009 01:14:11 +0000"
        },
        {
            "text": "when I close my eyes I dream in javascript",
            "to_user_id": null,
            "from_user": "apuritz",
            "id": 1125196059,
            "from_user_id": 95155,
            "iso_language_code": "en",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/55159511\/images_normal.jpeg",
            "created_at": "Sat, 17 Jan 2009 01:10:11 +0000"
        }
        // more results deleted
    ],
    "since_id": 0,
    "max_id": 1125204181,
    "refresh_url": "?since_id=1125204181&q=javascript",
    "results_per_page": 15,
    "next_page": "?page=2&max_id=1125204181&q=javascript",
    "completed_in": 0.015077,
    "page": 1,
    "query": "javascript"
}
* 
* 
*/