$().ready(function() {
	
	/*
		Some data n shit to test with
	*/
	var tdata = {};
	tdata.twit = new SpazTwit();
	tdata.TLfilter = new SpazTimelineFilter({
		name : 'php-people',
		type : 'whitelist', // whitelist | blacklist
		usernames_show : ['boo', 'shabazz', 'stinky'],
		usernames_hide : [],
		content_show : [],
		content_hide : [],
		filter_class_prefix: 'customfilter-',
		timeline_selector: 'div.timeline',
		entry_selector : 'div.timeline-entry',
		username_attr  : 'data-user-screen_name',
		content_selector:'div.timeline-entry status-text',
		style_selector : 'style[title="custom-timeline-filters"]'
	});
	
	
	var missing = function() {
		ok(false, "missing test - untested code is broken code");
	};
	
	
	/*
		SpazTwit
	*/
	module('Libraries:SpazTwit');
	
	asyncTest("removeDuplicates", function() {
		$.get('./filetestdata/combined_timeline.json', function(json) {
			var data = JSON.parse(json);
			var nodupes = tdata.twit.removeDuplicates(data);
			console.log(data.length, nodupes.length);
			ok(data.length > nodupes.length, 'data.length > nodupes.length');
			start();
		});
	});
	
	/*
		timelinefilter
	*/
	module('Libraries:SpazTimelineFilter');
	
	test("getBaseSelector", function() {
		var result = tdata.TLfilter.getBaseSelector();
		var expect = 'div.timeline.customfilter-php-people div.timeline-entry';
		equals(result, expect);
	});
	test("getTimelineClass", function() {
		var result = tdata.TLfilter.getTimelineClass();
		var expect = 'customfilter-php-people';
		equals(result, expect);
	});
	test("getUserCSS", function() {
		var result = tdata.TLfilter.getUserCSS();
		var expect = "div.timeline.customfilter-php-people div.timeline-entry { display:none; }\n"+
					"div.timeline.customfilter-php-people div.timeline-entry[data-user-screen_name='boo'] { display:block; }\n"+
					"div.timeline.customfilter-php-people div.timeline-entry[data-user-screen_name='shabazz'] { display:block; }\n"+
					"div.timeline.customfilter-php-people div.timeline-entry[data-user-screen_name='stinky'] { display:block; }";
		equals(result, expect);
	});
	
	
	/*
		SpazImageURL
	*/
	module('Libraries:SpazImageURL');
	
	test('findServiceUrlsInString', function() {
		var siu, foo, expect, result;
		
		siu = new SpazImageURL();
	
		foo = "Nice f*cking view. We've been seeing this for 45 minutes now and still......Whaaaaaahhhhhh!!!!! http://yfrog.com/0tr0gj";
		expect = {
			"http://yfrog.com/0tr0gj"     : "http://yfrog.com/0tr0gj.th.jpg"
		};
		result = siu.getThumbsForUrls(foo);
		same(JSON.stringify(result), JSON.stringify(expect));
	
	
		foo = "http://twitpic.com/gr2p5 - \"I'm giving the catapault 18 AC.\" RT @coffeemaverick: This kid we call \"Monkey Boy\" in Hawaii.His story tomorrow at Coffeemaverick.com #fb http://yfrog.com/12obqj. 5 rows from the wil wheaton panel http://twitgoo.com/36cg2  http://pikchur.com/Gp0 - waaah! my face is too big. lol http://tweetphoto.com/1de714 Me & Jenn at the Del Mar track Friday. Had a blast I just voted for http://pic.gd/b4b8eb Check it out! #TweetPhoto";
		expect = {
						"http://twitpic.com/gr2p5"     : "http://twitpic.com/show/thumb/gr2p5",
						"http://yfrog.com/12obqj"      : "http://yfrog.com/12obqj.th.jpg",
						"http://twitgoo.com/36cg2"     : "http://twitgoo.com/show/thumb/36cg2",
						"http://pikchur.com/Gp0"       : "http://img.pikchur.com/pic_Gp0_s.jpg",
						"http://tweetphoto.com/1de714" : "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://tweetphoto.com/1de714",
						"http://pic.gd/b4b8eb"         : "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://pic.gd/b4b8eb"
		};
		result = siu.getThumbsForUrls(foo);
		same(JSON.stringify(result), JSON.stringify(expect));
		
		
		
		foo = "Nice f*cking view. We've been seeing this for 45 minutes now and still......Whaaaaaahhhhhh!!!!! http://yfrog.com/0tr0gj";
		expect = {
			"http://yfrog.com/0tr0gj"     : "http://yfrog.com/0tr0gj.th.jpg"
		};
		result = siu.getThumbsForUrls(foo);
		same(JSON.stringify(result), JSON.stringify(expect));
	
	});
	
	
	module('Libraries:SpazShortURL');
	
	test('findExpandableURLs', function() {
		var surl = new SpazShortURL();

		var str = "Alpha testing webOS 2.0 upgrade on legacy devices? Please add information to http://bit.ly/webos-2-on-legacy";
		var result = surl.findExpandableURLs(str);
		var expect = ['http://bit.ly/webos-2-on-legacy'];
		same(result, expect);

		str = "RT @howlabit: Killer Moonrise http://ow.ly/8kuq in #VictoriaBC http://ow.ly/i/8kuq // owly killed your URL :(";
		result = surl.findExpandableURLs(str);
		expect = ['http://ow.ly/8kuq'];
		same(result, expect, "Find only the non '/i/' link");

		
	});

});