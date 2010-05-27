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
 * A library to interact with Ping.FM
 */

/**
 * events raised here
 */
if (!sc.events) { sc.events = {}; }
sc.events.pingfmGetUserKeySuccess		= 'pingfmGetUserKeySuccess';
sc.events.pingfmGetUserKeyFailure		= 'pingfmGetUserKeyFailure';
sc.events.pingfmValidateUserKeySuccess	= 'pingfmValidateUserKeySuccess';
sc.events.pingfmValidateUserKeyFailure	= 'pingfmValidateUserKeyFailure';
sc.events.pingfmGetServicesSuccess		= 'pingfmGetServicesSuccess';
sc.events.pingfmGetServicesFailure		= 'pingfmGetServicesFailure';
sc.events.pingfmGetTriggersSuccess		= 'pingfmGetTriggersSuccess';
sc.events.pingfmGetTriggersFailure		= 'pingfmGetTriggersFailure';
sc.events.pingfmGetLatestSuccess		= 'pingfmGetLatestSuccess';
sc.events.pingfmGetLatestFailure		= 'pingfmGetLatestFailure';
sc.events.pingfmPostSuccess				= 'pingfmPostSuccess';
sc.events.pingfmPostFailure				= 'pingfmPostFailure';
sc.events.pingfmTriggerPostSuccess		= 'pingfmTriggerPostSuccess';
sc.events.pingfmTriggerPostFailure		= 'pingfmTriggerPostFailure';


/**
 * a library for the Ping.fm API
 * @class SpazPingFM
 * @param {object} opts
 */
function SpazPingFM(opts) {

	this.apikey  = opts.apikey  || null;
	this.userkey = opts.userkey || null;

}


SpazPingFM.prototype.getAPIKey = function() {
	return this.apikey;
};
SpazPingFM.prototype.setAPIKey = function(apikey) {
	this.apikey = apikey;
};

SpazPingFM.prototype.getUserKey = function() {
	return this.userkey;
};
SpazPingFM.prototype.setUserKey = function(userkey) {
	this.userkey = userkey;
};


/**
 * Supporting method that encapsulates common logic involved in interacting
 * with the API. Issues an API request, passes returned data to a processing
 * callback in the event of success, and triggers an event indicating
 * success or failure.
 *
 * @param {string} method API method to call
 * @param {object} data POST data to include in the request
 * @param {string} success Event to trigger on success; callbacks receive a
 *        single parameter, a data object containing the parsed response data
 * @param {string} failure Event to trigger on failure; callbacks receive a
 *        single parameter, a data object containing error information, and
 *        can distinguish between HTTP and API failure by checking for a
 *        status property, which indicates API failure
 * @param {Function} process Optional callback that accepts XML data from a
 *        succesful response, parses it, and returns the parsed version
 * @param {object} opts Optional parameters; currently supports an
 *        event_target property for the target of the success or failure
 *        event (defaults to the current document) and a process property
 *        for a callback that accepts the XML response and returns an object
 *        containing data parsed from that response
 * @return void
 */
SpazPingFM.prototype._request = function(method, data, success, failure, opts) {
    if (typeof opts != "object") {
        opts = {};
    }
    if (!opts.event_target) {
        opts.event_target = document;
    }

    jQuery.ajax({
        type: "POST",
        url: "http://api.ping.fm/v1/" + method,
        dataType: "xml",
        data: data,
        success: function(xml) {
            var rsp = jQuery(xml).find("rsp");
            var response = {
                status: rsp.attr("status"),
                transaction: rsp.find("transaction").text(),
                method: rsp.find("method").text(),
                request: data,
                xml: xml,
                message: rsp.find("message").text()
            };
            var trigger;
            if (response.status == "FAIL"
                && response.message.indexOf("User has no") != -1) {
                response.status = "OK";
                response.response = [];
                trigger = success;
            } else if (response.status != "FAIL") {
                if (jQuery.isFunction(opts.process)) {
                    response.response = opts.process(rsp);
                }
                trigger = success;
            } else {
                trigger = failure;
            }
            sc.helpers.triggerCustomEvent(
                trigger,
                opts.event_target,
                response
            );
        },
        error: function(xhr, msg, exc) {
            sc.helpers.triggerCustomEvent(
                failure,
                opts.event_target,
                [{
                    xhr: xhr,
                    msg: msg,
                    exc: exc,
                    method: method,
                    data: data
                }]
            );
        }
    });
};


/**
 * Retrieves a user key for a given mobile key. Users can get their mobile
 * key from http://ping.fm/key/.
 *
 * @param {string} mobilekey
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 */
SpazPingFM.prototype.getUserKeyWithMobileKey = function(mobilekey, opts) {
    var data = {
        api_key: this.getAPIKey(),
        mobile_key: mobilekey
    };

    if (typeof opts != "object") {
        opts = {};
    }
    var self = this;
    opts.process = function(rsp) {
        var userkey = rsp.find("key").text();
        self.setUserKey(userkey);
        return { userkey: userkey };
    };

    this._request(
        "user.key",
        data,
        sc.events.pingfmGetUserKeySuccess,
        sc.events.pingfmGetUserKeyFailure,
        opts
    );
};


