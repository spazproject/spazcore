/*
 * A Twitter API library for Javascript
 * 
 * This requires jQuery. Tested with 1.2.6
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
 * @param key string
*/
SpazTwit.prototype.getAPIURL = function(key) {
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
        return this.baseurl + urls[key];
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
	var pssword  = null;
	var data     = null
	
	var xhr = jQuery.ajax({
        'mode':'queue',
        'complete':function(xhr, msg){
            alert('complete:'+msg);
        },
        'error':function(xhr, msg, exc) {
            if (xhr && xhr.responseText) {
                alert("Error:"+xhr.responseText+" from "+url);
            } else {
                alert("Error:Unknown from "+url);
            }
        },
        'success':function(data) {
			alert("Success! \n\n" + data);
				
			/*
				overwrite "tweets" with that was pulled from Twitter. Comment out
				to use the hardcoded version
			*/
			tweets = JSON.parse(data);

			alert(tweets);
			
			// var content = Luna.View.render({
			// 								collection: tweets,
			// 								template: 'timeline/tweet',
			// 								separator: 'timeline/separator'
			// 						});
			// $('timeline').update(content);
        },
        'beforeSend':function(xhr){
			alert("beforesend");
        },
        'processData':false,
        'type':"GET",
        'url':url,
        'data':data// ,
        // 		'username':username,
        // 		'password':password
	});
};



SpazTwit.prototype.getFriendsTimeline = function(since_id, count, page) {};
SpazTwit.prototype.getReplies = function(since_id, page) {};
SpazTwit.prototype.getSent = function(since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getUserTimeline = function(user_id, since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getDirectMessages = function(since_id, page) {};
SpazTwit.prototype.getSentDirectMessages = function(since_id, page) {};
SpazTwit.prototype.getFavorites = function(user_id, page) {};
SpazTwit.prototype.search = function() {};

SpazTwit.prototype._getTimeline = function(url, data, username, password) {
	
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



