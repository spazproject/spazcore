/*
	This is a port of the CodeIgniter helper "autolink" to javascript
	It finds and links both web addresses and email addresses
*/
var sc.helpers.autolink = function(str, type, popup) {
	if (!type) {
		type = 'both';
	}

	var re_noemail = /(^|\s|\()((http(s?):\/\/)|(www\.))(\w+[^\s\)<]+)/gi;
	var re_nourl   = /(^|\s|\()([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*)([^\s\)<]+)/gi;

	if (type != 'email')
	{
		while (ms = re_noemail.exec(str)) {
			var pop = (popup == true) ? " target=\"_blank\" ": "";
			var period = ''
			if ( /\.$/.test(ms[6]) ) {
				period = '.';
				ms[6] = ms[6].slice(0, -1);
			}
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (var x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}

			var newstr = ms[1]+'<a href="http'+ms[4]+'://'+ms[5]+ms[6]+'"'+pop+'>http'+ms[4]+'://'+ms[5]+ms[6]+'</a>'+period;
			str = str.replace(ms[0], newstr);
			//air.trace(str)

		}
	}

	if (type != 'url')
	{
		while (ms = re_nourl.exec(str))
		{
			var period = ''
			if ( /\./.test(ms[5]) ) {
				period = '.';
				ms[5] = ms[5].slice(0, -1);
			}
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (var x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}
			str = str.replace(ms[0], ms[1]+'<a href="mailto:'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'">'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'<a/>'+period);
			//air.trace(str);
		}
	}

	return str;


}

/*
	turns twitter style username refs ('@username') into links
*/
var sc.helpers.autolinkTwitter = function(str) {
	re_uname = /(^|\s|\(\[)@([a-zA-Z0-9_]+)([^a-zA-Z0-9_]|$)/gi
	
	var ms = [];
	while (ms = re_uname.exec(str))
	{
		
		/*
			sometimes we can end up with a null instead of a blank string,
			so we need to force the issue in javascript.
		*/
		for (var x=0; x<ms.length; x++) {
			if (!ms[x]) {
				ms[x] = '';
			}
		}
		str = str.replace(ms[0], ms[1]+'<a href="http://twitter.com/'+ms[2]+'">@'+ms[2]+'<a/>'+ms[3]);
		//air.trace(str);

	}
	return str;
}