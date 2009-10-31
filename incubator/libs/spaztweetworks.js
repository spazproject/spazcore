/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc;

/**
 * A library to interact with Tweetworks 
 */

/**
 * base URL for Tweetworks API 
 */
var SPAZCORE_TWEETWORKS_BASEURL = 'http://tweetworks.com/'

/**
 * events 
 */
if (!sc.events) { sc.events = {}; }
sc.events.tweetworksAjaxError        = 'tweetworksAjaxError';
sc.events.tweetworksPostSuccess      = 'tweetworksPostSuccess'; 
sc.events.tweetworksPostFailure      = 'tweetworksPostFailure';
sc.events.tweetworksGetNewestSuccess = 'tweetworksGetNewestSuccess'; 
sc.events.tweetworksGetNewestFailure = 'tweetworksGetNewestFailure';
sc.events.tweetworksGetLatestFromGroupSuccess = 'tweetworksGetLatestFromGroupSuccess'; 
sc.events.tweetworksGetLatestFromGroupFailure = 'tweetworksGetLatestFromGroupFailure';
sc.events.tweetworksGetLatestFromContributedDiscussionsSuccess = 'tweetworksGetLatestFromContributedDiscussionsSuccess'; 
sc.events.tweetworksGetLatestFromContributedDiscussionsFailure = 'tweetworksGetLatestFromContributedDiscussionsFailure';
sc.events.tweetworksGetGroupsSuccess = 'tweetworksGetGroupsSuccess'; 
sc.events.tweetworksGetGroupsFailure = 'tweetworksGetGroupsFailure';
sc.events.tweetworksJoinGroupSuccess = 'tweetworksJoinGroupSuccess'; 
sc.events.tweetworksJoinGroupFailure = 'tweetworksJoinGroupFailure';
sc.events.tweetworksGetJoinedGroupsSuccess = 'tweetworksGetJoinedGroupsSuccess'; 
sc.events.tweetworksGetJoinedGroupsFailure = 'tweetworksGetJoinedGroupsFailure';
sc.events.tweetworksSearchForGroupSuccess  = 'tweetworksSearchForGroupSuccess'; 
sc.events.tweetworksSearchForGroupFailure  = 'tweetworksSearchForGroupFailure';
sc.events.tweetworksGetGroupMembersSuccess = 'tweetworksGetGroupMembersSuccess'; 
sc.events.tweetworksGetGroupMembersFailure = 'tweetworksGetGroupMembersFailure';
sc.events.tweetworksGetMembersSuccess      = 'tweetworksGetMembersSuccess'; 
sc.events.tweetworksGetMembersFailure      = 'tweetworksGetMembersFailure';
sc.events.tweetworksSearchForMemberSuccess = 'tweetworksSearchForMemberSuccess'; 
sc.events.tweetworksSearchForMemberFailure = 'tweetworksSearchForMemberFailure';
                                      
function SpazTweetWorks(opts) {
	if (opts) {
	 	this.apikey   = opts.apikey   || null;
		this.username = opts.username || null;
		this.password = opts.password || null;		
	}
}



/*
 * given a key, it returns the URL (baseurl+API method path)
 * @param {string} key the key for the URL
 * @param {array|object} urldata data to included in the URL as GET data
*/
SpazTweetWorks.prototype.getAPIURL = function(key, urldata) {
	var urls = {};



	/*
		write stuff
	*/
    urls.add                = "posts/add.json";

	/*
		read stuff
	*/
	urls.newest             = "posts/index/newest.json";
    urls.group_newest       = "posts/group/{{group-name}}/newest.json";
	urls.view_discussion	= "posts/view/{{id}}.json"

	/*
		user info
		must be authenticated
	*/
	urls.my_group_posts             = "posts/joined_groups/{{user-name}}/newest.json";
	urls.my_contributed_discussions = "posts/contributed/{{user-name}}/updated.json";
	
	
	/*
		Group info
	*/
	urls.groups             = "groups/index.json";
	urls.join_group         = "groups/join/{{group-name}}.json";
	urls.joined_groups      = "groups/joined/{{user-name}}.json"
	urls.search_groups      = "groups/search.json";
	urls.group_users        = "users/group/{{group-name}}.json";	
	
	/*
		User info
	*/
	urls.users              = "users/index.json";
	urls.search_users       = "users/search.json";

	if (urls[key]) {
		var thisurl = urls[key];

		for (var i in urldata) {
			if (thisurl.indexOf('{{'+i+'}}') > -1) {
				thisurl = thisurl.replace('{{'+i+'}}', urldata[i]);
				delete urldata[i]; // remove this so we don't use it in conversion
			}
		}

		var querystring = sc.helpers.objectToQueryString(urldata);
		if (querystring) {
			thisurl += '?'+querystring;
		}
		
		/*
			prefix base URL
		*/
		thisurl = SPAZCORE_TWEETWORKS_BASEURL + thisurl;
		
		thisurl = this._postProcessURL(thisurl);
		
		return thisurl;		
	} else {
		return false;
	}
};



