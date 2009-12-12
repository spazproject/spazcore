/*********** Built 2009-12-12 13:54:36 EST ***********/
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
regexp: false,
undef: true,
white: false,
onevar: false 
 */

/**
 * SPAZCORE
 * version 0.1.1
 * 2009-08-06
 * 
 * License
 * 
 * Copyright (c) 2008-2009, Edward Finkler, Funkatron Productions
 * 
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *         Redistributions of source code must retain the above copyright
 *         notice, this list of conditions and the following disclaimer.
 * 
 *         Redistributions in binary form must reproduce the above
 *         copyright notice, this list of conditions and the following
 *         disclaimer in the documentation and/or other materials provided
 *         with the distribution.
 * 
 *         Neither the name of Edward Finkler, Funkatron Productions nor
 *         the names of its contributors may be used to endorse or promote
 *         products derived from this software without specific prior written
 *         permission.
 * 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * 
 * SpazCore includes code from other software projects. Their licenses follow:
 * 
 * date.js
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * 
 * webtoolkit.info (hash libs, trim funcs, utf8 encoder/decoder)
 * http://www.webtoolkit.info/
 * As long as you leave the copyright notice of the original script, or link
 * back to this website, you can use any of the content published on this
 * website free of charge for any use: commercial or noncommercial.
 */
 
/**
 * 
 * @namespace root namespace for SpazCore
 */
var sc = {};

/**
 * @namespace namespace for app-specific stuff
 */
sc.app = {};

/**
 * @namespace namespace for helper methods
 */
sc.helpers = {};

/**
 * dump level for limiting what gets dumped to console 
 */
sc.dumplevel = 1;

/**
 * method to set dump level 
 */
sc.setDumpLevel = function(level) {
	sc.dumplevel = parseInt(level, 10);
};

/**
 * @namespace helper shortcuts 
 * this lets us write "sch.method" instead of "sc.helpers.method"
 * 
 */
var sch = sc.helpers;


sc.events = {};





/**
 * Build the helpers
 * @depends ../helpers/datetime.js 
 * @depends ../helpers/event.js 
 * @depends ../helpers/javascript.js 
 * @depends ../helpers/json.js 
 * @depends ../helpers/location.js 
 * @depends ../helpers/string.js 
 * @depends ../helpers/sys.js 
 * @depends ../helpers/view.js 
 * @depends ../helpers/xml.js 
 * 
 * Build the libs
 * @depends spazcron.js
 * @depends spazlocker.js
 * @depends spazphotomailer.js
 * @depends spazpingfm.js
 * @depends spazprefs.js
 * @depends spazshorttext.js
 * @depends spazshorturl.js
 * @depends spaztemplate.js
 * @depends spaztimeline.js
 * @depends spaztwit.js
 */
Date.CultureInfo = {
	/* Culture Name */
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    
    /* Day Name Strings */
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    
    /* Month Name Strings */
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

	/* AM/PM Designators */
    amDesignator: "AM",
    pmDesignator: "PM",

    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    
    /**
     * The dateElementOrder is based on the order of the 
     * format specifiers in the formatPatterns.DatePattern. 
     *
     * Example:
     <pre>
     shortDatePattern    dateElementOrder
     ------------------  ---------------- 
     "M/d/yyyy"          "mdy"
     "dd/MM/yyyy"        "dmy"
     "yyyy-MM-dd"        "ymd"
     </pre>
     *
     * The correct dateElementOrder is required by the parser to
     * determine the expected order of the date elements in the
     * string being parsed.
     */
    dateElementOrder: "mdy",
    
    /* Standard date and time format patterns */
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },

    /**
     * NOTE: If a string format is not parsing correctly, but
     * you would expect it parse, the problem likely lies below. 
     * 
     * The following regex patterns control most of the string matching
     * within the parser.
     * 
     * The Month name and Day name patterns were automatically generated
     * and in general should be (mostly) correct. 
     *
     * Beyond the month and day name patterns are natural language strings.
     * Example: "next", "today", "months"
     *
     * These natural language string may NOT be correct for this culture. 
     * If they are not correct, please translate and edit this file
     * providing the correct regular expression pattern. 
     *
     * If you modify this file, please post your revised CultureInfo file
     * to the Datejs Forum located at http://www.datejs.com/forums/.
     *
     * Please mark the subject of the post with [CultureInfo]. Example:
     *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark)
     * 
     * We will add the modified patterns to the master source files.
     *
     * As well, please review the list of "Future Strings" section below. 
     */	
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,

        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,

        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|aft(er)?|from|hence)/i,
        subtract: /^(\-|bef(ore)?|ago)/i,
        
        yesterday: /^yes(terday)?/i,
        today: /^t(od(ay)?)?/i,
        tomorrow: /^tom(orrow)?/i,
        now: /^n(ow)?/i,
        
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^mn|min(ute)?s?/i,
		hour: /^h(our)?s?/i,
		week: /^w(eek)?s?/i,
        month: /^m(onth)?s?/i,
        day: /^d(ay)?s?/i,
        year: /^y(ear)?s?/i,
		
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a(?!u|p)|p)/i
    },

	timezones: [{name:"UTC", offset:"-000"}, {name:"GMT", offset:"-000"}, {name:"EST", offset:"-0500"}, {name:"EDT", offset:"-0400"}, {name:"CST", offset:"-0600"}, {name:"CDT", offset:"-0500"}, {name:"MST", offset:"-0700"}, {name:"MDT", offset:"-0600"}, {name:"PST", offset:"-0800"}, {name:"PDT", offset:"-0700"}]
};

/********************
 ** Future Strings **
 ********************
 * 
 * The following list of strings may not be currently being used, but 
 * may be incorporated into the Datejs library later. 
 *
 * We would appreciate any help translating the strings below.
 * 
 * If you modify this file, please post your revised CultureInfo file
 * to the Datejs Forum located at http://www.datejs.com/forums/.
 *
 * Please mark the subject of the post with [CultureInfo]. Example:
 *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark)b
 *
 * English Name        Translated
 * ------------------  -----------------
 * about               about
 * ago                 ago
 * date                date
 * time                time
 * calendar            calendar
 * show                show
 * hourly              hourly
 * daily               daily
 * weekly              weekly
 * bi-weekly           bi-weekly
 * fortnight           fortnight
 * monthly             monthly
 * bi-monthly          bi-monthly
 * quarter             quarter
 * quarterly           quarterly
 * yearly              yearly
 * annual              annual
 * annually            annually
 * annum               annum
 * again               again
 * between             between
 * after               after
 * from now            from now
 * repeat              repeat
 * times               times
 * per                 per
 * min (abbrev minute) min
 * morning             morning
 * noon                noon
 * night               night
 * midnight            midnight
 * mid-night           mid-night
 * evening             evening
 * final               final
 * future              future
 * spring              spring
 * summer              summer
 * fall                fall
 * winter              winter
 * end of              end of
 * end                 end
 * long                long
 * short               short
 *//**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-04-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
 
(function () {
    var $D = Date, 
        $P = $D.prototype, 
        $C = $D.CultureInfo,
        p = function (s, l) {
            if (!l) {
                l = 2;
            }
            return ("000" + s).slice(l * -1);
        };
            
    /**
     * Resets the time of this Date object to 12:00 AM (00:00), which is the start of the day.
     * @param {Boolean}  .clone() this date instance before clearing Time
     * @return {Date}    this
     */
    $P.clearTime = function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };

    /**
     * Resets the time of this Date object to the current time ('now').
     * @return {Date}    this
     */
    $P.setTimeToNow = function () {
        var n = new Date();
        this.setHours(n.getHours());
        this.setMinutes(n.getMinutes());
        this.setSeconds(n.getSeconds());
        this.setMilliseconds(n.getMilliseconds());
        return this;
    };

    /** 
     * Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM).
     * @return {Date}    The current date.
     */
    $D.today = function () {
        return new Date().clearTime();
    };

    /**
     * Compares the first date to the second date and returns an number indication of their relative values.  
     * @param {Date}     First Date object to compare [Required].
     * @param {Date}     Second Date object to compare to [Required].
     * @return {Number}  -1 = date1 is lessthan date2. 0 = values are equal. 1 = date1 is greaterthan date2.
     */
    $D.compare = function (date1, date2) {
        if (isNaN(date1) || isNaN(date2)) { 
            throw new Error(date1 + " - " + date2); 
        } else if (date1 instanceof Date && date2 instanceof Date) {
            return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
        } else { 
            throw new TypeError(date1 + " - " + date2); 
        }
    };
    
    /**
     * Compares the first Date object to the second Date object and returns true if they are equal.  
     * @param {Date}     First Date object to compare [Required]
     * @param {Date}     Second Date object to compare to [Required]
     * @return {Boolean} true if dates are equal. false if they are not equal.
     */
    $D.equals = function (date1, date2) { 
        return (date1.compareTo(date2) === 0); 
    };

    /**
     * Gets the day number (0-6) if given a CultureInfo specific string which is a valid dayName, abbreviatedDayName or shortestDayName (two char).
     * @param {String}   The name of the day (eg. "Monday, "Mon", "tuesday", "tue", "We", "we").
     * @return {Number}  The day number
     */
    $D.getDayNumberFromName = function (name) {
        var n = $C.dayNames, m = $C.abbreviatedDayNames, o = $C.shortestDayNames, s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) { 
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) { 
                return i; 
            }
        }
        return -1;  
    };
    
    /**
     * Gets the month number (0-11) if given a Culture Info specific string which is a valid monthName or abbreviatedMonthName.
     * @param {String}   The name of the month (eg. "February, "Feb", "october", "oct").
     * @return {Number}  The day number
     */
    $D.getMonthNumberFromName = function (name) {
        var n = $C.monthNames, m = $C.abbreviatedMonthNames, s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) { 
                return i; 
            }
        }
        return -1;
    };

    /**
     * Determines if the current date instance is within a LeapYear.
     * @param {Number}   The year.
     * @return {Boolean} true if date is within a LeapYear, otherwise false.
     */
    $D.isLeapYear = function (year) { 
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0); 
    };

    /**
     * Gets the number of days in the month, given a year and month value. Automatically corrects for LeapYear.
     * @param {Number}   The year.
     * @param {Number}   The month (0-11).
     * @return {Number}  The number of days in the month.
     */
    $D.getDaysInMonth = function (year, month) {
        return [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
 
    $D.getTimezoneAbbreviation = function (offset) {
        var z = $C.timezones, p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].offset === offset) {
                return z[i].name;
            }
        }
        return null;
    };
    
    $D.getTimezoneOffset = function (name) {
        var z = $C.timezones, p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].name === name.toUpperCase()) {
                return z[i].offset;
            }
        }
        return null;
    };

    /**
     * Returns a new Date object that is an exact date and time copy of the original instance.
     * @return {Date}    A new Date instance
     */
    $P.clone = function () {
        return new Date(this.getTime()); 
    };

    /**
     * Compares this instance to a Date object and returns an number indication of their relative values.  
     * @param {Date}     Date object to compare [Required]
     * @return {Number}  -1 = this is lessthan date. 0 = values are equal. 1 = this is greaterthan date.
     */
    $P.compareTo = function (date) {
        return Date.compare(this, date);
    };

    /**
     * Compares this instance to another Date object and returns true if they are equal.  
     * @param {Date}     Date object to compare. If no date to compare, new Date() [now] is used.
     * @return {Boolean} true if dates are equal. false if they are not equal.
     */
    $P.equals = function (date) {
        return Date.equals(this, date || new Date());
    };

    /**
     * Determines if this instance is between a range of two dates or equal to either the start or end dates.
     * @param {Date}     Start of range [Required]
     * @param {Date}     End of range [Required]
     * @return {Boolean} true is this is between or equal to the start and end dates, else false
     */
    $P.between = function (start, end) {
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    };

    /**
     * Determines if this date occurs after the date to compare to.
     * @param {Date}     Date object to compare. If no date to compare, new Date() ("now") is used.
     * @return {Boolean} true if this date instance is greater than the date to compare to (or "now"), otherwise false.
     */
    $P.isAfter = function (date) {
        return this.compareTo(date || new Date()) === 1;
    };

    /**
     * Determines if this date occurs before the date to compare to.
     * @param {Date}     Date object to compare. If no date to compare, new Date() ("now") is used.
     * @return {Boolean} true if this date instance is less than the date to compare to (or "now").
     */
    $P.isBefore = function (date) {
        return (this.compareTo(date || new Date()) === -1);
    };

    /**
     * Determines if the current Date instance occurs today.
     * @return {Boolean} true if this date instance is 'today', otherwise false.
     */
    
    /**
     * Determines if the current Date instance occurs on the same Date as the supplied 'date'. 
     * If no 'date' to compare to is provided, the current Date instance is compared to 'today'. 
     * @param {date}     Date object to compare. If no date to compare, the current Date ("now") is used.
     * @return {Boolean} true if this Date instance occurs on the same Day as the supplied 'date'.
     */
    $P.isToday = $P.isSameDay = function (date) {
        return this.clone().clearTime().equals((date || new Date()).clone().clearTime());
    };
    
    /**
     * Adds the specified number of milliseconds to this instance. 
     * @param {Number}   The number of milliseconds to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addMilliseconds = function (value) {
        this.setMilliseconds(this.getMilliseconds() + value * 1);
        return this;
    };

    /**
     * Adds the specified number of seconds to this instance. 
     * @param {Number}   The number of seconds to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addSeconds = function (value) { 
        return this.addMilliseconds(value * 1000); 
    };

    /**
     * Adds the specified number of seconds to this instance. 
     * @param {Number}   The number of seconds to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addMinutes = function (value) { 
        return this.addMilliseconds(value * 60000); /* 60*1000 */
    };

    /**
     * Adds the specified number of hours to this instance. 
     * @param {Number}   The number of hours to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addHours = function (value) { 
        return this.addMilliseconds(value * 3600000); /* 60*60*1000 */
    };

    /**
     * Adds the specified number of days to this instance. 
     * @param {Number}   The number of days to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addDays = function (value) {
        this.setDate(this.getDate() + value * 1);
        return this;
    };

    /**
     * Adds the specified number of weeks to this instance. 
     * @param {Number}   The number of weeks to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addWeeks = function (value) { 
        return this.addDays(value * 7);
    };

    /**
     * Adds the specified number of months to this instance. 
     * @param {Number}   The number of months to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value * 1);
        this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    };

    /**
     * Adds the specified number of years to this instance. 
     * @param {Number}   The number of years to add. The number can be positive or negative [Required]
     * @return {Date}    this
     */
    $P.addYears = function (value) {
        return this.addMonths(value * 12);
    };

    /**
     * Adds (or subtracts) to the value of the years, months, weeks, days, hours, minutes, seconds, milliseconds of the date instance using given configuration object. Positive and Negative values allowed.
     * Example
    <pre><code>
    Date.today().add( { days: 1, months: 1 } )
     
    new Date().add( { years: -1 } )
    </code></pre> 
     * @param {Object}   Configuration object containing attributes (months, days, etc.)
     * @return {Date}    this
     */
    $P.add = function (config) {
        if (typeof config == "number") {
            this._orient = config;
            return this;    
        }
        
        var x = config;
        
        if (x.milliseconds) { 
            this.addMilliseconds(x.milliseconds); 
        }
        if (x.seconds) { 
            this.addSeconds(x.seconds); 
        }
        if (x.minutes) { 
            this.addMinutes(x.minutes); 
        }
        if (x.hours) { 
            this.addHours(x.hours); 
        }
        if (x.weeks) { 
            this.addWeeks(x.weeks); 
        }    
        if (x.months) { 
            this.addMonths(x.months); 
        }
        if (x.years) { 
            this.addYears(x.years); 
        }
        if (x.days) {
            this.addDays(x.days); 
        }
        return this;
    };
    
    var $y, $m, $d;
    
    /**
     * Get the week number. Week one (1) is the week which contains the first Thursday of the year. Monday is considered the first day of the week.
     * This algorithm is a JavaScript port of the work presented by Claus T�ndering at http://www.tondering.dk/claus/cal/node8.html#SECTION00880000000000000000
     * .getWeek() Algorithm Copyright (c) 2008 Claus Tondering.
     * The .getWeek() function does NOT convert the date to UTC. The local datetime is used. Please use .getISOWeek() to get the week of the UTC converted date.
     * @return {Number}  1 to 53
     */
    $P.getWeek = function () {
        var a, b, c, d, e, f, g, n, s, w;
        
        $y = (!$y) ? this.getFullYear() : $y;
        $m = (!$m) ? this.getMonth() + 1 : $m;
        $d = (!$d) ? this.getDate() : $d;

        if ($m <= 2) {
            a = $y - 1;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = 0;
            f = $d - 1 + (31 * ($m - 1));
        } else {
            a = $y;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = s + 1;
            f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
        }
        
        g = (a + b) % 7;
        d = (f + g - e) % 7;
        n = (f + 3 - d) | 0;

        if (n < 0) {
            w = 53 - ((g - s) / 5 | 0);
        } else if (n > 364 + s) {
            w = 1;
        } else {
            w = (n / 7 | 0) + 1;
        }
        
        $y = $m = $d = null;
        
        return w;
    };
    
    /**
     * Get the ISO 8601 week number. Week one ("01") is the week which contains the first Thursday of the year. Monday is considered the first day of the week.
     * The .getISOWeek() function does convert the date to it's UTC value. Please use .getWeek() to get the week of the local date.
     * @return {String}  "01" to "53"
     */
    $P.getISOWeek = function () {
        $y = this.getUTCFullYear();
        $m = this.getUTCMonth() + 1;
        $d = this.getUTCDate();
        return p(this.getWeek());
    };

    /**
     * Moves the date to Monday of the week set. Week one (1) is the week which contains the first Thursday of the year.
     * @param {Number}   A Number (1 to 53) that represents the week of the year.
     * @return {Date}    this
     */    
    $P.setWeek = function (n) {
        return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
    };

    // private
    var validate = function (n, min, max, name) {
        if (typeof n == "undefined") {
            return false;
        } else if (typeof n != "number") {
            throw new TypeError(n + " is not a Number."); 
        } else if (n < min || n > max) {
            throw new RangeError(n + " is not a valid value for " + name + "."); 
        }
        return true;
    };

    /**
     * Validates the number is within an acceptable range for milliseconds [0-999].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateMillisecond = function (value) {
        return validate(value, 0, 999, "millisecond");
    };

    /**
     * Validates the number is within an acceptable range for seconds [0-59].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateSecond = function (value) {
        return validate(value, 0, 59, "second");
    };

    /**
     * Validates the number is within an acceptable range for minutes [0-59].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateMinute = function (value) {
        return validate(value, 0, 59, "minute");
    };

    /**
     * Validates the number is within an acceptable range for hours [0-23].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateHour = function (value) {
        return validate(value, 0, 23, "hour");
    };

    /**
     * Validates the number is within an acceptable range for the days in a month [0-MaxDaysInMonth].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateDay = function (value, year, month) {
        return validate(value, 1, $D.getDaysInMonth(year, month), "day");
    };

    /**
     * Validates the number is within an acceptable range for months [0-11].
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateMonth = function (value) {
        return validate(value, 0, 11, "month");
    };

    /**
     * Validates the number is within an acceptable range for years.
     * @param {Number}   The number to check if within range.
     * @return {Boolean} true if within range, otherwise false.
     */
    $D.validateYear = function (value) {
        return validate(value, 0, 9999, "year");
    };

    /**
     * Set the value of year, month, day, hour, minute, second, millisecond of date instance using given configuration object.
     * Example
    <pre><code>
    Date.today().set( { day: 20, month: 1 } )

    new Date().set( { millisecond: 0 } )
    </code></pre>
     * 
     * @param {Object}   Configuration object containing attributes (month, day, etc.)
     * @return {Date}    this
     */
    $P.set = function (config) {
        if ($D.validateMillisecond(config.millisecond)) {
            this.addMilliseconds(config.millisecond - this.getMilliseconds()); 
        }
        
        if ($D.validateSecond(config.second)) {
            this.addSeconds(config.second - this.getSeconds()); 
        }
        
        if ($D.validateMinute(config.minute)) {
            this.addMinutes(config.minute - this.getMinutes()); 
        }
        
        if ($D.validateHour(config.hour)) {
            this.addHours(config.hour - this.getHours()); 
        }
        
        if ($D.validateMonth(config.month)) {
            this.addMonths(config.month - this.getMonth()); 
        }

        if ($D.validateYear(config.year)) {
            this.addYears(config.year - this.getFullYear()); 
        }
        
	    /* day has to go last because you can't validate the day without first knowing the month */
        if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
            this.addDays(config.day - this.getDate()); 
        }
        
        if (config.timezone) { 
            this.setTimezone(config.timezone); 
        }
        
        if (config.timezoneOffset) { 
            this.setTimezoneOffset(config.timezoneOffset); 
        }

        if (config.week && validate(config.week, 0, 53, "week")) {
            this.setWeek(config.week);
        }
        
        return this;   
    };

    /**
     * Moves the date to the first day of the month.
     * @return {Date}    this
     */
    $P.moveToFirstDayOfMonth = function () {
        return this.set({ day: 1 });
    };

    /**
     * Moves the date to the last day of the month.
     * @return {Date}    this
     */
    $P.moveToLastDayOfMonth = function () { 
        return this.set({ day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())});
    };

    /**
     * Moves the date to the next n'th occurrence of the dayOfWeek starting from the beginning of the month. The number (-1) is a magic number and will return the last occurrence of the dayOfWeek in the month.
     * @param {Number}   The dayOfWeek to move to
     * @param {Number}   The n'th occurrence to move to. Use (-1) to return the last occurrence in the month
     * @return {Date}    this
     */
    $P.moveToNthOccurrence = function (dayOfWeek, occurrence) {
        var shift = 0;
        if (occurrence > 0) {
            shift = occurrence - 1;
        }
        else if (occurrence === -1) {
            this.moveToLastDayOfMonth();
            if (this.getDay() !== dayOfWeek) {
                this.moveToDayOfWeek(dayOfWeek, -1);
            }
            return this;
        }
        return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
    };

    /**
     * Move to the next or last dayOfWeek based on the orient value.
     * @param {Number}   The dayOfWeek to move to
     * @param {Number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
     * @return {Date}    this
     */
    $P.moveToDayOfWeek = function (dayOfWeek, orient) {
        var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
        return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
    };

    /**
     * Move to the next or last month based on the orient value.
     * @param {Number}   The month to move to. 0 = January, 11 = December
     * @param {Number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
     * @return {Date}    this
     */
    $P.moveToMonth = function (month, orient) {
        var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
        return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
    };

    /**
     * Get the Ordinal day (numeric day number) of the year, adjusted for leap year.
     * @return {Number} 1 through 365 (366 in leap years)
     */
    $P.getOrdinalNumber = function () {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    };

    /**
     * Get the time zone abbreviation of the current date.
     * @return {String} The abbreviated time zone name (e.g. "EST")
     */
    $P.getTimezone = function () {
        return $D.getTimezoneAbbreviation(this.getUTCOffset());
    };

    $P.setTimezoneOffset = function (offset) {
        var here = this.getTimezoneOffset(), there = Number(offset) * -6 / 10;
        return this.addMinutes(there - here); 
    };

    $P.setTimezone = function (offset) { 
        return this.setTimezoneOffset($D.getTimezoneOffset(offset)); 
    };

    /**
     * Indicates whether Daylight Saving Time is observed in the current time zone.
     * @return {Boolean} true|false
     */
    $P.hasDaylightSavingTime = function () { 
        return (Date.today().set({month: 0, day: 1}).getTimezoneOffset() !== Date.today().set({month: 6, day: 1}).getTimezoneOffset());
    };
    
    /**
     * Indicates whether this Date instance is within the Daylight Saving Time range for the current time zone.
     * @return {Boolean} true|false
     */
    $P.isDaylightSavingTime = function () {
        return Date.today().set({month: 0, day: 1}).getTimezoneOffset() != this.getTimezoneOffset();
    };

    /**
     * Get the offset from UTC of the current date.
     * @return {String} The 4-character offset string prefixed with + or - (e.g. "-0500")
     */
    $P.getUTCOffset = function () {
        var n = this.getTimezoneOffset() * -10 / 6, r;
        if (n < 0) { 
            r = (n - 10000).toString(); 
            return r.charAt(0) + r.substr(2); 
        } else { 
            r = (n + 10000).toString();  
            return "+" + r.substr(1); 
        }
    };

    /**
     * Returns the number of milliseconds between this date and date.
     * @param {Date} Defaults to now
     * @return {Number} The diff in milliseconds
     */
    $P.getElapsed = function (date) {
        return (date || new Date()) - this;
    };

    if (!$P.toISOString) {
        /**
         * Converts the current date instance into a string with an ISO 8601 format. The date is converted to it's UTC value.
         * @return {String}  ISO 8601 string of date
         */
        $P.toISOString = function () {
            // From http://www.json.org/json.js. Public Domain. 
            function f(n) {
                return n < 10 ? '0' + n : n;
            }

            return '"' + this.getUTCFullYear()   + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z"';
        };
    }
    
    // private
    $P._toString = $P.toString;

    /**
     * Converts the value of the current Date object to its equivalent string representation.
     * Format Specifiers
    <pre>
    CUSTOM DATE AND TIME FORMAT STRINGS
    Format  Description                                                                  Example
    ------  ---------------------------------------------------------------------------  -----------------------
     s      The seconds of the minute between 0-59.                                      "0" to "59"
     ss     The seconds of the minute with leading zero if required.                     "00" to "59"
     
     m      The minute of the hour between 0-59.                                         "0"  or "59"
     mm     The minute of the hour with leading zero if required.                        "00" or "59"
     
     h      The hour of the day between 1-12.                                            "1"  to "12"
     hh     The hour of the day with leading zero if required.                           "01" to "12"
     
     H      The hour of the day between 0-23.                                            "0"  to "23"
     HH     The hour of the day with leading zero if required.                           "00" to "23"
     
     d      The day of the month between 1 and 31.                                       "1"  to "31"
     dd     The day of the month with leading zero if required.                          "01" to "31"
     ddd    Abbreviated day name. $C.abbreviatedDayNames.                                "Mon" to "Sun" 
     dddd   The full day name. $C.dayNames.                                              "Monday" to "Sunday"
     
     M      The month of the year between 1-12.                                          "1" to "12"
     MM     The month of the year with leading zero if required.                         "01" to "12"
     MMM    Abbreviated month name. $C.abbreviatedMonthNames.                            "Jan" to "Dec"
     MMMM   The full month name. $C.monthNames.                                          "January" to "December"

     yy     The year as a two-digit number.                                              "99" or "08"
     yyyy   The full four digit year.                                                    "1999" or "2008"
     
     t      Displays the first character of the A.M./P.M. designator.                    "A" or "P"
            $C.amDesignator or $C.pmDesignator
     tt     Displays the A.M./P.M. designator.                                           "AM" or "PM"
            $C.amDesignator or $C.pmDesignator
     
     S      The ordinal suffix ("st, "nd", "rd" or "th") of the current day.            "st, "nd", "rd" or "th"

|| *Format* || *Description* || *Example* ||
|| d      || The CultureInfo shortDate Format Pattern                                     || "M/d/yyyy" ||
|| D      || The CultureInfo longDate Format Pattern                                      || "dddd, MMMM dd, yyyy" ||
|| F      || The CultureInfo fullDateTime Format Pattern                                  || "dddd, MMMM dd, yyyy h:mm:ss tt" ||
|| m      || The CultureInfo monthDay Format Pattern                                      || "MMMM dd" ||
|| r      || The CultureInfo rfc1123 Format Pattern                                       || "ddd, dd MMM yyyy HH:mm:ss GMT" ||
|| s      || The CultureInfo sortableDateTime Format Pattern                              || "yyyy-MM-ddTHH:mm:ss" ||
|| t      || The CultureInfo shortTime Format Pattern                                     || "h:mm tt" ||
|| T      || The CultureInfo longTime Format Pattern                                      || "h:mm:ss tt" ||
|| u      || The CultureInfo universalSortableDateTime Format Pattern                     || "yyyy-MM-dd HH:mm:ssZ" ||
|| y      || The CultureInfo yearMonth Format Pattern                                     || "MMMM, yyyy" ||
     

    STANDARD DATE AND TIME FORMAT STRINGS
    Format  Description                                                                  Example ("en-US")
    ------  ---------------------------------------------------------------------------  -----------------------
     d      The CultureInfo shortDate Format Pattern                                     "M/d/yyyy"
     D      The CultureInfo longDate Format Pattern                                      "dddd, MMMM dd, yyyy"
     F      The CultureInfo fullDateTime Format Pattern                                  "dddd, MMMM dd, yyyy h:mm:ss tt"
     m      The CultureInfo monthDay Format Pattern                                      "MMMM dd"
     r      The CultureInfo rfc1123 Format Pattern                                       "ddd, dd MMM yyyy HH:mm:ss GMT"
     s      The CultureInfo sortableDateTime Format Pattern                              "yyyy-MM-ddTHH:mm:ss"
     t      The CultureInfo shortTime Format Pattern                                     "h:mm tt"
     T      The CultureInfo longTime Format Pattern                                      "h:mm:ss tt"
     u      The CultureInfo universalSortableDateTime Format Pattern                     "yyyy-MM-dd HH:mm:ssZ"
     y      The CultureInfo yearMonth Format Pattern                                     "MMMM, yyyy"
    </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @return {String}  A string representation of the current Date object.
     */
    $P.toString = function (format) {
        var x = this;
        
        // Standard Date and Time Format Strings. Formats pulled from CultureInfo file and
        // may vary by culture. 
        if (format && format.length == 1) {
            var c = $C.formatPatterns;
            x.t = x.toString;
            switch (format) {
            case "d": 
                return x.t(c.shortDate);
            case "D":
                return x.t(c.longDate);
            case "F":
                return x.t(c.fullDateTime);
            case "m":
                return x.t(c.monthDay);
            case "r":
                return x.t(c.rfc1123);
            case "s":
                return x.t(c.sortableDateTime);
            case "t":
                return x.t(c.shortTime);
            case "T":
                return x.t(c.longTime);
            case "u":
                return x.t(c.universalSortableDateTime);
            case "y":
                return x.t(c.yearMonth);
            }    
        }
        
        var ord = function (n) {
                switch (n * 1) {
                case 1: 
                case 21: 
                case 31: 
                    return "st";
                case 2: 
                case 22: 
                    return "nd";
                case 3: 
                case 23: 
                    return "rd";
                default: 
                    return "th";
                }
            };
        
        return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, 
        function (m) {
            if (m.charAt(0) === "\\") {
                return m.replace("\\", "");
            }
            x.h = x.getHours;
            switch (m) {
            case "hh":
                return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
            case "h":
                return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
            case "HH":
                return p(x.h());
            case "H":
                return x.h();
            case "mm":
                return p(x.getMinutes());
            case "m":
                return x.getMinutes();
            case "ss":
                return p(x.getSeconds());
            case "s":
                return x.getSeconds();
            case "yyyy":
                return p(x.getFullYear(), 4);
            case "yy":
                return p(x.getFullYear());
            case "dddd":
                return $C.dayNames[x.getDay()];
            case "ddd":
                return $C.abbreviatedDayNames[x.getDay()];
            case "dd":
                return p(x.getDate());
            case "d":
                return x.getDate();
            case "MMMM":
                return $C.monthNames[x.getMonth()];
            case "MMM":
                return $C.abbreviatedMonthNames[x.getMonth()];
            case "MM":
                return p((x.getMonth() + 1));
            case "M":
                return x.getMonth() + 1;
            case "t":
                return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
            case "tt":
                return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
            case "S":
                return ord(x.getDate());
            default: 
                return m;
            }
        }
        ) : this._toString();
    };
}());    /**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-04-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
 
(function () {
    Date.Parsing = {
        Exception: function (s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'"; 
        }
    };
    
    var $P = Date.Parsing; 
    var _ = $P.Operators = {
        //
        // Tokenizers
        //
        rtoken: function (r) { // regex token
            return function (s) {
                var mx = s.match(r);
                if (mx) { 
                    return ([ mx[0], s.substring(mx[0].length) ]); 
                } else { 
                    throw new $P.Exception(s); 
                }
            };
        },
        token: function (s) { // whitespace-eating token
            return function (s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
                // Removed .strip()
                // return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s).strip();
            };
        },
        stoken: function (s) { // string token
            return _.rtoken(new RegExp("^" + s)); 
        },

        //
        // Atomic Operators
        // 

        until: function (p) {
            return function (s) {
                var qx = [], rx = null;
                while (s.length) { 
                    try { 
                        rx = p.call(this, s); 
                    } catch (e) { 
                        qx.push(rx[0]); 
                        s = rx[1]; 
                        continue; 
                    }
                    break;
                }
                return [ qx, s ];
            };
        },
        many: function (p) {
            return function (s) {
                var rx = [], r = null; 
                while (s.length) { 
                    try { 
                        r = p.call(this, s); 
                    } catch (e) { 
                        return [ rx, s ]; 
                    }
                    rx.push(r[0]); 
                    s = r[1];
                }
                return [ rx, s ];
            };
        },

        // generator operators -- see below
        optional: function (p) {
            return function (s) {
                var r = null; 
                try { 
                    r = p.call(this, s); 
                } catch (e) { 
                    return [ null, s ]; 
                }
                return [ r[0], r[1] ];
            };
        },
        not: function (p) {
            return function (s) {
                try { 
                    p.call(this, s); 
                } catch (e) { 
                    return [null, s]; 
                }
                throw new $P.Exception(s);
            };
        },
        ignore: function (p) {
            return p ? 
            function (s) { 
                var r = null; 
                r = p.call(this, s); 
                return [null, r[1]]; 
            } : null;
        },
        product: function () {
            var px = arguments[0], 
            qx = Array.prototype.slice.call(arguments, 1), rx = [];
            for (var i = 0 ; i < px.length ; i++) {
                rx.push(_.each(px[i], qx));
            }
            return rx;
        },
        cache: function (rule) { 
            var cache = {}, r = null; 
            return function (s) {
                try { 
                    r = cache[s] = (cache[s] || rule.call(this, s)); 
                } catch (e) { 
                    r = cache[s] = e; 
                }
                if (r instanceof $P.Exception) { 
                    throw r; 
                } else { 
                    return r; 
                }
            };
        },
    	  
        // vector operators -- see below
        any: function () {
            var px = arguments;
            return function (s) { 
                var r = null;
                for (var i = 0; i < px.length; i++) { 
                    if (px[i] == null) { 
                        continue; 
                    }
                    try { 
                        r = (px[i].call(this, s)); 
                    } catch (e) { 
                        r = null; 
                    }
                    if (r) { 
                        return r; 
                    }
                } 
                throw new $P.Exception(s);
            };
        },
        each: function () { 
            var px = arguments;
            return function (s) { 
                var rx = [], r = null;
                for (var i = 0; i < px.length ; i++) { 
                    if (px[i] == null) { 
                        continue; 
                    }
                    try { 
                        r = (px[i].call(this, s)); 
                    } catch (e) { 
                        throw new $P.Exception(s); 
                    }
                    rx.push(r[0]); 
                    s = r[1];
                }
                return [ rx, s]; 
            };
        },
        all: function () { 
            var px = arguments, _ = _; 
            return _.each(_.optional(px)); 
        },

        // delimited operators
        sequence: function (px, d, c) {
            d = d || _.rtoken(/^\s*/);  
            c = c || null;
            
            if (px.length == 1) { 
                return px[0]; 
            }
            return function (s) {
                var r = null, q = null;
                var rx = []; 
                for (var i = 0; i < px.length ; i++) {
                    try { 
                        r = px[i].call(this, s); 
                    } catch (e) { 
                        break; 
                    }
                    rx.push(r[0]);
                    try { 
                        q = d.call(this, r[1]); 
                    } catch (ex) { 
                        q = null; 
                        break; 
                    }
                    s = q[1];
                }
                if (!r) { 
                    throw new $P.Exception(s); 
                }
                if (q) { 
                    throw new $P.Exception(q[1]); 
                }
                if (c) {
                    try { 
                        r = c.call(this, r[1]);
                    } catch (ey) { 
                        throw new $P.Exception(r[1]); 
                    }
                }
                return [ rx, (r?r[1]:s) ];
            };
        },
    		
	    //
	    // Composite Operators
	    //
    		
        between: function (d1, p, d2) { 
            d2 = d2 || d1; 
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function (s) { 
                var rx = _fn.call(this, s); 
                return [[rx[0][0], r[0][2]], rx[1]]; 
            };
        },
        list: function (p, d, c) {
            d = d || _.rtoken(/^\s*/);  
            c = c || null;
            return (p instanceof Array ?
                _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) :
                _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        },
        set: function (px, d, c) {
            d = d || _.rtoken(/^\s*/); 
            c = c || null;
            return function (s) {
                // r is the current match, best the current 'best' match
                // which means it parsed the most amount of input
                var r = null, p = null, q = null, rx = null, best = [[], s], last = false;

                // go through the rules in the given set
                for (var i = 0; i < px.length ; i++) {

                    // last is a flag indicating whether this must be the last element
                    // if there is only 1 element, then it MUST be the last one
                    q = null; 
                    p = null; 
                    r = null; 
                    last = (px.length == 1); 

                    // first, we try simply to match the current pattern
                    // if not, try the next pattern
                    try { 
                        r = px[i].call(this, s);
                    } catch (e) { 
                        continue; 
                    }

                    // since we are matching against a set of elements, the first
                    // thing to do is to add r[0] to matched elements
                    rx = [[r[0]], r[1]];

                    // if we matched and there is still input to parse and 
                    // we don't already know this is the last element,
                    // we're going to next check for the delimiter ...
                    // if there's none, or if there's no input left to parse
                    // than this must be the last element after all ...
                    if (r[1].length > 0 && ! last) {
                        try { 
                            q = d.call(this, r[1]); 
                        } catch (ex) { 
                            last = true; 
                        }
                    } else { 
                        last = true; 
                    }

				    // if we parsed the delimiter and now there's no more input,
				    // that means we shouldn't have parsed the delimiter at all
				    // so don't update r and mark this as the last element ...
                    if (!last && q[1].length === 0) { 
                        last = true; 
                    }


				    // so, if this isn't the last element, we're going to see if
				    // we can get any more matches from the remaining (unmatched)
				    // elements ...
                    if (!last) {

                        // build a list of the remaining rules we can match against,
                        // i.e., all but the one we just matched against
                        var qx = []; 
                        for (var j = 0; j < px.length ; j++) { 
                            if (i != j) { 
                                qx.push(px[j]); 
                            }
                        }

                        // now invoke recursively set with the remaining input
                        // note that we don't include the closing delimiter ...
                        // we'll check for that ourselves at the end
                        p = _.set(qx, d).call(this, q[1]);

                        // if we got a non-empty set as a result ...
                        // (otw rx already contains everything we want to match)
                        if (p[0].length > 0) {
                            // update current result, which is stored in rx ...
                            // basically, pick up the remaining text from p[1]
                            // and concat the result from p[0] so that we don't
                            // get endless nesting ...
                            rx[0] = rx[0].concat(p[0]); 
                            rx[1] = p[1]; 
                        }
                    }

				    // at this point, rx either contains the last matched element
				    // or the entire matched set that starts with this element.

				    // now we just check to see if this variation is better than
				    // our best so far, in terms of how much of the input is parsed
                    if (rx[1].length < best[1].length) { 
                        best = rx; 
                    }

				    // if we've parsed all the input, then we're finished
                    if (best[1].length === 0) { 
                        break; 
                    }
                }

			    // so now we've either gone through all the patterns trying them
			    // as the initial match; or we found one that parsed the entire
			    // input string ...

			    // if best has no matches, just return empty set ...
                if (best[0].length === 0) { 
                    return best; 
                }

			    // if a closing delimiter is provided, then we have to check it also
                if (c) {
                    // we try this even if there is no remaining input because the pattern
                    // may well be optional or match empty input ...
                    try { 
                        q = c.call(this, best[1]); 
                    } catch (ey) { 
                        throw new $P.Exception(best[1]); 
                    }

                    // it parsed ... be sure to update the best match remaining input
                    best[1] = q[1];
                }

			    // if we're here, either there was no closing delimiter or we parsed it
			    // so now we have the best match; just return it!
                return best;
            };
        },
        forward: function (gr, fname) {
            return function (s) { 
                return gr[fname].call(this, s); 
            };
        },

        //
        // Translation Operators
        //
        replace: function (rule, repl) {
            return function (s) { 
                var r = rule.call(this, s); 
                return [repl, r[1]]; 
            };
        },
        process: function (rule, fn) {
            return function (s) {  
                var r = rule.call(this, s); 
                return [fn.call(this, r[0]), r[1]]; 
            };
        },
        min: function (min, rule) {
            return function (s) {
                var rx = rule.call(this, s); 
                if (rx[0].length < min) { 
                    throw new $P.Exception(s); 
                }
                return rx;
            };
        }
    };
	

	// Generator Operators And Vector Operators

	// Generators are operators that have a signature of F(R) => R,
	// taking a given rule and returning another rule, such as 
	// ignore, which parses a given rule and throws away the result.

	// Vector operators are those that have a signature of F(R1,R2,...) => R,
	// take a list of rules and returning a new rule, such as each.

	// Generator operators are converted (via the following _generator
	// function) into functions that can also take a list or array of rules
	// and return an array of new rules as though the function had been
	// called on each rule in turn (which is what actually happens).

	// This allows generators to be used with vector operators more easily.
	// Example:
	// each(ignore(foo, bar)) instead of each(ignore(foo), ignore(bar))

	// This also turns generators into vector operators, which allows
	// constructs like:
	// not(cache(foo, bar))
	
    var _generator = function (op) {
        return function () {
            var args = null, rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments);
            } else if (arguments[0] instanceof Array) {
                args = arguments[0];
            }
            if (args) { 
                for (var i = 0, px = args.shift() ; i < px.length ; i++) {
                    args.unshift(px[i]); 
                    rx.push(op.apply(null, args)); 
                    args.shift();
                    return rx;
                } 
            } else { 
                return op.apply(null, arguments); 
            }
        };
    };
    
    var gx = "optional not ignore cache".split(/\s/);
    
    for (var i = 0 ; i < gx.length ; i++) { 
        _[gx[i]] = _generator(_[gx[i]]); 
    }

    var _vector = function (op) {
        return function () {
            if (arguments[0] instanceof Array) { 
                return op.apply(null, arguments[0]); 
            } else { 
                return op.apply(null, arguments); 
            }
        };
    };
    
    var vx = "each any all".split(/\s/);
    
    for (var j = 0 ; j < vx.length ; j++) { 
        _[vx[j]] = _vector(_[vx[j]]); 
    }
	
}());

