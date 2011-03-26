#!/bin/bash
# run this from the base dir of SpazCore

BUILD_FILE='builds/spazcore-standard-justprefs.js'
MIN_FILE='builds/spazcore-standard-justprefs.min.js'
BUILD_DATE=`date "+%Y-%m-%d %H:%M:%S %Z"`

COMPRESS_CMD="uglifyjs -o ${MIN_FILE} ${BUILD_FILE}"

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

echo $COMPRESS_CMD
$COMPRESS_CMD
