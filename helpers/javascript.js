/*
	Helpers for fundamental javascript stuff
*/

/*
	Return a boolean value telling whether
	the first argument is a string.
*/
sc.helpers.isString = function() {
    if (typeof arguments[0] == 'string') return true;
    if (typeof arguments[0] == 'object') {
        var criterion = arguments[0].constructor.toString().match(/string/i);
        return (criterion != null);
    }
    return false;
}


sc.helpers.isNumber = function(chk) {
	return typeof chk == 'number';
};



/*
	http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256C720080D723
*/
sc.helpers.isArray = function(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
	  return false;
   else
	  return true;
}

/*
	Returns a copy of the object using the jQuery.extend() method
*/
sc.helpers.clone = function(oldObj) {
	return jQuery.extend({}/* clone */, oldObj);
}

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
}
