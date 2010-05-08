RUNNING EXAMPLES IN BROWSERS LOCALLY

This includes information on browsers we've used to run these examples

- Safari 4 (OS X and Windows)
    Should run fine out of the box. No same-origin restrictions on local files
    
- Chromium Browser (Linux Ubuntu 10.04)
    You can disable security restrictions on local files by starting from the command line with --disable-web-security
    
    Ex:
    > chromium-browser --disable-web-security example_oauth.html

- Chrome (OS X)

	enter this in the terminal:
	
	open -b com.google.chrome --args --disable-web-security

- Firefox 3.6 (Linux Ubuntu 10.04)

    Note: this is still flakey
    
    1. Type "about:config" into the address bar
    2. filter for "strict_origin"
    3. double-click on security.fileuri.strict_origin_policy to toggle the value to "false"
    4. in Firebug, you MAY need to go to Options > Enable Same-origin URLs
    See: http://kb.mozillazine.org/Security.fileuri.strict_origin_policy