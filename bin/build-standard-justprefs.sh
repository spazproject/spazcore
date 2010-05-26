#!/bin/bash
# run this from the base dir of SpazCore

YUICOMPRESSOR_JAR="/Users/coj/Library/Application Support/TextMate/Bundles/javascript-tools.tmbundle/Support/bin/yuicompressor.jar"

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

# test if file exists before running min
`test -f "${YUICOMPRESSOR_JAR}"`
if [ "$?" = "0" ]
then 
	java -jar "${YUICOMPRESSOR_JAR}" --charset utf8 --preserve-semi $BUILD_FILE -o $MIN_FILE
else
	echo "YUICOMPRESSOR not found at ${YUICOMPRESSOR_JAR}; skipping minimization"
fi