(function () {
    var $D = Date, $P = $D.prototype, $C = $D.CultureInfo;

    var flattenAndCompact = function (ax) { 
        var rx = []; 
        for (var i = 0; i < ax.length; i++) {
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]));
            } else { 
                if (ax[i]) { 
                    rx.push(ax[i]); 
                }
            }
        }
        return rx;
    };
    
    $D.Grammar = {};
	
    $D.Translator = {
        hour: function (s) { 
            return function () { 
                this.hour = Number(s); 
            }; 
        },
        minute: function (s) { 
            return function () { 
                this.minute = Number(s); 
            }; 
        },
        second: function (s) { 
            return function () { 
                this.second = Number(s); 
            }; 
        },
        meridian: function (s) { 
            return function () { 
                this.meridian = s.slice(0, 1).toLowerCase(); 
            }; 
        },
        timezone: function (s) {
            return function () {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) { 
                    this.timezoneOffset = Number(n); 
                } else { 
                    this.timezone = s.toLowerCase(); 
                }
            };
        },
        day: function (x) { 
            var s = x[0];
            return function () { 
                this.day = Number(s.match(/\d+/)[0]); 
            };
        }, 
        month: function (s) {
            return function () {
                this.month = (s.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4 : Number(s) - 1;
            };
        },
        year: function (s) {
            return function () {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : 
                    (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900))); 
            };
        },
        rday: function (s) { 
            return function () {
                switch (s) {
                case "yesterday": 
                    this.days = -1;
                    break;
                case "tomorrow":  
                    this.days = 1;
                    break;
                case "today": 
                    this.days = 0;
                    break;
                case "now": 
                    this.days = 0; 
                    this.now = true; 
                    break;
                }
            };
        },
        finishExact: function (x) {  
            x = (x instanceof Array) ? x : [ x ]; 

            for (var i = 0 ; i < x.length ; i++) { 
                if (x[i]) { 
                    x[i].call(this); 
                }
            }
            
            var now = new Date();
            
            if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
                this.day = now.getDate();
            }

            if (!this.year) {
                this.year = now.getFullYear();
            }
            
            if (!this.month && this.month !== 0) {
                this.month = now.getMonth();
            }
            
            if (!this.day) {
                this.day = 1;
            }
            
            if (!this.hour) {
                this.hour = 0;
            }
            
            if (!this.minute) {
                this.minute = 0;
            }

            if (!this.second) {
                this.second = 0;
            }

            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            
            if (this.day > $D.getDaysInMonth(this.year, this.month)) {
                throw new RangeError(this.day + " is not a valid value for days.");
            }

            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);

            if (this.timezone) { 
                r.set({ timezone: this.timezone }); 
            } else if (this.timezoneOffset) { 
                r.set({ timezoneOffset: this.timezoneOffset }); 
            }
            
            return r;
        },			
        finish: function (x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [ x ];

            if (x.length === 0) { 
                return null; 
            }

            for (var i = 0 ; i < x.length ; i++) { 
                if (typeof x[i] == "function") {
                    x[i].call(this); 
                }
            }
            
            var today = $D.today();
            
            if (this.now && !this.unit && !this.operator) { 
                return new Date(); 
            } else if (this.now) {
                today = new Date();
            }
            
            var expression = !!(this.days && this.days !== null || this.orient || this.operator);
            
            var gap, mod, orient;
            orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
            
            if(!this.now && "hour minute second".indexOf(this.unit) != -1) {
                today.setTimeToNow();
            }

            if (this.month || this.month === 0) {
                if ("year day hour minute second".indexOf(this.unit) != -1) {
                    this.value = this.month + 1;
                    this.month = null;
                    expression = true;
                }
            }
            
            if (!expression && this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (!this.month) {
                    this.month = temp.getMonth();
                }
                this.year = temp.getFullYear();
            }
            
            if (expression && this.weekday && this.unit != "month") {
                this.unit = "day";
                gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
                mod = 7;
                this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
            }
            
            if (this.month && this.unit == "day" && this.operator) {
                this.value = (this.month + 1);
                this.month = null;
            }
       
            if (this.value != null && this.month != null && this.year != null) {
                this.day = this.value * 1;
            }
     
            if (this.month && !this.day && this.value) {
                today.set({ day: this.value * 1 });
                if (!expression) {
                    this.day = this.value * 1;
                }
            }

            if (!this.month && this.value && this.unit == "month" && !this.now) {
                this.month = this.value;
                expression = true;
            }

            if (expression && (this.month || this.month === 0) && this.unit != "year") {
                this.unit = "month";
                gap = (this.month - today.getMonth());
                mod = 12;
                this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                this.month = null;
            }

            if (!this.unit) { 
                this.unit = "day"; 
            }
            
            if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
                this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value||0) * orient;
            } else if (this[this.unit + "s"] == null || this.operator != null) {
                if (!this.value) {
                    this.value = 1;
                }
                this[this.unit + "s"] = this.value * orient;
            }

            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            
            if (this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (temp.getMonth() !== today.getMonth()) {
                    this.month = temp.getMonth();
                }
            }
            
            if ((this.month || this.month === 0) && !this.day) { 
                this.day = 1; 
            }
            
            if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
                return Date.today().setWeek(this.value);
            }

            if (expression && this.timezone && this.day && this.days) {
                this.day = this.days;
            }
            
            return (expression) ? today.add(this) : today.set(this);
        }
    };

    var _ = $D.Parsing.Operators, g = $D.Grammar, t = $D.Translator, _fn;

    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/); 
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
  
    var _C = {};
    g.ctoken = function (keys) {
        var fn = _C[keys];
        if (! fn) {
            var c = $C.regexPatterns;
            var kx = keys.split(/\s+/), px = []; 
            for (var i = 0; i < kx.length ; i++) {
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function (key) { 
        return _.rtoken($C.regexPatterns[key]);
    };

    // hour, minute, second, meridian, timezone
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
  
    // _.min(1, _.set([ g.H, g.m, g.s ], g._t));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([ g.tt, g.zzz ]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    	  
    // days, months, years
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), 
        _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), 
        _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), 
        function (s) { 
            return function () { 
                this.weekday = s; 
            }; 
        }
    ));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(
        g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
	
	// rolling these up into general purpose rules
    _fn = function () { 
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    
    g.day = _fn(g.d, g.dd); 
    g.month = _fn(g.M, g.MMM); 
    g.year = _fn(g.yyyy, g.yy);

    // relative date / time expressions
    g.orientation = _.process(g.ctoken("past future"), 
        function (s) { 
            return function () { 
                this.orient = s; 
            }; 
        }
    );
    g.operator = _.process(g.ctoken("add subtract"), 
        function (s) { 
            return function () { 
                this.operator = s; 
            }; 
        }
    );  
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("second minute hour day week month year"), 
        function (s) { 
            return function () { 
                this.unit = s; 
            }; 
        }
    );
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), 
        function (s) { 
            return function () { 
                this.value = s.replace(/\D/g, ""); 
            }; 
        }
    );
    g.expression = _.set([ g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM ]);

    // pre-loaded rules for different date part order preferences
    _fn = function () { 
        return  _.set(arguments, g.datePartDelimiter); 
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function (s) { 
        return ((g[$C.dateElementOrder] || g.mdy).call(this, s));
    }; 

    // parsing date format specifiers - ex: "h:m:s tt" 
    // this little guy will generate a custom parser based
    // on the format string, ex: g.format("h:m:s tt")
    g.format = _.process(_.many(
        _.any(
        // translate format specifiers into grammar rules
        _.process(
        _.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), 
        function (fmt) { 
        if (g[fmt]) { 
            return g[fmt]; 
        } else { 
            throw $D.Parsing.Exception(fmt); 
        }
    }
    ),
    // translate separator tokens into token rules
    _.process(
    _.rtoken(/^[^dMyhHmstz]+/), // all legal separators 
        function (s) { 
            return _.ignore(_.stoken(s)); 
        } 
    )
    )), 
        // construct the parser ...
        function (rules) { 
            return _.process(_.each.apply(null, rules), t.finishExact); 
        }
    );
    
    var _F = {
		//"M/d/yyyy": function (s) { 
		//	var m = s.match(/^([0-2]\d|3[0-1]|\d)\/(1[0-2]|0\d|\d)\/(\d\d\d\d)/);
		//	if (m!=null) { 
		//		var r =  [ t.month.call(this,m[1]), t.day.call(this,m[2]), t.year.call(this,m[3]) ];
		//		r = t.finishExact.call(this,r);
		//		return [ r, "" ];
		//	} else {
		//		throw new Date.Parsing.Exception(s);
		//	}
		//}
		//"M/d/yyyy": function (s) { return [ new Date(Date._parse(s)), ""]; }
	}; 
    var _get = function (f) { 
        return _F[f] = (_F[f] || g.format(f)[0]);      
    };
  
    g.formats = function (fx) {
        if (fx instanceof Array) {
            var rx = []; 
            for (var i = 0 ; i < fx.length ; i++) {
                rx.push(_get(fx[i])); 
            }
            return _.any.apply(null, rx);
        } else { 
            return _get(fx); 
        }
    };

	// check for these formats first
    g._formats = g.formats([
        "\"yyyy-MM-ddTHH:mm:ssZ\"",
        "yyyy-MM-ddTHH:mm:ssZ",
        "yyyy-MM-ddTHH:mm:ssz",
        "yyyy-MM-ddTHH:mm:ss",
        "yyyy-MM-ddTHH:mmZ",
        "yyyy-MM-ddTHH:mmz",
        "yyyy-MM-ddTHH:mm",
        "ddd, MMM dd, yyyy H:mm:ss tt",
        "ddd MMM d yyyy HH:mm:ss zzz",
        "MMddyyyy",
        "ddMMyyyy",
        "Mddyyyy",
        "ddMyyyy",
        "Mdyyyy",
        "dMyyyy",
        "yyyy",
        "Mdyy",
        "dMyy",
        "d"
    ]);

	// starting rule for general purpose grammar
    g._start = _.process(_.set([ g.date, g.time, g.expression ], 
        g.generalDelimiter, g.whiteSpace), t.finish);
	
	// real starting rule: tries selected formats first, 
	// then general purpose rule
    g.start = function (s) {
        try { 
            var r = g._formats.call({}, s); 
            if (r[1].length === 0) {
                return r; 
            }
        } catch (e) {}
        return g._start.call({}, s);
    };
	
	$D._parse = $D.parse;

    /**
     * Converts the specified string value into its JavaScript Date equivalent using CultureInfo specific format information.
     * 
     * Example
    <pre><code>
    ///////////
    // Dates //
    ///////////

    // 15-Oct-2004
    var d1 = Date.parse("10/15/2004");

    // 15-Oct-2004
    var d1 = Date.parse("15-Oct-2004");

    // 15-Oct-2004
    var d1 = Date.parse("2004.10.15");

    //Fri Oct 15, 2004
    var d1 = Date.parse("Fri Oct 15, 2004");

    ///////////
    // Times //
    ///////////

    // Today at 10 PM.
    var d1 = Date.parse("10 PM");

    // Today at 10:30 PM.
    var d1 = Date.parse("10:30 P.M.");

    // Today at 6 AM.
    var d1 = Date.parse("06am");

    /////////////////////
    // Dates and Times //
    /////////////////////

    // 8-July-2004 @ 10:30 PM
    var d1 = Date.parse("July 8th, 2004, 10:30 PM");

    // 1-July-2004 @ 10:30 PM
    var d1 = Date.parse("2004-07-01T22:30:00");

    ////////////////////
    // Relative Dates //
    ////////////////////

    // Returns today's date. The string "today" is culture specific.
    var d1 = Date.parse("today");

    // Returns yesterday's date. The string "yesterday" is culture specific.
    var d1 = Date.parse("yesterday");

    // Returns the date of the next thursday.
    var d1 = Date.parse("Next thursday");

    // Returns the date of the most previous monday.
    var d1 = Date.parse("last monday");

    // Returns today's day + one year.
    var d1 = Date.parse("next year");

    ///////////////
    // Date Math //
    ///////////////

    // Today + 2 days
    var d1 = Date.parse("t+2");

    // Today + 2 days
    var d1 = Date.parse("today + 2 days");

    // Today + 3 months
    var d1 = Date.parse("t+3m");

    // Today - 1 year
    var d1 = Date.parse("today - 1 year");

    // Today - 1 year
    var d1 = Date.parse("t-1y"); 


    /////////////////////////////
    // Partial Dates and Times //
    /////////////////////////////

    // July 15th of this year.
    var d1 = Date.parse("July 15");

    // 15th day of current day and year.
    var d1 = Date.parse("15");

    // July 1st of current year at 10pm.
    var d1 = Date.parse("7/1 10pm");
    </code></pre>
     *
     * @param {String}   The string value to convert into a Date object [Required]
     * @return {Date}    A Date object or null if the string cannot be converted into a Date.
     */
    $D.parse = function (s) {
        var r = null; 
        if (!s) { 
            return null; 
        }
        if (s instanceof Date) {
            return s;
        }
        try { 
            r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1")); 
        } catch (e) { 
            return null; 
        }
        return ((r[1].length === 0) ? r[0] : null);
    };

    $D.getParseFunction = function (fx) {
        var fn = $D.Grammar.formats(fx);
        return function (s) {
            var r = null;
            try { 
                r = fn.call({}, s); 
            } catch (e) { 
                return null; 
            }
            return ((r[1].length === 0) ? r[0] : null);
        };
    };
    
    /**
     * Converts the specified string value into its JavaScript Date equivalent using the specified format {String} or formats {Array} and the CultureInfo specific format information.
     * The format of the string value must match one of the supplied formats exactly.
     * 
     * Example
    <pre><code>
    // 15-Oct-2004
    var d1 = Date.parseExact("10/15/2004", "M/d/yyyy");

    // 15-Oct-2004
    var d1 = Date.parse("15-Oct-2004", "M-ddd-yyyy");

    // 15-Oct-2004
    var d1 = Date.parse("2004.10.15", "yyyy.MM.dd");

    // Multiple formats
    var d1 = Date.parseExact("10/15/2004", ["M/d/yyyy", "MMMM d, yyyy"]);
    </code></pre>
     *
     * @param {String}   The string value to convert into a Date object [Required].
     * @param {Object}   The expected format {String} or an array of expected formats {Array} of the date string [Required].
     * @return {Date}    A Date object or null if the string cannot be converted into a Date.
     */
    $D.parseExact = function (s, fx) { 
        return $D.getParseFunction(fx)(s); 
    };	
}());/*
    http://www.JSON.org/json2.js
    2008-11-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
})();
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
 * a constant that defines the attribute where we'll store extra data in the event 
 */
var SPAZCORE_EVENTDATA_ATTRIBUTE = 'sc_data';


