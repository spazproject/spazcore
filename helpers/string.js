/*jslint 
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
 * @member sc.helpers
 */
sc.helpers.containsScreenName = function(str, sn) {
	
	var re = new RegExp('(?:\\s|\\b|^[[:alnum:]]|^)@('+sn+')(?:\\s|\\b|$)', 'gi');
	if ( re.test(str) ) {
		return true;
	}
	return false;
	
};

/**
 * @param {string} str string to search for usernames
 * @@param {array} without array of usernames to skip 
 */
sc.helpers.extractScreenNames = function(str, without) {

	str = str.toLowerCase(); // normalize to lowercase
	
    // var re_uname = /(^|\s|\(\[|,|\.|\()@([a-zA-Z0-9_]+)([^a-zA-Z0-9_]|$)/gi;
	var re_uname = /(?:^|\s|\(\[|,|\.|\()@([a-zA-Z0-9_]+)/gi;
	var usernames = [];
	var ms = [];
	var wo_args = [];
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
		
		if(ms[1] != ''){
			usernames.push(ms[1]);
		}
	}
	
	if (usernames.length > 0) {
		usernames = _.uniq(usernames); // make unique
		if (sch.isString(usernames)) { // at least in webOS 1.4.5, if you only had one item it qould return as a string, not an array
			usernames = [usernames];
		}

		if (without) { // remove any usernames we want to skip
			wo_args = [usernames];
			for (var i=0; i < without.length; i++) {
				wo_args.push(without[i].toLowerCase());
			}
			usernames = _.without.apply(this, wo_args);
		}
	}
	
	return usernames||[];
};

/**
 * find URLs within the given string 
 * @member sc.helpers
 */
sc.helpers.extractURLs = function(str) {
	// var wwwlinks = /(^|\s)((https?|ftp)\:\/\/)?([a-z0-9+!*(),;?&=\$_.-]+(\:[a-z0-9+!*(),;?&=\$_.-]+)?@)?([✪a-z0-9-.]*)\.([a-z]{2,3})(\:[0-9]{2,5})?(\/([a-z0-9+\$_-]\.?)+)*\/?(\?[a-z+&\$_.-][a-z0-9;:@&%=+\/\$_.-]*)?(#[a-z_.-][a-z0-9+\$_.-]*)?(\s|$)/gi;
	var wwwlinks = /(^|\s|\(|:)(((http(s?):\/\/)|(www\.))([\w✪]+[^\s\)<]+))/gi;
		
	var ms = [];
	var URLs = [];
	while ( (ms = wwwlinks.exec(str)) !== null ) {
		for (var x=0; x<ms.length; x++) {
			if (!ms[x]) {
				ms[x] = '';
			}
		}
		var last = ms[7].charAt(ms[7].length - 1);
		if (last.search(/[\.,;\?]/) !== -1) { // if ends in common punctuation, strip
			ms[7] = ms[7].slice(0,-1);
		}
		URLs.push(ms[3]+ms[7]);
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
 * @member sc.helpers
 */
sc.helpers.replaceMultiple = function(str, map) {
	for (var key in map) {
		str = str.replace(key, map[key]);
	}
	return str;
};


/**
 * This is a port of the CodeIgniter helper "autolink" to javascript.
 * It finds and links both web addresses and email addresses. It will ignore
 * links within HTML (as attributes or between tag pairs)
 * 
 * @param {string} str
 * @param {string} type  'email', 'url', or 'both' (default is 'both')
 * @param {boolean} extra_code  a string that will be inserted verbatim into <a> tag
 * @param {integer} maxlen  the maximum length the link description can be (the string inside the <a></a> tag)
 * @return {string}
 * @member sc.helpers
 */
sc.helpers.autolink = function(str, type, extra_code, maxlen) {
	if (!type) {
		type = 'both';
	}

	var re_nohttpurl = /((^|\s)(www\.)?([a-zA-Z_\-]+\.)(com|net|org|uk)($|\s))/gi;

	var re_noemail = /(^|[\s\(:。])((http(s?):\/\/)|(www\.))([\w✪]+[^\s\)<]+)/gi;
	var re_nourl   = /(^|\s|\()([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*)([^\s\)<]+)/gi;
	
	var x, ms, period = '';

	if (type !== 'email')
	{	
		while ((ms = re_nohttpurl.exec(str))) { // look for URLs without a preceding "http://"
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
			
			/*
				if the last character is one of . , ; ?, we strip it off and
				stick it on the end of newstr below as "period"
			*/
			var last = ms[6].charAt(ms[6].length - 1);
			if (last.search(/[\.,;\?]/) !== -1) {
				ms[6] = ms[6].slice(0,-1);
				period = last;
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
 * @member sc.helpers
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
 * @member sc.helpers
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
 * @member sc.helpers
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
 * @member sc.helpers
 */
sc.helpers.stripTags = function(str) {
	var re = /<[^>]*>/gim;
	str = str.replace(re, '');
	return str;
};


/**
 * Converts the following entities into regular chars: &lt; &gt; &quot; &apos;
 * @member sc.helpers
 */
sc.helpers.fromHTMLSpecialChars = function(str) {
	str = str.replace(/&lt;/gi, '<');
	str = str.replace(/&gt;/gi, '>');
	str = str.replace(/&quot;/gi, '"');
	str = str.replace(/&apos;/gi, '\'');
	str = str.replace(/&amp;/gi, '&');
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
	// +	revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// -	depends on: get_html_translation_table
	// *	 example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
	// *	 returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'

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
};



sc.helpers.htmlentities = function(string, quote_style) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +	revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: nobbler
	// +	tweaked by: Jack
	// +   bugfixed by: Onno Marsman
	// +	revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// -	depends on: get_html_translation_table
	// *	 example 1: htmlentities('Kevin & van Zonneveld');
	// *	 returns 1: 'Kevin &amp; van Zonneveld'
	// *	 example 2: htmlentities("foo'bar","ENT_QUOTES");
	// *	 returns 2: 'foo&#039;bar'
 
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
	// +	revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   bugfixed by: noname
	// +   bugfixed by: Alex
	// +   bugfixed by: Marco
	// +   bugfixed by: madipta
	// %		  note: It has been decided that we're not going to add global
	// %		  note: dependencies to php.js. Meaning the constants are not
	// %		  note: real constants, but strings instead. integers are also supported if someone
	// %		  note: chooses to create the constants themselves.
	// %		  note: Table from http://www.the-art-of-web.com/html/character-codes/
	// *	 example 1: get_html_translation_table('HTML_SPECIALCHARS');
	// *	 returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
	
	var entities = [], histogram = {}, decimal = 0, symbol = '';
	var constMappingTable = {}, constMappingQuoteStyle = {};
	var useTable = {}, useQuoteStyle = {};
	
	useTable	  = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
	useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
	
	// Translate arguments
	constMappingTable[0]	  = 'HTML_SPECIALCHARS';
	constMappingTable[1]	  = 'HTML_ENTITIES';
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
		entities.push({'code':38, 'entity':'&amp;'});
		if (useQuoteStyle !== 'ENT_NOQUOTES') {
			entities.push({'code':34, 'entity':'&quot;'});
		}
		if (useQuoteStyle === 'ENT_QUOTES') {
			entities.push({'code':39, 'entity':'&#039;'});
		}
		entities.push({'code':60, 'entity':'&lt;'});
		entities.push({'code':62, 'entity':'&gt;'});
	} else if (useTable === 'HTML_ENTITIES') {
		// ascii decimals for better compatibility
	  entities.push({'code':38, 'entity':'&amp;'});
		if (useQuoteStyle !== 'ENT_NOQUOTES') {
			entities.push({'code':34, 'entity':'&quot;'});
		}
		if (useQuoteStyle === 'ENT_QUOTES') {
			entities.push({'code':39, 'entity':'&#039;'});
		}
	  entities.push({'code':60, 'entity':'&lt;'});
	  entities.push({'code':62, 'entity':'&gt;'});
	  entities.push({'code':160, 'entity':'&nbsp;'});
	  entities.push({'code':161, 'entity':'&iexcl;'});
	  entities.push({'code':162, 'entity':'&cent;'});
	  entities.push({'code':163, 'entity':'&pound;'});
	  entities.push({'code':164, 'entity':'&curren;'});
	  entities.push({'code':165, 'entity':'&yen;'});
	  entities.push({'code':166, 'entity':'&brvbar;'});
	  entities.push({'code':167, 'entity':'&sect;'});
	  entities.push({'code':168, 'entity':'&uml;'});
	  entities.push({'code':169, 'entity':'&copy;'});
	  entities.push({'code':170, 'entity':'&ordf;'});
	  entities.push({'code':171, 'entity':'&laquo;'});
	  entities.push({'code':172, 'entity':'&not;'});
	  entities.push({'code':173, 'entity':'&shy;'});
	  entities.push({'code':174, 'entity':'&reg;'});
	  entities.push({'code':175, 'entity':'&macr;'});
	  entities.push({'code':176, 'entity':'&deg;'});
	  entities.push({'code':177, 'entity':'&plusmn;'});
	  entities.push({'code':178, 'entity':'&sup2;'});
	  entities.push({'code':179, 'entity':'&sup3;'});
	  entities.push({'code':180, 'entity':'&acute;'});
	  entities.push({'code':181, 'entity':'&micro;'});
	  entities.push({'code':182, 'entity':'&para;'});
	  entities.push({'code':183, 'entity':'&middot;'});
	  entities.push({'code':184, 'entity':'&cedil;'});
	  entities.push({'code':185, 'entity':'&sup1;'});
	  entities.push({'code':186, 'entity':'&ordm;'});
	  entities.push({'code':187, 'entity':'&raquo;'});
	  entities.push({'code':188, 'entity':'&frac14;'});
	  entities.push({'code':189, 'entity':'&frac12;'});
	  entities.push({'code':190, 'entity':'&frac34;'});
	  entities.push({'code':191, 'entity':'&iquest;'});
	  entities.push({'code':192, 'entity':'&Agrave;'});
	  entities.push({'code':193, 'entity':'&Aacute;'});
	  entities.push({'code':194, 'entity':'&Acirc;'});
	  entities.push({'code':195, 'entity':'&Atilde;'});
	  entities.push({'code':196, 'entity':'&Auml;'});
	  entities.push({'code':197, 'entity':'&Aring;'});
	  entities.push({'code':198, 'entity':'&AElig;'});
	  entities.push({'code':199, 'entity':'&Ccedil;'});
	  entities.push({'code':200, 'entity':'&Egrave;'});
	  entities.push({'code':201, 'entity':'&Eacute;'});
	  entities.push({'code':202, 'entity':'&Ecirc;'});
	  entities.push({'code':203, 'entity':'&Euml;'});
	  entities.push({'code':204, 'entity':'&Igrave;'});
	  entities.push({'code':205, 'entity':'&Iacute;'});
	  entities.push({'code':206, 'entity':'&Icirc;'});
	  entities.push({'code':207, 'entity':'&Iuml;'});
	  entities.push({'code':208, 'entity':'&ETH;'});
	  entities.push({'code':209, 'entity':'&Ntilde;'});
	  entities.push({'code':210, 'entity':'&Ograve;'});
	  entities.push({'code':211, 'entity':'&Oacute;'});
	  entities.push({'code':212, 'entity':'&Ocirc;'});
	  entities.push({'code':213, 'entity':'&Otilde;'});
	  entities.push({'code':214, 'entity':'&Ouml;'});
	  entities.push({'code':215, 'entity':'&times;'});
	  entities.push({'code':216, 'entity':'&Oslash;'});
	  entities.push({'code':217, 'entity':'&Ugrave;'});
	  entities.push({'code':218, 'entity':'&Uacute;'});
	  entities.push({'code':219, 'entity':'&Ucirc;'});
	  entities.push({'code':220, 'entity':'&Uuml;'});
	  entities.push({'code':221, 'entity':'&Yacute;'});
	  entities.push({'code':222, 'entity':'&THORN;'});
	  entities.push({'code':223, 'entity':'&szlig;'});
	  entities.push({'code':224, 'entity':'&agrave;'});
	  entities.push({'code':225, 'entity':'&aacute;'});
	  entities.push({'code':226, 'entity':'&acirc;'});
	  entities.push({'code':227, 'entity':'&atilde;'});
	  entities.push({'code':228, 'entity':'&auml;'});
	  entities.push({'code':229, 'entity':'&aring;'});
	  entities.push({'code':230, 'entity':'&aelig;'});
	  entities.push({'code':231, 'entity':'&ccedil;'});
	  entities.push({'code':232, 'entity':'&egrave;'});
	  entities.push({'code':233, 'entity':'&eacute;'});
	  entities.push({'code':234, 'entity':'&ecirc;'});
	  entities.push({'code':235, 'entity':'&euml;'});
	  entities.push({'code':236, 'entity':'&igrave;'});
	  entities.push({'code':237, 'entity':'&iacute;'});
	  entities.push({'code':238, 'entity':'&icirc;'});
	  entities.push({'code':239, 'entity':'&iuml;'});
	  entities.push({'code':240, 'entity':'&eth;'});
	  entities.push({'code':241, 'entity':'&ntilde;'});
	  entities.push({'code':242, 'entity':'&ograve;'});
	  entities.push({'code':243, 'entity':'&oacute;'});
	  entities.push({'code':244, 'entity':'&ocirc;'});
	  entities.push({'code':245, 'entity':'&otilde;'});
	  entities.push({'code':246, 'entity':'&ouml;'});
	  entities.push({'code':247, 'entity':'&divide;'});
	  entities.push({'code':248, 'entity':'&oslash;'});
	  entities.push({'code':249, 'entity':'&ugrave;'});
	  entities.push({'code':250, 'entity':'&uacute;'});
	  entities.push({'code':251, 'entity':'&ucirc;'});
	  entities.push({'code':252, 'entity':'&uuml;'});
	  entities.push({'code':253, 'entity':'&yacute;'});
	  entities.push({'code':254, 'entity':'&thorn;'});
	  entities.push({'code':255, 'entity':'&yuml;'});
	} else {
		throw Error("Table: "+useTable+' not supported');
	}
	
	// ascii decimals to real symbols
	for (var i=0; i < entities.length; i++) {
		symbol = String.fromCharCode(entities[i].code);
		histogram[symbol] = entities[i].entity;
	}
	
	return histogram;
};




/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*  @namespace
**/
sc.helpers.Utf8 = {
 
	/** @function public method for url encoding */
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
 
	/** @function public method for url decoding */
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
};


/**
 * @param {string} input the input string
 * @param {number} pad_length the length to pad the string
 * @param {string} pad_string the string to pad with
 * @param {string} pad_type STR_PAD_LEFT, STR_PAD_RIGHT, or STR_PAD_BOTH. Default is STR_PAD_RIGHT 
 * @member sc.helpers
 */
sc.helpers.pad = function (input, pad_length, pad_string, pad_type) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: Marco van Oort
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
    // *     example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    // *     returns 2: '------Kevin van Zonneveld-----'

    var half = '', pad_to_go;

    var str_pad_repeater = function (s, len) {
        var collect = '', i;

        while (collect.length < len) {collect += s;}
        collect = collect.substr(0,len);

        return collect;
    };

    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';
    
    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }
        else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
        else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
};

/**
 * truncate a string to a certain length, if it exceeds that length 
 * 
 * @param {string} str
 * @param {Number} limit the max length of the string
 * @param {string} [suffix] a suffix to append to the string if it is over limit. Does not count against the limit
 * @returns {string} the possibly modified string
 */
sc.helpers.truncate = function(str, limit, suffix) {

	if (str.length > limit) {
		str = str.slice(0, limit);
		if (suffix) {
			str = str+suffix;
		}
	}

	return str;	
};



/**
 * @param {string} str the string in which we're converting linebreaks
 * @param {string} [breaktag] the tag used to break up lines. defaults to <br>
 * @returns {string} the string with linebreaks converted to breaktags
 * @member sc.helpers
 */
sc.helpers.nl2br = function(str, breaktag) {
	
	breaktag = breaktag || '<br>';
	
	str = str.replace(/(\r\n|\n\r|\r|\n)/g, breaktag+'$1');
	return str;
};