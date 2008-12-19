/*
makes relative time out of "Sun Jul 08 19:01:12 +0000 2007" type string
Borrowed from Mike Demers (slightly altered)
https://twitter.pbwiki.com/RelativeTimeScripts
*/
function get_relative_time(time_value) {
	
	// air.trace(time_value);
	// 
	// return time_value;
	// 
	// time.start('getUnixTime');
	// var unixtime = Date.parse(time_value);
	// time.stop('getUnixTime');
	// 
	// time.start('setParsedDate');
	var parsed_date = new Date(time_value);
	// parsed_date.setTime(unixtime);
	// time.stop('setParsedDate');
	// 
	// time.start('getNow');
	var now = new Date;
	// time.stop('getNow');
	// 
	// time.start('calcDelta');
	var delta = parseInt( (now.getTime() - parsed_date.getTime()) / 1000);
	// time.stop('calcDelta');
	
	if (delta < 10) {
		return 'Just now';
	} else if(delta < 60) {
		return delta.toString() +' sec ago';
	} else if(delta < 120) {
		return '1 min ago';
	} else if(delta < (45*60)) {
		return Math.round(parseInt(delta / 60)).toString() + ' min ago';
	} else if(delta < (90*60)) {
		return '1 hr ago';
	} else if(delta < (24*60*60)) {
		if (Math.round(delta / 3600) == 1) {
			return '2 hr ago';
		} else {
			return Math.round(delta / 3600).toString() + ' hr ago';
		}
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return Math.round(delta / 86400).toString() + ' days ago';
	}
}


function httpTimeToInt(entryDate) {
	var parsedDate = new Date;
	parsedDate.setTime(Date.parse(entryDate));
	return parsedDate.getTime();
	// var now = new Date;
}


function getTimeAsInt() {
	var now = new Date;
	return now.getTime();
}