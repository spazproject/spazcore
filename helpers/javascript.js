/*
	Helpers for fundamental javascript stuff
*/

/*
	Return a boolean value telling whether
	the first argument is a string.
*/
function isString() {
    if (typeof arguments[0] == 'string') return true;
    if (typeof arguments[0] == 'object') {
        var criterion = arguments[0].constructor.toString().match(/string/i);
        return (criterion != null);
    }
    return false;
}


/*
	http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256C720080D723
*/
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
	  return false;
   else
	  return true;
}

/*
	Returns a copy of the object using the jQuery.extend() method
*/
function clone(oldObj) {
	return jQuery.extend({}/* clone */, oldObj);
}