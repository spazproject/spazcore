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
 * @param {string} time_value a string to convert into relative time
 * @param {object} [labels] labels for text portions of time descriptions
 * @param {boolean} [use_dateparse] Whether or not to use the Date.parse method to parse the time_value. Default is FALSE
 */
sc.helpers.getRelativeTime = function(time_value, labels, use_dateparse) {	
	
	var default_labels = {
		'now':'Just now',
		'seconds':'sec ago',
		'minute':'min ago',
		'minutes':'min ago',
		'hour':'hr ago',
		'hours':'hr ago',
		'day':'day ago',
		'days':'days ago'	
	};
	
	labels = sch.defaults(default_labels, labels);
	
	var parsed_date;
	
	if (use_dateparse === true) {
		parsed_date = new Date.parse(time_value);
	} else {
		parsed_date = new Date(time_value);
	}
	
	var now = new Date();
	var delta = parseInt( (now.getTime() - parsed_date.getTime()) / 1000, 10);
	
	if (delta < 10) {
		return labels.now;
	} else if(delta < 60) {
		return delta.toString() +' '+labels.seconds;
	} else if(delta < 120) {
		return '1 '+labels.minute;
	} else if(delta < (45*60)) {
		return Math.round(parseInt(delta / 60, 10)).toString() + ' ' +labels.minutes;
	} else if(delta < (90*60)) {
		return '1 ' +labels.hour;
	} else if(delta < (24*60*60)) {
		if (Math.round(delta / 3600) === 1) {
			return '2 '+labels.hours;
		} else {
			return Math.round(delta / 3600).toString() + ' '+labels.hours;
		}
	} else if(delta < (48*60*60)) {
		return '1 '+labels.day;
	} else {
		return Math.round(delta / 86400).toString() + ' '+labels.days;
	}
};

/**
 * @member sc.helpers 
 */
sc.helpers.httpTimeToInt = function(entry_date, use_dateparse) {
	return sc.helpers.dateToInt(entry_date, use_dateparse);
};

/**
 * this returns milliseconds, not seconds! 
 * @member sc.helpers 
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

/**
 * @member sc.helpers  
 */
sc.helpers.getTimeAsInt = function() {
	var now = new Date();
	return now.getTime();
};