/**
 * add an event listener to a target (element, window, etc). Uses target.addEventListener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {Object} scope the scope to execute the handler within (what "this" refers to)
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.addListener = function(target, event_type, handler, scope, use_capture) {

	sch.dump('listening for '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);


	function scope_perserver(e) {
		handler.call(scope, e);
	}
	
	if (use_capture !== true) {
		use_capture = false;
	}
	
	if (scope) {
		target.addEventListener(event_type, scope_perserver, use_capture);
	} else {
		target.addEventListener(event_type, handler, use_capture);
	}
	
	
};


/**
 * removes an event listener on a target (element, window, etc). uses Uses target.removeEventListener
 * 
 * Note that you must match all of the parameters to successfully remove the listener
 * 
 * @param {object} target
 * @param {string} event_type
 * @param {function} handler  a method that will take the event as a param, and "this" refers to target
 * @param {Object} scope the scope to execute the handler
 * @param {boolean} use_capture  defaults to false
 * @function
 */
sc.helpers.removeListener = function(target, event_type, handler, scope, use_capture) {

	sch.dump('removing listener for '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);


	function scope_perserver(e) {
		handler.call(scope, e);
	}

	if (use_capture !== true) {
		use_capture = false;
	}
	
	if (scope) {
		target.removeEventListener(event_type, scope_perserver, use_capture);
	} else {
		target.removeEventListener(event_type, handler, use_capture);
	}
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 * @param {Boolean} [use_capture] Describe this parameter
 */
sc.helpers.addDelegatedListener = function(base_target, selector, event_type, handler, scope, use_capture) {
	
};

/**
 * @param {DOMElement} base_target The base target where the delegated listener will be set-up
 * @param {string} selector The CSS Selector that will be used to match incoming events. Matching is done with jQuery
 * @param {string} event_type The event type 
 * @param {Function} handler a method that will take the event as a param, and "this" refers to target
 * @param {Object} [scope] the scope to execute the handler
 * @param {Boolean} [use_capture] Describe this parameter
 */
sc.helpers.removeDelegatedListener = function(base_target, selector, event_type, handler, scope, use_capture) {
	
};

/**
 * This triggers a custom event using document.createEvent('Events') and target.dispatchEvent()
 * 
 * @param {string}  event_type
 * @param {DOMElement}  target   the target for the event (element, window, etc)
 * @param {object}  data     data to pass with event
 * @param {boolean} bubble   whether the event should bubble or not. defaults to true
 * @function
 */
sc.helpers.triggerCustomEvent = function(event_type, target, data, bubble) {
	
	sch.dump('triggering '+event_type);
	sch.dump('on target nodeName:'+target.nodeName);
	
	if (bubble !== false) {
		bubble = true;
	}

	var ev = document.createEvent("Events"); // use the Events event module

	ev.initEvent(event_type, bubble, true);

	ev[SPAZCORE_EVENTDATA_ATTRIBUTE] = data;

	target.dispatchEvent(ev);
	
};

/**
 * retrieves the data added to this event object
 * @param {DOMEvent} event_obj 
 */
sc.helpers.getEventData = function(event_obj) {
	return event_obj[SPAZCORE_EVENTDATA_ATTRIBUTE];
};

/**
 * Alias for sc.helpers.addListener 
 * @function
 */
sc.helpers.listen = sc.helpers.addListener;

/**
 * Alias for sc.helpers.removeListener
 * @function
 */
sc.helpers.unlisten = sc.helpers.removeListener;

/**
 * Alias for sc.helpers.addDelegatedListener
 * @function 
 */
sc.helpers.live = sc.helpers.addDelegatedListener;

/**
 * Alias for sc.helpers.removeDelegatedListener
 * @function 
 */
sc.helpers.die = sc.helpers.removeDelegatedListener;


/**
 * Alias for sc.helpers.triggerCustomEvent 
 * @function
 */
sc.helpers.trigger  = sc.helpers.triggerCustomEvent;/*jslint 
bitwise: false,
browser: true,
nomen: false,
debug: true,
eqeqeq: false,
forin: true,
laxbreak: true,
plusplus: false,
newcap: false,
undef: false,
white: false,
onevar: false 
 */
var sc;
 
/*
	We're more lax with JSLint here because this is almost all not our code
*/

/**
 * Licence
 * As long as you leave the copyright notice of the original script, or link
 * back to this website, you can use any of the content published on this
 * website free of charge for any use: commercial or noncommercial.
 * http://www.webtoolkit.info/licence.html
 */


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

sc.helpers.Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = sc.helpers.Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = sc.helpers.Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = 0, c1 = 0, c2 = 0, c3 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

};



/**
*
*  Javascript crc32
*  http://www.webtoolkit.info/
*
**/
 
sc.helpers.crc32 = function (str) {
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 
	str = Utf8Encode(str);
 
	var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
 
	if (typeof(crc) == "undefined") { crc = 0; }
	var x = 0;
	var y = 0;
 
	crc = crc ^ (-1);
	for( var i = 0, iTop = str.length; i < iTop; i++ ) {
		y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
		x = "0x" + table.substr( y * 9, 8 );
		crc = ( crc >>> 8 ) ^ x;
	}
 
	return crc ^ (-1);
 
};


/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
sc.helpers.MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	}
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	}
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	}
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	}
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	}
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	}
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
};

/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/
 
sc.helpers.SHA1 = function (msg) {
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	}
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	}
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	}
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = [];
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) {word_array.push( 0 );}
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) {W[i] = word_array[blockstart+i];}
		for( i=16; i<=79; i++ ) {W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);}
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
};



/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
 
sc.helpers.SHA256 = function (s){
 
	var chrsz   = 8;
	var hexcase = 0;
 
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l) {
		var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
		var HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
		var W = [64];
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
 
		for ( i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
 
			for ( j = 0; j<64; j++) {
				if (j < 16) {W[j] = m[j + i];}
				else {W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);}
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}

	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
 
};



/*
File: Math.uuid.js
Version: 1.3
Change History:
  v1.0 - first release
  v1.1 - less code and 2x performance boost (by minimizing calls to Math.random())
  v1.2 - Add support for generating non-standard uuids of arbitrary length
  v1.3 - Fixed IE7 bug (can't use []'s to access string chars.  Thanks, Brian R.)
  v1.4 - Changed method to be "Math.uuid". Added support for radix argument.  Use module pattern for better encapsulation.

Latest version:   http://www.broofa.com/Tools/Math.uuid.js
Information:      http://www.broofa.com/blog/?p=151
Contact:          robert@broofa.com
----
Copyright (c) 2008, Robert Kieffer
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Robert Kieffer nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
sc.helpers.UUID = (function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

  return function (len, radix) {
    var chars = CHARS, uuid = [], rnd = Math.random;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | rnd()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | rnd()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
      }
    }

    return uuid.join('');
  };
})();

/**
 * Checks if the given value is an RFC 4122 UUID 
 */
sc.helpers.isUUID = function(val) {
	return val.match(/^[0-9A-Z]{8}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{12}$/);
}
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;
 
/*
	Helpers for fundamental javascript stuff
*/

/*
	Return a boolean value telling whether
	the first argument is a string.
*/
sc.helpers.isString = function(thing) {
	if (typeof thing === 'string') {return true;}
    if (typeof thing === 'object' && thing !== null) {
        var criterion = thing.constructor.toString().match(/string/i);
        return (criterion !== null);
    }
    return false;
};


sc.helpers.isNumber = function(chk) {
	return typeof chk === 'number';
};



/*
	http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256C720080D723
*/
sc.helpers.isArray = function(obj) {
	if (obj.constructor.toString().indexOf("Array") === -1) {
		return false;
	} else {
		return true;
	}
};

/*
	Returns a copy of the object using the jQuery.extend() method
*/
sc.helpers.clone = function(oldObj) {
	return jQuery.extend({}/* clone */, oldObj);
};

/**
 * @todo 
 */
sc.helpers.each = function(arr, f) {
	
};

/**
 * We use this to do a form of inheritance, where the child inherits
 * the methods and properties of the supertype
 * 
 * @link https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Inheritance
 * 
 * @param {object} child the child type
 * @param {object} supertype the parent we inherit from 
 */
sc.helpers.extend = function(child, supertype)
{
   child.prototype.__proto__ = supertype.prototype;
};

/**
 * Designed to fill in default values for an options argument passed to a
 * function. Merges the provided defaults with the passed object, using items
 * from defaults if they don't exist in passed 
 * 
 * @param {object} defaults the default key/val pairs
 * @param {object} passed   the values provided to the calling method
 * @returns {object} a set of key/vals that have defaults filled-in
 */
sc.helpers.defaults = function(defaults, passed) {
	
	var args = defaults;
	
	/* override the defaults if necessary */
	for (var key in passed) {
		args[key] = passed[key];
	}
	
	return args;
}/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc;
 
/* A wrapper for JSON.parse() that correct Twitter issues and perform logging if JSON data could not be parsed
 * which will help to find out what is wrong
 * @param {String} text 
 */
sc.helpers.deJSON = function(json)
 {

	// Fix twitter data bug
	var re = new RegExp("Couldn\\'t\\ find\\ Status\\ with\\ ID\\=[0-9]+\\,", "g");
	json = json.replace(re, "");

	var done = false;
	try {
		var obj = JSON.parse(json);
		done = true;
	} finally {
		if (!done) {
			sc.helpers.dump("Could not parse JSON text " + json);
		}
	}

	return obj;
};

/**
 * really just a simple wrapper for JSON.stringify	
 * @param  any js construct
 */
sc.helpers.enJSON = function(jsobj) {
	return JSON.stringify(jsobj);
};


/*
 * Based on jQuery XML to JSON Plugin
 * 
 *	### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *	 http://www.opensource.org/licenses/mit-license.php
 *	 http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*/
/*
 # INSPIRED BY: http://www.terracoder.com/
		   AND: http://www.thomasfrank.se/xml_to_json.html
											AND: http://www.kawa.net/works/js/xml/objtree-e.html
*/
/*
 This simple script converts XML (document of code) into a JSON object. It is the combination of 2
 'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
*/
sc.helpers.xml2json = function(xml, extended) {
	if (!xml) return {};
	// quick fail
	//### PARSER LIBRARY
	// Core function
	function parseXML(node, simple) {
		if (!node) return null;
		var txt = '',
		obj = null,
		att = null;
		var nt = node.nodeType,
		nn = jsVar(node.localName || node.nodeName);
		var nv = node.text || node.nodeValue || '';
		/*DBG*/
		//if(window.console) console.log(['x2j',nn,nt,nv.length+' bytes']);
		if (node.childNodes) {
			if (node.childNodes.length > 0) {
				/*DBG*/
				//if(window.console) console.log(['x2j',nn,'CHILDREN',node.childNodes]);
				jQuery.each(node.childNodes,
				function(n, cn) {
					var cnt = cn.nodeType,
					cnn = jsVar(cn.localName || cn.nodeName);
					var cnv = cn.text || cn.nodeValue || '';
					/*DBG*/
					//if(window.console) console.log(['x2j',nn,'node>a',cnn,cnt,cnv]);
					if (cnt == 8) {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']);
						return;
						// ignore comment node
					}
					else if (cnt == 3 || cnt == 4 || !cnn) {
						// ignore white-space in between tags
						if (cnv.match(/^\s+$/)) {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>c',cnn,'WHITE-SPACE (ignore)']);
							return;
						};
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>d',cnn,'TEXT']);
						txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '');
						// make sure we ditch trailing spaces from markup
					}
					else {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>e',cnn,'OBJECT']);
						obj = obj || {};
						if (obj[cnn]) {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>f',cnn,'ARRAY']);
							if (!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
							obj[cnn][obj[cnn].length] = parseXML(cn, true
							/* simple */
							);
							obj[cnn].length = obj[cnn].length;
						}
						else {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>g',cnn,'dig deeper...']);
							obj[cnn] = parseXML(cn);
						};
					};
				});
			};
			//node.childNodes.length>0
		};
		//node.childNodes
		if (node.attributes) {
			if (node.attributes.length > 0) {
				/*DBG*/
				//if(window.console) console.log(['x2j',nn,'ATTRIBUTES',node.attributes])
				att = {};
				obj = obj || {};
				jQuery.each(node.attributes, function(a, at) {
					var atn = jsVar(at.name),
					atv = at.value;
					att[atn] = atv;
					if (obj[atn]) {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'attr>',atn,'ARRAY']);
						if (!obj[atn].length) obj[atn] = myArr(obj[atn]);
						//[ obj[ atn ] ];
						obj[atn][obj[atn].length] = atv;
						obj[atn].length = obj[atn].length;
					}
					else {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'attr>',atn,'TEXT']);
						obj[atn] = atv;
					};
				});
				//obj['attributes'] = att;
			};
			//node.attributes.length>0
		};
		//node.attributes
		if (obj) {
			obj = jQuery.extend((txt != '' ? new String(txt) : {}),
			/* {text:txt},*/
			obj || {}
			/*, att || {}*/
			);
			txt = (obj.text) ? (typeof(obj.text) == 'object' ? obj.text: [obj.text || '']).concat([txt]) : txt;
			if (txt) obj.text = txt;
			txt = '';
		};
		var out = obj || txt;
		//console.log([extended, simple, out]);
		if (extended) {
			if (txt) out = {};
			//new String(out);
			txt = out.text || txt || '';
			if (txt) out.text = txt;
			if (!simple) out = myArr(out);
		};
		return out;
	};
	// parseXML
	// Core Function End
	// Utility functions
	var jsVar = function(s) {
		return String(s || '').replace(/-/g, "_");
	};
	var isNum = function(s) {
		return (typeof s == "number") || String((s && typeof s == "string") ? s: '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/);
	};
	var myArr = function(o) {
		if (!o.length) o = [o];
		o.length = o.length;
		// here is where you can attach additional functionality, such as searching and sorting...
		return o;
	};
	// Utility functions End
	//### PARSER LIBRARY END
	// Convert plain text to xml
	if (typeof xml == 'string') {xml = sc.helpers.createXMLFromString(xml);}

	// Quick fail if not xml (or if this is a node)
	if (!xml.nodeType) {return;}
	if (xml.nodeType == 3 || xml.nodeType == 4) {return xml.nodeValue;}

	// Find xml root node
	var root = (xml.nodeType == 9) ? xml.documentElement: xml;

	// Convert xml to json
	var out = parseXML(root, true
	/* simple */
	);

	// Clean-up memory
	xml = null;
	root = null;

	// Send output
	return out;
};


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
 * Stub 
 * @platformstub
 */
sc.helpers.getCurrentLocation = function() {
	
}/*jslint 
bitwise: false,
browser: true,
newcap: false,
nomen: false,
debug: true,
forin: true,
plusplus: false,
undef: true,
white: false,
onevar: false 
 */
var sc;
 
/**
 * determines if a string contains the given screen name prefixed with a @
 * this is mainly used for determining if a message should be considered a 'mention'
 * @param {string} str  the string to check
 * @param {string} sn   the screen name to look for
 * @return {boolean} 
 */
sc.helpers.containsScreenName = function(str, sn) {
	
	var re = new RegExp('(?:\\s|\\b|^[[:alnum:]]|^)@('+sn+')(?:\\s|\\b|$)', 'gi');
	if ( re.test(str) ) {
		return true;
	}
	return false;
	
};

/**
 * find URLs within the given string 
 */
sc.helpers.extractURLs = function(str) {
	var wwwlinks = /(^|\s|\(|:)(((http(s?):\/\/)|(www\.))(\w+[^\s\)<]+))/gi;
	var match = [];
	var URLs = [];
	while ( (match = wwwlinks.exec(str)) !== null ) {
		URLs.push(match[2]);
	}
	return URLs;
};

/**
 * given as string and a mapping object, replace multiple values in the string (or vice versa)
 * map should be of format
 * {
 * 	'searchforme':'replacewithme',
 * 	'searchforme2':'replacewithme2',
 * 	'searchforme3':'replacewithme3'
 * }
 * @param {string} str
 * @param {object} map
 * @return {string}
 */
sc.helpers.replaceMultiple = function(str, map) {
	for (var key in map) {
		str = str.replace(key, map[key]);
	}
	return str;
};


/**
 * This is a port of the CodeIgniter helper "autolink" to javascript
 * It finds and links both web addresses and email addresses
 * 
 * @param {string} str
 * @param {string} type  'email', 'url', or 'both' (default is 'both')
 * @param {boolean} extra_code  a string that will be inserted verbatim into <a> tag
 * @param {integer} maxlen  the maximum length the link description can be (the string inside the <a></a> tag)
 * @return {string}
 */
sc.helpers.autolink = function(str, type, extra_code, maxlen) {
	if (!type) {
		type = 'both';
	}

	var re_nohttpurl = /((^|\s)(www\.)?([a-zA-Z_\-]+\.)(com|net|org)($|\s))/gi;

	var re_noemail = /(^|\s|\(|:)((http(s?):\/\/)|(www\.))(\w+[^\s\)<]+)/gi;
	var re_nourl   = /(^|\s|\()([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*)([^\s\)<]+)/gi;
	
	var x, ms, period = '';

	if (type !== 'email')
	{	
		while ((ms = re_nohttpurl.exec(str))) { // look for URLs without a preceding "http://"
			// if ( /\.$/.test(ms[4]) ) {
			// 	period = '.';
			//	ms[5] = ms[5].slice(0, -1);
			// }
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}

			if (extra_code) {
				extra_code = ' '+extra_code;
			} else {
				extra_code = '';
			}
			
			var desc = ms[3]+ms[4]+ms[5];

			if (maxlen && maxlen > 0 && desc.length > maxlen) {
				desc = desc.substr(0, maxlen)+'...';
			}

			var newstr = ms[2]+'<a href="http://'+ms[3]+ms[4]+ms[5]+'"'+extra_code+'>'+desc+'</a>'+ms[6];
			sch.error(newstr);
			str = str.replace(ms[0], newstr);
		}
		
		
		while ((ms = re_noemail.exec(str))) {

			if ( /\.$/.test(ms[6]) ) {
				period = '.';
				ms[6] = ms[6].slice(0, -1);
			}
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}

			if (extra_code) {
				extra_code = ' '+extra_code;
			} else {
				extra_code = '';
			}
			
			var desc = ms[5]+ms[6];

			if (maxlen && maxlen > 0 && desc.length > maxlen) {
				desc = desc.substr(0, maxlen)+'...';
			}

			var newstr = ms[1]+'<a href="http'+ms[4]+'://'+ms[5]+ms[6]+'"'+extra_code+'>'+desc+'</a>'+period;
			str = str.replace(ms[0], newstr);
		}
	}

	if (type !== 'url')
	{
		while ((ms = re_nourl.exec(str)))
		{
			period = '';
			if ( /\./.test(ms[5]) ) {
				period = '.';
				ms[5] = ms[5].slice(0, -1);
			}
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}
			str = str.replace(ms[0], ms[1]+'<a href="mailto:'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'">'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'</a>'+period);
		}
	}

	return str;


};

/**
 * turns twitter style username refs ('@username') into links
 * by default, the template used is <a href="http://twitter.com/#username#">@#username#<a/>
 * pass the second param to give it a custom template
 * 
 * @param {string} str
 * @param {string} tpl  default is '<a href="http://twitter.com/#username#">@#username#</a>'
 * @return {string}
 */
sc.helpers.autolinkTwitterScreenname = function(str, tpl) {
	if (!tpl) {
		tpl = '<a href="http://twitter.com/#username#">@#username#</a>';
	}
	
	var re_uname = /(^|\s|\(\[|,|\.|\()@([a-zA-Z0-9_]+)([^a-zA-Z0-9_]|$)/gi;
	
	var ms = [];
	while (ms = re_uname.exec(str))
	{
		
		/*
			sometimes we can end up with a null instead of a blank string,
			so we need to force the issue in javascript.
		*/
		for (var x=0; x<ms.length; x++) {
			if (!ms[x]) {
				ms[x] = '';
			}
		}
		
		var repl_tpl = tpl.replace(/#username#/gi, ms[2]);
		str = str.replace(ms[0], ms[1]+repl_tpl+ms[3]);

	}
	return str;
};



/**
 * turns twitter style hashtags ('#hashtag') into links
 * by default, the template used is <a href="http://search.twitter.com/search?q=#hashtag_enc#">##hashtag#<a/>
 * pass the second param to give it a custom template
 * 
 * @param {string} str
 * @param {string} tpl  default is '<a href="http://search.twitter.com/search?q=#hashtag_enc#">##hashtag#<a/>'
 * @return {string}
 */
sc.helpers.autolinkTwitterHashtag = function(str, tpl) {
	if (!tpl) {
		tpl = '<a href="http://search.twitter.com/search?q=#hashtag_enc#">##hashtag#</a>';
	}
	
	var re_hashtag = /(^|\s|\()#([a-zA-Z0-9\-_\.+:=]{1,}\w)([^a-zA-Z0-9\-_+]|$)/gi;
	
	var ms = [];
	while (ms = re_hashtag.exec(str))
	{
		
		/*
			sometimes we can end up with a null instead of a blank string,
			so we need to force the issue in javascript.
		*/
		for (var x=0; x<ms.length; x++) {
			if (!ms[x]) {
				ms[x] = '';
			}
		}
		
		var repl_tpl = tpl.replace(/#hashtag#/gi, ms[2]);
		repl_tpl = repl_tpl.replace(/#hashtag_enc#/gi, encodeURIComponent(ms[2]));
		str = str.replace(ms[0], ms[1]+repl_tpl+ms[3]);

	}
	return str;
};



/**
 * Applies autolink, autolinkTwitterScreenname, autolinkTwitterHashtag
 * 
 * @param {string} str
 * @param {oobject} opts
 * 
 * Opts structure:
 *  {
 *  	'autolink': {
 *  		'type'      :'both', (email, url, or both)
 *  		'extra_code':'',
 *  		'maxlen'    :20
 *  	},
 *  	'screenname': {
 *  		'tpl':'' // should contain macro '#username#'
 *  	},
 *  	'hashtag': {
 *  		'tpl':'' // should contain macros '#hashtag#' and '#hashtag_enc#'
 *  	}
 *  }
 */
sc.helpers.makeClickable = function(str, opts) {
	var autolink_type, autolink_extra_code, autolink_maxlen, screenname_tpl, hashtag_tpl;
	
	if (!opts) {
		opts = {};
	}
	
	if (opts.autolink) {
		var autolink_type       = opts.autolink.type || null;
		var autolink_extra_code = opts.autolink.extra_code || null;
		var autolink_maxlen     = opts.autolink.maxlen || null;
	}
	
	if (opts.screenname) {
		var screenname_tpl      = opts.screenname.tpl || null;
	}
	
	if (opts.hashtag) {
		var hashtag_tpl         = opts.hashtag.tpl || null;
	}
	
	str = sc.helpers.autolink(str, autolink_type, autolink_extra_code, autolink_maxlen);
	str = sc.helpers.autolinkTwitterScreenname(str, screenname_tpl);
	str = sc.helpers.autolinkTwitterHashtag(str, hashtag_tpl);
	return str;
};



/**
 * Simple html tag remover
 * @param {string} str
 * @return {string}
 */
sc.helpers.stripTags = function(str) {
	var re = /<[^>]*>/gim;
	str = str.replace(re, '');
	return str;
};


/**
 * Converts the following entities into regular chars: &lt; &gt; &quot; &apos;
 */
sc.helpers.fromHTMLSpecialChars = function(str) {
	str = str.replace(/&lt;/gi, '<');
	sc.helpers.dump(str);
	str = str.replace(/&gt;/gi, '>');
	sc.helpers.dump(str);
	str = str.replace(/&quot;/gi, '"');
	sc.helpers.dump(str);
	str = str.replace(/&apos;/gi, '\'');
	sc.helpers.dump(str);
	str = str.replace(/&amp;/gi, '&');
	sc.helpers.dump(str);
	return str;
};


sc.helpers.escape_html = function(string) {
	return sc.helpers.htmlspecialchars(string, 'ENT_QUOTES');
};


sc.helpers.htmlspecialchars = function(string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nathan
    // +   bugfixed by: Arno
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
    // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'

    var histogram = {}, symbol = '', tmp_str = '', i = 0;
    tmp_str = string.toString();

    if (false === (histogram = sc.helpers._get_html_translation_table('HTML_SPECIALCHARS', quote_style))) {
        return false;
    }

	// first, do &amp;
	tmp_str = tmp_str.split('&').join(histogram['&']);
	
	// then do the rest
    for (symbol in histogram) {
		if (symbol != '&') {
			entity = histogram[symbol];
	        tmp_str = tmp_str.split(symbol).join(entity);
		}
    }

    return tmp_str;
}



sc.helpers.htmlentities = function(string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
 
    var histogram = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();
    
    if (false === (histogram = sc.helpers._get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    
    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }
    
    return tmp_str;
};

sc.helpers._get_html_translation_table = function(table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js. Meaning the constants are not
    // %          note: real constants, but strings instead. integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // %          note: Table from http://www.the-art-of-web.com/html/character-codes/
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    
    var entities = {}, histogram = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
    
    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }
 
    if (useTable === 'HTML_SPECIALCHARS') {
        // ascii decimals for better compatibility
        entities['38'] = '&amp;';
        if (useQuoteStyle !== 'ENT_NOQUOTES') {
            entities['34'] = '&quot;';
        }
        if (useQuoteStyle === 'ENT_QUOTES') {
            entities['39'] = '&#039;';
        }
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';
    } else if (useTable === 'HTML_ENTITIES') {
        // ascii decimals for better compatibility
      entities['38']  = '&amp;';
        if (useQuoteStyle !== 'ENT_NOQUOTES') {
            entities['34'] = '&quot;';
        }
        if (useQuoteStyle === 'ENT_QUOTES') {
            entities['39'] = '&#039;';
        }
      entities['60']  = '&lt;';
      entities['62']  = '&gt;';
      entities['160'] = '&nbsp;';
      entities['161'] = '&iexcl;';
      entities['162'] = '&cent;';
      entities['163'] = '&pound;';
      entities['164'] = '&curren;';
      entities['165'] = '&yen;';
      entities['166'] = '&brvbar;';
      entities['167'] = '&sect;';
      entities['168'] = '&uml;';
      entities['169'] = '&copy;';
      entities['170'] = '&ordf;';
      entities['171'] = '&laquo;';
      entities['172'] = '&not;';
      entities['173'] = '&shy;';
      entities['174'] = '&reg;';
      entities['175'] = '&macr;';
      entities['176'] = '&deg;';
      entities['177'] = '&plusmn;';
      entities['178'] = '&sup2;';
      entities['179'] = '&sup3;';
      entities['180'] = '&acute;';
      entities['181'] = '&micro;';
      entities['182'] = '&para;';
      entities['183'] = '&middot;';
      entities['184'] = '&cedil;';
      entities['185'] = '&sup1;';
      entities['186'] = '&ordm;';
      entities['187'] = '&raquo;';
      entities['188'] = '&frac14;';
      entities['189'] = '&frac12;';
      entities['190'] = '&frac34;';
      entities['191'] = '&iquest;';
      entities['192'] = '&Agrave;';
      entities['193'] = '&Aacute;';
      entities['194'] = '&Acirc;';
      entities['195'] = '&Atilde;';
      entities['196'] = '&Auml;';
      entities['197'] = '&Aring;';
      entities['198'] = '&AElig;';
      entities['199'] = '&Ccedil;';
      entities['200'] = '&Egrave;';
      entities['201'] = '&Eacute;';
      entities['202'] = '&Ecirc;';
      entities['203'] = '&Euml;';
      entities['204'] = '&Igrave;';
      entities['205'] = '&Iacute;';
      entities['206'] = '&Icirc;';
      entities['207'] = '&Iuml;';
      entities['208'] = '&ETH;';
      entities['209'] = '&Ntilde;';
      entities['210'] = '&Ograve;';
      entities['211'] = '&Oacute;';
      entities['212'] = '&Ocirc;';
      entities['213'] = '&Otilde;';
      entities['214'] = '&Ouml;';
      entities['215'] = '&times;';
      entities['216'] = '&Oslash;';
      entities['217'] = '&Ugrave;';
      entities['218'] = '&Uacute;';
      entities['219'] = '&Ucirc;';
      entities['220'] = '&Uuml;';
      entities['221'] = '&Yacute;';
      entities['222'] = '&THORN;';
      entities['223'] = '&szlig;';
      entities['224'] = '&agrave;';
      entities['225'] = '&aacute;';
      entities['226'] = '&acirc;';
      entities['227'] = '&atilde;';
      entities['228'] = '&auml;';
      entities['229'] = '&aring;';
      entities['230'] = '&aelig;';
      entities['231'] = '&ccedil;';
      entities['232'] = '&egrave;';
      entities['233'] = '&eacute;';
      entities['234'] = '&ecirc;';
      entities['235'] = '&euml;';
      entities['236'] = '&igrave;';
      entities['237'] = '&iacute;';
      entities['238'] = '&icirc;';
      entities['239'] = '&iuml;';
      entities['240'] = '&eth;';
      entities['241'] = '&ntilde;';
      entities['242'] = '&ograve;';
      entities['243'] = '&oacute;';
      entities['244'] = '&ocirc;';
      entities['245'] = '&otilde;';
      entities['246'] = '&ouml;';
      entities['247'] = '&divide;';
      entities['248'] = '&oslash;';
      entities['249'] = '&ugrave;';
      entities['250'] = '&uacute;';
      entities['251'] = '&ucirc;';
      entities['252'] = '&uuml;';
      entities['253'] = '&yacute;';
      entities['254'] = '&thorn;';
      entities['255'] = '&yuml;';
    } else {
        throw Error("Table: "+useTable+' not supported');
    }
    
    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        histogram[symbol] = entities[decimal];
    }
    
    return histogram;
};




/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*
**/
 
sc.helpers.Utf8 = {
 
	// public method for url encoding
	encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// public method for url decoding
	decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = 0, c1 = 0, c2 = 0, c3 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
};





/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/
 
sc.helpers.trim = function (str, chars) {
	return sc.helpers.ltrim(sc.helpers.rtrim(str, chars), chars);
};
 
sc.helpers.ltrim = function (str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
};
 
sc.helpers.rtrim = function (str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
};/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, window;
 
/**
 * These are system-oriented functions, mostly utilizing AIR apis
 * to interact with the OS
 * 
 * NOTE: to use all these helpers, you must additionally load a platform-specific definition file!
 */


var SPAZCORE_PLATFORM_AIR			= 'AIR';
var SPAZCORE_PLATFORM_WEBOS		= 'webOS';
var SPAZCORE_PLATFORM_TITANIUM	= 'Titanium';
var SPAZCORE_PLATFORM_UNKNOWN		= '__UNKNOWN';

/**
 * error reporting levels 
 */
var SPAZCORE_DUMPLEVEL_DEBUG   = 4;
var SPAZCORE_DUMPLEVEL_NOTICE  = 3;
var SPAZCORE_DUMPLEVEL_WARNING = 2;
var SPAZCORE_DUMPLEVEL_ERROR   = 1;
var SPAZCORE_DUMPLEVEL_NONE    = 0; // this means "never ever dump anything!"





/**
* Returns a string identifier for the platform.
* 
* Right now these checks are really, really basic
* 
* @return {String} an identifier for the platform
*/
sc.helpers.getPlatform = function() {
	if (window.runtime) {
		return SPAZCORE_PLATFORM_AIR;
	}
	if (window.Mojo) {
		return SPAZCORE_PLATFORM_WEBOS;
	}
	if (window.Titanium) {
		return SPAZCORE_PLATFORM_TITANIUM;
	}
	return SPAZCORE_PLATFORM_UNKNOWN;
};

/**
* checks to see if current platform is the one passed in
* 
* use one of the defined constants, like SPAZCORE_PLATFORM_AIR
* 
* @param {String} str the platform you're checking for
* 
*/
sc.helpers.isPlatform = function(str) {
	var pform = sc.helpers.getPlatform();
	if ( pform.toLowerCase() === str.toLowerCase() ) {
		return true;
	} else {
		return false;
	}
};


sc.helpers.isAIR = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_AIR);
};

sc.helpers.iswebOS = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_WEBOS);
};

sc.helpers.isTitanium = function() {
	return sc.helpers.isPlatform(SPAZCORE_PLATFORM_TITANIUM);
};


/**
 * Helper to send a debug dump 
 */
sc.helpers.debug = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_DEBUG);
};

