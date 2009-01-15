/**
 * root namespace for SpazCore
 */
var sc = {}

/**
 * namespace for app-specific stuff
 */
sc.app = {}

/**
 * namespace for helper methods
 */
sc.helpers = {}

/**
 * helper shortcuts 
 * this lets us write "sch.method" instead of "sc.helpers.method"
 */
sch = sc.helpers;

/**
 * set-up prefs object 
 */
if (__prefs) {
	sc.prefs {
		'data':__prefs,
		
		'get' :function(key) {
			return sc.prefs.data[key];
		}
	}
}