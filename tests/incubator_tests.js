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
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/add.json';
		equals(result, expect);
		
		var opts = {
			'user-name':'poophat'
		};
		var result = tdata.tweetworks.getAPIURL('my_group_posts', opts);
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/joined_groups/poophat/newest.json';
		equals(result, expect);
		
		var opts = {
			'user-name':'poophat',
			'page':3,
		};
		var result = tdata.tweetworks.getAPIURL('my_contributed_discussions', opts);
		var expect = SPAZCORE_TWEETWORKS_BASEURL+'posts/contributed/poophat/updated.json?page=3';
		equals(result, expect);
		
	});
	
	
	

});