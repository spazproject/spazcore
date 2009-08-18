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
 
/* A wrapper for JSON.parse() that correct Twitter issues and perform logging if JSON data could not be parsed
 * which will help to find out what is wrong
 * @param {String} text 
 */
sc.helpers.deJSON = function(json)
 {

	// Fix twitter data bug
	var re = new RegExp("Couldn\\'t\\ find\\ Status\\ with\\ ID\\=[0-9]+\\,", "g");
	json = json.replace(re, "");

	var done = false;
	try {
		var obj = JSON.parse(json);
		done = true;
	} finally {
		if (!done) {
			sc.helpers.dump("Could not parse JSON text " + json);
		}
	}

	return obj;
};

/**
 * really just a simple wrapper for JSON.stringify	
 * @param  any js construct
 */
sc.helpers.enJSON = function(jsobj) {
	return JSON.stringify(jsobj);
};


/*
 * Based on jQuery XML to JSON Plugin
 * 
 *	### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *	 http://www.opensource.org/licenses/mit-license.php
 *	 http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*/
/*
 # INSPIRED BY: http://www.terracoder.com/
		   AND: http://www.thomasfrank.se/xml_to_json.html
											AND: http://www.kawa.net/works/js/xml/objtree-e.html
*/
/*
 This simple script converts XML (document of code) into a JSON object. It is the combination of 2
 'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
*/
sc.helpers.xml2json = function(xml, extended) {
	if (!xml) return {};
	// quick fail
	//### PARSER LIBRARY
	// Core function
	function parseXML(node, simple) {
		if (!node) return null;
		var txt = '',
		obj = null,
		att = null;
		var nt = node.nodeType,
		nn = jsVar(node.localName || node.nodeName);
		var nv = node.text || node.nodeValue || '';
		/*DBG*/
		//if(window.console) console.log(['x2j',nn,nt,nv.length+' bytes']);
		if (node.childNodes) {
			if (node.childNodes.length > 0) {
				/*DBG*/
				//if(window.console) console.log(['x2j',nn,'CHILDREN',node.childNodes]);
				jQuery.each(node.childNodes,
				function(n, cn) {
					var cnt = cn.nodeType,
					cnn = jsVar(cn.localName || cn.nodeName);
					var cnv = cn.text || cn.nodeValue || '';
					/*DBG*/
					//if(window.console) console.log(['x2j',nn,'node>a',cnn,cnt,cnv]);
					if (cnt == 8) {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']);
						return;
						// ignore comment node
					}
					else if (cnt == 3 || cnt == 4 || !cnn) {
						// ignore white-space in between tags
						if (cnv.match(/^\s+$/)) {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>c',cnn,'WHITE-SPACE (ignore)']);
							return;
						};
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>d',cnn,'TEXT']);
						txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '');
						// make sure we ditch trailing spaces from markup
					}
					else {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'node>e',cnn,'OBJECT']);
						obj = obj || {};
						if (obj[cnn]) {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>f',cnn,'ARRAY']);
							if (!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
							obj[cnn][obj[cnn].length] = parseXML(cn, true
							/* simple */
							);
							obj[cnn].length = obj[cnn].length;
						}
						else {
							/*DBG*/
							//if(window.console) console.log(['x2j',nn,'node>g',cnn,'dig deeper...']);
							obj[cnn] = parseXML(cn);
						};
					};
				});
			};
			//node.childNodes.length>0
		};
		//node.childNodes
		if (node.attributes) {
			if (node.attributes.length > 0) {
				/*DBG*/
				//if(window.console) console.log(['x2j',nn,'ATTRIBUTES',node.attributes])
				att = {};
				obj = obj || {};
				jQuery.each(node.attributes, function(a, at) {
					var atn = jsVar(at.name),
					atv = at.value;
					att[atn] = atv;
					if (obj[atn]) {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'attr>',atn,'ARRAY']);
						if (!obj[atn].length) obj[atn] = myArr(obj[atn]);
						//[ obj[ atn ] ];
						obj[atn][obj[atn].length] = atv;
						obj[atn].length = obj[atn].length;
					}
					else {
						/*DBG*/
						//if(window.console) console.log(['x2j',nn,'attr>',atn,'TEXT']);
						obj[atn] = atv;
					};
				});
				//obj['attributes'] = att;
			};
			//node.attributes.length>0
		};
		//node.attributes
		if (obj) {
			obj = jQuery.extend((txt != '' ? new String(txt) : {}),
			/* {text:txt},*/
			obj || {}
			/*, att || {}*/
			);
			txt = (obj.text) ? (typeof(obj.text) == 'object' ? obj.text: [obj.text || '']).concat([txt]) : txt;
			if (txt) obj.text = txt;
			txt = '';
		};
		var out = obj || txt;
		//console.log([extended, simple, out]);
		if (extended) {
			if (txt) out = {};
			//new String(out);
			txt = out.text || txt || '';
			if (txt) out.text = txt;
			if (!simple) out = myArr(out);
		};
		return out;
	};
	// parseXML
	// Core Function End
	// Utility functions
	var jsVar = function(s) {
		return String(s || '').replace(/-/g, "_");
	};
	var isNum = function(s) {
		return (typeof s == "number") || String((s && typeof s == "string") ? s: '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/);
	};
	var myArr = function(o) {
		if (!o.length) o = [o];
		o.length = o.length;
		// here is where you can attach additional functionality, such as searching and sorting...
		return o;
	};
	// Utility functions End
	//### PARSER LIBRARY END
	// Convert plain text to xml
	if (typeof xml == 'string') {xml = sc.helpers.createXMLFromString(xml);}

	// Quick fail if not xml (or if this is a node)
	if (!xml.nodeType) {return;}
	if (xml.nodeType == 3 || xml.nodeType == 4) {return xml.nodeValue;}

	// Find xml root node
	var root = (xml.nodeType == 9) ? xml.documentElement: xml;

	// Convert xml to json
	var out = parseXML(root, true
	/* simple */
	);

	// Clean-up memory
	xml = null;
	root = null;

	// Send output
	return out;
};


