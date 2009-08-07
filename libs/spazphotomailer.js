/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
sub: true,
plusplus: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

function SpazPhotoMailer(opts) {

	this.apis = this.getAPIs();
	
}

SpazPhotoMailer.prototype.getAPILabels = function() {
	var labels = [];
	for ( var key in this.getAPIs() ) {
		labels.push(key);
	}
	return labels;
};

SpazPhotoMailer.prototype.getAPIs = function() {
	
	var thisSPM = this;
	
	var apis = {
		"yfrog": {
			"email_tpl"  :"{{username}}.??????@yfrog.com",
			"message_in" :"subject",
			"email_info_url":"http://yfrog.com/froggy.php",
			'help_text'  :"Log-in to yfrog.com with your Twitter username and password, and click 'my yfrog.' Your customized posting email will be listed on the right.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['yfrog'].email_tpl.replace('{{username}}', username);
			}
		},

		"posterous": {
			"email_tpl"  :"post@posterous.com",
			"message_in" :"subject",
			"email_info_url":"http://posterous.com/autopost",
			'help_text'  :"Post instantly to your Posterous blog. Setup autopost to post back to Twitter! Login for more information and controls.",
			'getToAddress': function(opts) {
				return thisSPM.apis['posterous'].email_tpl;
			}
		},
		
		"pikchur": {
			"email_tpl"  :"{{username}}.???@pikchur.com",
			"message_in" :"subject",
			"email_info_url":"http://pikchur.com/dashboard/profile",
			'help_text'  :"Log-in to pikchur with your Twitter username and password, and click 'Profile.' Your customized posting email will be listed",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['pikchur'].email_tpl.replace('{{username}}', username);
			}
		},


		"twitgoo": {
			"email_tpl"  :"m@twitgoo.com",
			"message_in" :"subject",
			"email_info_url":"http://twitgoo.com/-settings/mobile",
			'help_text'  :"Log-in to twitgoo.com and click 'Settings.' Add the email address from which you'll be sending messages.",
			'getToAddress': function(opts) {
				return thisSPM.apis['twitgoo'].email_tpl;
			}
		},

		"twitpic": {
			"email_tpl"  :"{{username}}.####@twitpic.com",
			"message_in" :"subject",
			"email_info_url":"http://twitpic.com/settings.do",
			'help_text'  :"Log-in to twitpic.com, and click 'Settings.' Your custom email address will be listed.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['twitpic'].email_tpl.replace('{{username}}', username);
			}
		},

		"tweetphoto": {
			"email_tpl"  :"{{username}}.####@tweetphoto.com",
			"message_in" :"subject",
			"email_info_url":"http://www.tweetphoto.com/mysettings.php",
			'help_text'  :"Log-in to tweetphoto.com and click 'My Settings.' Your custom email address will be listed.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['tweetphoto'].email_tpl.replace('{{username}}', username);
			},
			'retrievePostingAddress': function(username, password, success, failure) {
				
				function getTweetPhotoProfile(username, password) {
					
					var url = "http://tweetphotoapi.com/api/tpapi.svc/json/users/"+username;
					var TPAPI_header = 'TPAPI: '+username+","+password;
					
					jQuery.ajax({
						
						'success':function(data, textStatus) {
							var profile = sc.helpers.deJSON(data);
							
						},
						
						'error':function(xhr, testStatus, errorThrown) {
							failure(xhr, testStatus, errorThrown);
						},
						
						'beforeSend':function(xhr){
							xhr.setRequestHeader("TPAPI", username+","+password);
				        },
				        
						'url':url
						
						
					});
					
				}
				
				function getTweetPhoto(username, password, settings_url) {

					var TPAPI_header = 'TPAPI: '+username+","+password;
					
					jQuery.ajax({
						
						'success':function(data, textStatus) {
							var settings = sc.helpers.deJSON(data);
							success(settings.Email);
						},
						
						'error':function(xhr, testStatus, errorThrown) {
							failure(xhr, testStatus, errorThrown);
						},
						
						'beforeSend':function(xhr){
							xhr.setRequestHeader("TPAPI", username+","+password);
				        },
				        
						'url':settings_url
						
					});
					
				}
				
				
				
			}
		}
	};
	
	return apis;

};

SpazPhotoMailer.prototype.setAPI = function(apilabel) {
	this.api = this.apis[apilabel];
};

SpazPhotoMailer.prototype.send = function(api, photo_url, message) {
	
};
