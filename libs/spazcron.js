
/**
 * SpazCron handles repetitive tasks in a somewhat cron-like way. 
 * @param {integer} interval the interval to check for executable jobs IN SECONDS
 */
SpazCron = function(interval) {
	if (!interval) {
		this.interval = 15*1000; // 15 seconds
	} else {
		this.interval = interval*1000;
	}
	
	this._jobs = {};
		
};

SpazCron.prototype.addJob = function(name, func, mintime) {};



SpazCronJob = function(name, func, mintime) {
	
};