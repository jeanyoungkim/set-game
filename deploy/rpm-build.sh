#!/bin/sh

if [ -z ${WORK_DIR+x} ]; then echo "WORK_DIR is not set" && WORK_DIR=`pwd`; fi
if [ -z ${CODE_DIR+x} ]; then echo "CODE_DIR is not set" && CODE_DIR=`pwd`; fi

echo "WORK_DIR:${WORK_DIR}"
echo "CODE_DIR:${CODE_DIR}"

BUILD_ROOT=${WORK_DIR}/target/rpm/tmp
DEST_DIR=/opt/nyt/seg-fe
ETC_CONF_DIR=/etc

# Set build number

SNAPSHOT=`date +%Y%m%d%H%M%S`
BUILD_CODE=SNAPSHOT${SNAPSHOT}

echo "{\"build\":\"${BUILD_CODE}\"}" > ${WORK_DIR}/build.json

#########################################

rm -r -f ${WORK_DIR}/target

rm -r -f ${BUILD_ROOT}

mkdir -p ${BUILD_ROOT}

mkdir -p ${WORK_DIR}/target/rpm/RPMS
mkdir -p ${WORK_DIR}/target/rpm/BUILD

#########################################

mkdir -p ${BUILD_ROOT}${DEST_DIR}

function include_folder() {
    mkdir -p ${BUILD_ROOT}${DEST_DIR}/${1}/
    cp -r -f ${WORK_DIR}/${1}/*     ${BUILD_ROOT}${DEST_DIR}/${1}/
}

include_folder 'dist'

include_folder 'node_modules'

# Revert build number
rm ${WORK_DIR}/build.json

rpmbuild --bb --target x86_64 --buildroot ${BUILD_ROOT} ${WORK_DIR}/deploy/seg-fe.spec --define "_build_code ${BUILD_CODE}" --define "_topdir ${WORK_DIR}"/target/rpm