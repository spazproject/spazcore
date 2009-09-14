$(document).ready(function() {
	/*
		Some data n shit to test with
	*/
	var tdata = {};
	tdata.dates = {
		'now'      : Date.toString(),
		'30secsago': Date.parse('-30 secs'),
		'30minago' : Date.parse('-30 minutes'),
		'1hourago' : Date.parse('-1 hour'),
		'2daysago' : Date.parse('-48 hours')
	};
	tdata.xmlstr = '  <cataloging_info>'+
	'    <abstract>Compositions by the members of New York Women Composers</abstract>'+
	'    <keyword>music publishing</keyword>'+
	'    <keyword>scores</keyword>'+
	'    <keyword>women composers</keyword>'+
	'    <keyword>New York</keyword>'+
	'  </cataloging_info>';
	tdata.platform = sc.helpers.getPlatform();
	tdata.json = {
		string : '{"following":null,"profile_link_color":"0000ff"}'
	};
	tdata.json['object'] = JSON.parse(tdata.json.string);

	var missing = function() {
		ok(false, "missing test - untested code is broken code");
	};


	/*
		Datetime
	*/
	module('Helpers:Datetime');
	

	
	test("getRelativeTime", function() {
		var result = sc.helpers.getRelativeTime(tdata.dates['30secsago'].toString());
		var expect = '30 sec ago';
		equals(result, expect);

		var result = sc.helpers.getRelativeTime(tdata.dates['30minago'].toString());
		var expect = '30 min ago';                        
		equals(result, expect);                           
                                                          
		var result = sc.helpers.getRelativeTime(tdata.dates['1hourago'].toString());
		var expect = '1 hr ago';                          
		equals(result, expect);                           
                                                          
		var result = sc.helpers.getRelativeTime(tdata.dates['2daysago'].toString());
		var expect = '2 days ago';
		equals(result, expect);
	});
	test("httpTimeToInt", function() {
		
		var result = sc.helpers.httpTimeToInt('Sun Aug 09 00:29:30 +0000 2009');
		var expect = 1249777770000; // ms!
		equals(result, expect);
		
	});
	test("getTimeAsInt", function() {
		
		var result = sc.helpers.getTimeAsInt();
		var expect = new Date().getTime(); // ms!
		equals(result, expect);
		
	});


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
	test("Base64.encode", function() {
		var result = sc.helpers.Base64.encode('!@)$(FJ OQWENoierhvdaseklfh)');
		var expect = 'IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==';
		equals(result, expect);
		
	});
	test("Base64.decode", function() {
		var result = sc.helpers.Base64.decode('IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==');
		var expect = '!@)$(FJ OQWENoierhvdaseklfh)';
		equals(result, expect);
	});
	test("crc32", function() {
		var result = sc.helpers.crc32('IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==');
		var expect = 1463402921;
		equals(result, expect);	
	});
	test("MD5", function() {
		var result = sc.helpers.MD5('IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==');
		var expect = '9d47a013f4961922df5537b8e293bbd8';
		equals(result, expect);	
	});
	test("SHA1", function() {
		var result = sc.helpers.SHA1('IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==');
		var expect = '406bbd355723c59b66894be087e12c6d90114320';
		equals(result, expect);	
	});
	test("SHA256", function() {
		var result = sc.helpers.SHA256('IUApJChGSiBPUVdFTm9pZXJodmRhc2VrbGZoKQ==');
		var expect = 'e63410d1aef62011042dd31283134b43b28a87f0c8d884f97afc3431fd3e8258';
		equals(result, expect);	
	});
	
	
	/*
		Javascript
	*/
	module('Helpers:Javascript');
	test("isString", function() {
		var testdata = 'This is a string!';
		ok(sc.helpers.isString(testdata), testdata);
	});
	test("isNumber", function() {
		var testdata = 1024809123580102395;
		ok(sc.helpers.isNumber(testdata), testdata);
		testdata = 1024809123.580102395;
		ok(sc.helpers.isNumber(testdata), testdata);
		testdata = 010;
		ok(sc.helpers.isNumber(testdata), "010");
		testdata = 0xFF;
		ok(sc.helpers.isNumber(testdata), "0xFF");
	});
	test("clone", function() {
		var orig = sc.helpers;
		var copy = sc.helpers.clone(sc.helpers);
		same(orig,copy);
		copy = null;
	});
	test("extend", missing);
	
	
	/*
		JSON
	*/
	module('Helpers:JSON');
	test("enJSON", function() {
		var result = sc.helpers.enJSON(tdata.json.object);
		var expect = tdata.json.string;
		equals(result, expect);
	});
	test("deJSON", function() {
		var result = sc.helpers.deJSON(tdata.json.string);
		var expect = tdata.json.object;
		same(result, expect);
	});
	
	
	
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

		var input = ".@user_name, foo!";
		var output= '.<a href="http://twitter.com/user_name">@user_name</a>, foo!';
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
	
	test("makeClickable", function() {
		var input  = "I think @n8han is fast becoming my favorite #programming blog stylist. Read http://technically.us/code/ and enjoy.";
		var result = sc.helpers.makeClickable(input);
		var expect = sc.helpers.autolink(sc.helpers.autolinkTwitterHashtag(sc.helpers.autolinkTwitterScreenname(input)));
		equals(result, expect);
	});
	test("fromHTMLSpecialChars", function() {
		var input = "&lt;script src=&quot;../helpers/xml.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;";
		var result = sc.helpers.fromHTMLSpecialChars(input);
		var expect  = "<script src=\"..\/helpers\/xml.js\" type=\"text\/javascript\" charset=\"utf-8\"><\/script>";
		equals(result, expect);
	});
	test("htmlentities", function() {
		var input  = "<script src=\"..\/helpers\/xml.js\" type=\"text\/javascript\" charset=\"utf-8\"><\/script>";
		var result = sc.helpers.htmlentities(input);
		var expect = "&lt;script src=&quot;../helpers/xml.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;";
		equals(result, expect);
	});
	test("utf8.encode", missing);
	test("utf8.decode", missing);
	test("trim", function() {
		var result = sc.helpers.trim('   foobar ');
		var expect = 'foobar';
		equals(result, expect);
	});
	test("ltrim", function() {
		var result = sc.helpers.ltrim('   foobar ');
		var expect = 'foobar ';
		equals(result, expect);
	});
	test("rtrim", function() {
		var result = sc.helpers.rtrim('   foobar 	');
		var expect = '   foobar';
		equals(result, expect);
	});
	
	
	
	/*
		Sys
	*/
	module('Helpers:Sys');
	test("getPlatform", function() {
		var possible_results = [
			SPAZCORE_PLATFORM_AIR,
			SPAZCORE_PLATFORM_WEBOS,
			SPAZCORE_PLATFORM_TITANIUM,
			SPAZCORE_PLATFORM_UNKNOWN
		];
		var result = sc.helpers.getPlatform();
		var index  = possible_results.indexOf(result);
		ok(index != -1, 'getPlatform returned a valid result ('+result+')');
	});
	test("isPlatform", function() {
		var result = sc.helpers.isPlatform(tdata.platform);
		var expect = true;
		equals(result, expect);
	});
	test("isAIR", function() {
		var result = sc.helpers.isAIR();
		if (window.runtime) {
			equals(result, true, 'this is AIR');
		} else {
			equals(result, false, 'this is not AIR');
		}
		
	});
	test("iswebOS", function() {
		var result = sc.helpers.iswebOS();
		if (window.Mojo) {
			equals(result, true, 'this is webOS');
		} else {
			equals(result, false, 'this is not webOS');
		}
	});
	test("isTitanium", function() {
		var result = sc.helpers.isAIR();
		if (window.Titanium) {
			equals(result, true, 'this is Titanium');
		} else {
			equals(result, false, 'this is not Titanium');
		}
	});
	
	/* These are platform-specific */
	if (sc.helpers.getPlatform() !== SPAZCORE_PLATFORM_UNKNOWN) {
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
	}
	
	
	
	/*
		View
	*/
	module('Helpers:View');
	test("removeExtraElements", missing);
	test("removeDuplicateElements", missing);
	test("updateRelativeTimes", missing);
	test("markAllAsRead", missing);

	
	/*
		XML
	*/
	module('Helpers:XML');
	test("createXMLFromString", function() {
		var xmldoc = sc.helpers.createXMLFromString(tdata.xmlstr);
		var result = xmldoc.getElementsByTagName('keyword').length;
		var expect = 4;
		equals(result, expect, '4 keyword elements found');
	});


});
