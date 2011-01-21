/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, jQuery, sch;
 
/**
 * A library to interact with the API for http://www.joind.in/
 * @see <a href="http://www.joind.in/api/">The API docs</a>
 */

/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.joindinMethodSuccess		= 'joindinMethodSuccess';
sc.events.joindinMethodFailure		= 'joindinMethodFailure';
//EVENTS
sc.events.joindinEventListingSuccess = 'joindinEventListingSuccess';
sc.events.joindinEventListingFailure = 'joindinEventListingFailure';
sc.events.joindinEventDetailSuccess = 'joindinEventDetailSuccess';
sc.events.joindinEventDetailFailure = 'joindinEventDetailFailure';
sc.events.joindinGetEventTalksSuccess = 'joindinGetEventTalksSuccess';
sc.events.joindinGetEventTalksFailure = 'joindinGetEventTalksFailure';
sc.events.joindinAttendEventSuccess = 'joindinAttendEventSuccess';
sc.events.joindinAttendEventFailure = 'joindinAttendEventFailure';
sc.events.joindinGetEventCommentsSuccess = 'joindinGetEventCommentsSuccess';
sc.events.joindinGetEventCommentsFailure = 'joindinGetEventCommentsFailure';
sc.events.joindinAddEventTrackSuccess = 'joindinAddEventTrackSuccess';
sc.events.joindinAddEventTrackFailure = 'joindinAddEventTrackFailure';
//TALKS
sc.events.joindinGetTalkDetailSuccess = 'joinedinGetTalkDetailSuccess';
sc.events.joindinGetTalkDetailFailure = 'joinedinGetTalkDetailFailure';
sc.events.joindinGetTalkCommentsSuccess = 'joinedinGetTalkCommentsSuccess';
sc.events.joindinGetTalkCommentsFailure = 'joinedinGetTalkCommentsFailure';
//COMMENTS
sc.events.joindinAddEventCommentSuccess = 'joinedinAddEventCommentSuccess';
sc.events.joindinAddEventCommentFailure = 'joinedinAddEventCommentFailure';
sc.events.joindinAddTalkCommentSuccess = 'joinedinAddTalkCommentSuccess';
sc.events.joindinAddTalkCommentFailure = 'joinedinAddTalkCommentFailure';
//USER
sc.events.joindinGetUserDetailSuccess = 'joindinGetUserDetailSuccess';
sc.events.joindinGetUserDetailFailure = 'joindinGetUserDetailFailure';
sc.events.joindinGetUserCommentsSuccess = 'joindinGetUserCommentsSuccess';
sc.events.joindinGetUserCommentsFailure = 'joindinGetUserCommentsFailure';
sc.events.joindinValidateUserSuccess = 'joindinValidateUserSuccess';
sc.events.joindinValidateUserFailure = 'joindinValidateUserFailure';
sc.events.joindinGetSpeakerProfileSuccess = 'joindinGetSpeakerProfileSuccess';
sc.events.joindinGetSpeakerProfileFailure = 'joindinGetSpeakerProfileFailure';
//SITE
sc.events.joindinGetSiteStatusSuccess = 'joindinGetSiteStatusSuccess';
sc.events.joindinGetSiteStatusFailure = 'joindinGetSiteStatusFailure';

/**
 * @constructor
 * @param {Object} opts
 * @param {string} [opts.username] joind.in username
 * @param {string} [opts.password] md5 hash of the password
 * @param {string} [opts.baseURL] use testing server, WITHOUT trailing slash
 * @param {DOMElement} [opts.eventTarget] what to target triggered events with. default is the document element
 */
function SpazJoindIn(opts) {
	opts = sch.defaults({
        username: null,
        password: null,
        baseURL: 'http://joind.in/api',
        eventTarget: document
	}, opts);
	
	this.setCredentials(opts.username, opts.password);
	this.setBaseURL(opts.baseURL);
    this.eventTarget = opts.eventTarget;
}

/**
 * Sets the JoindIn credentials
 * @param {string} username joind.in username
 * @param {string} password md5 hash of the password
 */