/**
 * Validates the user key.
 *
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 */
SpazPingFM.prototype.validateUserKey = function(opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey() 
    };

    this._request(
        "user.validate",
        data,
        sc.events.pingfmValidateUserKeySuccess,
        sc.events.pingfmValidateUserKeyFailure,
        opts
    );
};


/**
 * Retrieves a list of services the user has set up.
 *
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 */
SpazPingFM.prototype.getServices = function(opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey() 
    };

    if (typeof opts != "object") {
        opts = {};
    }
    opts.process = function(rsp) {
        var processed = [];
        rsp.find("service").each(function(key, service) {
            processed.append({
                id: service.attr("id"),
                name: service.attr("name"),
                trigger: service.find("trigger").text(),
                url: service.find("url").text(),
                icon: service.find("icon").text(),
                methods: service.find("methods").text().split(",")
            });
        });
        return processed;
    };

	this._request(
        "user.services",
        data,
        sc.events.pingfmGetServicesSuccess,
        sc.events.pingfmGetServicesFailure,
        opts
    );
};


/**
 * Retrieves a user's custom triggers.
 *
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 */
SpazPingFM.prototype.getTriggers = function(opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey() 
    };

    if (typeof opts != "object") {
        opts = {};
    }
    opts.process = function(rsp) {
        var processed = [];
        var item;
        rsp.find("trigger").each(function(key, trigger) {
            item = {
                id: trigger.attr("id"),
                method: trigger.attr("method"),
                services: []
            };
            trigger.find("service").each(function(key, service) {
                item.services.append({
                    id: service.attr("id"),
                    name: service.attr("name")
                });
            });
            processed.append(item);
        });
        return processed;
    };

	this._request(
        "user.triggers",
        data,
        sc.events.pingfmGetTriggersSuccess,
        sc.events.pingfmGetTriggersFailure,
        opts
    );
};


/**
 * Retrieves the most recent messages a user has posted.
 *
 * @param {object} params Optional data parameters to be included in the 
 *        request; supports a limit property to limit the number of results 
 *        returned (defaults to 25) and an order property to order the 
 *        results by date in either descending (DESC) or ascending (ASC) 
 *        order
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 */
SpazPingFM.prototype.getLatest = function(params, opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey() 
    };

    if (typeof params != "object") {
        params = {};
    }
    jQuery.extend(data, params);

    if (typeof opts != "object") {
        opts = {};
    }
    opts.process = function(rsp) {
        var processed = [];
        var item;
        rsp.find("message").each(function(key, message) {
            var content = message.find("content");
            var title = sc.helpers.Base64.decode(content.find("title").text());
            var body = sc.helpers.Base64.decode(content.find("body").text());
            var location = sc.helpers.Base64.decode(message.find("location").text());
            var item = {
                id: message.attr("id"),
                method: message.attr("method"),
                services: [],
                content: {
                    title: title, 
                    body: body
                },
                location: location
            };
            message.find("service").each(function(key, service) {
                item.services.append({
                    id: service.attr("id"),
                    name: service.attr("name")
                });
            });
            processed.append(item);
        });
        return processed;
    };

	this._request(
        "user.latest",
        data,
        sc.events.pingfmGetLatestSuccess,
        sc.events.pingfmGetLatestFailure,
        opts
    );
};


/**
 * Posts a message to the user's Ping.fm services.
 *
 * @param {string} body Message body
 * @param {object} params Optional data parameters to be included in the 
 *        request; supports a post_method property to specify the posting 
 *        method, one of "default", "blog", "microblog", or "status" 
 *        (defaults to "default") plus all optional parameters for the 
 *        user.post API method
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 * @see user.post section of the <a href="http://groups.google.com/group/pingfm-developers/web/api-documentation">API documentation</a>
 */
SpazPingFM.prototype.post = function(body, params, opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey(),
        body: body
    };

    if (typeof params != "object") {
        params = {};
    }
    jQuery.extend(data, params);
    if (!data.post_method) {
        data.post_method = "default";
    }

	this._request(
        "user.post",
        data,
        sc.events.pingfmPostSuccess,
        sc.events.pingfmPostFailure,
        opts
    );
};


/**
 * Posts a message to the user's Ping.fm services using one of their custom 
 * triggers.
 *
 * @param {string} body Message body
 * @param {string} trigger Custom trigger to use
 * @param {object} params Optional data parameters to be included in the 
 *        request; supports all optional parameters for the user.tpost API  
 *        method
 * @param {object} opts Optional request options, see {@link _request}
 * @return void
 * @see user.tpost section of the <a href="http://groups.google.com/group/pingfm-developers/web/api-documentation">API documentation</a>
 */ 
SpazPingFM.prototype.triggerPost = function(body, trigger, params, opts) {
	var data = {
        api_key: this.getAPIKey(),
        user_app_key: this.getUserKey(),
        trigger: trigger,
        body: body
    };

    if (typeof params != "object") {
        params = {};
    }
    jQuery.extend(data, params);

    this._request(
        "user.tpost",
        data,
        sc.events.pingfmTriggerPostSuccess,
        sc.events.pingfmTriggerPostFailure,
        opts
    );
};
