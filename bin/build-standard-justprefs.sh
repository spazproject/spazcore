#!/bin/bash
# run this from the base dir of SpazCore

BUILD_FILE='builds/spazcore-standard-justprefs.js'
MIN_FILE='builds/spazcore-standard-justprefs.min.js'
BUILD_DATE=`date "+%Y-%m-%d %H:%M:%S %Z"`

echo "/*********** Built ${BUILD_DATE} ***********/" > $BUILD_FILE


cat libs/spazcore.js \
	vendors/underscore.js \
	vendors/jquery.cookies.2.2.0.js \
	helpers/event.js \
	helpers/javascript.js \
	helpers/sys.js \
	libs/spazprefs.js \
	platforms/standard/libs/spazprefs.js \
	platforms/standard/helpers/sys.js \
	>> $BUILD_FILE

java -jar ~/Library/Application\ Support/TextMate/Bundles/javascript-tools.tmbundle/Support/bin/yuicompressor.jar --charset utf8 --preserve-semi $BUILD_FILE -o $MIN_FILE