/**
 * helper to send a notice dump 
 */
sc.helpers.note = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_NOTICE);
};

/**
 * helper to send a warn dump 
 */
sc.helpers.warn = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_WARNING);
};

/**
 * helper to send an error dump 
 */
sc.helpers.error = function(obj) {
	sc.helpers.dump(obj, SPAZCORE_DUMPLEVEL_ERROR);
};


/**
 * A simple logging function
 * @platformstub
 */
sc.helpers.dump = function(obj, level) {
	console.log(obj);
};

/**
 * Open a URL in the default system web browser
 * @platformstub
 */
sc.helpers.openInBrowser = function(url) {
	// stub
};

/**
 * Gets the contents of a file
 * @platformstub
 */
sc.helpers.getFileContents = function(path) {
	// stub
};

/**
 * Saves the contents to a specified path. Serializes a passed object if 
 * serialize == true
 * @platformstub
 */
sc.helpers.setFileContents = function(path, content, serialize) {
	// stub
};


/**
 * Returns the current application version string
 * @platformstub
 */
sc.helpers.getAppVersion = function() {
	// stub
};


/**
 * Returns the user agent string for the app
 * @platformstub
 */
sc.helpers.getUserAgent = function() {
	// stub
};

/**
 * Sets the user agent string for the app
 * @platformstub
 */
sc.helpers.setUserAgent = function(uastring) {
	// stub
};

/**
 * Gets clipboard text
 * @platformstub
 */
sc.helpers.getClipboardText = function() {
	// stub
};

/**
 * Sets clipboard text
 * @platformstub
 */
sc.helpers.setClipboardText = function(text) {
	// stub
};


/**
 * Loads a value for a key from EncryptedLocalStore
 * @platformstub
 */
sc.helpers.getEncryptedValue = function(key) {
	// stub
};

/**
 * Sets a value in the EncryptedLocalStore of AIR
 * @platformstub
 */
sc.helpers.setEncryptedValue = function(key, val) {
	// stub
};


/**
 * Get the app storage directory
 * @TODO is there an equivalent for this on all platforms?
 * @platformstub
 */
sc.helpers.getAppStoreDir = function() {
	// stub
};

/**
 * Get the preferences file
 * @TODO this should be removed and we rely on the preferences lib 
 */
sc.helpers.getPreferencesFile = function(name, create) {
	// stub
};

/**
 * initializes a file at the given location. set overwrite to true
 * to clear out an existing file.
 * returns the air.File object or false
 * @platformstub
*/
sc.helpers.init_file = function(path, overwrite) {
	// stub
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;
 
/**
 * View helper methods for Twitter apps
 *  
 */

/**
 * This removes any extra items from a set of elements. Intended to be used for
 * limiting the size of timelines
 * 
 * This does NOT remove bound event listeners in order to increase speed. Be careful!
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {integer} max_items the max # of item we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 * @requires jQuery
 */
sc.helpers.removeExtraElements = function(item_selector, max_items, remove_from_top) {

	if (!remove_from_top) {
		remove_from_top = false;
	}

	var jqitems = jQuery(item_selector);

	var parent = jqitems.parent().get(0);

	var diff = jqitems.length - max_items;

	if (diff > 0) {

		if (!remove_from_top) {
	        jqitems.slice(diff * -1).each( function() {
				this.parentNode.removeChild( this );
			} );
		} else {
	        jqitems.slice(diff).each( function() {
				this.parentNode.removeChild( this );
			} );
		}
	}
};



/**
 * This removes any duplicate items from a series of elements. Intended to be used for
 * limiting the sice of timelines
 * 
 * @param {string} item_selector a jquery-compatible selector to get items
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE
 * @TODO
 */
sc.helpers.removeDuplicateElements = function(item_selector, remove_from_top) {
	sc.helpers.dump('removeDuplicateElements TODO');

};



/**
 * This updates relative times in elements. Each element has to have an attribute
 * that contains the created_at value provided by Twitter
 * 
 * @param {string} item_selector the jQuery selector for the elements which will contain the relative times
 * @param {string} time_attribute the attribute of the element that contains the created_at value
 * @requires jQuery
 */
sc.helpers.updateRelativeTimes = function(item_selector, time_attribute) {
	jQuery(item_selector).each(function(i) {
		var time = jQuery(this).attr(time_attribute);
		var relative_time = sc.helpers.getRelativeTime(time);
		jQuery(this).html( relative_time );
	});
};


/**
 * this marks all items in the selected set of elements as read. It does this by removing
 * the 'new' class
 * 
 * @param {string} item_selector
 * @requires jQuery
 */
sc.helpers.markAllAsRead = function(item_selector) {
	jQuery(item_selector).removeClass('new');
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser;

/**
 * Given a string, this returns an XMLDocument
 * @param {string} string
 * @return {XMLDocument}
 */
sc.helpers.createXMLFromString = function (string) {
	var xmlParser, xmlDocument;
	try {
		xmlParser = new DOMParser();
		xmlDocument = xmlParser.parseFromString(string, 'text/xml');
		return xmlDocument;
	} catch (e) {
		sc.helpers.dump(e.name + ":" + e.message);
		return null;
	}
};


/**
 * a library to get direct image urls for various image hosting servces 
 */
function SpazImageURL(args) {
	
	this.apis = {};
	
	this.initAPIs();
	
};

/**
 * Creates the initial default set of API descriptions 
 */
SpazImageURL.prototype.initAPIs = function() {
	this.addAPI('twitpic', {
		'url_regex'       : new RegExp("http://twitpic.com/([a-zA-Z0-9]+)", "gi"),
		'getThumbnailUrl' : function(id) {
			var url = 'http://twitpic.com/show/thumb/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://twitpic.com/show/large/'+id;
			return url;
		}
	});


	this.addAPI('yfrog', {
		'url_regex'       : new RegExp("http://yfrog.(?:com|us)/([a-zA-Z0-9]+)", "gim"),
		'getThumbnailUrl' : function(id) {
			var url = 'http://yfrog.com/'+id+'.th.jpg';
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://yfrog.com/'+id+':iphone';
			return url;
		}
	});
	
	
	this.addAPI('twitgoo', {
		'url_regex'       : /http:\/\/twitgoo.com\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			var url = 'http://twitgoo.com/show/thumb/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			var url = 'http://twitgoo.com/show/img/'+id;
			return url;
		}
	});
	
	
	
	this.addAPI('pikchur', {
		'url_regex'       : /http:\/\/(?:pikchur\.com|pk\.gd)\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://img.pikchur.com/pic_GPT_t.jpg
			var url = 'http://img.pikchur.com/pic_'+id+'_s.jpg';
			return url;
		},
		'getImageUrl'     : function(id) {
			//http://img.pikchur.com/pic_GPT_l.jpg
			var url = 'http://img.pikchur.com/pic_'+id+'_l.jpg';
			return url;
		}
	});
	
	
	this.addAPI('tweetphoto', {
		'url_regex'       : /http:\/\/tweetphoto.com\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/json/imagefromurl?size=thumbnail&url=http://tweetphoto.com/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://tweetphoto.com/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://tweetphoto.com/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://tweetphoto.com/'+id;
			return url;
		}
	});
	
	
	this.addAPI('pic.gd', {
		'url_regex'       : /http:\/\/pic.gd\/([a-zA-Z0-9]+)/gi,
		'getThumbnailUrl' : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/json/imagefromurl?size=thumbnail&url=http://pic.gd/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=http://pic.gd/'+id;
			return url;
		},
		'getImageUrl'     : function(id) {
			// http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://pic.gd/iyb9azy4
			var url = 'http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=big&url=http://pic.gd/'+id;
			return url;
		}
	});	
};


/**
 * retrieve APIs 
 * @return {array}
 */
SpazImageURL.prototype.getAPIs = function() {
	return this.apis;	
};

/**
 * get an api for a service
 * @param {string} service_name 
 * @return {object}
 */
SpazImageURL.prototype.getAPI = function(service_name) {
	
	return this.apis[service_name];
	
};

/**
 * add a new API for a service
 * @param {string} service_name
 * @param {object} opts (url_regex regexp, getThumbnailUrl method, getImageUrl method)
 */
SpazImageURL.prototype.addAPI = function(service_name, opts) {
	
	var newapi = {};
	newapi.url_regex       = opts.url_regex;       // a regex used to look for this service's urls, must provide a parens match for image ID code
	newapi.getThumbnailUrl = opts.getThumbnailUrl; // a function
	newapi.getImageUrl     = opts.getImageUrl;     // a function
	
	this.apis[service_name] = newapi;
	
};

/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {string} str
 * @return {object|null} an object of services (keys) and an array of their matches (vals)
 */
SpazImageURL.prototype.findServiceUrlsInString = function(str) {
	
	var matches = {}, num_matches = 0, re_matches, key, thisapi;
	
	for (key in this.apis) {
		
		thisapi = this.getAPI(key);
		sch.dump(key);
		sch.dump(thisapi.url_regex);
		while( (re_matches = thisapi.url_regex.exec(sch.trim(str))) != null) {
			sch.dump(re_matches);
			matches[key] = re_matches;
			num_matches++;
		}
	}
	sch.dump('num_matches:'+num_matches);
	sch.dump(matches);	
	if (num_matches > 0) {
		return matches;
	} else {
		return null;
	}
	
};

/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {object} matches
 * @return {object|null} fullurl:thumburl key:val pairs
 * 
 */
SpazImageURL.prototype.getThumbsForMatches = function(matches) {
	var x, service, api, thumburl, thumburls = {}, num_urls = 0;
	
	for (service in matches) {
		sch.dump('SERVICE:'+service);
		api = this.getAPI(service);
		urls = matches[service]; // an array
		sch.dump("URLS:"+urls);
		thumburls[urls[0]] = api.getThumbnailUrl(urls[1]);
		num_urls++;
	}

	sch.dump('num_urls:'+num_urls);
	sch.dump(thumburls);	
	
	if (num_urls > 0) {
		return thumburls;
	} else {
		return null;
	}
};


/**
 * given a string, this returns a set of key:val pairs of main url:thumbnail url
 * for image hosting services for urls within the string
 * @param {string} str
 * @return {object|null} fullurl:thumburl key:val pairs
 */
SpazImageURL.prototype.getThumbsForUrls = function(str) {
	var matches = this.findServiceUrlsInString(str);
	if (matches) {
		return this.getThumbsForMatches(matches);
	} else {
		return null;
	}
	
};

/**
 * given a single image hosting service URL, this returns a URL to the thumbnail image itself
 * @param {string} url
 * @return {string|null}
 */
SpazImageURL.prototype.getThumbForUrl = function(url) {
	var urls = this.getThumbsForUrls(url);
	if (urls) {
		return urls[url];
	} else {
		return null;
	}
};



/**
 * find the image service URLs that work with our defined APIs in a given string
 * @param {object} matches
 * @return {object|null} fullurl:thumburl key:val pairs
 */
SpazImageURL.prototype.getImagesForMatches = function(matches) {
	var x, service, api, imageurl, imageurls = {}, num_urls = 0;
	
	for (service in matches) {
		sch.dump('SERVICE:'+service);
		api = this.getAPI(service);
		urls = matches[service]; // an array
		sch.dump("URLS:"+urls);
		imageurls[urls[0]] = api.getImageUrl(urls[1]);
		num_urls++;
	}

	sch.dump('num_urls:'+num_urls);
	sch.dump(imageurls);	
	
	if (num_urls > 0) {
		return imageurls;
	} else {
		return null;
	}
};


/**
 * given a string, this returns a set of key:val pairs of main url:image url
 * for image hosting services for urls within the string
 * @param {string} str
 * @return {object|null} fullurl:imageurl key:val pairs
 */
SpazImageURL.prototype.getImagesForUrls = function(str) {
	var matches = this.findServiceUrlsInString(str);
	if (matches) {
		return this.getImagesForMatches(matches);
	} else {
		return null;
	}
};


/**
 * given a single image hosting service URL, this returns a URL to the image itself
 * @param {string} url
 * @return {string|null}
 */
