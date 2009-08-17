#!/bin/bash
# run this from the base dir of SpazCore

cat libs/spazcore.js \
	vendors/date.js \
	vendors/json2.js \
	helpers/datetime.js \
	helpers/event.js \
	helpers/hash.js \
	helpers/javascript.js \
	helpers/json.js \
	helpers/location.js \
	helpers/string.js \
	helpers/sys.js \
	helpers/view.js \
	helpers/xml.js \
	libs/spazphotomailer.js \
	libs/spazprefs.js \
	libs/spazshorttext.js \
	libs/spazshorturl.js \
	libs/spaztemplate.js \
	libs/spaztimeline.js \
	libs/spaztwit.js \
	platforms/AIR/helpers/sys.js \
	platforms/AIR/helpers/network.js \
	platforms/AIR/libs/spazprefs.js \
	> spazcore-air.js
