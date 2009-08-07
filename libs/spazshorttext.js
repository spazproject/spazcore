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
};