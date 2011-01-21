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
var sc;

/**
 * SpazTemplate 
 * designed for fast templating functions
 * @class SpazTemplate
 * @constructor
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