SpazImageURL.prototype.getImageForUrl = function(url) {
	var urls = this.getImagesForUrls(url);
	if (urls) {
		return urls[url];
	} else {
		return null;
	}
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, jQuery;


/**
 * A file uploader class for SpazCore 
 */

/**
 * Events used by this library 
 */
if (!sc.events) { sc.events = {}; }
sc.events.fileUploadStart	= 'fileUploadStart';
sc.events.fileUploadSuccess	= 'fileUploadSuccess';
sc.events.fileUploadFailure	= 'fileUploadFailure';



/**
 * Constructor
 * 
 * opts = {
 *   api:'',
 *   startEvent:'',
 *   successEvent:'',
 *   failureEvent:'',
 *   eventTarget:DOMElement
 * } 
 */
function SpazFileUploader(opts) {

	if (!opts) { opts = {}; }
		
	if (opts.api) {
		this.setAPI(opts.api);
	}
	this.startEvent   = opts.startEvent   || sc.events.fileUploadStart;
	this.successEvent = opts.successEvent || sc.events.fileUploadSuccess;
	this.failureEvent = opts.failureEvent || sc.events.fileUploadFailure;
	this.eventTarget  = opts.eventTarget  || document;
	
	this.apis = this.getAPIs();

}

/**
 * returns an array of API labels
 * @return array 
 */
SpazFileUploader.prototype.getAPILabels = function() {
	var labels = [];
	for ( var key in this.getAPIs() ) {
		labels.push(key);
	}
	return labels;
};


/**
 * This builds the apis hash and returns it. All API stuff is defined inside here
 */
SpazFileUploader.prototype.getAPIs = function() {

	var thisSFU = this;

	var apis = {
		'pikchur' : {
		    'upload_url' : 'http://api.pikchur.com/simple/upload',
		    'post_url' : 'http://api.pikchur.com/simple/uploadAndPost',
			'api_key_field': 'api_key', // setting this to non-empty means we MUST set an api key
			'processResult': function(event, apiobj) {
				var loader = event.target;
				
				var returnobj = {}

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
		'yfrog' : {
		    'upload_url' : 'http://yfrog.com/api/upload',
		    'post_url' : 'http://yfrog.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
	    'twitpic' : {
			'upload_url' : 'http://twitpic.com/api/upload',
		    'post_url'   : 'http://twitpic.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;
				
				sch.debug('PROCESSING: EVENT');
				sch.debug(event);

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(event.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		},
		'twitgoo' : {
			'upload_url' : 'http://twitgoo.com/api/upload',
			'post_url'   : 'http://twitgoo.com/api/uploadAndPost',
			'processResult': function(event, apiobj) {
				var loader = event.target;

				var parser=new DOMParser();
				var xmldoc = parser.parseFromString(loader.data,"text/xml");

				var rspAttr = xmldoc.getElementsByTagName("rsp")[0].attributes;
				if (rspAttr.getNamedItem("stat").nodeValue === 'ok')
				{
					returnobj['mediaurl'] = jQuery(xmldoc).find('mediaurl').text();
				} 
				else
				{
					returnobj['errAttributes'] = xmldoc.getElementsByTagName("err")[0].attributes;
					returnobj['errMsg'] = errAttributes.getNamedItem("msg").nodeValue;
				}
				sch.debug(returnobj);
				return returnobj;
			}
		}//,
		/*
			Not sure if we should continue to support tweetphoto; API is complex
		*/
		// 'tweetphoto': {
		// 	'upload_url' : 'http://tweetphotoapi.com/api/tpapi.svc/upload2',
		// 	'api_key_field': 'TPAPIKEY', // this means we need to set the api key
		// 	'onBeforeSend' : function(extraParams, api.upload_url, file_url) {
		// 	
		// 	},
		// 	'processResult': function(event, apiobj) {
		// 		var loader = event.target;
		// 
		// 		var parser=new DOMParser();
		// 		var xmldoc = parser.parseFromString(loader.data,"text/xml");
		// 
		// 		if (jQuery(xmldoc).find('Status').text().toLowerCase() === 'ok')
		// 		{
		// 			var mediaurl = jQuery(xmldoc).find('MediaUrl').text();
		// 		} 
		// 		else
		// 		{
		// 			sch.error('There was an error uploading to TweetPhoto')
		// 			var errAttributes = xmldoc.getElementsByTagName("err")[0].attributes;
		// 			var errMsg = errAttributes.getNamedItem("msg").nodeValue;
		// 		}
		// 	}	
		// }
		
	};

	return apis;

};

/**
 * Pass the api you want to use as a string
 * @param {string} apilabel 
 */
SpazFileUploader.prototype.setAPI = function(apilabel) {
	this.api = this.apis[apilabel];
};

/**
 * some services require an api key or app identifier. This sets that.
 * @param {string} api_key
 */
SpazFileUploader.prototype.setAPIKey = function(api_key) {
	if (this.api) {
		this.api.api_key = api_key;
	} else {
		sch.error('Must set the API before setting API key');
	}
};

/**
 * some services require an api key or app identifier. This sets that.
 * @param {string} api_key
 */
SpazFileUploader.prototype.getAPIKey = function() {
	if (this.api) {
		return this.api.api_key;
	} else {
		sch.error('Must set the API before getting API key');
	}
};

/**
 * opts = {
 *   'api':'', // use if not set already
 *   'username':'xxx',
 *   'password':'xxx',
 *   'source':'xxx',
 *   'message':''
 *   
 * } 
 * 
 * This uploads a file located at the given file_url. It uses the
 * sc.helpers.HTTPUploadFile as defined for your given platform.  Events are
 * raised as set in the constructor on start, success and failure.
 * 
 * Note that in the webOS implementation, success events are raised every time
 * progress is reported, NOT just when completion happens. Check for the
 * "completed" boolean property in the response object. This may change in the
 * future.
 * 
 * @param {string} post_url  the url we're uploading the file to
 * @param {string} file_url  the local url of the file we're uploading
 * @param {object} opts  a set of key/val pairs
 */
SpazFileUploader.prototype.uploadFile = function(post_url, file_url, opts) {

	var api, api_key;

	var thisSFU = this;

	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	var username = opts.username || null;
	var password = opts.password || null;
	var source   = opts.source   || null;
	var message  = opts.message  || null;
	
	/*
		platform opts are for platform-specific options. For now we're using
		this because webOS requires the scene controller to call the service
		request, so we pass a reference to the scene assistant
	*/
	var platformOpts = opts.platform || null;

	var onStart = opts.onStart || null;

	var extraParams = {
		"username": username,
		"password": password,
		"source":   source,
		"message":  message
	};
	
	/**
	 * if we have an API key field, then we need the api key 
	 */
	if ( (api.api_key_field) ) {
		extraParams[api.api_key_field] = this.getAPIKey();
	}

	/*
		A callback in case we need to massage the data before upload
	*/
	if (api.onBeforeSend) {
		api.onBeforeSend.call(api, extraParams, api.upload_url, file_url);
	}
	
	/*
		trigger upload start event
	*/
	sc.helpers.triggerCustomEvent(thisSFU.startEvent, thisSFU.eventTarget);
	
	// upload the file
	sc.helpers.HTTPUploadFile({
			'extra'   : extraParams,
			'url'     : post_url,
			'file_url': file_url,
			'platform': platformOpts
		},
		function(event) {
			sch.debug('UPLOAD SUCCESS, PROCESSING');
			/*
				For now we're not using the processResult methods, as the 
				implementation can vary by platform. For now, process response
				externally.
			*/
			// var data = api.processResult.call(thisSFU, event, api);
			// sch.debug(data);
			sc.helpers.triggerCustomEvent(thisSFU.successEvent, thisSFU.eventTarget, event);
		},
		function(event) {
			sch.debug('UPLOAD FAILURE, PROCESSING');
			/*
				For now we're not using the processResult methods, as the 
				implementation can vary by platform. For now, process response
				externally.
			*/
			// var data = api.processResult.call(thisSFU, event, api);
			// sch.debug(data);
			sc.helpers.triggerCustomEvent(thisSFU.failureEvent, thisSFU.eventTarget, event);
		}
	);
};



/**
 * a wrapper for uploadFile that uses the post_url from the API definition 
 */
SpazFileUploader.prototype.uploadAndPost = function(file_url, opts) {
	var api;
	
	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	this.uploadFile(api.post_url, file_url, opts);
	
};

/**
 * a wrapper for uploadFile that uses the upload_url from the API definition 
 */
SpazFileUploader.prototype.upload = function(file_url, opts) {
	
	var api;
	
	if (opts.api) {
		api = this.apis.api;
	} else if (this.api) {
		api = this.api;
	} else {
		sch.error('Must set the API before uploading');
		return;
	}
	
	this.uploadFile(api.upload_url, file_url, opts);
	
};

/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
sub: true,
plusplus: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

function SpazPhotoMailer(opts) {

	this.apis = this.getAPIs();
	
}

SpazPhotoMailer.prototype.getAPILabels = function() {
	var labels = [];
	for ( var key in this.getAPIs() ) {
		labels.push(key);
	}
	return labels;
};

SpazPhotoMailer.prototype.getAPIs = function() {
	
	var thisSPM = this;
	
	var apis = {
		"yfrog": {
			"email_tpl"  :"{{username}}.??????@yfrog.com",
			"message_in" :"subject",
			"email_info_url":"http://yfrog.com/froggy.php",
			'help_text'  :"Log-in to yfrog.com with your Twitter username and password, and click 'my yfrog.' Your customized posting email will be listed on the right.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['yfrog'].email_tpl.replace('{{username}}', username);
			}
		},

		"posterous": {
			"email_tpl"  :"post@posterous.com",
			"message_in" :"subject",
			"email_info_url":"http://posterous.com/autopost",
			'help_text'  :"Post instantly to your Posterous blog. Setup autopost to post back to Twitter! Login for more information and controls.",
			'getToAddress': function(opts) {
				return thisSPM.apis['posterous'].email_tpl;
			}
		},
		
		"pikchur": {
			"email_tpl"  :"{{username}}.???@pikchur.com",
			"message_in" :"subject",
			"email_info_url":"http://pikchur.com/dashboard/profile",
			'help_text'  :"Log-in to pikchur with your Twitter username and password, and click 'Profile.' Your customized posting email will be listed",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['pikchur'].email_tpl.replace('{{username}}', username);
			}
		},


		"twitgoo": {
			"email_tpl"  :"m@twitgoo.com",
			"message_in" :"subject",
			"email_info_url":"http://twitgoo.com/-settings/mobile",
			'help_text'  :"Log-in to twitgoo.com and click 'Settings.' Add the email address from which you'll be sending messages.",
			'getToAddress': function(opts) {
				return thisSPM.apis['twitgoo'].email_tpl;
			}
		},

		"twitpic": {
			"email_tpl"  :"{{username}}.####@twitpic.com",
			"message_in" :"subject",
			"email_info_url":"http://twitpic.com/settings.do",
			'help_text'  :"Log-in to twitpic.com, and click 'Settings.' Your custom email address will be listed.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['twitpic'].email_tpl.replace('{{username}}', username);
			}
		},

		"tweetphoto": {
			"email_tpl"  :"{{username}}.####@tweetphoto.com",
			"message_in" :"subject",
			"email_info_url":"http://www.tweetphoto.com/mysettings.php",
			'help_text'  :"Log-in to tweetphoto.com and click 'My Settings.' Your custom email address will be listed.",
			'getToAddress': function(opts) {
				var username = opts.username;
				return thisSPM.apis['tweetphoto'].email_tpl.replace('{{username}}', username);
			},
			'retrievePostingAddress': function(username, password, success, failure) {
				
				function getTweetPhotoProfile(username, password) {
					
					var url = "http://tweetphotoapi.com/api/tpapi.svc/json/users/"+username;
					var TPAPI_header = 'TPAPI: '+username+","+password;
					
					jQuery.ajax({
						
						'success':function(data, textStatus) {
							var profile = sc.helpers.deJSON(data);
							
						},
						
						'error':function(xhr, testStatus, errorThrown) {
							failure(xhr, testStatus, errorThrown);
						},
						
						'beforeSend':function(xhr){
							xhr.setRequestHeader("TPAPI", username+","+password);
				        },
				        
						'url':url
						
						
					});
					
				}
				
				function getTweetPhoto(username, password, settings_url) {

					var TPAPI_header = 'TPAPI: '+username+","+password;
					
					jQuery.ajax({
						
						'success':function(data, textStatus) {
							var settings = sc.helpers.deJSON(data);
							success(settings.Email);
						},
						
						'error':function(xhr, testStatus, errorThrown) {
							failure(xhr, testStatus, errorThrown);
						},
						
						'beforeSend':function(xhr){
							xhr.setRequestHeader("TPAPI", username+","+password);
				        },
				        
						'url':settings_url
						
					});
					
				}
				
				
				
			}
		}
	};
	
	return apis;

};

SpazPhotoMailer.prototype.setAPI = function(apilabel) {
	this.api = this.apis[apilabel];
};

SpazPhotoMailer.prototype.send = function(api, photo_url, message) {
	
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Titanium, air, window, jQuery, Mojo;

var SPAZCORE_PREFS_TI_KEY = 'preferences_json';
 
/**
 * A preferences lib for AIR JS apps. This requires the json2.js library
 * 
 * @param {object} defaults a JS object of key:value pairs used for the pref defaults. Example:
 * {
 * 	foo:124545,
 * 	bar:'Hello!',
 *  boo:false
 * };
 * @param {object} sanity_methods a JS object of key:object pairs that defines methods to be called when the pref is get() or set(). Example:
 * {
 * 	foo:{
 * 		onGet:function() {};
 * 		onSet:function() {};
 * 	},
 * 	bar:{
 * 		onGet:function() {};
 * 		onSet:function() {};
 * 	}
 * }
 * 
 * events raised:
 * 'spazprefs_loaded'
 * 
 * @TODO we need to pull out the platform-specifc stuff into the /platforms/... hierarchy
 * @class SpazPrefs
 */
function SpazPrefs(defaults, sanity_methods) {	

	/*
		init prefs
	*/
	this._prefs = {};
	
	/*
		init sanity check methods
		we use:
		* onGet()
		* onSet()
	*/
	this._sanity_methods = {};


	if (sanity_methods) {
		sc.helpers.dump('need to add sanity_method parsing');
	}
	
	if (defaults) {
		this.setDefaults(defaults);
		this._applyDefaults();
	}
	
	this.loaded = false;
}


/**
 * sets the passed object of key:val pairs as the default preferences
 * @param {object} defaults
 */ 
SpazPrefs.prototype.setDefaults = function(defaults) {
	this._defaults = defaults;
};


/**
 * this goes through the default prefs and applies them. It also will
 * call the onSet sanity method if it is defined for a given pref keys.
 */
SpazPrefs.prototype._applyDefaults = function() {
	var key;
	for (key in this._defaults) {
		sc.helpers.dump('Copying default "' + key + '":"' + this._defaults[key] + '" (' + typeof(this._defaults[key]) + ')');
		this._prefs[key] = this._defaults[key];

		if (this._sanity_methods[key] && this._sanity_methods[key].onSet) {
			sc.helpers.dump("Calling "+key+".onSet()");
			this._sanity_methods[key].onSet();
		}
	}
};

/**
 * resets all prefs to defaults and saves 
 */
SpazPrefs.prototype.resetPrefs = function() {
	
	this._applyDefaults();
	this.save();
};



/**
 * Get a preference
 * Note that FALSE is returned if the key does not exist
 */
SpazPrefs.prototype.get = function(key, encrypted) {
	if (encrypted) {
		return this.getEncrypted(key);
	} 
	
	sc.helpers.dump('Looking for pref "'+key+'"');
	
	if (this._prefs[key]) {
		sc.helpers.dump('Found pref "'+key+'" of value "'+this._prefs[key]+'" ('+typeof(this._prefs[key])+')');
		return this._prefs[key];
	} else {
		return false;
	}
};


/**
 * set a preference and save automatically
 */
SpazPrefs.prototype.set = function(key, val, encrypted) {
	
	sc.helpers.dump('Setting and saving "'+key+'" to "'+val+'" ('+typeof(val)+')');
	
	if (encrypted) {
		return this.setEncrypted(key, val);
	} 

	this._prefs[key] = val;
	
	this.save();
};







/**
 * @param {string} key the name of the pref
 * @param {string} type the type of method. Currently either 'onGet' or 'onSet'
 * @param {function} method the method definition
 */
SpazPrefs.prototype.setSanityMethod = function(key, type, method) {
	
	if (type !== 'onGet' && type !== 'onSet') {
		return false;
	}
	
	this._sanity_methods[key][type] = method;
	
};


/**
 * get an encrypted preference
 * @todo
 */
SpazPrefs.prototype.getEncrypted = function(key) {
	alert('not yet implemented');
};


/**
 * Sets an encrypted pref
 * @todo
 */
SpazPrefs.prototype.setEncrypted = function(key, val) {
	alert('not yet implemented');
};


/**
 * loads the prefs file and parses the prefs into this._prefs,
 * or initializes the file and loads the defaults
 * @todo
 */
SpazPrefs.prototype.load = function(name) {
	
	var thisPrefs = this;
	
	/*
		webOS implementation
	*/
	if (sc.helpers.iswebOS()) {

		sc.helpers.dump('this is webOS');
		if (!this.mojoCookie) {
			sc.helpers.dump('making cookie');
			this.mojoCookie = new Mojo.Model.Cookie('SpazPrefs');
			
			
			
		}
		var loaded_prefs = this.mojoCookie.get();
		if (loaded_prefs) {
			sc.helpers.dump('Prefs loaded');
			for (var key in loaded_prefs) {
				//sc.helpers.dump('Copying loaded pref "' + key + '":"' + thisPrefs._prefs[key] + '" (' + typeof(thisPrefs._prefs[key]) + ')');
	            thisPrefs._prefs[key] = loaded_prefs[key];
	       	}
			jQuery().trigger('spazprefs_loaded');
		} else {
			sc.helpers.dump('Prefs loading failed in onGet');
			this.migrateFromMojoDepot();
			// thisPrefs.resetPrefs();
		}
		

		

	}
	
	/*
		Titanium implementation
		@TODO
	*/
	if (sc.helpers.isTitanium()) {
		if (Titanium.App.Properties.hasProperty(SPAZCORE_PREFS_TI_KEY)) {
			var prefs_json = Titanium.App.Properties.getString(SPAZCORE_PREFS_TI_KEY);
			var loaded_prefs = sc.helpers.deJSON(prefs_json);
			for (var key in loaded_prefs) {
				sc.helpers.dump('Copying loaded pref "' + key + '":"' + this._prefs[key] + '" (' + typeof(this._prefs[key]) + ')');
	            this._prefs[key] = loaded_prefs[key];
	       	}
		} else {
			// save the defaults if this is the first time
			this.save();
		}
		jQuery().trigger('spazprefs_loaded');
	}
	
};


/**
 * We used to store the data in a Depot, so we may need
 * to migrate data out of there 
 */
SpazPrefs.prototype.migrateFromMojoDepot = function() {
	
	var thisPrefs = this;
	
	sch.error('MIGRATING FROM DEPOT! ============================ ');
	
	sc.helpers.dump('this is webOS');
	if (!this.mojoDepot) {
		sc.helpers.dump('making depot');
		this.mojoDepot = new Mojo.Depot({
			name:'SpazDepotPrefs',
			replace:false
		});
	}
	
	var onGet = function(loaded_prefs) {
		if (loaded_prefs) {
			sc.helpers.dump('Prefs loaded');
			for (var key in loaded_prefs) {
				//sc.helpers.dump('Copying loaded pref "' + key + '":"' + thisPrefs._prefs[key] + '" (' + typeof(thisPrefs._prefs[key]) + ')');
	            thisPrefs._prefs[key] = loaded_prefs[key];
	       	}
		} else {
			sc.helpers.dump('Prefs loading failed in onGet');
			thisPrefs.resetPrefs();
		}
		thisPrefs.save(); // write to cookie
		jQuery().trigger('spazprefs_loaded');
	};

	var onFail = function() {
		sc.helpers.dump('Prefs loading failed in onFail');
		thisPrefs.resetPrefs();
		jQuery().trigger('spazprefs_loaded');
	};
	
	sc.helpers.dump('simpleget depot');
	this.mojoDepot.simpleGet('SpazPrefs', onGet, onFail);
	sc.helpers.dump('sent simpleget');
	
};




/**
 * saves the current preferences
 * @todo
 */
SpazPrefs.prototype.save = function(name) {

	if (sc.helpers.iswebOS()) {
		if (!this.mojoCookie) {
			this.mojoCookie = new Mojo.Model.Cookie('SpazPrefs');
		}
		
		this.mojoCookie.put(this._prefs);
	}
	
	/*
		Titanium implementation
		@TODO
	*/
	if (sc.helpers.isTitanium()) {
		// save the file to a default place
		var prefs_json = sc.helpers.enJSON(this._prefs);
		Titanium.App.Properties.setString(SPAZCORE_PREFS_TI_KEY, prefs_json);
	}
		
	
};



/**
 * shortcut for SpazPrefs
 */
if (sc) {
	var scPrefs = SpazPrefs;
}








/**
 * methods for Titanium
 */
if (sc.helpers.isTitanium()) {

	/*
		Saves the size and placement of the window this executes in
	*/
	SpazPrefs.prototype.saveWindowState = function() {
		var width  = Titanium.UI.currentWindow.getWidth();
		var height = Titanium.UI.currentWindow.getHeight();
		var x      = Titanium.UI.currentWindow.getX();
		var y      = Titanium.UI.currentWindow.getY();
		
		if (x && y && width && height) {
			Titanium.App.Properties.setInt('__window-width',  width);
			Titanium.App.Properties.setInt('__window-height', height);
			Titanium.App.Properties.setInt('__window-x',      x);
			Titanium.App.Properties.setInt('__window-y',      y);
		}
	};

	/*
		Loads the size and placement of the window this executes in
	*/
	SpazPrefs.prototype.loadWindowState = function() {
		if (!Titanium.App.Properties.hasProperty('__window-width')) { // we assume if this isn't set, none are set
			this.saveWindowState(); // save the current state
			return;
		}
		
		var width  = Titanium.App.Properties.getInt('__window-width');
		var height = Titanium.App.Properties.getInt('__window-height');
		var x      = Titanium.App.Properties.getInt('__window-x');
		var y      = Titanium.App.Properties.getInt('__window-y');
		
		if (x && y && width && height) {
			Titanium.UI.currentWindow.setWidth(width);
			Titanium.UI.currentWindow.setHeight(height);
			Titanium.UI.currentWindow.setX(x);
			Titanium.UI.currentWindow.setY(y);
		}
	};
}



/**
 * methods for AIR 
 * @TODO
 */
if (sc.helpers.isAIR()) {

	/*
		Saves the size and placement of the window this executes in
	*/
	this.saveWindowState = function() {
		this.set('__window-height', window.nativeWindow.width);
		this.set('__window-height', window.nativeWindow.height);
		this.set('__window-x', window.nativeWindow.x);
		this.set('__window-y', window.nativeWindow.y);
	};

	/*
		Loads the size and placement of the window this executes in
	*/
	this.loadWindowState = function() {
		var width  = this.get('__window-height');
		var height = this.get('__window-height');
		var x      = this.get('__window-x');
		var y      = this.get('__window-y');
		
		if (x && y && width && height) {
			window.nativeWindow.width  = width;
			window.nativeWindow.height = height;
			window.nativeWindow.x = x;
			window.nativeWindow.y = y;
		}
		
	};
	
}





// var SpazPrefs = function(defaults) {
// 	
// 	if (defaults) {
// 		this.defaults = defaults;
// 	} else {
// 		this.defaults = {};
// 	}
// 
// 	this.prefs    = clone(this.defaults);
// 
// 	/*
// 		returns the application storage directory air.File object
// 	*/
// 	this.getPrefsDir = function() {
// 		return air.File.applicationStorageDirectory;
// 	}
// 	
// 	/*
// 		returns the prefs air.File object. 
// 	*/
// 	this.getPrefsFile = function(name) {
// 		if (!name) {name='preferences';}
// 		
// 		var prefsDir = this.getPrefsDir();
// 		prefsFile = prefsDir.resolvePath(name+".json");
// 		return prefsFile;
// 	}
// 	
// 	/*
// 		loads the prefs file and parses the prefs into this.prefs,
// 		or initializes the file and loads the defaults
// 	*/
// 	this.load = function(name) {
// 		var prefsFile = this.getPrefsFile(name);
// 
// 		// if file DNE, init file with defaults
// 		if (prefsFile.exists) {
// 			var prefsJSON = get_file_contents(prefsFile.url);
// 			air.trace(prefsJSON);
// 			var loaded_prefs = JSON.parse(prefsJSON);
// 			for (var key in loaded_prefs) {
// 	            this.set(key, loaded_prefs[key]);
//         	}
// 
// 		} else {
// 			init_file(prefsFile.url);
// 			set_file_contents(prefsFile.url, this.defaults, true);
// 			this.prefs = clone(this.defaults); // we have to pass by value, not ref
// 		}
// 
// 		return prefsFile;
// 	}
// 	
// 	
// 	/*
// 		
// 	*/
// 	this.save = function(name) {
// 		var prefsFile = this.getPrefsFile(name);
// 		set_file_contents(prefsFile.url, this.prefs, true);
// 	};
// 	
// 	
// 	/*
// 		Get a preference
// 	*/
// 	this.get = function(key, encrypted) {
// 		if (encrypted) {
// 			return this.getEncrypted(key);
// 		} 
// 		
// 		if (this.prefs[key]) {
// 			return this.prefs[key];
// 		} else {
// 			return false
// 		}
// 	}
// 	
// 	/*
// 		Saves the size and placement of the window this executes in
// 	*/
// 	this.saveWindowState = function() {
// 		this.set('__window-height', window.nativeWindow.width);
// 		this.set('__window-height', window.nativeWindow.height);
// 		this.set('__window-x', window.nativeWindow.x);
// 		this.set('__window-y', window.nativeWindow.y);
// 	}
// 
// 	/*
// 		Loads the size and placement of the window this executes in
// 	*/
// 	this.loadWindowState = function() {
// 		var width  = this.get('__window-height');
// 		var height = this.get('__window-height');
// 		var x      = this.get('__window-x');
// 		var y      = this.get('__window-y');
// 		
// 		if (x && y && width && height) {
// 			window.nativeWindow.width  = width;
// 			window.nativeWindow.height = height;
// 			window.nativeWindow.x = x;
// 			window.nativeWindow.y = y;
// 		}
// 		
// 	}
// 	
// 	
// 	/*
// 		get an encrypted preference
// 	*/
// 	this.getEncrypted = function(key) {
// 		return get_encrypted_value(key);
// 	};
// 	
// 	
// 	/*
// 		set a preference
// 	*/
// 	this.set = function(key, val, encrypted) {
// 		if (encrypted) {
// 			return this.setEncrypted(key, val);
// 		} 
// 
// 		this.prefs[key] = val;
// 	}
// 	
// 	
// 	/*
// 		Sets an encrypted pref
// 	*/
// 	this.setEncrypted = function(key, val) {
// 		return set_encrypted_value(key, val);
// 	};
// 	
// 	
// 	/*
// 		Gets the contents of a file
// 	*/
// 	function get_file_contents(path) {
// 		var f = new air.File(path);
// 		if (f.exists) {
// 			var fs = new air.FileStream();
// 			fs.open(f, air.FileMode.READ);
// 			var str = fs.readMultiByte(f.size, air.File.systemCharset);
// 			fs.close();
// 			return str;
// 		} else {
// 			return false;
// 		}
// 	}
// 
// 	/*
// 		Saves the contents to a specified path. Serializes a passed object if 
// 		serialize == true
// 	*/
// 	function set_file_contents(path, content, serialize) {
// 
// 		if (serialize) {
// 			content = JSON.stringify(content);
// 		}
// 
// 		// Spaz.dump('setFileContents for '+path+ ' to "' +content+ '"');
// 
// 		try { 
// 			var f = new air.File(path);
// 			var fs = new air.FileStream();
// 			fs.open(f, air.FileMode.WRITE);
// 			fs.writeUTFBytes(content);
// 			fs.close();
// 		} catch (e) {
// 			air.trace(e.errorMsg)
// 		}
// 	};
// 	
// 	
// 	
// 	/*
// 		Loads a value for a key from EncryptedLocalStore
// 	*/
// 	function get_encrypted_value(key) {
// 		var storedValue = air.EncryptedLocalStore.getItem(key);
// 		var val = storedValue.readUTFBytes(storedValue.length);
// 		return val;
// 	}
// 
// 	/*
// 		Sets a value in the EncryptedLocalStore of AIR
// 	*/
// 	function set_encrypted_value(key, val) {
// 		var bytes = new air.ByteArray();
// 	    bytes.writeUTFBytes(val);
// 	    return air.EncryptedLocalStore.setItem(key, bytes);
// 	}
// 	
// 	/*
// 		initializes a file at the given location. set overwrite to true
// 		to clear out an existing file.
// 		returns the air.File object or false
// 	*/
// 	function init_file(path, overwrite) {
// 		var file = new air.File(path);
// 		if ( !file.exists || (file.exists && overwrite) ) {
// 			var fs = new air.FileStream();
// 			fs.open(file, air.FileMode.WRITE);
// 			fs.writeUTFBytes('');
// 			fs.close();
// 			return file;
// 		} else {
// 			return false;
// 		}
// 
// 	}
// 	
// }

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
 * A library to shorten text 
 */


function SpazShortText() {

	this.map = {};
		
	this.genBaseMaps();
	this.processBaseMaps();

	
}



/**
 * internal function to generate the default long -> short maps 
 */
SpazShortText.prototype.genBaseMaps = function() {
	
	this.basemap = {
		
		/*
			txtspeak type stuff
		*/
		'about'                 :'abt',
		'account'               :'acct',
		'address'               :'addy',
		'anyone'				:'ne1',
		'and'                   :'&',
		'at'					:'@',
		'at the moment'         :'atm',
		'back'					:'bk',
		'be right back' 	    :'brb',
		'be back later' 	    :'bbl',
		'be back soon' 		    :'bbs',
		'because' 			    :'b/c',
		'boyfriend'			    :'bf',
		'but'					:'but',
		'girlfriend'		    :'gf',
		'between'			    :'btwn',
		'by the way'		    :'btw',
		'definitely'		    :'def',
		'everyone'				:'evry1',
		'favorite'				:'fav',
		'for'					:'fr',
		'from'					:'frm',
		'for example'			:'Fr ex',
		'follow'				:'fllw',
		'follower'				:'fllwr',
		'followers'				:'fllwrs',
		'following'				:'fllwng',
		'good'					:'gd',
		'got'					:'gt',
		'having'				:'hvng',
		'hours'					:'hrs',
		'i don\'t know'		    :'idk',
		'if i recall correctly' :'iirc',
		'in my opinion'		    :'imo',
		'in my humble opinion'  :'imho',
		'just'					:'jst',
		'little'				:'lttl',
		'love'				    :'<3',
		'message'			    :'msg',
		'midnight'				:'12am',
		'never mind'		    :'nm',
		'no problem'		    :'np',
		'not much'			    :'nm',
		'pages'					:'pgs',
		'pictures'			    :'pics',
		'obviously'			    :'obvs',
		'please'			    :'pls',
		'really'			    :'rly',
		'Seriously'			    :'srsly',
		'Something'			    :'s/t',
		'Sorry'				    :'sry',
		'text'				    :'txt',
		'thanks'			    :'thx',
		'think'				    :'thk',
		'to be honest'		    :'tbh',
		'though'				:'tho',
		'through'				:'thru',
		'weeks'					:'wks',
		'with'					:'w',
		'without'				:'w/o',
		
		
		/*
			contractions
		*/
		'I am'				:'I\'m',
		'I will'			:'I\'ll',
		'I had'				:'I\'d',
		'I would'			:'I\'d',
		'I have'			:'I\'ve',

		'You are'			:'You\'re',
		'You will'			:'You\'ll',
		'You had'			:'You\'d',
		'You would'			:'You\'d',
		'You have'			:'You\'ve',

		'He is'				:'He\'s',
		'He has'			:'He\'s',
		'He will'			:'He\'ll',
		'He had'			:'He\'d',
		'He would'			:'He\'d',

		'She is'			:'She\'s',
		'She has'			:'She\'s',
		'She will'			:'She\'ll',
		'She had'			:'She\'d',
		'She would'			:'She\'d',

		'It is'				:'It\'s',
		'It has'			:'It\'s',
		'It will'			:'It\'ll',
		'It would'			:'It\'d',
		'It had'			:'It\'d',

		'We are'			:'We\'re',
		'We will'			:'We\'ll',
		'We had'			:'We\'d',
		'We would'			:'We\'d',
		'We have'			:'We\'ve',

		'They are'			:'They\'re',
		'They will'			:'They\'ll',
		'They had'			:'They\'d',
		'They would'		:'They\'d',
		'They have'			:'They\'ve',

		'There is'			:'There\'s',
		'There has'			:'There\'s',
		'There will'		:'There\'ll',
		'There had'			:'There\'d',
		'There would'		:'There\'d',

		'That is'			:'That\'s',
		'That has'			:'That\'s',
		'That will'			:'That\'ll',
		'That had'			:'That\'d',
		'That would'		:'That\'d',
		
		'are not'			:'aren\'t',
		'can not'			:'can\'t',
		'could not'			:'couldn\'t',
		'did not'			:'didn\'t',
		'does not'			:'doesn\'t',
		'do not'			:'don\'t',
		'had not'			:'hadn\'t',
		'has not'			:'hasn\'t',
		'is not'			:'isn\'t',
		'must not'			:'mustn\'t',
		'need not'			:'needn\'t',
		'should not'		:'shouldn\'t',
		'was not'			:'wasn\'t',
		'were not'			:'weren\'t',
		'will not'			:'won\'t',
		'would not'			:'wouldn\'t',
		
		/*
			numbers
		*/
		'one'					:'1',
		'two'					:'2',
		'three'					:'3',
		'four'					:'4',
		'five'					:'5',
		'six'					:'6',
		'seven'					:'7',
		'eight'					:'8',
		'nine'					:'9',
		'ten'					:'10',
		'eleven'				:'11',
		'twelve'				:'12'
	};
	
	
	/*
		these mappings aren't to be altered at all when processed into regexes
	*/
	this.baserawmap = {
		'--'					:'–',
		'-\\s+'					:'-',
		'\\s+-'					:'-',
		'\\s+'					:' ',
		'\\s+$'					:'',  // trim right
		'^\\s+'					:'',  // trim left
		'\\s?\\.\\.\\.'				:'…',  // ellipses
		'\\.\\s+'				:'. ', // one space only after periods
		'\\.\\s*$'				:'',   // remove end period
		'RT:? @[a-z0-9_]+:? RT:? @([a-z0-9_]+):?' : 'RT @$1' //remove extra RTs
	};
};


/**
 * This processes the base maps into the this.map object of regexes and replacements 
 */
SpazShortText.prototype.processBaseMaps = function() {
	var key, val, regex, israw;
	
	for (key in this.basemap) {
		val = this.basemap[key];
		regex = new RegExp('(\\b)'+key+'(\\b)', 'gi');
		this.map[key] = {
			'short':'$1'+val+'$2',
			'regex':regex
		};
	}
	
	/*
		take the rawmap stuff and glob it into this.map, so we only have one to worry about
	*/
	for (key in this.baserawmap) {
		val = this.baserawmap[key];
		regex = new RegExp(key, 'gi');
		this.map[key] = {
			'short':val,
			'regex':regex
		};
	}
	
	
};


/**
 * shortens the given text according to the map
 * 
 * @param {string} text
 * @return {string} 
 */
SpazShortText.prototype.shorten = function(text) {
	
	for (var key in this.map) {
		var re = this.map[key].regex;
		var rp = this.map[key].short;
		text = text.replace(re, rp);
	}
	
	return text;
	
};


/**
 * this adds a new mapping to the basemaps and processes the base maps into regexes again
 * @param {string} search 
 * @param {string} replase
 * @param {boolean} israw is true, this mapping won't be altered at all when processed into a regex
 */
SpazShortText.prototype.addMap = function(search, replace, israw) {
	israw = israw || false;
	
	if (israw) {
		this.baserawmap[search] = replace;
	} else {
		this.basemap[search] = replace;
	}
	
	this.processBaseMaps();
};



/**
 * returns the map
 * @return {object} 
 */
SpazShortText.prototype.getMaps = function() {
	return this.map;
};/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

/**
 * A library to do url shortening 
 */

/**
 * Constants to refer to services 
 */
var SPAZCORE_SHORTURL_SERVICE_SHORTIE = 'short.ie';
var SPAZCORE_SHORTURL_SERVICE_ISGD	  = 'is.gd';
var SPAZCORE_SHORTURL_SERVICE_BITLY	  = 'bit.ly';
var SPAZCORE_SHORTURL_SERVICE_JMP     = 'j.mp';

var SPAZCORE_EXPANDABLE_DOMAINS = [
	'ad.vu',
	'bit.ly',
	'cli.gs',
	'ff.im',
	'is.gd',
	'j.mp',
	'ow.ly',
	'poprl.com',
	'short.ie',
	'sn.im',
	'snipr.com',
	'tinyurl.com',
	'tr.im',
	'twurl.nl',
	'urlzen.com',
	'xrl.us',
	'zi.ma'
];


/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.newShortURLSuccess	= 'newShortURLSuccess';
sc.events.newShortURLFailure	= 'newShortURLFailure';
sc.events.newExpandURLSuccess   = 'recoverLongURLSuccess';
sc.events.newExpandURLFailure   = 'recoverLongURLFailure';


/**
 * Constructor
 * @param {string} service	the name of a service. Preferrably one of the SPAZCORE_SHORTURL_SERVICE_* constants
 */
function SpazShortURL(service) {
	
	this.api = this.getAPIObj(service);
	
	
	this.expanded_cache = {};
	
}

SpazShortURL.prototype.getAPIObj = function(service) {
	
	var apis = {};
	
	apis[SPAZCORE_SHORTURL_SERVICE_BITLY] = {
		'url'	  : 'http://bit.ly/api',
		'getData' : function(longurl, opts){
			
			/*
				use the api if we're doing multiple URLs
			*/
			if (sc.helpers.isArray(longurl)) {
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple = true;
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].url = 'http://api.bit.ly/shorten';
				opts.longUrl = longurl;
				return opts;
			} else {
				apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple = false;
				return { 'url':longurl };				
			}
		},
		'processResult' : function(data) {
			if (apis[SPAZCORE_SHORTURL_SERVICE_BITLY].processing_multiple === true) {
				var result = sc.helpers.deJSON(data);
				var rs = {};
				for (var i in result.results) {
					rs[i] = result.results[i].shortUrl;
				}
				return rs;
			} else {
				return data;
			}
		}
		
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_JMP] = {
		'url'	  : 'http://j.mp/api',
		'getData' : function(longurl, opts){
			
			/*
				use the api if we're doing multiple URLs
			*/
			if (sc.helpers.isArray(longurl)) {
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple = true;
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].url = 'http://api.j.mp/shorten';
				opts.longUrl = longurl;
				return opts;
			} else {
				apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple = false;
				return { 'url':longurl };				
			}
		},
		'processResult' : function(data) {
			if (apis[SPAZCORE_SHORTURL_SERVICE_JMP].processing_multiple === true) {
				var result = sc.helpers.deJSON(data);
				var rs = {};
				for (var i in result.results) {
					rs[i] = result.results[i].shortUrl;
				}
				return rs;
			} else {
				return data;
			}
		}
		
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_SHORTIE] = {
		'url'	  : 'http://short.ie/api?',
		'getData' : function(longurl, opts){
			
			if (longurl.match(/ /gi)) {
				longurl = longurl.replace(/ /gi, '%20');
			}
			
			var shortie = {
				orig: longurl,
				url:  longurl,
				email:	 '',
				'private': 'false',
				format:	 'rest'
			};
			return shortie;
		}
	};
		
	apis[SPAZCORE_SHORTURL_SERVICE_ISGD] = {
		'url'	  : 'http://is.gd/api.php',
		'getData' : function(longurl, opts) {
			return { 'longurl':longurl };
		}
	};
	
	return apis[service];
};


/**
 * shortens a URL by making an ajax call
 * @param {string} longurl
 * @param {object} opts   right now opts.event_target (a DOMelement) and opts.apiopts (passed to api's getData() call) are supported
 */
SpazShortURL.prototype.shorten = function(longurl, opts) {
	
	var shortener = this;
	
	if (!opts) { opts = {}; }

	/*
		set defaults if needed
	*/
	opts.event_target = opts.event_target || document;
	opts.apiopts	  = opts.apiopts	  || null;
	
	/*
		we call getData now in case it needs to override anything
	*/
	var apidata = this.api.getData(longurl, opts.apiopts);

	if (sc.helpers.getMojoURL) {
		this.api.url = sc.helpers.getMojoURL(this.api.url);
	}
		

	var xhr = jQuery.ajax({
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(shortener.api.url + ' error:'+msg);
			
			var errobj = {'url':shortener.api.url, 'xhr':null, 'msg':null};
			
			if (xhr) {
				errobj.xhr = xhr;
				sc.helpers.dump("Error:"+xhr.status+" from "+ shortener.api.url);
			} else {
				sc.helpers.dump("Error:Unknown from "+ shortener.api.url);
				errobj.msg = 'Unknown Error';
			}
			shortener._onShortenResponseFailure(errobj, opts.event_target);
		},
		success:function(data) {
			// var shorturl = trim(data);
			var return_data = {};
			if (shortener.api.processResult) {
				return_data = shortener.api.processResult(data);
			} else {
				return_data = {
					'shorturl':data,
					'longurl' :longurl
				};
			}
			shortener._onShortenResponseSuccess(return_data, opts.event_target);
		},
		'type':"POST",
		'url' :this.api.url,
		'data':apidata
	});

};

