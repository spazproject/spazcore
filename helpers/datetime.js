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
 
/*
* makes relative time out of "Sun Jul 08 19:01:12 +0000 2007" type string
* Borrowed from Mike Demers (slightly altered)
* https://twitter.pbwiki.com/RelativeTimeScripts
* 
* This requires date.js
* http://www.datejs.com/
*/
sc.helpers.getRelativeTime = function(time_value, use_dateparse) {	
	
	var parsed_date;
	
	if (use_dateparse === true) {
		parsed_date = new Date.parse(time_value);
	} else {
		parsed_date = new Date(time_value);
	}
	
	var now = new Date();
	var delta = parseInt( (now.getTime() - parsed_date.getTime()) / 1000, 10);
	
	if (delta < 10) {
		return 'Just now';
	} else if(delta < 60) {
		return delta.toString() +' sec ago';
	} else if(delta < 120) {
		return '1 min ago';
	} else if(delta < (45*60)) {
		return Math.round(parseInt(delta / 60, 10)).toString() + ' min ago';
	} else if(delta < (90*60)) {
		return '1 hr ago';
	} else if(delta < (24*60*60)) {
		if (Math.round(delta / 3600) === 1) {
			return '2 hr ago';
		} else {
			return Math.round(delta / 3600).toString() + ' hr ago';
		}
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return Math.round(delta / 86400).toString() + ' days ago';
	}
};


sc.helpers.httpTimeToInt = function(entry_date, use_dateparse) {
	return sc.helpers.dateToInt(entry_date, use_dateparse)
};

/**
 * this returns milliseconds, not seconds! 
 */
sc.helpers.dateToInt = function(entry_date, use_dateparse) {
	var parsedDate = new Date();
	
	if (use_dateparse === true) {
		entry_date = new Date.parse(entry_date);
	} else {
		entry_date = new Date(entry_date);
	}
	
	parsedDate.setTime(entry_date);
	return parsedDate.getTime();
};


sc.helpers.getTimeAsInt = function() {
	var now = new Date();
	return now.getTime();
};
