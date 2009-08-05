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
