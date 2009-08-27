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
