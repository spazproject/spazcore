#!/bin/bash
# run this from the base dir of SpazCore


BUILD_FILE='builds/spazcore-webos.js'
MIN_FILE='builds/spazcore-webos.min.js'
BUILD_DATE=`date "+%Y-%m-%d %H:%M:%S %Z"`

COMPRESS_CMD="uglifyjs -o ${MIN_FILE} ${BUILD_FILE}"

echo "/*********** Built ${BUILD_DATE} ***********/" > $BUILD_FILE


cat libs/spazcore.js \
	vendors/date.js \
	vendors/json2.js \
	vendors/underscore.js \
	vendors/sha1.js \
	vendors/oauth.js \
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
	libs/spazaccounts.js \
	libs/spazauth.js \
	libs/spazimageurl.js \
	libs/spazfileuploader.js \
	libs/spazfilterchain.js \
	libs/spazimageuploader.js \
	libs/spazphotomailer.js \
	libs/spazprefs.js \
	libs/spazshorttext.js \
	libs/spazshorturl.js \
	libs/spaztemplate.js \
	libs/spaztimeline.js \
	libs/spaztmdb.js \
	libs/spaztwit.js \
	platforms/webOS/helpers/location.js \
	platforms/webOS/helpers/network.js \
	platforms/webOS/helpers/sys.js \
	platforms/webOS/libs/spazprefs.js \
	>> $BUILD_FILE

echo $COMPRESS_CMD
$COMPRESS_CMD
