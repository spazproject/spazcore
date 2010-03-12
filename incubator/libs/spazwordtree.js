/**
 * A library storing and retrieving strings in a Radix-like tree structure
 * @author Rich Bellamy <@rmbwebs>
 * @author Ed Finkler <@funkatron>
 * @constructor
 * 
 */
var SpazWordTree = function(currentDepth) {
	// reset everything to defaults
	this.reset(currentDepth);
};

/**
 * resets all the depth, word and branch settings 
 * @param {number} [currentDepth] the current depth we're working at. Default is 1
 */
SpazWordTree.prototype.reset = function(currentDepth) {
	this.currentDepth = currentDepth || 1;
	this.words = [];
	this.branches = {};
};



/**
 * get the branch for a letter. This creates a new branch if one does not exist
 * @param {string} letter the letter to find a branch for
 * @returns {object} the SpazWordTree object branch for this letter
 */
SpazWordTree.prototype.getBranch = function(letter) {
	if (typeof(this.branches[letter]) == 'undefined') {
		this.branches[letter] = new SpazWordTree(this.currentDepth+1);
	}
	return this.branches[letter];
};


/**
 * insert a single word 
 * @param {string} word a string to insert
 */
SpazWordTree.prototype.insertWord = function(word) { // A function that files words away in the tree
	word = word.toLowerCase(); // normalize the words by making them all lowercase
	
	if (this.words.indexOf(word) > -1) { // do not add if already exists
		return;
	}
	
	if (this.currentDepth > word.length) { // Store Here
		this.words.push(word);
	} else { // Send down the branch
		var indexLetter = word.substr(this.currentDepth-1,1);
		var branch = this.getBranch(indexLetter);
		branch.insertWord(word);
	}
};

/**
 * takes an array of words and inserts each one into the tree
 * @param {array} wordarray an array of strings
 */
SpazWordTree.prototype.insertWords = function(wordarray) {
	for (var i = wordarray.length - 1; i >= 0; i--){
		this.insertWord(wordarray[i]);
	};
};

/**
 * search for a word 
 * @param {string} searchFor the string to search for
 */
SpazWordTree.prototype.searchWord = function(searchFor) {
	
	searchFor = searchFor.toLowerCase(); // normalize the words by making them all lowercase
	
	if (searchFor.length == 0 && this.currentDepth > 1) {
		returnMe = this.words;
		for (letter in this.branches) {
			returnMe = returnMe.concat(this.branches[letter].searchWord(searchFor));
		}
		return returnMe;
	} else {
		return this.getBranch(searchFor.substring(0,1)).searchWord(searchFor.substr(1,searchFor.length-1));
	}
};

/**
 * retrieve all the strings in this tree node and below as an array
 * @returns {array} an array of strings
 */
SpazWordTree.prototype.getWords = function() {
	var ret_words = [];
	
	for (var key in this.branches) {
		ret_words = ret_words.concat(this.branches[key].getWords(this));
	}
	
	ret_words = ret_words.concat(this.words);
	
	return ret_words;
};

/**
 * returns a JSON version of the tree properties
 * @returns {string} JSON of the current depth and words
 */
SpazWordTree.prototype.toJSON = function() {
	var props = {
		'currentDepth':this.currentDepth,
		'words':this.getWords()
	};
	var jsonprops = sch.enJSON(props);
	return jsonprops;
};

/**
 * sets tree properties based on JSON object 
 * @param {string} props JSON of the format returned by this.toJSON
 */
SpazWordTree.prototype.fromJSON = function(props) {
	props = sch.defaults({
		'currentDepth':1,
		'words':[]
	}, sch.deJSON(props));
	
	this.reset();
	
	this.currentDepth = props.currentDepth;
	this.insertWords(props.words);
};