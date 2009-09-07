$(document).ready(function() {
	/*
		Some data n shit to test with
	*/
	var tdata = {};
	tdata.tweetworks = new SpazTweetWorks();

	var missing = function() {
		ok(false, "missing test - untested code is broken code");
	};


	/*
		Datetime
	*/
	module('Incubator:SpazTweetWorks');
	
	
	
	test("getAPIURL", function() {
		var result = tdata.tweetworks.getAPIURL('add');
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/add.xml';
		equals(result, expect);
		
		var opts = {
			'user-name':'poophat'
		};
		var result = tdata.tweetworks.getAPIURL('my_group_posts', opts);
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/joined_groups/poophat/newest.xml';
		equals(result, expect);
		
		var opts = {
			'user-name':'poophat',
			'page':3,
		};
		var result = tdata.tweetworks.getAPIURL('my_contributed_discussions', opts);
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/contributed/poophat/updated.xml?page=3';
		equals(result, expect);
		
	});
	
	
	
	module('Incubator:SpazImageURL');
	
	test('findServiceUrlsInString', function() {
		
		var siu = new SpazImageURL();

		var foo = "http://twitpic.com/gr2p5 - \"I'm giving the catapault 18 AC.\" RT @coffeemaverick: This kid we call \"Monkey Boy\" in Hawaii.His story tomorrow at Coffeemaverick.com #fb http://yfrog.com/12obqj. 5 rows from the wil wheaton panel http://twitgoo.com/36cg2  http://pikchur.com/Gp0 - waaah! my face is too big. lol http://tweetphoto.com/1de714 Me & Jenn at the Del Mar track Friday. Had a blast I just voted for http://pic.gd/b4b8eb Check it out! #TweetPhoto";
		
		var expect = {
						"http://twitpic.com/gr2p5"     : "http://twitpic.com/show/thumb/gr2p5",
						"http://yfrog.com/12obqj"      : "http://yfrog.com/12obqj.th.jpg",
						"http://twitgoo.com/36cg2"     : "http://twitgoo.com/show/thumb/36cg2",
						"http://pikchur.com/Gp0"       : "http://img.pikchur.com/pic_Gp0_t.jpg",
						"http://tweetphoto.com/1de714" : "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://tweetphoto.com/1de714",
						"http://pic.gd/b4b8eb"         : "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://pic.gd/b4b8eb"
		};
		var result = siu.getThumbsForUrls(foo);
		
		same(expect, result);
		
	});
});