SpazShortURL.prototype._onShortenResponseSuccess = function(data, target) {
	sc.helpers.triggerCustomEvent(sc.events.newShortURLSuccess, target, data);
};
SpazShortURL.prototype._onShortenResponseFailure = function(errobj, target) {
	sc.helpers.triggerCustomEvent(sc.events.newShortURLFailure, target, errobj);
};

/**
 * @TODO 
 */
SpazShortURL.prototype.expand = function(shorturl, opts) {
	
	var shortener = this;
	var longurl;
	
	if (!opts) {
		opts = {}
	}
	
	opts.event_target = opts.event_target || document;
	
	/*
		Do a lookup in the cache first
	*/
	if ( (longurl = this.getExpandedURLFromCache()) ) {
		shortener._onExpandResponseSuccess({
				'shorturl':shorturl,
				'longurl' :longurl
			},
			opts.event_target
		);
		return;
	}
	
	/*
		if not cached, do query to look it up
	*/
	var xhr = jQuery.ajax({
		complete:function(xhr, rstr) {
		},
		'error':function(xhr, msg, exc) {
			sc.helpers.dump(this.url + ' error:'+msg);
			
			var errobj = {'url':this.url, 'xhr':null, 'msg':null};
			
			if (xhr) {
				errobj.xhr = xhr;
				sc.helpers.dump("Error:"+xhr.status+" from "+ this.url);
			} else {
				sc.helpers.dump("Error:Unknown from "+ this.url);
				errobj.msg = 'Unknown Error';
			}
			shortener._onExpandResponseFailure(errobj, opts.event_target);
		},
		success:function(data) {
			// var shorturl = trim(data);
			data = sc.helpers.deJSON(data);
			var longurl = data[shorturl];
			
			/*
				save it to cache
			*/
			shortener.saveExpandedURLToCache(shorturl, longurl);
			
			shortener._onExpandResponseSuccess({
					'shorturl':shorturl,
					'longurl' :longurl
				},
				opts.event_target
			);
		},
		beforeSend:function(xhr) {},
		type:"GET",
		url :'http://longurlplease.appspot.com/api/v1.1',
		data:{ 'q':shorturl }
	});
};

/**
 * @TODO 
 */
SpazShortURL.prototype._onExpandResponseSuccess = function(data, target) {
	sc.helpers.triggerCustomEvent(sc.events.newExpandURLSuccess, target, data);
};

/**
 * @TODO 
 */
SpazShortURL.prototype._onExpandResponseFailure = function(errobj, target) {
	sc.helpers.triggerCustomEvent(sc.events.newExpandURLFailure, target, errobj);
};


SpazShortURL.prototype.findExpandableURLs = function(str) {
	var x, i, matches = [], re_matches, key, thisdomain, thisregex, regexes = [];
	
	for (var i=0; i < SPAZCORE_EXPANDABLE_DOMAINS.length; i++) {
		thisdomain = SPAZCORE_EXPANDABLE_DOMAINS[i];
		if (thisdomain == 'ff.im') {
			regexes.push(new RegExp("http://"+thisdomain+"/(-?[a-zA-Z0-9]+)", "gi"));
		} else {
			regexes.push(new RegExp("http://"+thisdomain+"/([a-zA-Z0-9]+)", "gi"));
		}
		
	};
	
	for (var i=0; i < regexes.length; i++) {
		thisregex = regexes[i];
		sch.dump("looking for "+thisregex+ " in '"+str+"'");
		while( (re_matches = thisregex.exec(sch.trim(str))) != null) {
			matches.push(re_matches[0]);
		}		
	};
	
	sch.dump(matches);
	
	if (matches.length > 0) {
		return matches;
	} else {
		return null;
	}

};


SpazShortURL.prototype.expandURLs = function(urls, target) {
	for (var i=0; i < urls.length; i++) {
		var thisurl = urls[i];
		sch.dump('expanding '+thisurl);
		this.expand(thisurl, { 'event_target':target });
	};
};



/**
 * @param {string} str  the string to replace the URLs in
 * @param {string} shorturl 
 * @param {string} longurl 
 */
SpazShortURL.prototype.replaceExpandableURL = function(str, shorturl, longurl) {
	str = str.replace(shorturl, longurl, 'gi');
	/*
		we also expand the non-http://-prefixed versions. Wonder if this is a bad idea, though -- seems
		possible we could have unexpected consqeuences with this
	*/
	str = str.replace(shorturl.replace('http://', ''), longurl.replace('http://', ''), 'gi');
	return str;
};



SpazShortURL.prototype.getExpandedURLFromCache = function(shortURL) {
	return this.expanded_cache[shortURL];
};

SpazShortURL.prototype.saveExpandedURLToCache  = function(shortURL, longURL) {
	this.expanded_cache[shortURL] = longURL;
};/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
plusplus: false,
undef: true,
white: false,
onevar: false 
 */
var sc;

/**
 * SpazTemplate 
 * designed for fast templating functions
 * @class SpazTemplate
 */
function SpazTemplate() {
	
	this._tpls = {};
	
}

/**
 * @param string name      the name to call the method with in parseTemplate
 * @param method function  the template methid. Should take one param for input data, returns string
 */
SpazTemplate.prototype.addTemplateMethod = function(name, method) {
	this._tpls[name] = method;
};


/**
 * @param string  methodname  the template method to call.
 * @param mixed   data        data to be used by the template method 
 * @return string;
 */
SpazTemplate.prototype.parseTemplate = function(methodname, data) {
	var parsed = this._tpls[methodname](data);
	
	return parsed;
};

/**
 * @param string methodname  the template method to call
 * @param array data_array   an array of objects to pass to the template method
 * return string
 */
SpazTemplate.prototype.parseArray    = function(methodname, data_array) {
	var parsed = '';
	for(var k=0; k < data_array.length; k++) {
		parsed += this.parseTemplate(methodname, data_array[k]);
	}
	return parsed;
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
plusplus: false,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery;

/**
 * @fileOverview File containing the SpazTimeline object definition
 * @author <a href="mailto:coj@funkatron.com">coj@funkatron.com</a>
 */


/**
 * This object provides an API for managing the content of a timeline 
 * Currently this requires jQuery, but that could change or be overwritten
 * on a per-app basis
 * @requires jQuery
 * @constructor
 */
var SpazTimeline = function(opts) {
	
	var thisTL = this;	
	/**
	 * This is a wrapper function for the refresher interval
	 * we define this here and use a closure to solve a scope issue when the interval fires
	 * @function
	 */
	this.refresh = function() {
		sch.debug('Refreshing timeline');
		thisTL.requestData.call(thisTL);
	};
	
	
	/**
	 * Again, due to scope issues, we define this here to take advantage of the closure 
	 */
	this.onSuccess = function(e) {
		sch.debug('onSuccess timeline');
		var data = sc.helpers.getEventData(e);
		thisTL.data_success.call(thisTL, e, data);
		thisTL.startRefresher();	
	};

	/**
	 * Again, due to scope issues, we define this here to take advantage of the closure 
	 */
	this.onFailure = function(e) {
		sch.debug('onFailure timeline');
		var data = sc.helpers.getEventData(e);
		thisTL.data_failure.call(thisTL, e, data);
		thisTL.startRefresher();	
	};
	
	
	/*
		By breaking this out, we can more easily override the 
		constructor process
	*/
	this._init(opts);
};


SpazTimeline.prototype._init = function(opts) {
	
	opts = opts || {};
	
	this.max_items                   = opts.max_items     || 100;	
	this.refresh_time                = opts.refresh_time  || 1000*60*2; // mseconds
	
	this.timeline_container_selector = opts.timeline_container_selector || '#timeline';
	this.timeline_item_selector      = opts.timeline_item_selector		|| 'div.timeline-entry';
	// this.entry_relative_time_selector= opts.entry_relative_time_selector|| '.date';
	this.event_target				 = opts.event_target || jQuery(this.timeline_container_selector).get(0);
	
	this.add_method			 		 = opts.add_method    || 'prepend';  // prepend or append
	
	this.success_event				 = opts.success_event || 'timeline-success';
	this.failure_event				 = opts.failure_event || 'timeline-failure';
	
	this.renderer	                 = opts.renderer      || null;  // required
	this.request_data				 = opts.request_data  || null;  // required
	this.data_success				 = opts.data_success  || null;  // required
	this.data_failure				 = opts.data_failure  || null;
	this.refresher                   = opts.refresher     || null;
	
	if (!this.renderer) {
		throw new Error ("renderer is required");
	}
	if (!this.request_data) {
		throw new Error ("request_data is required");
	}
	if (!this.data_success) {
		throw new Error ("data_success is required");
	}

	this.container = jQuery(this.timeline_container_selector).get(0);


};

/**
 * the timeline 
 */
SpazTimeline.prototype.last_id = -1;

/**
 * an array of data items that are represented in the timeline 
 */
SpazTimeline.prototype.model = [];

/**
 * call this after initialization 
 */
SpazTimeline.prototype.start = function() {
	sch.debug('Starting timeline');
	this.requestData();
};

/**
 * right now this does the same as start(), but could change in the future 
 */
SpazTimeline.prototype.refresh = function() {
	sch.debug('Refreshing timeline (prototype)');
	this.requestData();
};


/**
 * This is the method that gets data from the model and calls addItems() on what is returned 
 * 
 * @todo needs to be written to handle async call
 */
SpazTimeline.prototype.requestData = function() {
	sch.debug('Requesting data timeline');
	this.stopRefresher();
	
	this.stopListening();
	this.startListening();
	
	// call an appropriate model function
	var items = this.request_data();	
};



SpazTimeline.prototype.startListening = function() {
	var thisTL = this;
	sc.helpers.debug("Listening for "+thisTL.success_event);
	sc.helpers.listen(thisTL.event_target, thisTL.success_event, thisTL.onSuccess);
	sc.helpers.listen(thisTL.event_target, thisTL.failure_event, thisTL.onFailure);
};


SpazTimeline.prototype.stopListening = function() {
	var thisTL = this;
	sc.helpers.debug("Stopping listening for "+thisTL.success_event);
	sc.helpers.unlisten(thisTL.event_target, thisTL.success_event, thisTL.onSuccess);
	sc.helpers.unlisten(thisTL.event_target, thisTL.failure_event, thisTL.onFailure);
};

SpazTimeline.prototype.startRefresher = function() {
	this.stopRefresher();
	
	sc.helpers.debug('Starting refresher');
	if (this.refresh_time > 1000) { // the minimum refresh is 1000ms. Otherwise we don't auto-refresh
		sc.helpers.debug('Refresh time is '+this.refresh_time+'ms');
		this.refresher = setInterval(this.refresh, this.refresh_time);
	} else {
		sc.helpers.debug('Not starting refresher; refresh time is '+this.refresh_time+'ms');
	}
};


SpazTimeline.prototype.stopRefresher = function() {
	sc.helpers.debug('Stopping refresher');
	clearInterval(this.refresher);
};






/**
 * Stuff we should do when we're done using this, including
 * removing event listeners an stopping the refresher 
 */
SpazTimeline.prototype.cleanup = function() {
	sch.debug('Cleaning up timeline');
	this.stopListening();
	this.stopRefresher();
};

/**
 * given an array of objects, this will render them and add them to the timeline
 * @param {array} items
 */
SpazTimeline.prototype.addItems = function(items) {
	sch.debug('Adding items to timeline');
	
	var items_html    = [];
	var timeline_html = '';
	
	for (var x=0; x<items.length; x++) {
		items_html.push( this.renderItem(items[x], this.renderer) );
	}
	
	if (this.add_method === 'append') {
		items_html.reverse();
		timeline_html = '<div>'+items_html.join('')+'</div>';
		this.append(timeline_html);
	} else {
		timeline_html = '<div>'+items_html.join('')+'</div>';
		this.prepend(timeline_html);
	}
	
	this.removeExtraItems();
	
};


SpazTimeline.prototype.renderItem = function(item, templatefunc) {
	sch.debug('Rendering item in timeline');
	
	var html = templatefunc(item);
	
	return html;
	
};


SpazTimeline.prototype.removeExtraItems = function() {
	
	sch.debug('Removing extra items in timeline');
	
	if (this.add_method === 'append') {
		var remove_from_top = true;
	} else {
		remove_from_top = false;
	}
	
	sc.helpers.removeExtraElements(this.getEntrySelector(), this.max_items, remove_from_top);
};


SpazTimeline.prototype.removeItems = function(selector) {};


SpazTimeline.prototype.removeItem = function(selector) {};

/**
 * @param {string} selector
 * @return {boolean} 
 */
SpazTimeline.prototype.itemExists = function(selector) {
	
	sch.debug('Checking it item ('+selector+') exists in timeline');
	
	var items = this.select(selector);
	if (items.length>0) {
		return true;
	} else {
		return false;
	}
	
};


SpazTimeline.prototype.hideItems = function(selector) {
	sch.debug('Hiding items in timeline');
	
	this.filterItems(selector, 'blacklist');
};


SpazTimeline.prototype.showItems = function(selector) {
	sch.debug('Showing items in timeline');
	
	this.filterItems(selector, 'whitelist');
};


/**
 * @param {string} selector 
 * @param {string} type  "whitelist" or "blacklist"
 */
SpazTimeline.prototype.filterItems = function(selector, type) {};


/**
 * sorts the elements in the timeline according to the sorting function 
 */
SpazTimeline.prototype.sortItems = function(selector, sortfunc) {
	
	sch.debug('Sorting items in timeline');
	
	var items = this.select(selector);
	items.sort(sortfunc);
};



/**
 * This is a wrapper for the selector engine, so someone could swap in 
 * their own recipe if necessary. By default we use jQuery, and return the 
 * array of HTML elements (not the jQuery object)
 * @type DOMelement[]
 */
SpazTimeline.prototype.select = function(selector, container) {
	if (!container) {
		container = this.timeline_container_selector;
	}
	return jQuery(selector, container).get();
};

/**
 * wrapper for prepending to timeline 
 */
SpazTimeline.prototype.prepend = function(htmlitem) {
	jQuery(this.timeline_container_selector).prepend(htmlitem);
};
SpazTimeline.prototype.append = function(htmlitem) {
	jQuery(this.timeline_container_selector).append(htmlitem);
};

SpazTimeline.prototype.getEntrySelector = function() {
	return this.timeline_container_selector + ' ' + this.timeline_item_selector;
};
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, DOMParser, jQuery, sch;
 
/**
 * A library to interact with the API for theMovieDB.org 
 * @see <a href="http://api.themoviedb.org/2.1/">The API docs</a>
 */

/**
 * events raised here 
 */
if (!sc.events) { sc.events = {}; }
sc.events.tmdbMethodSuccess		= 'tmdbMethodSuccess';
sc.events.tmdbMethodFailure		= 'tmdbMethodFailure';
sc.events.tmdbMovieSearchSuccess		= 'tmdbMovieSearchSuccess';
sc.events.tmdbMovieSearchFailure		= 'tmdbMovieSearchFailure';
sc.events.tmdbMovieIMDBLookupSuccess	= 'tmdbMovieIMDBLookupSuccess';
sc.events.tmdbMovieIMDBLookupFailure	= 'tmdbMovieIMDBLookupFailure';
sc.events.tmdbMovieGetInfoSuccess		= 'tmdbMovieGetInfoSuccess';
sc.events.tmdbMovieGetInfoFailure		= 'tmdbMovieGetInfoFailure';
sc.events.tmdbMovieGetImagesSuccess		= 'tmdbMovieGetImagesSuccess';
sc.events.tmdbMovieGetImagesFailure		= 'tmdbMovieGetImagesFailure';
sc.events.tmdbPersonSearchSuccess		= 'tmdbPersonSearchSuccess';
sc.events.tmdbPersonSearchFailure		= 'tmdbPersonSearchFailure';
sc.events.tmdbPersonGetInfoSuccess		= 'tmdbPersonGetInfoSuccess';
sc.events.tmdbPersonGetInfoFailure		= 'tmdbPersonGetInfoFailure';
sc.events.tmdbHashGetInfoSuccess		= 'tmdbHashGetInfoSuccess';
sc.events.tmdbHashGetInfoFailure		= 'tmdbHashGetInfoFailure';



/**
 * @constructor
 * @param {Object} opts
 * @param {string} opts.apikey the api key
 * @param {string} [opts.lang] a language code. default is 'en'
 * @param {string} [opts.format] the data format to return. default is 'json'
 * @param {DOMElement} [opts.eventTarget] what to target triggered events with. default is the document element
 */
function SpazTMDB(opts) {
	
	/*
		set defaults
	*/
	opts = sch.defaults({
		'apikey':null,
		'lang'  :'en',
		'format':'json',
		'eventTarget':document
	}, opts);
	
	this.apikey = opts.apikey;
	this.lang   = opts.lang;
	this.format = opts.format;
	this.eventTarget = opts.eventTarget;
	
	this.baseURL = 'http://api.themoviedb.org/2.1/';
		
}

/**
 * Sets the API key
 * @param {string} apikey the api key used to access the API 
 */
SpazTMDB.prototype.setAPIKey = function(apikey) {
	this.apikey = apikey;
};

/**
 * Gets the API key
 * @returns {string} the api key that was previously set 
 */
SpazTMDB.prototype.getAPIKey = function() {
	return this.apikey;
};

/**
 * Search for movies by title
 * @param {string} value the value passed to the search method
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieSearch = function(value, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.search',
		'value' :value,
		'successEvent':sc.events.tmdbMovieSearchSuccess,
		'failureEvent':sc.events.tmdbMovieSearchFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Get info for a movie
 * @param {string|number} id The id of the movie (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieInfo = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.getInfo',
		'value' :id,
		'successEvent':sc.events.tmdbMovieGetInfoSuccess,
		'failureEvent':sc.events.tmdbMovieGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Get images for a movie
 * @param {string|number} id The id of the movie (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieImages = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.getImages',
		'value' :id,
		'successEvent':sc.events.tmdbMovieGetInfoSuccess,
		'failureEvent':sc.events.tmdbMovieGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Lookup a movie by IMDB id
 * @param {string} id The IMDB id of the movie. ex "tt0137523"
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.movieInfoIMDB = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Movie.imdbLookup',
		'value' :id,
		'successEvent':sc.events.tmdbMovieIMDBLookupSuccess,
		'failureEvent':sc.events.tmdbMovieIMDBLookupFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Search for a person
 * @param {string|number} id The id of the person (numeric)
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.personInfo = function(id, onSuccess, onFailure) {
	this.callMethod({
		'method':'Person.getInfo',
		'value' :id,
		'successEvent':sc.events.tmdbPersonGetInfoSuccess,
		'failureEvent':sc.events.tmdbPersonGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};



/**
 * Search for a person
 * @param {string} name The name to search for
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 */
SpazTMDB.prototype.personSearch = function(name, onSuccess, onFailure) {
	this.callMethod({
		'method':'Person.search',
		'value' :name,
		'successEvent':sc.events.tmdbPersonSearchSuccess,
		'failureEvent':sc.events.tmdbPersonSearchFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};




/**
 * Get movie info by file hash
 * @param {string} hash The hash corresponding to the movie
 * @param {function} [onSuccess] a callback 
 * @param {function} [onFailure] a callback 
 * @see <a href="http://trac.opensubtitles.org/projects/opensubtitles/wiki/HashSourceCodes">Hash Source Codes</a>
 */
SpazTMDB.prototype.movieInfoHash = function(hash, onSuccess, onFailure) {
	this.callMethod({
		'method':'Hash.getInfo',
		'value' :hash,
		'successEvent':sc.events.tmdbHashGetInfoSuccess,
		'failureEvent':sc.events.tmdbHashGetInfoFailure,
		'onSuccess':onSuccess,
		'onFailure':onFailure
 	});
};






/**
 * Method to construct an API URL from the passed method and value strings
 * @param {string} method the string for this parameter. See API docs for list
 * @param {string} value the value we're passing to the API method. This will be encoded using encodeURIComponent() 
 * @returns {string} the URL string
 */
SpazTMDB.prototype.getURL = function(method, value) {
	var url  = this.baseURL + method + "/" + this.lang + "/" + this.format + "/" + this.apikey + "/" + encodeURIComponent(value);
	return url;
};




/**
 * a general purpose method for calling API methods via ajax and raising
 * events on success/failure. callbacks can optionally be set for success
 * or failure as well
 * @param {Object} opts options for the method call
 * @param {string} opts.method the method to call
 * @param {string} opts.value value passed to method
 * @param {string} [opts.successEvent] the type of event to raise on success. default is {@link sc.events.tmdbMethodSuccess}
 * @param {string} [opts.failureEvent] the type of event to raise on failure. default is {@link sc.events.tmdbMethodFailure}
 * @param {function} [opts.onSuccess] a callback function called on success. takes args data, textStatus
 * @param {function} [opts.onFailure] a callback function called on failure. takes args xhr, msg, exc
 * 
 */
SpazTMDB.prototype.callMethod = function(opts) {
	var that = this;
	
	opts = sch.defaults({
		'method'      :'Movie.search',
		'value'       :'Road House',
		'successEvent':sc.events.tmdbMethodSuccess,
		'failureEvent':sc.events.tmdbMethodFailure,
		'onSuccess'   :null, // callback on success
		'onFailure'   :null  // callback on failure
	}, opts);
	
	var url = this.getURL(opts.method, opts.value);
	
	jQuery.ajax({
		'url' :url,
		'type':'GET',
		'success':function(data, textStatus) {
			if (opts.onSuccess) {
				opts.onSuccess.call(that, data, textStatus);
			}
			sch.trigger(opts.successEvent, that.eventTarget, data);
		},
		'error':function(xhr, msg, exc) {
			if (opts.onFailure) {
				opts.onFailure.call(that, xhr, msg, exc);
			}
			sch.trigger(opts.failure, that.eventTarget, {'url':url, 'xhr':xhr, 'msg':msg});
		}
	});
};

/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
plusplus: false,
regexp: false,
sub: true,
undef: true,
white: false,
onevar: false 
 */
var sc, jQuery, window, Mojo, use_palmhost_proxy;

/**
 * @depends ../helpers/string.js 
 * @depends ../helpers/datetime.js 
 * @depends ../helpers/event.js 
 * @depends ../helpers/json.js 
 * @depends ../helpers/sys.js 
 */


/**
 * various constant definitions
 */
var SPAZCORE_SECTION_FRIENDS = 'friends';
var SPAZCORE_SECTION_HOME = 'home';
var SPAZCORE_SECTION_REPLIES = 'replies';
var SPAZCORE_SECTION_DMS = 'dms';
var SPAZCORE_SECTION_FAVORITES = 'favorites';
var SPAZCORE_SECTION_COMBINED = 'combined';
var SPAZCORE_SECTION_PUBLIC = 'public';
var SPAZCORE_SECTION_SEARCH = 'search';
var SPAZCORE_SECTION_USER = 'user-timeline';
var SPAZCORE_SECTION_FRIENDLIST = 'friendslist';
var SPAZCORE_SECTION_FOLLOWERSLIST = 'followerslist';
var SPAZCORE_SECTION_USERLISTS = 'userlists';

var SPAZCORE_SERVICE_TWITTER = 'twitter';
var SPAZCORE_SERVICE_IDENTICA = 'identi.ca';
var SPAZCORE_SERVICE_CUSTOM = 'custom';
var SPAZCORE_SERVICEURL_TWITTER = 'https://api.twitter.com/1/';
var SPAZCORE_SERVICEURL_IDENTICA = 'https://identi.ca/api/';



/**
 * A Twitter API library for Javascript
 * 
 * This requires jQuery. Tested with 1.2.6
 * 
 * 
 * jQuery events raised by this library
 * 
 * 'spaztwit_ajax_error'
 * 'new_public_timeline_data' (data)
 * 'new_friends_timeline_data' (data)
 * 'error_friends_timeline_data' (data)
 * 'new_replies_timeline_data' (data)
 * 'error_replies_timeline_data' (data)
 * 'new_dms_timeline_data' (data)
 * 'error_dms_timeline_data' (data)
 * 'new_combined_timeline_data' (data)
 * 'error_combined_timeline_data' (data)
 * 'new_favorites_timeline_data' (data)
 * 'error_favorites_timeline_data' (data)
 * 'verify_credentials_succeeded' (data)
 * 'verify_credentials_failed' (data)
 * 'update_succeeded' (data)
 * 'update_failed' (data)
 * 'get_user_succeeded' (data)
 * 'get_user_failed' (data)
 * 'get_one_status_succeeded' (data)
 * 'get_one_status_failed' (data)
 * 'new_search_timeline_data' (data)
 * 'error_search_timeline_data' (data)
 * 'new_trends_data' (data)
 * 'error_trends_data' (data)
 * 'new_saved_searches_data' (data)
 * 'error_saved_searches_data' (data)
 * 'create_saved_search_succeeded' (data)
 * 'create_saved_search_failed' (data)
 * 'destroy_saved_search_succeeded' (data)
 * 'destroy_saved_search_failed' (data)
 * 'create_favorite_succeeded'
 * 'create_favorite_failed'
 * 'destroy_favorite_succeeded'
 * 'destroy_favorite_failed'
 * 'create_friendship_succeeded'
 * 'create_friendship_failed'
 * 'destroy_friendship_succeeded'
 * 'destroy_friendship_failed'
 * 'create_block_succeeded'
 * 'create_block_failed'
 * 'destroy_block_succeeded'
 * 'destroy_block_failed'
 * 
 * 
 * @param username string
 * @param password string
 * @class SpazTwit
*/
function SpazTwit(username, password, opts) {
	
	this.username = username;
	this.password = password;
	
	this.opts            = opts || {};
	this.opts.event_mode = this.opts.event_mode || 'DOM';
	this.opts.event_target = this.opts.event_target || document;
	this.opts.timeout    = this.opts.timeout || this.DEFAULT_TIMEOUT; // 60 seconds default
	
	this.setSource('SpazCore');
	
	this.initializeData();
	
	this.initializeCombinedTracker();
	
	/*
		Cache for one-shot users and posts. Not sure what we'll do with it yet
	*/
	this.cache = {
		users:{},
		posts:{}
	};
	
	this.me = {};
	

	this.setBaseURL(SPAZCORE_SERVICEURL_TWITTER);

	/**
	 * remap dump calls as appropriate 
	 */
	if (sc && sc.helpers && sc.helpers.dump) {
		window.dump = sc.helpers.dump;
	} else { // do nothing!
		var dump = function(input) {
			return;
		};
	}
}


SpazTwit.prototype.DEFAULT_TIMEOUT = 1000*60;


SpazTwit.prototype.getUsername = function() {
	return this.username;
};
SpazTwit.prototype.getPassword = function() {
	return this.password;
};

/**
 * retrieves the last status id retrieved for a given section
 * @param {string} section  use one of the defined constants (ex. SPAZCORE_SECTION_HOME)
 * @return {integer} the last id retrieved for this section
 */
SpazTwit.prototype.getLastId   = function(section) {
	return this.data[section].lastid;
};

/**
 * sets the last status id retrieved for a given section
 * @param {string} section  use one of the defined constants (ex. SPAZCORE_SECTION_HOME)
 * @param {integer} id  the new last id retrieved for this section
 */
SpazTwit.prototype.setLastId   = function(section, id) {
	this.data[section].lastid = parseInt(id, 10);
};


SpazTwit.prototype.initializeData = function() {
	/*
		this is where we store timeline data and settings for persistence
	*/
	this.data = {};
	this.data[SPAZCORE_SECTION_HOME] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':200,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FRIENDS] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':200,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_REPLIES] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':50,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_DMS] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':50,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FAVORITES] = {
		'lastid':   1,
		'items':   [],
		'newitems':[],
		'max':100,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_COMBINED] = {
		'items':   [],
		'newitems':[],
		'max':400,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FRIENDLIST] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_FOLLOWERSLIST] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	this.data[SPAZCORE_SECTION_SEARCH] = {
		'lastid':  0, // search api prefers 0, will freak out on "1"
		'items':   [],
		'newitems':[],
		'lastresultdata':{},
		'max':200,
		'min_age':30
	};
	this.data[SPAZCORE_SECTION_USERLISTS] = {
		'items':   [],
		'newitems':[],
		'max':500,
		'min_age':5*60
	};
	// this.data.byid = {};
};


/**
 * resets the combined_finished progress tracker 
 */
SpazTwit.prototype.initializeCombinedTracker = function() {
	this.combined_finished = {};
	this.combined_finished[SPAZCORE_SECTION_HOME] = false;
	this.combined_finished[SPAZCORE_SECTION_REPLIES] = false;
	this.combined_finished[SPAZCORE_SECTION_DMS] = false;
	
	this.combined_errors = [];
};

