$(document).ready(function() {

	var missing = function() {
		ok(false, "missing test - untested code is broken code");
	}


	/*
		Datetime
	*/
	module('Helpers:Datetime');
	
	test("getRelativeTime", missing);
	test("httpTimeToInt", missing);
	test("getTimeAsInt", missing);


	/*
		Event
	*/
	module('Helpers:Event');
	
	test("addListener", missing);
	test("removeListener", missing);
	test("triggerCustomEvent", missing);
	test("getEventData", missing);
	

	/*
		Hash
	*/
	module('Helpers:Hash');
	test("Base64.encode", missing);
	test("Base64.decode", missing);
	test("crc32", missing);
	test("MD5", missing);
	test("SHA1", missing);
	test("SHA256", missing);
	
	
	/*
		Javascript
	*/
	module('Helpers:Javascript');
	test("isString", missing);
	test("isNumber", missing);
	test("clone", missing);
	test("extend", missing);
	
	
	/*
		JSON
	*/
	module('Helpers:JSON');
	test("enJSON", missing);
	test("deJSON", missing);
	
	
	
	/*
		Location
	*/
	module("Helpers:Location");
	
	
	/*
		Network
	*/
	module("Helpers.Network");
	
	
	/*
		String
	*/
	module('Helpers:String');

	test("striptags", function() {
		var input = "<strong>Funky</strong>";
		var output= "Funky";
		equals(sc.helpers.stripTags(input), output, "Strip <strong> tags");

		var input = "<script src=\"..\/helpers\/xml.js\" type=\"text\/javascript\" charset=\"utf-8\"><\/script>";
		var output= "";
		equals(sc.helpers.stripTags(input), output, "Strip "+input+" tags");
	});
	

	test("autolinkTwitterScreenname", function() {

		var tpl   = '<a href="http://twitter.com/#username#">@#username#</a>';
		
		var input = "foo,@user_name!";
		var output= 'foo,<a href="http://twitter.com/user_name">@user_name</a>!';
		equals(sc.helpers.autolinkTwitterScreenname(input, tpl), output);

		var input = "(@user_name)";
		var output= '(<a href="http://twitter.com/user_name">@user_name</a>)';
		equals(sc.helpers.autolinkTwitterScreenname(input, tpl), output);

		var input = "@a";
		var output= '<a href="http://twitter.com/a">@a</a>';
		equals(sc.helpers.autolinkTwitterScreenname(input, tpl), output);

		var input = "@_a";
		var output= '<a href="http://twitter.com/_a">@_a</a>';
		equals(sc.helpers.autolinkTwitterScreenname(input, tpl), output);

		var input = "@_";
		var output= '<a href="http://twitter.com/_">@_</a>';
		equals(sc.helpers.autolinkTwitterScreenname(input, tpl), output);

		
	});
	
	test("autolinkTwitterHashtag", function() {
		
		var tpl = '<a href="http://search.twitter.com/search?q=#hashtag_enc#">##hashtag#</a>';
		
		var input  = 'Happy Earth Hour! #fb';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=fb">#fb</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'hashtags inside (#parentheses) should work too';
		var output = 'hashtags inside (<a href="http://search.twitter.com/search?q=parentheses">#parentheses</a>) should work too';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown?';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>?';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown.';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>.';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown]';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>]';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);

		var input  = 'Happy Earth Hour! #downtown}';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>}';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown)';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>)';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown,';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>,';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown;';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>;';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown\'';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>\'';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input  = 'Happy Earth Hour! #downtown\'s';
		var output = 'Happy Earth Hour! <a href="http://search.twitter.com/search?q=downtown">#downtown</a>\'s';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input = 'foo #downtown_';
		var output ='foo <a href="http://search.twitter.com/search?q=downtown_">#downtown_</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input = 'foo #down+town';
		var output ='foo <a href="http://search.twitter.com/search?q=down%2Btown">#down+town</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input = 'foo #down_town';
		var output ='foo <a href="http://search.twitter.com/search?q=down_town">#down_town</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input = 'foo #down-town';
		var output ='foo <a href="http://search.twitter.com/search?q=down-town">#down-town</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		
		var input = 'foo #www.downtown.com';
		var output ='foo <a href="http://search.twitter.com/search?q=www.downtown.com">#www.downtown.com</a>';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
		
		var input = 'foo #www.downtown.com.';
		var output ='foo <a href="http://search.twitter.com/search?q=www.downtown.com">#www.downtown.com</a>.';
		equals(sc.helpers.autolinkTwitterHashtag(input, tpl), output);
	});
	
	
	test("autolink", function() {
		input   = 'I think @n8han is fast becoming my favorite programming blog stylist. Read http://technically.us/code/ and enjoy.';
		output  = 'I think @n8han is fast becoming my favorite programming blog stylist. Read <a href="http://technically.us/code/">technically.us/code/</a> and enjoy.';
		equals(sc.helpers.autolink(input), output);

		input   = '(I did one for my site; see the logo:http://bit.ly/1LkKk1)';
		output  = '(I did one for my site; see the logo:<a href="http://bit.ly/1LkKk1">bit.ly/1LkKk1</a>)';
		equals(sc.helpers.autolink(input), output);

		input   = '(Testing for length limits; see the logo:http://bit.ly/1LkKk1)';
		output  = '(Testing for length limits; see the logo:<a href="http://bit.ly/1LkKk1">bit.ly/1LkKk1</a>)';
		equals(sc.helpers.autolink(input, null, null, 20), output);

		input   = '(I did one for my site; see the logo:https://www.deadspin.com/5227676/stafford-welcomed-to-detroit-with-warm-prickly-arms)';
		output  = '(I did one for my site; see the logo:<a href="https://www.deadspin.com/5227676/stafford-welcomed-to-detroit-with-warm-prickly-arms">www.deadspin.com/522...</a>)';
		equals(sc.helpers.autolink(input, null, null, 20), output);


		input   = '(http://bit.ly/1LkKk1?[foo]=bar,32&500;xyz)';
		output  = '(<a href="http://bit.ly/1LkKk1?[foo]=bar,32&500;xyz">bit.ly/1LkKk1?[foo]=bar,32&500;xyz</a>)';
		equals(sc.helpers.autolink(input), output);
		
		input   = '@mynameiszanders you should get ande.rs, so you can have z@ande.rs';
		output  = '@mynameiszanders you should get ande.rs, so you can have <a href="mailto:z@ande.rs">z@ande.rs<\/a>';
		equals(sc.helpers.autolink(input), output);

		var extra   = "target='_blank'";
		input   = 'There will be some extra code in this http://funkatron.com';
		output  = 'There will be some extra code in this <a href="http://funkatron.com" '+extra+'>funkatron.com<\/a>';
		equals(sc.helpers.autolink(input, null, extra), output);


	});
	
	test("makeClickable", missing);
	test("fromHTMLSpecialChars", missing);
	test("htmlentities", missing);
	test("utf8.encode", missing);
	test("utf8.decode", missing);
	test("trim", missing);
	test("ltrim", missing);
	test("rtrim", missing);
	
	
	
	/*
		Sys
	*/
	test("getPlatform", missing);
	test("isPlatform", missing);
	test("isAIR", missing);
	test("iswebOS", missing);
	test("isTitanium", missing);
	
	/* These are platform-specific */
	test("dump", missing);
	test("openInBrowser", missing);
	test("getFileContents", missing);
	test("setFileContents", missing);
	test("getAppVersion", missing);
	test("getUserAgent", missing);
	test("setUserAgent", missing);
	test("getClipboardText", missing);
	test("setClipboardText", missing);
	test("getEncryptedValue", missing);
	test("setEncyrptedValue", missing);
	test("getAppStoreDir", missing);
	test("getPreferencesFile", missing);
	test("init_file", missing);
	
	
	
	/*
		View
	*/
	test("removeExtraElements", missing);
	test("removeDuplicateElements", missing);
	test("updateRelativeTimes", missing);
	test("markAllAsRead", missing);

	
	/*
		XML
	*/
	test("createXMLFromString", missing);


});