SpazJoindIn.prototype.setCredentials = function(username, password) {
    this.username = username;
    this.password = password;
};

/**
 * Returns the JoindIn credentials if they exist, false if they do not.
 * @returns {object|false} Object with members username and password, or false
 */
SpazJoindIn.prototype.getCredentials = function() {
    if( this.hasCredentials() ) {
        return {
            user: this.username,
            pass: this.password
        }
    } else {
        return false;
    }
};

/**
 * Returns TRUE if credentials are set, FALSE if not
 * @returns {boolean}
 */
SpazJoindIn.prototype.hasCredentials = function() {
    return this.username || this.password ? true : false;
};

/**
 * Clears existing credentials
 */
SpazJoindIn.prototype.clearCredentials = function() {
    this.setCredentials(null, null);
};

/**
 * Sets the Joind.In base URL. DO NOT INCLUDE THE TRAILING /
 * @param {string}
 */
SpazJoindIn.prototype.setBaseURL = function(baseURL) {
    this.baseURL = baseURL;
};

/**
 * Method to construct an API URL from the passed method and value strings
 * @param {string} URL namespace (e.g. event) WITHOUT a leading slash
 * @returns {string} the URL string
 */
SpazJoindIn.prototype.getURL = function(namespace) {
    if( namespace )
	    var url  = this.baseURL + "/" + namespace;
    else
        var url = this.baseURL;

	return url;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Method ot get details on a specific event
 * @param {Object} opts options for the method call
 * @param {integer} opts.event_id the joind.in event id
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getEventDetail = function(opts) {
    var that = this;
    
    opts = sch.defaults({
        event_id: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'event',
        action: {
            type: 'getdetail',
            data: {
                event_id: opts.event_id
            }
        },
        auth: false,
        successEvent: sc.events.joindinEventDetailSuccess,
        failureEvent: sc.events.joindinEventDetailFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * Method to add an event
 * @param {Object} opts
 * @param {Object} opts.newEvent
 * @param {string} opts.newEvent.event_name full name of the event
 * @param {integer} opts.newEvent.event_start UNIX timestamp of event start time
 * @param {integer} opts.newEvent.event_end UNIX timestamp of event end time
 * @param {string} opts.newEvent.event_loc Location of the event
 * @param {integer} opts.newEvent.event_tz Offset of event timezone from GMT
 * @param {string} opts.newEvent.event_desc Description of the event
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.addEvent = function(opts) {
    opts = sch.defaults({
        newEvent: {},
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'event',
        action: {
            type: 'addevent',
            data: opts.newEvent
        },
        auth: true,
        successEvent: sc.events.joindinAddEventSuccess,
        failureEvent: sc.events.joindinAddEventFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * Method to get the talks associated with an event
 * @param {Object} opts
 * @param {integer} opts.event_id event ID
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getEventTalks = function(opts) {
    opts = sch.defaults({
        event_id: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'event',
        action: {
            type: 'gettalks',
            data: {
                event_id: opts.event_id
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetEventTalksSuccess,
        failureEvent: sc.events.joindinGetEventTalksFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * Method to pull in all events
 * @param {Object} opts options for the method call
 * @param {string} [opts.type] type of events to fetch [hot, upcoming, past, pending]
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getEventListing = function(opts) {
    var that = this;
    
    opts = sch.defaults({
        type         : 'hot',
        onSuccess    : null, // callback on success
		onFailure    : null  // callback on failure
	}, opts);

    this._callMethod({
        namespace: 'event',
        action: {
            type: 'getlist',
            data: {
                event_type: opts.type
            }
        },
        auth: false,
        successEvent: sc.events.joindinEventListingSuccess,
        failureEvent: sc.events.joindinEventListingFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};


 /**
  * Mark current user as attending event
  * @param {Object} opts options for the method call
  * @param {string} [opts.eid] Event ID
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.attendEvent = function(opts) {
     opts = sch.defaults({
         eid: null,
         onSuccess: null,
         onFailure: null
     }, opts);

     this._callMethod({
         namespace: 'event',
         action: {
             type: 'attend',
             data: {
                 eid: opts.eid
             }
         },
         auth: true,
         successEvent: sc.events.joindinAttendEventSuccess,
         failureEvent: sc.events.joindinAttendEventFailure,
         onSuccess: opts.onSuccess,
         onFailure: opts.onFailure
     });
 };


 /**
  * Get all comments associated with an event
  * @param {Object} opts options for the method call
  * @param {string} [opts.event_id]
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.getEventComments = function(opts) {
     opts = sch.defaults({
         event_id: null,
         onSuccess: null,
         onFailure: null
     }, opts);

     this._callMethod({
         namespace: 'event',
         action: {
             type: 'getcomments',
             data: {
                 event_id: opts.event_id
             }
         },
         auth: false,
         successEvent: sc.events.joindinGetEventCommentsSuccess,
         failureEvent: sc.events.joindinGetEventCommentsFailure,
         onSuccess: opts.onSuccess,
         onFailure: opts.onFailure
     });
 };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TALKS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 /**
  * Get the details for given talk number
  * @param {Object} opts options for the method call
  * @param {integer} [opts.talk_id] ID number of the talk to fetch
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.getTalkDetail = function(opts) {
    opts = sch.defaults({
        talk_id: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'talk',
        action: {
            type: 'getdetail',
            data: {
                talk_id: opts.talk_id
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetTalkDetailSuccess,
        failureEvent: sc.events.joindinGetTalkDetailFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};


 /**
  * Get all comments associated with a talk
  * @param {Object} opts options for the method call
  * @param {integer} [opts.talk_id] ID number of the talk to fetch
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.getTalkComments = function(opts) {
    opts = sch.defaults({
        talk_id: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'talk',
        action: {
            type: 'getcomments',
            data: {
                talk_id: opts.talk_id
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetTalkCommentsSuccess,
        failureEvent: sc.events.joindinGetTalkCommentsFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 /**
  * Add a comment to the event
  * @param {Object} opts options for the method call
  * @param {integer} [opts.event_id] id of the event to add the comment to
  * @param {string} [opts.comment] comments to submit
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.addEventComment = function(opts) {
    opts = sch.defaults({
        event_id: null,
        comment: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'event',
        action: {
            type: 'addcomment',
            data: {
                event_id: opts.event_id,
                comment: opts.comment,
            }
        },
        auth: false,
        successEvent: sc.events.joindinAddEventCommentSuccess,
        failureEvent: sc.events.joindinAddEventCommentFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};


 /**
  * Add a comment to a given talk
  * @param {Object} opts options for the method call
  * @param {integer} [opts.talk_id] id of the talk to add the comment to
  * @param {string} [opts.comment] comments to submit
  * @param {integer} [opts.rating] rating to give the talk (range of 1-5)
  * @param {function} [opts.onSuccess]
  * @param {function} [opts.onFailure]
  */
SpazJoindIn.prototype.addTalkComment = function(opts) {
    opts = sch.defaults({
        talk_id: null,
        comment: null,
        onSuccess: null,
        onFailure: null
    }, opts);
    
    var data = {
        event_id: opts.talk_id,
        comment: opts.comment
    };
    
    if( opts.rating )
        data.rating = opts.rating;
    
    if( opts.private )
        data.private = opts.private;
    
    this._callMethod({
        namespace: 'event',
        action: {
            type: 'addcomment',
            data: data
        },
        auth: true,
        successEvent: sc.events.joindinAddEventCommentSuccess,
        failureEvent: sc.events.joindinAddEventCommentFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USERS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get User Detail
 * @param {Object} opts options for the method call
 * @param {integer} [opts.uid] user ID number
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getUserDetail = function(opts) {
    opts = sch.defaults({
        uid: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'user',
        action: {
            type: 'getdetail',
            data: {
                uid: opts.uid
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetUserDetailSuccess,
        failureEvent: sc.events.joindinGetUserDetailFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * Get User Comments
 * @param {Object} opts options for the method call
 * @param {string} [opts.username]
 * @param {string} [opts.type] type of comments to retrieve, 'event' or 'talk'
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getUserComments = function(opts) {
    opts = sch.defaults({
        username: null,
        type: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'user',
        action: {
            type: 'getcomments',
            data: {
                username: opts.username,
                type: opts.type
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetUserCommentsSuccess,
        failureEvent: sc.events.joindinGetUserCommentsFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * Validate User
 * @param {Object} opts options for the method call
 * @param {string} [opts.uid] Username
 * @param {string} [opts.pass] 
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.validateUser = function(opts) {
    opts = sch.defaults({
        uid: null,
        pass: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'user',
        action: {
            type: 'validate',
            data: {
                uid: opts.uid,
                pass: opts.pass
            }
        },
        auth: false,
        successEvent: sc.events.joindinValidateUserSuccess,
        failureEvent: sc.events.joindinValidateUserFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * 
 * @param {Object} opts options for the method call
 * @param {integer} [opts.spid] speaker ID
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getSpeakerProfile = function(opts) {
    opts = sch.defaults({
        spid: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'user',
        action: {
            type: 'getprofile',
            data: {
                spid: opts.spid
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetSpeakerProfileSuccess,
        failureEvent: sc.events.joindinGetSpeakerProfileFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SITE //////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Test the connection to Joind.In, if Joind.In is up it will echo the provided test string.
 * @param {Object} opts options for the method call
 * @param {integer} [opts.test_string] a string to be echo'ed back
 * @param {function} [opts.onSuccess]
 * @param {function} [opts.onFailure]
 */
SpazJoindIn.prototype.getSiteStatus = function(opts) {
    opts = sch.defaults({
        test_string: null,
        onSuccess: null,
        onFailure: null
    }, opts);

    this._callMethod({
        namespace: 'site',
        action: {
            type: 'status',
            data: {
                test_string: opts.test_string
            }
        },
        auth: false,
        successEvent: sc.events.joindinGetSiteStatusSuccess,
        failureEvent: sc.events.joindinGetSiteStatusFailure,
        onSuccess: opts.onSuccess,
        onFailure: opts.onFailure
    });
};

/**
 * a general purpose method for calling API methods via ajax and raising events on success/failure. callbacks can 
 * optionally be set for success or failure as well
 *
 * @param {Object} opts options for the method call
 * @param {string} opts.namespace the namespace being used (e.g. event)
 * @param {string} opts.action request action object
 * @param {boolean} [opts.auth] require authentication
 * @param {string} [opts.successEvent] the type of event to raise on success. default is {@link sc.events.joindinMethodSuccess}
 * @param {string} [opts.failureEvent] the type of event to raise on failure. default is {@link sc.events.joindinMethodFailure}
 * @param {function} [opts.onSuccess] a callback function called on success. takes args data, textStatus
 * @param {function} [opts.onFailure] a callback function called on failure. takes args xhr, msg, exc
 * 
 */
SpazJoindIn.prototype._callMethod = function(opts) {
	var that = this;
	
	opts = sch.defaults({
		namespace: '',
        action: {},
        auth: false,
		successEvent: sc.events.joindinMethodSuccess,
		failureEvent: sc.events.joindinMethodFailure,
		onSuccess: null, // callback on success
		onFailure: null  // callback on failure
	}, opts);
	
	var url = this.getURL(opts.namespace);
	
    var parameters = {
        request: {
            action: opts.action
        }
    };

    if( opts.auth || this.hasCredentials() ) {
        parameters.request.auth = this.getCredentials();
    }
    
	jQuery.ajax({
		url: url,
        contentType: 'application/json',
		type: 'POST',
        data: sch.enJSON(parameters),
        processData: false,
		success: function(data, textStatus) {
            if (opts.onSuccess) {
				opts.onSuccess.call(that, data, textStatus);
			}
            
            sc.helpers.triggerCustomEvent(opts.successEvent, that.eventTarget, data);
		},
		error: function(xhr, msg, exc) {
			if (opts.onFailure) {
				opts.onFailure.call(that, xhr, msg, exc);
			}
            
            sc.helpers.triggerCustomEvent(opts.failureEvent, that.eventTarget, {'url':url, 'xhr':xhr, 'msg':msg});
		}
	});
};