/**
 * Checks to see if the combined timeline is finished 
 * @return {boolean}
 */
SpazTwit.prototype.combinedTimelineFinished = function() {
	for (var i in this.combined_finished) {
		if (!this.combined_finished[i]) {
			return false;
		}
	}
	return true;
};

/**
 * Checks to see if the combined timeline is finished 
 * @return {boolean}
 */
SpazTwit.prototype.combinedTimelineHasErrors = function() {
	if (this.combined_errors.length > 0) {
		return true;
	} else {
		return false;
	}
};



/**
 * sets the base URL
 * @param {string} newurl
 */
SpazTwit.prototype.setBaseURL= function(newurl) {
	
	var lastchar = newurl.charAt(newurl.length -1);
	if (lastchar !== '/') {
		newurl = newurl + '/';
	}
	
	this.baseurl = newurl;
};


/**
 * sets the base URL by the service type
 * @param {string} service  see SPAZCORE_SERVICE_* 
 */
SpazTwit.prototype.setBaseURLByService= function(service) {
	
	var baseurl = '';
	
	switch (service) {
		case SPAZCORE_SERVICE_TWITTER:
			baseurl = SPAZCORE_SERVICEURL_TWITTER;
			break;
		case SPAZCORE_SERVICE_IDENTICA:
			baseurl = SPAZCORE_SERVICEURL_IDENTICA;
			break;
		default:
			baseurl = SPAZCORE_SERVICEURL_TWITTER;
			break;
	}
	
	this.baseurl = baseurl;
};



/*
 * sets the username and password
 * @param username string
 * @param password string
*/
SpazTwit.prototype.setCredentials= function(username, password) {
	this.username = username;
	this.password = password;	
};


/**
 * set the source string we will pass on updates
 * 
 * @param {string} new_source 
 */
SpazTwit.prototype.setSource = function(new_source) {
	this.source = new_source;
};



/*
 * given a key, it returns the URL (baseurl+API method path)
 * @param {string} key the key for the URL
 * @param {array|object} urldata data to included in the URL as GET data
*/
SpazTwit.prototype.getAPIURL = function(key, urldata) {
	var urls = {};



    // Timeline URLs
    urls.public_timeline    = "statuses/public_timeline.json";
    urls.friends_timeline   = "statuses/friends_timeline.json";
    urls.home_timeline		= "statuses/home_timeline.json";
    urls.user_timeline      = "statuses/user_timeline.json";
    urls.replies_timeline   = "statuses/replies.json";
    urls.show				= "statuses/show/{{ID}}.json";
    urls.favorites          = "favorites.json";
    urls.user_favorites     = "favorites/{{ID}}.json"; // use this to retrieve favs of a user other than yourself
    urls.dm_timeline        = "direct_messages.json";
    urls.dm_sent            = "direct_messages/sent.json";
    urls.friendslist        = "statuses/friends.json";
    urls.followerslist      = "statuses/followers.json";
    urls.show_user			= "users/show/{{ID}}.json";
    urls.featuredlist       = "statuses/featured.json";

    // Action URLs
    urls.update           	= "statuses/update.json";
    urls.destroy_status   	= "statuses/destroy/{{ID}}.json";
    urls.friendship_create  = "friendships/create/{{ID}}.json";
    urls.friendship_destroy	= "friendships/destroy/{{ID}}.json";
    urls.block_create		= "blocks/create/{{ID}}.json";
    urls.block_destroy		= "blocks/destroy/{{ID}}.json";
    urls.start_notifications= "notifications/follow/{{ID}}.json";
    urls.stop_notifications = "notifications/leave/{{ID}}.json";
    urls.favorites_create 	= "favourings/create/{{ID}}.json";
    urls.favorites_destroy	= "favourings/destroy/{{ID}}.json";
    urls.saved_searches_create 	= "saved_searches/create.json";
    urls.saved_searches_destroy	= "saved_searches/destroy/{{ID}}.json";
    urls.verify_credentials = "account/verify_credentials.json";
    urls.ratelimit_status   = "account/rate_limit_status.json";
	urls.update_profile		= "account/update_profile.json";
	urls.saved_searches		= "saved_searches.json";

    // User lists URLs
    urls.lists              = "{{USER}}/lists.json";
    urls.lists_list         = "{{USER}}/lists/{{SLUG}}.json";
    urls.lists_memberships  = "{{USER}}/lists/memberships.json";
    urls.lists_timeline     = "{{USER}}/lists/{{SLUG}}/statuses.json";
    urls.lists_members      = "{{USER}}/{{SLUG}}/members.json";
    urls.lists_check_member = "{{USER}}/{{SLUG}}/{{ID}}.json";
    urls.lists_subscribers  = "{{USER}}/{{SLUG}}/subscribers.json";
    urls.lists_check_subscriber = "{{USER}}/{{SLUG}}/subscribers/{{ID}}.json";

	// search
	if (this.baseurl === SPAZCORE_SERVICEURL_TWITTER) {
		urls.search				= "http://search.twitter.com/search.json";
		urls.trends				= "http://search.twitter.com/trends.json";
	} else {
		urls.search				= "search.json";
		urls.trends				= "trends.json";
	}

    // misc
    urls.test 			  	= "help/test.json";
    urls.downtime_schedule	= "help/downtime_schedule.json";

	
	if (urls[key].indexOf('{{ID}}') > -1) {
		if (typeof(urldata) === 'string') {
			urls[key] = urls[key].replace('{{ID}}', urldata);
		} else if (urldata && typeof(urldata) === 'object') {
			urls[key] = urls[key].replace('{{ID}}', urldata.id);
		}
		
	}

    // Token replacement for user lists
    if (urls[key].indexOf('{{USER}}') > - 1) {
        if (urldata && typeof(urldata) === 'object') {
            urls[key] = urls[key].replace('{{USER}}', urldata.user);
        }
    }

    if (urls[key].indexOf('{{SLUG}}') > -1) {
        if (urldata && typeof(urldata) === 'object') {
            urls[key] = urls[key].replace('{{SLUG}}', urldata.slug);
        }
    }

    if (urls[key]) {
	
		if (urldata && typeof urldata !== "string") {
			urldata = '?'+jQuery.param(urldata);
		} else {
			urldata = '';
		}
		
		if (this.baseurl === SPAZCORE_SERVICEURL_TWITTER && (key === 'search' || key === 'trends')) {
			return this._postProcessURL(urls[key] + urldata);
		} else {
			return this._postProcessURL(this.baseurl + urls[key] + urldata);
		}
        
    } else {
        return false;
    }

};




/*
 * checks the currently set username and password against the API. Can take
 * a username and password; will use this.username and this.password otherwise.
 * Calls this._processAuthenticatedUser() if successful
 * 
 * @param {string} username optional
 * @param {string} password optional
*/
SpazTwit.prototype.verifyCredentials = function(username, password) {
	var url = this.getAPIURL('verify_credentials');
	
	if (!username) {
		username = this.username;
	}
	if (!password) {
		password = this.password;
	}
	
	var opts = {
		'url':url,
		'username':username,
		'password':password,
		'process_callback': this._processAuthenticatedUser,
		'success_event_type':'verify_credentials_succeeded',
		'failure_event_type':'verify_credentials_failed',
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

/**
 * This takes data retrieved from the verifyCredentials method and stores it
 * in this.me. it then fires off the event specified in finished_event
 * 
 * @param {object} data the data returned by a successful call to the verifyCredentials API method
 * @param {string} finished_event the type of event to fire 
 * @private
 */
SpazTwit.prototype._processAuthenticatedUser = function(data, opts) {
	this.me = data;
	this.initializeData();
	this.triggerEvent(opts.success_event_type, this.me);
	
};


/**
 * Initiates retrieval of the public timeline. 
 */
SpazTwit.prototype.getPublicTimeline = function() {
	var url = this.getAPIURL('public_timeline');
	
	var xhr = this._getTimeline({
		'url':url,
		'success_event_type': 'new_public_timeline_data'
	});
};


/**
 * Initiates retrieval of the home timeline (all the people you are following)
 * 
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getHomeTimeline = function(since_id, count, page, processing_opts) {
	
	if (!page) { page = null;}
	if (!count) { count = 50;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_HOME].lastid && this.data[SPAZCORE_SECTION_HOME].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_HOME].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_HOME;
	}
	
	var data = {};
	data['since_id'] = since_id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('home_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processHomeTimeline,
		'success_event_type': 'new_home_timeline_data',
		'failure_event_type': 'error_home_timeline_data',
		'processing_opts':processing_opts
	});
};

/**
 * @private
 */
SpazTwit.prototype._processHomeTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_HOME, ret_items, opts, processing_opts);
};



/**
 * Initiates retrieval of the friends timeline (all the people you are following)
 * 
 * @param {integer} since_id default is 1
 * @param {integer} count default is 200 
 * @param {integer} page default is null (ignored if null)
 */
SpazTwit.prototype.getFriendsTimeline = function(since_id, count, page, processing_opts) {
	
	if (!page) { page = null;}
	if (!count) { count = 50;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_FRIENDS].lastid && this.data[SPAZCORE_SECTION_FRIENDS].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_FRIENDS].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_FRIENDS;
	}
	
	var data = {};
	data['since_id'] = since_id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('friends_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processFriendsTimeline,
		'success_event_type': 'new_friends_timeline_data',
		'failure_event_type': 'error_friends_timeline_data',
		'processing_opts':processing_opts
	});
};

/**
 * @private
 */
SpazTwit.prototype._processFriendsTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_FRIENDS, ret_items, opts, processing_opts);
};


/**
 *  
 */
SpazTwit.prototype.getReplies = function(since_id, count, page, processing_opts) {	
	if (!page) { page = null;}
	if (!count) { count = null;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_REPLIES].lastid && this.data[SPAZCORE_SECTION_REPLIES].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_REPLIES].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_REPLIES;
	}
	
	
	var data = {};
	data['since_id'] = since_id;
	if (page) {
		data['page'] = page;
	}
	if (count) {
		data['count'] = count;
	}
	
	var url = this.getAPIURL('replies_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processRepliesTimeline,
		'success_event_type': 'new_replies_timeline_data',
		'failure_event_type': 'error_replies_timeline_data',
		'processing_opts':processing_opts
	});

};


/**
 * @private
 */
SpazTwit.prototype._processRepliesTimeline = function(ret_items, opts, processing_opts) {
	sc.helpers.dump('Processing '+ret_items.length+' items returned from replies method');
	this._processTimeline(SPAZCORE_SECTION_REPLIES, ret_items, opts, processing_opts);
};

/**
 *  
 */
SpazTwit.prototype.getDirectMessages = function(since_id, count, page, processing_opts) {
	if (!page) { page = null;}
	if (!count) { count = null;}
	if (!since_id) {
		if (this.data[SPAZCORE_SECTION_DMS].lastid && this.data[SPAZCORE_SECTION_DMS].lastid > 1) {
			since_id = this.data[SPAZCORE_SECTION_DMS].lastid;
		} else {
			since_id = 1;
		}
	}
	
	if (!processing_opts) {
		processing_opts = {};
	}
	
	if (processing_opts.combined) {
		processing_opts.section = SPAZCORE_SECTION_DMS;
	}
	
	var data = {};
	data['since_id'] = since_id;
	if (page) {
		data['page'] = page;
	}
	if (count) {
		data['count'] = count;
	}
	
	var url = this.getAPIURL('dm_timeline', data);
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processDMTimeline,
		'success_event_type': 'new_dms_timeline_data',
		'failure_event_type': 'error_dms_timeline_data',
		'processing_opts':processing_opts		
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processDMTimeline = function(ret_items, opts, processing_opts) {
	sc.helpers.dump('Processing '+ret_items.length+' items returned from DM method');
	this._processTimeline(SPAZCORE_SECTION_DMS, ret_items, opts, processing_opts);
};

/**
 *  
 */
SpazTwit.prototype.getFavorites = function(page, processing_opts) {	
	if (!page) { page = null;}
	if (!processing_opts) {
		processing_opts = {};
	}
	
	var data = {};
	if (page) {
		data['page'] = page;
	}
	
	var url = this.getAPIURL('favorites', data);

	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processFavoritesTimeline,
		'success_event_type': 'new_favorites_timeline_data',
		'failure_event_type': 'error_favorites_timeline_data',
		'processing_opts':processing_opts
	});

};
/**
 * @private
 */
SpazTwit.prototype._processFavoritesTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_FAVORITES, ret_items, opts, processing_opts);
};



SpazTwit.prototype.getSent = function(since_id, count, page) {}; // auth user's sent statuses
SpazTwit.prototype.getSentDirectMessages = function(since_id, page) {};

SpazTwit.prototype.getUserTimeline = function(id, count, page) {
	if (!id) {
		return false;
	}
	if (!page) { page = null;}
	if (!count) { count = 10;}
	
	var data = {};
	data['id']  = id;
	data['count']	 = count;
	if (page) {
		data['page'] = page;
	}
	
	
	var url = this.getAPIURL('user_timeline', data);
	
	this._getTimeline({
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback'	: this._processUserTimeline,
		'success_event_type': 'new_user_timeline_data',
		'failure_event_type': 'error_user_timeline_data'
	});
}; // given user's sent statuses


/**
 * @private
 */
SpazTwit.prototype._processUserTimeline = function(ret_items, opts, processing_opts) {
	this._processTimeline(SPAZCORE_SECTION_USER, ret_items, opts, processing_opts);
};



/**
 * this retrieves three different timelines. the event "new_combined_timeline_data"
 * does not fire until ALL async ajax calls are made 
 * 
 * 
 */
SpazTwit.prototype.getCombinedTimeline = function(com_opts) {
	var home_count, friends_count, replies_count, dm_count, home_since, friends_since, dm_since, replies_since = null;

	var opts = {
		'combined':true
	};
	
	if (com_opts) {
		if (com_opts.friends_count) {
			friends_count = com_opts.friends_count;
		}
		if (com_opts.home_count) {
			home_count = com_opts.home_count;
		}
		if (com_opts.replies_count) {
			replies_count = com_opts.replies_count; // this is not used yet
		}
		if (com_opts.dm_count) {
			dm_count = com_opts.dm_count; // this is not used yet
		}
		if (com_opts.home_since) {
			home_since = com_opts.home_since;
		}
		if (com_opts.friends_since) {
			friends_since = com_opts.friend_since;
		}
		if (com_opts.replies_since) {
			replies_since = com_opts.replies_since;
		}
		if (com_opts.dm_since) {
			dm_since = com_opts.dm_since;
		}
		
		/*
			we might still only pass in friends_* opts, so we translate those to home_*
		*/
		if (!home_count) { home_count = friends_count; }
		if (!home_since) { home_since = friends_since; }
		
		if (com_opts.force) {
			opts.force = true;
		}
	}
	
	this.getHomeTimeline(home_since, home_count, null, opts);
	this.getReplies(replies_since, replies_count, null, opts);
	this.getDirectMessages(dm_since, dm_count, null, opts);
};



SpazTwit.prototype.search = function(query, since_id, results_per_page, page, lang, geocode) {
	if (!page) { page = 1;}
	// if (!since_id) {
	// 	if (this.data[SPAZCORE_SECTION_SEARCH].lastid && this.data[SPAZCORE_SECTION_SEARCH].lastid > 1) {
	// 		since_id = this.data[SPAZCORE_SECTION_SEARCH].lastid;
	// 	} else {
	// 		since_id = 1;
	// 	}
	// }
	if (!results_per_page) {
		results_per_page = 50;
	}
	
	
	var data = {};
	data['q']        = query;
	data['rpp']      = results_per_page;
	// data['since_id'] = since_id;
	data['page']     = page;
	if (lang) {
		data['lang'] = lang;
	}
	if (geocode) {
		data['geocode'] = geocode;
	}
	
	var url = this.getAPIURL('search', data);
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processSearchTimeline,
		'success_event_type': 'new_search_timeline_data',
		'failure_event_type': 'error_search_timeline_data'
	});
	
};

/**
 * @private
 */
SpazTwit.prototype._processSearchTimeline = function(search_result, opts, processing_opts) {	
	/*
		Search is different enough that we need to break it out and 
		write a custom alternative to _processTimeline
	*/
	if (!processing_opts) { processing_opts = {}; }

	/*
		reset .newitems data properties
	*/
	this.data[SPAZCORE_SECTION_SEARCH].newitems = [];
	
	/*
		put these results in the lastresultdata property
	*/
	this.data[SPAZCORE_SECTION_SEARCH].lastresultdata = search_result;
	
	/*
		grab the array of items
	*/
	var ret_items = search_result.results;

	if (ret_items.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processSearchItem(ret_items[k], SPAZCORE_SECTION_SEARCH);
		}

		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
					
		/*
			set lastid
		*/ 
		var lastid = ret_items[ret_items.length-1].id;
		this.data[SPAZCORE_SECTION_SEARCH].lastid = lastid;
		sc.helpers.dump('this.data['+SPAZCORE_SECTION_SEARCH+'].lastid:'+this.data[SPAZCORE_SECTION_SEARCH].lastid);

		/*
			add new items to data.newitems array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].newitems = ret_items;

		/*
			concat new items onto data.items array
		*/
		this.data[SPAZCORE_SECTION_SEARCH].items = this.data[SPAZCORE_SECTION_SEARCH].items.concat(this.data[SPAZCORE_SECTION_SEARCH].newitems);
		this.data[SPAZCORE_SECTION_SEARCH].items = this.removeDuplicates(this.data[SPAZCORE_SECTION_SEARCH].items);
		this.data[SPAZCORE_SECTION_SEARCH].items = this.removeExtraElements(this.data[SPAZCORE_SECTION_SEARCH].items, this.data[SPAZCORE_SECTION_SEARCH].max);


		var search_info = {
			'since_id'         : search_result.since_id,
			'max_id'           : search_result.max_id,
			'refresh_url'      : search_result.refresh_url,
			'results_per_page' : search_result.results_per_page,
			'next_page'        : search_result.next_page,
			'completed_in'     : search_result.completed_in,
			'page'             : search_result.page,
			'query'            : search_result.query
		};
		this.triggerEvent(opts.success_event_type, [this.data[SPAZCORE_SECTION_SEARCH].newitems, search_info]);
		


	} else { // no new items, but we should fire off success anyway
		this.triggerEvent(opts.success_event_type, []);
	}
	
};



SpazTwit.prototype._processSearchItem = function(item, section_name) {
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	// sc.helpers.dump(item);
	
	item.SC_is_search = true;

	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at);
	}
	
	/*
		add raw text .SC_raw_text for unmodified text
	*/
	if (!item.SC_text_raw) {
		item.SC_text_raw = item.text;
	}
	
	/*
		add "in_reply_to_screen_name" if it does not exist
	*/
	if (!item.in_reply_to_screen_name && item.in_reply_to_user_id) {
		/**
		 * @todo get this from the Spaz code 
		 */
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	/*
		normalize so we have as much user data in this object as possible
	*/
	item.user = {
		'profile_image_url':item.profile_image_url,
		'screen_name':item.from_user,
		'id':item.from_user_id
	};
	
	/*
		The source info here is encoded differently
	*/
	item.source = sc.helpers.fromHTMLSpecialChars(item.source);
	
	
	return item;
};


SpazTwit.prototype.getTrends = function() {
	var url = this.getAPIURL('trends');
	this._getTimeline({
		'url':url,
		'process_callback'	: this._processTrends,
		'success_event_type': 'new_trends_data',
		'failure_event_type': 'error_trends_data'
	});
};


/**
 * @private
 */
SpazTwit.prototype._processTrends = function(trends_result, opts, processing_opts) {

	if (!processing_opts) { processing_opts = {}; }
	
	/*
		grab the array of items
	*/
	var ret_items = trends_result.trends;

	if (ret_items.length > 0) {

		for (var k=0; k<ret_items.length; k++) {
			ret_items[k].searchterm = ret_items[k].name;
			if ( /\s+/.test(ret_items[k].searchterm)) { // if there is whitespace, wrap in quotes
				ret_items[k].searchterm = '"'+ret_items[k].searchterm+'"';
			}
		}
		// jQuery().trigger(finished_event, [ret_items]);
		this.triggerEvent(opts.success_event_type, ret_items);
		
	}
};


/**
 * this is a general wrapper for timeline methods
 * @param {obj} opts a set of options for this method 
 * @private
 */
SpazTwit.prototype._getTimeline = function(opts) {
	
	opts = sch.defaults({
		'method':'GET',
		'timeout':this.DEFAULT_TIMEOUT,
		'url':null,
		'data':null,
		'username':null,
		'password':null,
		'process_callback':null,
		'processing_opts':null,
		'success_event_type':null,
		'failure_event_type':null,
		'success_callback':null,
		'failure_callback':null
	}, opts);
	
	/*
		for closure references
	*/
	var stwit = this;
	
	var xhr = jQuery.ajax({
		'timeout' :opts.timeout,
        'complete':function(xhr, msg){
            sc.helpers.dump(opts.url + ' complete:'+msg);
			if (msg === 'timeout') {
				// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
				stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});				
			}
        },
        'error':function(xhr, msg, exc) {
			sc.helpers.dump(opts.url + ' error:"'+msg+'"');
			if (msg.toLowerCase().indexOf('timeout') !== -1) {
				stwit.triggerEvent(document, opts.failure_event_type, {'url':opts.url, 'xhr':null, 'msg':msg});
			} else if (xhr) {
				if (!xhr.readyState < 4) {
					sc.helpers.dump("Error:"+xhr.status+" from "+opts['url']);
					if (xhr.responseText) {
						try {
							var data = sc.helpers.deJSON(xhr.responseText);
						} catch(e) {
							sc.helpers.dump(e.name + ":" + e.message);
							data = xhr.responseText;
						}
					}
				}
				if (opts.failure_callback) {
					opts.failure_callback(xhr, msg, exc);
				}
				if (opts.failure_event_type) {
					sc.helpers.dump("opts.failure_event_type:"+opts.failure_event_type);
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});
					
				}
	
	        } else {
                sc.helpers.dump("Error:Unknown from "+opts['url']);
				if (opts.failure_callback) {
					opts.failure_callback(null, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':null, 'msg':'Unknown Error'}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':'Unknown Error'});
					
				}
            }
			// jQuery().trigger('spaztwit_ajax_error', [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
			stwit.triggerEvent('spaztwit_ajax_error', {'url':opts.url, 'xhr':xhr, 'msg':msg});
			
			if (opts.processing_opts && opts.processing_opts.combined) {
				sc.helpers.dump('adding to combined processing errors');
				stwit.combined_errors.push( {'url':opts.url, 'xhr':xhr, 'msg':msg, 'section':opts.processing_opts.section} );
				stwit.combined_finished[opts.processing_opts.section] = true;
				sc.helpers.dump(stwit.combined_errors);
				sc.helpers.dump(stwit.combined_finished);
				if (opts.process_callback) {
					opts.process_callback.call(stwit, [], opts, opts.processing_opts);
				}
			}
			
        },
        'success':function(data) {
			// sc.helpers.dump("Success! \n\n" + data);
			sc.helpers.dump(opts.url + ' success!'+" data:"+data);
			
			try {
				data = sc.helpers.deJSON(data);
			} catch(e) {
				stwit.triggerEvent(document, opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':'Error decoding data from server'});
			}

			if (opts.process_callback) {
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts, opts.processing_opts);
			} else {
				if (opts.success_callback) {
					sch.error('CALLING SUCCESS CALLBACK');
					opts.success_callback(data);
				}
				// jQuery().trigger(opts.success_event_type, [data]);
				stwit.triggerEvent(opts.success_event_type, data);
			}			
        },
        'beforeSend':function(xhr){
			sc.helpers.dump("beforesend");
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + sc.helpers.Base64.encode(opts.username + ":" + opts.password));
			}
        },
        'type': 	opts.method,
        'url': 		opts.url,
        'data': 	opts.data
	});
	
	return xhr;
};


/**
 * general processor for timeline data 
 * @private
 */
SpazTwit.prototype._processTimeline = function(section_name, ret_items, opts, processing_opts) {
	
	sch.debug(opts);
	
	if (!processing_opts) { processing_opts = {}; }

	if (!section_name === SPAZCORE_SECTION_USER) { // the user timeline section isn't persistent
		/*
			reset .newitems data properties
		*/
		this.data[section_name].newitems = [];
		
	}
	

	if (ret_items.length > 0){
		
		
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processItem(ret_items[k], section_name);
		}


		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
		
		
		if (section_name === SPAZCORE_SECTION_USER) { // special case -- we don't keep this data, just parse and fire it off

			this.triggerEvent(opts.success_event_type, ret_items);
			
		} else { // this is a "normal" timeline that we want to be persistent
			
			// set lastid
			var lastid = ret_items[ret_items.length-1].id;
			this.data[section_name].lastid = lastid;
			sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

			// add new items to data.newitems array
			this.data[section_name].newitems = ret_items;

			this._addToSectionItems(section_name, this.data[section_name].newitems);


			// @todo check length of data.items, and remove oldest extras if necessary
			/*
				@todo
			*/

			/*
				Fire off the new section data event
			*/
			if (!processing_opts.combined) {
				this.triggerEvent(opts.success_event_type, this.data[section_name].items);
			} else {
				this.combined_finished[section_name] = true;
				sc.helpers.dump("this.combined_finished["+section_name+"]:"+this.combined_finished[section_name]);
			}
			


			/*
				add on to newitems array for combined section
			*/
			this.data[SPAZCORE_SECTION_COMBINED].newitems = this.data[SPAZCORE_SECTION_COMBINED].newitems.concat(this.data[section_name].newitems);
			
		}


	} else { // no new items, but we should fire off success anyway
		if (!processing_opts.combined) {
			// jQuery().trigger(finished_event, []);
			this.triggerEvent(opts.success_event_type);
			
		} else {
			this.combined_finished[section_name] = true;
		}
	}
	
	/*
		Fire off the new combined data event
	*/
	if (this.combinedTimelineFinished()) {
		
		/*
			we do this stuff here to avoid processing repeatedly
		*/
		
		this._addToSectionItems(SPAZCORE_SECTION_COMBINED, this.data[SPAZCORE_SECTION_COMBINED].newitems, this._sortItemsByDateAsc);
		
		// sort these items -- the timelines can be out of order when combined

		sc.helpers.dump('Removing duplicates in '+SPAZCORE_SECTION_COMBINED+' newitems');
		
		this.data[SPAZCORE_SECTION_COMBINED].newitems = this._cleanupItemArray(this.data[SPAZCORE_SECTION_COMBINED].newitems, this.data[SPAZCORE_SECTION_COMBINED].max, this._sortItemsByDateAsc);
		
		if (this.combinedTimelineHasErrors()) {
			this.triggerEvent('error_combined_timeline_data', this.combined_errors);
		}
		
		this.triggerEvent('new_combined_timeline_data', this.data[SPAZCORE_SECTION_COMBINED].newitems);
		this.data[SPAZCORE_SECTION_COMBINED].newitems = []; // reset combined.newitems
		this.initializeCombinedTracker();
	}
};


/**
 * Adds an array of items to the .items property of the appropriate section, then
 * removes dupes, extras, and optionally sorts the section items
 * @param {string} section_name
 * @param {array}  arr  an array of items
 * @param {function}  sortfunc - optional 
 */
SpazTwit.prototype._addToSectionItems = function(section_name, arr, sortfunc) {
	// concat new items onto data.items array
	this.data[section_name].items = this.data[section_name].items.concat(arr);

	this._cleanupItemArray(this.data[section_name].items, this.data[section_name].max, sortfunc);
}

/**
 * Sorts (optionally), removes dupes, and removes extra items from a given
 * array of section items
 * 
 * @param {array} arr
 * @param {max} integer
 * @param {func} sortfunc - optional
 * 
 * @return {array} 
 */
SpazTwit.prototype._cleanupItemArray = function(arr, max, sortfunc) {
	if (sortfunc) {
		arr = arr.sort(sortfunc);
	}
	arr = this.removeDuplicates(arr);
	arr = this.removeExtraElements(arr, max);
	return arr;
};

