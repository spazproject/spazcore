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


/**
 * SpazCron handles repetitive tasks in a somewhat cron-like way. 
 * @param {integer} interval the interval to check for executable jobs IN SECONDS
 * @class SpazCron
 */
function SpazCron(time_interval) {
	if (!time_interval) {
		this.time_interval = 15 * 1000; // 15 seconds
	} else {
		this.time_interval = time_interval * 1000;
	}
	
	this.interval = null; // this is a stub for the interval object
	
	this.$jobs = [];
		
}

/**
 * add a job to the set 
 */
SpazCron.prototype.addJob = function (name, func, mintime) {
	/*
		make a new SpazCronJob and add it to this._jobs
	*/
};

/**
 * remove a job to the set 
 */
SpazCron.prototype.removeJob = function (name) {
	/*
		find a job in this._jobs and remove it from the array
	*/
};

/**
 * start execution of jobs
 */
SpazCron.prototype.start = function () {
	/*
		create the interval obj to fun this.execJobs every this.time_interval seconds
	*/
};

/**
 * start execution of jobs
 */
SpazCron.prototype.stop = function () {
	/*
		clear the interval obj
	*/

};

/**
 * execute the jobs in the set
 */
SpazCron.prototype.execJobs = function () {
	/*
		loop through the jobs in this._jobs and execute each one
	*/
};


/**
 * 
 * @param {string} name  a n identifier for the job
 * @param {function} func  the function that the job executes
 * @param {mintime} integer  the amount of time that must pass for job to re-execute, in SECONDS
 */
var SpazCronJob = function (name, func, mintime) {
	this.last_run = 0; // last time run in seconds
	this.name = name;
	this.func = func;
	this.mintime = mintime; // minimum amount of time 
};

SpazCronJob.prototype.execute = function () {
	/*
		if the time passed > this.mintime, then execute this.func
	*/
};