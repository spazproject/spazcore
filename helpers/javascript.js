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
}