/**
 * This modifies a Twitter post, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processItem = function(item, section_name) {
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	
	/*
		is reply? Then add .SC_is_reply
	*/
	if ( (item.in_reply_to_screen_name && item.SC_user_received_by) ) {
		if (item.in_reply_to_screen_name.toLowerCase() === item.SC_user_received_by.toLowerCase() ) {
			item.SC_is_reply = true;
		}
	}
	
	/*
		is an official API retweet? then add .SC_is_retweet
	*/
	if ( item.retweet_status ) {
		item.SC_is_retweet = true;
	}
	
	/*
		If it comes from the replies timeline, it's a reply (aka a mention)
	*/
	if (section_name === SPAZCORE_SECTION_REPLIES) {
		item.SC_is_reply = true;
	}
	
	/*
		Does it contain my name? then it's a reply
	*/
	if (this.username && sc.helpers.containsScreenName(item.text, this.username) ) {
		item.SC_is_reply = true;
	}
	
	/*
		is dm?
	*/
	if (item.recipient_id && item.sender_id) {
		item.SC_is_dm = true;
	}
	
	
	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at);
	}
	
	/*
		add raw text .SC_raw_text for unmodified text
	*/
	if (!item.SC_text_raw) {
		item.SC_text_raw = item.text;
	}
	
	/*
		add "in_reply_to_screen_name" if it does not exist
	*/
	if (!item.in_reply_to_screen_name && item.in_reply_to_user_id) {
		/**
		 * @todo get this from the Spaz code 
		 */
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	return item;
};



/**
 * This modifies a Twitter post, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processUser = function(item, section_name) {
	
	item.SC_timeline_from = section_name;
	if (this.username) {
		item.SC_user_received_by = this.username;
	}
	
	
	if (section_name === SPAZCORE_SECTION_FOLLOWERSLIST) {
		item.SC_is_follower;
	}
	if (section_name === SPAZCORE_SECTION_FRIENDLIST) {
		item.SC_is_followed;
	}
	
	/*
		add unix timestamp .SC_created_at_unixtime for easier date comparison
	*/
	if (!item.SC_created_at_unixtime) {
		item.SC_created_at_unixtime = sc.helpers.httpTimeToInt(item.created_at);
	}
	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	return item;
};




/**
 * this is a general wrapper for non-timeline methods on the Twitter API. We
 * use this to call methods that will return a single response 
 * 
 * @param {obj} opts a set of options for this method 
 * @param {string} opts.url The url for the request
 * @param {string} [opts.method] the HTTP method to use. default is POST
 * @param {number} [opts.timeout] the timeout for the request. default is 60 seconds
 * @param {object} [opts.data] data to pass with the request
 * @param {string} [opts.username]
 * @param {string} [opts.password]
 * @param {function} [opts.process_callback] a function to call on the retured data for extra processing on success
 * @param {string} [opts.success_event_type] the event to trigger on success
 * @param {string} [opts.failure_event_type] the event to trigger on failure
 * @param {function} [opts.success_callback] a callback to fire on success
 * @param {function} [opts.failure_callback] a callback to fire on failure
 */
SpazTwit.prototype._callMethod = function(opts) {
	
	opts = sch.defaults({
		'method':'POST',
		'timeout':this.DEFAULT_TIMEOUT,
		'url':null,
		'data':null,
		'username':null,
		'password':null,
		'process_callback':null,
		'success_event_type':null,
		'failure_event_type':null,
		'success_callback':null,
		'failure_callback':null
	}, opts);
	
	var method;
	
	/*
		for closure references
	*/
	var stwit = this;
	
	if (opts.method) {
		method = opts.method;
	} else {
		method = 'POST';
	}
	
	var xhr = jQuery.ajax({
		'timeout' :this.opts.timeout,
	    'complete':function(xhr, msg){
	        sc.helpers.dump(opts.url + ' complete:'+msg);
	    },
	    'error':function(xhr, msg, exc) {
			sc.helpers.dump(opts.url + ' error:'+msg);
	        if (xhr) {
				if (!xhr.readyState < 4) {
					sc.helpers.dump("Error:"+xhr.status+" from "+opts['url']);
					if (xhr.responseText) {
						try {
							var data = sc.helpers.deJSON(xhr.responseText);
						} catch(e) {
							sc.helpers.dump(e.name + ":" + e.message);
							data = xhr.responseText;
						}
					}
				}
				if (opts.failure_callback) {
					opts.failure_callback(xhr, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':xhr, 'msg':msg});
				}
	
	        } else {
	            sc.helpers.dump("Error:Unknown from "+opts['url']);
				if (opts.failure_callback) {
					opts.failure_callback(null, msg, exc);
				}
				if (opts.failure_event_type) {
					// jQuery().trigger(opts.failure_event_type, [{'url':opts.url, 'xhr':null, 'msg':'Unknown Error'}]);
					stwit.triggerEvent(opts.failure_event_type, {'url':opts.url, 'xhr':null, 'msg':'Unknown Error'});

				}
	        }
			// jQuery().trigger('spaztwit_ajax_error', [{'url':opts.url, 'xhr':xhr, 'msg':msg}]);
			stwit.triggerEvent('spaztwit_ajax_error', {'url':opts.url, 'xhr':xhr, 'msg':msg});
	    },
	    'success':function(data) {
			sc.helpers.dump(opts.url + ' success');
			data = sc.helpers.deJSON(data);
			if (opts.process_callback) {
				/*
					using .call here and passing stwit as the first param
					ensures that "this" inside the callback refers to our
					SpazTwit object, and not the jQuery.Ajax object
				*/
				opts.process_callback.call(stwit, data, opts);
			} else {
				if (opts.success_callback) {
					opts.success_callback(data);
				}
				// jQuery().trigger(opts.success_event_type, [data]);
				stwit.triggerEvent(opts.success_event_type, data);
				
			}
	    },
	    'beforeSend':function(xhr){
			sc.helpers.dump(opts.url + ' beforesend');
			if (opts.username && opts.password) {
				xhr.setRequestHeader("Authorization", "Basic " + sc.helpers.Base64.encode(opts.username + ":" + opts.password));
			}
	    },
	    'type': method,
	    'url' : opts.url,
		'data': opts.data
	});
	return xhr;
};



SpazTwit.prototype.getUser = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('show_user', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		// 'process_callback': this._processUserData,
		'success_event_type':'get_user_succeeded',
		'failure_event_type':'get_user_failed',
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};



SpazTwit.prototype.getFriendsList = function() {
	
	var url = this.getAPIURL('friendslist');
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback': this._processFriendsList,
		'success_event_type':'get_friendslist_succeeded',
		'failure_event_type':'get_friendslist_failed',
		'method':'GET'
	};

	var xhr = this._getTimeline(opts);
};
/**
 * @private
 */
SpazTwit.prototype._processFriendsList = function(ret_items, opts, processing_opts) {
	this._processUserList(SPAZCORE_SECTION_FRIENDLIST, ret_items, opts.success_event_type, processing_opts);
};






SpazTwit.prototype.getFollowersList = function() {
	var url = this.getAPIURL('followerslist');
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback': this._processFollowersList,
		'success_event_type':'get_followerslist_succeeded',
		'failure_event_type':'get_followerslist_failed',
		'method':'GET'
	};

	var xhr = this._getTimeline(opts);
};
/**
 * @private
 */
SpazTwit.prototype._processFollowersList = function(ret_items, opts, processing_opts) {
	this._processUserList(SPAZCORE_SECTION_FOLLOWERSLIST, ret_items, opts.success_event_type, processing_opts);
};



/**
 * general processor for timeline data 
 * @private
 */
SpazTwit.prototype._processUserList = function(section_name, ret_items, opts, processing_opts) {
	
	if (!processing_opts) { processing_opts = {}; }

	if (ret_items.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processUser(ret_items[k], section_name);
			sch.dump(ret_items[k]);
		}

		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);
		
			
		// set lastid
		var lastid = ret_items[ret_items.length-1].id;
		this.data[section_name].lastid = lastid;
		sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

		// add new items to data.newitems array
		this.data[section_name].newitems = ret_items;

		this._addToSectionItems(section_name, this.data[section_name].newitems);
		
		this.triggerEvent(opts.success_event_type,this.data[section_name].newitems );

	} else { // no new items, but we should fire off success anyway
		this.triggerEvent(opts.success_event_type);
	}

};


SpazTwit.prototype.addFriend = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('friendship_create', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'create_friendship_succeeded',
		'failure_event_type':'create_friendship_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};
SpazTwit.prototype.removeFriend = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('friendship_destroy', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'destroy_friendship_succeeded',
		'failure_event_type':'destroy_friendship_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.block = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('block_create', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'create_block_succeeded',
		'failure_event_type':'create_block_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};
SpazTwit.prototype.unblock = function(user_id) {
	var data = {};
	data['id'] = user_id;
	
	var url = this.getAPIURL('block_destroy', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'destroy_block_succeeded',
		'failure_event_type':'destroy_block_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

};

SpazTwit.prototype.follow = function(user_id) {}; // to add notification
SpazTwit.prototype.unfollow = function(user_id) {}; // to remove notification


SpazTwit.prototype.update = function(status, source, in_reply_to_status_id) {

	var url = this.getAPIURL('update');
	
	var data = {};
	if (in_reply_to_status_id) {
		data.in_reply_to_status_id = in_reply_to_status_id;
	}
	if (source) {
		data.source = source;
	} else {
		data.source = this.source;
	}
	data.status = status;
	
	var username = this.username;
	var password = this.password;
	
	var opts = {
		'url':url,
		'username':username,
		'password':password,
		'data':data,
		'process_callback': this._processUpdateReturn,
		'success_event_type':'update_succeeded',
		'failure_event_type':'update_failed'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);

	
};

SpazTwit.prototype._processUpdateReturn = function(data, opts) {
	
	/*
		Add this to the HOME section and fire off the event when done
	*/	
	this._processTimeline(SPAZCORE_SECTION_HOME, [data], opts);
};

SpazTwit.prototype.destroy = function(id) {};
SpazTwit.prototype.destroyDirectMessage = function(id) {};


SpazTwit.prototype.getOne = function(id, onSuccess) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('show', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'process_callback': this._processOneItem,
		'success_event_type':'get_one_status_succeeded',
		'success_callback':onSuccess,
		'failure_event_type':'get_one_status_failed',
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};


SpazTwit.prototype._processOneItem = function(data, opts) {
	
	/*
		this item needs to be added to the friends timeline
		so we can avoid dupes
	*/
	data = this._processItem(data);
	if (opts.success_callback) {
		opts.success_callback(data);
	}
	this.triggerEvent(opts.success_event_type, data);
	
};

SpazTwit.prototype.favorite = function(id) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('favorites_create', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'create_favorite_succeeded',
		'failure_event_type':'create_favorite_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.unfavorite = function(id) {
	var data = {};
	data['id'] = id;
	
	var url = this.getAPIURL('favorites_destroy', data);
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'destroy_favorite_succeeded',
		'failure_event_type':'destroy_favorite_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};




SpazTwit.prototype.updateLocation = function(location_str) {
	var data = {};
	data.location = location_str;
	
	this.setBaseURL(SPAZCORE_SERVICEURL_TWITTER);
	
	var url = this.getAPIURL('update_profile');
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'update_location_succeeded',
		'failure_event_type':'update_location_failed',
		'data':data
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

SpazTwit.prototype.updateProfile = function(name, email, url, location, description) {
	
};




SpazTwit.prototype.getRateLimitStatus = function() {};

SpazTwit.prototype.test = function() {};


/**
 * @private 
 */
SpazTwit.prototype._postProcessURL = function(url) {
	
	if (typeof Mojo !== "undefined") { // we're in webOS		
		if (use_palmhost_proxy) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] !== Mojo.hostingPrefix) {
				url = "/proxy?url=" + encodeURIComponent(url);
			}
			return url;		
		} else {
			return url;
		}
		
	} else {
		return url;
	}
};


/**
 * sorting function for an array of tweets. Asc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsAscending) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsAscending = function(a,b) {
	return (a.id - b.id);
};

/**
 * sorting function for an array of tweets. Desc by ID.
 * 
 * Example: itemsarray.sort(this._sortItemsDescending) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsDescending = function(a,b) {
	return (b.id - a.id);
};



/**
 * sorting function for an array of tweets. Asc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateAsc) 
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsByDateAsc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_a - time_b);
};

/**
 * sorting function for an array of tweets. Desc by date.
 * 
 * requires SpazCore helpers/datetime.js for httpTimeToInt()
 * 
 * Example: itemsarray.sort(this._sortItemsByDateDesc)
 * @param {object} a a twitter message object
 * @param {object} b a twitter message object 
 * @return {integer}
 * @private
 */
SpazTwit.prototype._sortItemsByDateDesc = function(a,b) {
	var time_a = sc.helpers.httpTimeToInt(a.created_at);
	var time_b = sc.helpers.httpTimeToInt(b.created_at);
	return (time_b - time_a);
};


/**
 * this takes an array of messages and returns one with any duplicates removed
 * 
 * This is based on the jQuery.unique() method
 * 
 * @param {array} array an array of Twitter message objects
 * @return {array}
 */
SpazTwit.prototype.removeDuplicates = function(arr) {
	
	var ret = [], done = {}, length = arr.length;

	try {
		for ( var i = 0; i < length; i++ ) {
			var id = arr[i].id;
			
			if ( !done[ id ] ) {
				done[ id ] = true;
				ret.push( arr[ i ] );
			} else {
				sc.helpers.dump("removing dupe " + arr[i].id + ', "'+arr[i].text+'"');
			}
		}

	} catch( e ) {
		sc.helpers.dump(e.name + ":" + e.message);
		ret = arr;
	}
	return ret;
	
};


/**
 * removes extra elements from a timeline array.
 * @param {array} items the timeline array
 * @param {integer} max the max # of items we should have
 * @param {boolean} remove_from_top whether or not to remove extra items from the top. default is FALSE 
 */
SpazTwit.prototype.removeExtraElements = function(items, max, remove_from_top) {
	
	if (!remove_from_top) {
		remove_from_top = false;
	}
	
	var diff = items.length - max;
	if (diff > 0) {
		
		if (!remove_from_top) {
			sc.helpers.dump("array length is " + items.length + " > " + max + "; removing last " + diff + " entries");
	        items.splice(diff * -1, diff);
		} else {
			sc.helpers.dump("array length is " + items.length + " > " + max + "; removing first " + diff + " entries");
	        items.splice(0, diff);
		}
	}
	
	return items;
};


/**
 * gets the saved searches the authenticating user has 
 */
SpazTwit.prototype.getSavedSearches = function() {
	var url = this.getAPIURL('saved_searches');
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'new_saved_searches_data',
		'failure_event_type':'error_saved_searches_data',
		'method':'GET'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
};

/**
 * Saves the search query to the Twitter servers
 * 
 * @param {String} search_query 
 */
SpazTwit.prototype.addSavedSearch = function(search_query) {
	var url = this.getAPIURL('saved_searches_create');
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'create_saved_search_succeeded',
		'failure_event_type':'create_saved_search_failed',
		'data':{'query':search_query},
		'method':'POST'
	};

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};

/**
 * Delete the saved search corresponding to the given ID
 * 
 * @param {String} search_id  Note that this is converted to a string via search_id.toString()
 */
SpazTwit.prototype.removeSavedSearch = function(search_id) {
	var url = this.getAPIURL('saved_searches_destroy', search_id.toString());
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'destroy_saved_search_succeeded',
		'failure_event_type':'destroy_saved_search_failed',
		'data':{'id':search_id},
		'method':'POST'
	};
	
	sch.debug('opts for removeSavedSearch');
	sch.debug(opts);

	/*
		Perform a request and get true or false back
	*/
	var xhr = this._callMethod(opts);
	
};




/**
 * retrieves the list of lists 
 */
SpazTwit.prototype.getLists = function(user, onSuccess, onFailure) {
	if (!user && !this.username) {
		return false;
	} else if (!user) {
	    user = this.username;
	}

	var url = this.getAPIURL('lists', {
	    'user':user
	});
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'get_lists_succeeded',
		'failure_event_type':'get_lists_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET'
	};

	var xhr = this._getTimeline(opts);
};




/**
 * general processor for user lists data
 * @private
 */
SpazTwit.prototype._processUserLists = function(section_name, ret_items, opts, processing_opts) {
  
    if (!processing_opts) { processing_opts = {}; }

	if (ret_items.length > 0){
		/*
			we process each item, adding some attributes and generally making it cool
		*/
		for (var k=0; k<ret_items.length; k++) {
			ret_items[k] = this._processList(ret_items[k], section_name);
			sch.dump(ret_items[k]);
		}

		/*
			sort items
		*/
		ret_items.sort(this._sortItemsAscending);

		// set lastid
		var lastid = ret_items[ret_items.length-1].id;
		this.data[section_name].lastid = lastid;
		sc.helpers.dump('this.data['+section_name+'].lastid:'+this.data[section_name].lastid);

		// add new items to data.newitems array
		this.data[section_name].newitems = ret_items;

		this._addToSectionItems(section_name, this.data[section_name].newitems);
		
		this.triggerEvent(opts.success_event_type, this.data[section_name].newitems );

	} else { // no new items, but we should fire off success anyway
		this.triggerEvent(opts.success_event_type);
	}
};

/**
 * This modifies a Twitter user list, adding some properties. All new properties are
 * prepended with "SC_"
 * 
 * this executes within the jQuery.each scope, so this === the item 
 */
SpazTwit.prototype._processList = function(item, section_name) {	
	/*
		add .SC_retrieved_unixtime
	*/
	if (!item.SC_retrieved_unixtime) {
		item.SC_retrieved_unixtime = sc.helpers.getTimeAsInt();
	}
	
	return item;
};


/**
 * retrieves a given list timeline
 * @param {string} list 
 */
SpazTwit.prototype.getListInfo = function(list, user) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return false;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_list', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'get_list_succeeded',
		'failure_event_type':'get_list_failed',
		'method':'GET'
	};

	var xhr = this._callMethod(opts);
};


/**
 * retrieves a given list timeline
 * @param {string} list 
 * @param {string} user the user who owns this list
 * @param {function} [onSuccess] function to call on success
 * @param {function} [onFailure] function to call on failure
 */
SpazTwit.prototype.getListTimeline = function(list, user, onSuccess, onFailure) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return false;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_timeline', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'get_list_timeline_succeeded',
		'failure_event_type':'get_list_timeline_failed',
		'success_callback':onSuccess,
		'failure_callback':onFailure,
		'method':'GET',
		'process_callback':this._processListTimeline,
		'processing_opts': {
			'user':user,
			'slug':list
		}
	};

	var xhr = this._getTimeline(opts);
};


SpazTwit.prototype._processListTimeline = function(data, opts, processing_opts) {
	if (!processing_opts) { processing_opts = {}; }
	
	var user = processing_opts.user || null;
	var slug = processing_opts.slug || null;
	
	var rdata = {
		'statuses':data,
		'user':user,
		'slug':slug
	};
	
	/*
		grab the array of items
	*/
	// jQuery().trigger(finished_event, [ret_items]);
	this.triggerEvent(opts.success_event_type, rdata);
};

/**
 * retrieves a given list's members
 * @param {string} list 
 */
SpazTwit.prototype.getListMembers = function(list, user) {
	if (!user && !this.username) {
		sch.error('must pass a username or have one set to get list');
		return false;
	}
	
	user = user || this.username;

	var url = this.getAPIURL('lists_members', {
	    'user':user,
		'slug':list
	});
	
	var opts = {
		'url':url,
		'username':this.username,
		'password':this.password,
		'success_event_type':'get_list_members_succeeded',
		'failure_event_type':'get_list_members_failed',
		'method':'GET',
		'process_callback':this._processListTimeline,
		'processing_opts': {
			'user':user,
			'slug':list
		}
	};

	var xhr = this._getTimeline(opts);
};

/**
 * create a new list for the authenticated user
 * @param {string} list  The list name
 * @param {string} visibility   "public" or "private"
 * @param {string} [description]  The list description
 */
SpazTwit.prototype.addList = function(list, visibility, description) {
	
};

/**
 * delete a list
 * @param {string} list  The list name 
 */
SpazTwit.prototype.removeList = function(list, user) {};

/**
 * add a user to a list
 */
SpazTwit.prototype.addUserToList = function(user, list, list_user) {};

/**
 * delete a user from a list 
 */
SpazTwit.prototype.removeUserFromList = function(user, list, list_user) {};




/**
 *  
 */
SpazTwit.prototype.triggerEvent = function(type, data) {
	var target = this.opts.event_target || document;
	data   = data || null;
	
	sc.helpers.dump('TriggerEvent: target:'+target.toString()+ ' type:'+type+ ' data:'+data);
	
	if (this.opts.event_mode === 'jquery') {
		data = [data];
		jQuery(target).trigger(type, data);
	} else {
		sc.helpers.trigger(type, target, data);	
	}
	
};

/**
 * shortcut for SpazTwit if the SpazCore libraries are being used
 * 
 */
if (sc) {
	var scTwit = SpazTwit;
}



/*
* EXAMPLES OF JS OBJECTS RETURNED BY TWITTER
* /statuses/public_timeline.json
	{
        "user": {
            "followers_count": 1144,
            "description": "フツーですよ。",
            "url": "http:\/\/camellia.jottit.com\/",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/66954592\/20081210071932_normal.jpg",
            "protected": false,
            "location": "あかし",
            "screen_name": "camellia",
            "name": "かめ",
            "id": "6519832"
        },
        "text": "@sugatch おはよう、すがっち！ *Tw*",
        "truncated": false,
        "favorited": false,
        "in_reply_to_user_id": 10116882,
        "created_at": "Sat Jan 17 00:53:27 +0000 2009",
        "source": "<a href=\"http:\/\/cheebow.info\/chemt\/archives\/2007\/04\/twitterwindowst.html\">Twit<\/a>",
        "in_reply_to_status_id": 1125158879,
        "id": "1125159824"
    }
* 
* 
* From authenticated /statuses/friends_timeline.json
* {
    "text": "@elazar I don't know about the pony - but a lot of that is in CSS3 - only browsers are crap ;)",
    "user": {
        "description": "PHP Windows Geek (not Oxymoron)",
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/25760052\/headshot_normal.jpg",
        "url": "http:\/\/elizabethmariesmith.com",
        "name": "auroraeosrose",
        "protected": false,
        "screen_name": "auroraeosrose",
        "followers_count": 242,
        "location": "",
        "id": 8854222 
    },
    "in_reply_to_screen_name": "elazar",
    "in_reply_to_user_id": 9105122,
    "truncated": false,
    "favorited": false,
    "in_reply_to_status_id": 1125164128,
    "created_at": "Sat Jan 17 00:59:04 +0000 2009",
    "id": 1125170241,
    "source": "<a href=\"http:\/\/twitterfox.net\/\">TwitterFox<\/a>"
 }
* 
* 
* From authenticated /direct_messages.json
* 
* {
    "recipient_screen_name": "funkatron",
    "created_at": "Fri Jan 16 13:43:16 +0000 2009",
    "recipient_id": 65583,
    "sender_id": 808824,
    "sender": {
        "description": "Impoverished Ph.D. student at the Indiana University School of Informatics",
        "screen_name": "kmakice",
        "followers_count": 671,
        "url": "http:\/\/www.blogschmog.net",
        "name": "Kevin Makice",
        "protected": false,
        "location": "Bloomington, Indiana",
        "id": 808824,
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/69221803\/2009avatar_normal.jpg"
    },
    "sender_screen_name": "kmakice",
    "id": 51212447,
    "recipient": {
        "description": "Supernerd, Dad, Webapp security dude, Spaz developer, webmonkey, designer, musician, ego-ho. See also: @funkalinks",
        "screen_name": "funkatron",
        "followers_count": 1143,
        "url": "http:\/\/funkatron.com",
        "name": "Ed Finkler",
        "protected": false,
        "location": "iPhone: 40.423752,-86.907547",
        "id": 65583,
        "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/67512037\/cat_with_hat_and_monocle_normal.jpg"
    },
    "text": "[REDACTED]"
}
* 
* 
* 
* From http://search.twitter.com/search.json?q=javascript
* 
* {
    "results": [
        {
            "text": "Updated the Wiki page on JavaScript development to reflect latest changes in Orbeon Forms. http:\/\/tinyurl.com\/axtu5u",
            "to_user_id": null,
            "from_user": "orbeon",
            "id": 1125204181,
            "from_user_id": 279624,
            "iso_language_code": "en",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/53169511\/Picture_1_normal.png",
            "created_at": "Sat, 17 Jan 2009 01:14:11 +0000"
        },
        {
            "text": "when I close my eyes I dream in javascript",
            "to_user_id": null,
            "from_user": "apuritz",
            "id": 1125196059,
            "from_user_id": 95155,
            "iso_language_code": "en",
            "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/55159511\/images_normal.jpeg",
            "created_at": "Sat, 17 Jan 2009 01:10:11 +0000"
        }
        // more results deleted
    ],
    "since_id": 0,
    "max_id": 1125204181,
    "refresh_url": "?since_id=1125204181&q=javascript",
    "results_per_page": 15,
    "next_page": "?page=2&max_id=1125204181&q=javascript",
    "completed_in": 0.015077,
    "page": 1,
    "query": "javascript"
}
* 
* 
*/
/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
undef: true,
white: false,
onevar: false 
 */
var sc, Mojo, use_palmhost_proxy;

/**
 * opts = {
 *  content_type:'', // optional
 *  field_name:'', //optional, default to 'media;
 *  file_url:'',
 *  url:'', // REQ
 *  platform: {
 * 		sceneAssistant:{} // REQ; the sceneAssistant we're firing the service req from
 *  }
 * 	extra:{...} // extra post fields (text/plain only atm)
 * } 
 * @param Function onSuccess 
 */
sc.helpers.HTTPUploadFile = function(opts, onSuccess, onFailure) {
	
	sch.debug('in HTTPUploadFile ================!!!!!!!!!!!!!!');
	
	var key, val, postparams = [];
	var file_url   = opts.file_url || null;
	var url        = opts.url      || null;
	var field_name = opts.field_name || 'media';
	var content_type = opts.content_type || 'img';
	
	if (opts.extra) {
		for (key in opts.extra) {
			val = opts.extra[key];
			postparams.push({ 'key' :key, 'data':val, contentType:'text/plain' });
		}
	}
	
	if (opts.platform) {
		var sceneAssistant = opts.platform.sceneAssistant;
	} else {
		sch.error('You must pass the opts.platform.sceneAssistant argument to upload on webOS');
		return;
	}
	
	sch.debug('OPTS =============');
	sch.debug(opts);
	sch.debug('OPTS.EXTRA =============');
	sch.debug(opts.extra);
	sch.debug('ONSUCCESS =============');
	sch.debug(onSuccess);
	sch.debug('ONFAILURE =============');
	sch.debug(onFailure);
	sch.debug('POSTPARAMS =============');
	sch.debug(postparams);
	sch.debug('sceneAssistant =============');
	sch.debug(sceneAssistant);

	
	sceneAssistant.controller.serviceRequest('palm://com.palm.downloadmanager/', {
		method: 'upload', 
		parameters: {
			'url'        : url,
			'contentType': content_type,
			'fileLabel'  : field_name,
			'fileName'   : file_url,
			'postParameters': postparams,
			cookies      : {}, // optional
			customHttpHeaders: [], // optional
			subscribe    : true 
		},
		'onSuccess' : onSuccess,
		'onFailure' : onFailure
	 });
};/*jslint 
browser: true,
nomen: false,
debug: true,
forin: true,
regexp: false,
undef: true,
white: false,
onevar: false 
 */
var sc, Mojo, use_palmhost_proxy;
 
 
/**
 * This should contain definitions for all methods from helpers/sys.js tagged @platformstub 
 */

/**
 * dump an object's first level to console
 */
sc.helpers.dump = function(obj, level) {
	var dumper;
	
	if (!level) { level = SPAZCORE_DUMPLEVEL_DEBUG; }
	
	if (sc.dumplevel < level ) {
		return;
	}
	
	if (sc.helpers.isString(obj) || sc.helpers.isNumber(obj) || !obj) {
		dumper = Mojo.Log.info;
	} else {
		dumper = Mojo.Log.logProperties;
	}

	if (sc.helpers.isString(obj)) {
		dumper(obj);
	} else if(sc.helpers.isNumber(obj)) {
		dumper(obj.toString());
	} else if (obj === undefined) {
		dumper('UNDEFINED');
	} else if (obj === null) {
		dumper('NULL');
	} else { // this is an object. we hope.
		dumper(obj);
	}

};


/**
 * this is specific to webOS, for retrieving the proper URL prefixed with the Palm Host proxy if needed 
 * @param {string} url
 */
sc.helpers.getMojoURL = function(url) {
	if (typeof Mojo !== "undefined") { // we're in webOS		
		/*
			I would like to apologize for using a global here. ick.
		*/
		if (use_palmhost_proxy) { // we are not on an emu or device, so proxy calls
			var re = /https?:\/\/.[^\/:]*(?::[0-9]+)?/;
			var match = url.match(re);
			if (match && match[0] !== Mojo.hostingPrefix) {
				url = "/proxy?url=" + encodeURIComponent(url);
			}
			return url;		
		} else {
			return url;
		}

	} else {
		return url;
	}
	
};/**
 * platform-specific definitions for prefs lib 
 */