SpazTweetWorks.prototype.getAPIKey = function() {
	return this.apikey;
};
SpazTweetWorks.prototype.setAPIKey = function(apikey) {
	this.apikey = apikey;
};

SpazTweetWorks.prototype.setCredentials = function(username, password) {
	this.username = username;
	this.password = password;
}
SpazTweetWorks.prototype.getUsername = function() {
	return this.username;
};
SpazTweetWorks.prototype.getPassword = function() {
	return this.password;
};


SpazTweetWorks.prototype.post = function(body, groupId, parentId, sendToTwitter) {}

SpazTweetWorks.prototype.getNewest = function(page, query) {}

SpazTweetWorks.prototype.getLatestFromGroup = function(group, page, query) {}

SpazTweetWorks.prototype.getLatestFromContributedDiscussions = function(page, query) {}



SpazTweetWorks.prototype.getGroups = function(page) {};

SpazTweetWorks.prototype.joinGroup = function(group) {};

SpazTweetWorks.prototype.getJoinedGroups = function(user, page) {};

SpazTweetWorks.prototype.searchForGroup = function(query, page) {};



SpazTweetWorks.prototype.getGroupMembers = function(group, page) {};

SpazTweetWorks.prototype.getMembers = function(page) {};

SpazTweetWorks.prototype.searchForMember = function(query, page) {};




/**
 * @param {obj} opts a set of options for this method 
 * 
 * opts = {
 *   method (GET or POST)
 *   url
 *   success_event_type
 *   failure_event_type
 *   process_callback
 *   username
 *   password
 *   data
 * }
 * 
 * @private
 */
SpazTweetWorks.prototype._callMethod = function(opts) {
	
	var method				= opts.method || 'POST';
	var url					= opts.url || null;
	var success_event_type	= opts.success_event_type || null;
	var failure_event_type	= opts.failure_event_type || null;
	var process_callback	= opts.process_callback || null;
	var username			= opts.username || null;
	var password			= opts.password || null;
	var data				= opts.data || null;
	
	/*
		for closure references
	*/
	var stworks = this;
	
	var xhr = jQuery.ajax({
	    'complete':function(xhr, msg){
	        sc.helpers.dump(opts.url + ' complete:'+msg);
	    },
	    'error':function(xhr, msg, exc) {
			sc.helpers.dump(opts.url + ' error:'+msg);
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
				if (opts.failure_event_type) {
					stworks.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});
				}
	
	        } else {
	            sc.helpers.dump("Error:Unknown from "+opts['url']);
				if (opts.failure_event_type) {
					stworks.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':null, 'msg':'Unknown Error'});

				}
	        }
			stworks.triggerEvent('tweetworksAjaxError', {'url':opts.url, 'xhr':xhr, 'msg':msg});
	    },
	    'success':function(data) {
			sc.helpers.dump(opts.url + ' success');
			data = sc.helpers.deJSON(data);
			if (opts.process_callback) {
				/*
					using .call here and passing stworks as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stworks, data, opts.success_event_type);
			} else {
				// jQuery().trigger(opts.success_event_type, [data]);
				stworks.triggerEvent(opts.success_event_type, data);
				
			}
	    },
	    'beforeSend':function(xhr){
			sc.helpers.dump(opts.url + ' beforesend');
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + sc.helpers.Base64.encode(opts.username + ":" + opts.password));
			}
	    },
	    'type': method,
	    'url' : opts.url,
		'data': opts.data
	});
	return xhr;
};


/**
 * @private 
 */
SpazTweetWorks.prototype._postProcessURL = function(url) {
	
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