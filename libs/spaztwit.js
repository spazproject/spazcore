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
    urls.verify_password  	= "account/verify_credentials.json";
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
 * checks the currently set username and password against the API
*/
SpazTwit.prototype.verifyCredentials = function() {};


SpazTwit.prototype.getPublicTimeline = function() {
	var url = this.getAPIURL('public_timeline');
	var username = null;
	var password  = null;
	var data     = null
	
	this._getTimeline({
		'url':url,
		// 'data':data,
		// 'username':username,
		// 'password':password,
		'success_event_type': 'new_public_timeline_data'
	});
};



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
		'success_event_type': 'new_friends_timeline_data'		
	});
};


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
		'success_event_type': 'new_friends_timeline_data'		
	});
};
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
			jQuery.trigger
            dump('complete:'+msg);
        },
        'error':function(xhr, msg, exc) {
            if (xhr && xhr.responseText) {
                dump("Error:"+xhr.responseText+" from "+opts['url']);
            } else {
                dump("Error:Unknown from "+opts['url']);
            }
        },
        'success':function(data) {
			// dump("Success! \n\n" + data);
				
			data = JSON.parse(data);
			
			jQuery().trigger(opts.success_event_type, [data]);
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
	if (Luna) {
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