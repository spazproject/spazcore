#!/bin/bash

scriptdir=`dirname $BASH_SOURCE`
${scriptdir}/build-air.sh
${scriptdir}/build-standard.sh
${scriptdir}/build-titanium.sh
${scriptdir}/build-webos.sh
