#!/bin/bash
# run this from the base dir of SpazCore

BUILD_FILE='builds/spazcore-standard.js'
BUILD_DATE=`date "+%Y-%m-%d %H:%M:%S %Z"`

echo "/*********** Built ${BUILD_DATE} ***********/" > $BUILD_FILE


cat libs/spazcore.js \
	vendors/date.js \
	vendors/json2.js \
	vendors/sizzle.js \
	vendors/underscore.js \
	vendors/shortcut.js \
	vendors/shortcut.js \
	vendors/jquery.cookies.2.2.0.js \
	helpers/datetime.js \
	helpers/event.js \
	helpers/hash.js \
	helpers/javascript.js \
	helpers/json.js \
	helpers/keyboard.js \
	helpers/location.js \
	helpers/string.js \
	helpers/sys.js \
	helpers/url.js \
	helpers/view.js \
	helpers/xml.js \
	libs/spazaccounts.js \
	libs/spazimageurl.js \
	libs/spazphotomailer.js \
	libs/spazprefs.js \
	libs/spazshorttext.js \
	libs/spazshorturl.js \
	libs/spaztemplate.js \
	libs/spaztimeline.js \
	libs/spaztimelinefilter.js \
	libs/spaztmdb.js \
	libs/spaztwit.js \
	platforms/standard/libs/spazprefs.js \
	>> $BUILD_FILE
