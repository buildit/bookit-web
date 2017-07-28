#!/bin/bash

# CALL LIKE:
#   $ ./scripts/run-functional-tests.sh chrome http://bookit.riglet.io bruce@someemail.tld brucepass
#
# To specify multiple browsers, separate them with a comma.

set -e

DIR=$(dirname "$(cd -P -- "$(dirname -- "$0")" && pwd -P)")
cd $DIR

BROWSERS=${1:-"chromium,firefox"}
BOOKITURI=${2:-"http://localhost:3001"}
BOOKITUSER=${3:-"z"}
BOOKITPASSWD=${4:-"z"}

if [[ $BROWSERS == *"chrome"* ]]; then
  BROWSERS="${BROWSERS//chrome/chromium}"
fi

docker run \
  -it \
  -v $(pwd)/src/functional-tests:/tests \
  -v $(pwd)/node_modules/testcafe-react-selectors:/opt/testcafe/node_modules/testcafe-react-selectors \
  -e NODE_PATH=/opt/testcafe/node_modules:/opt \
  -e BOOKITURI=$BOOKITURI \
  -e BOOKITUSER=$BOOKITUSER \
  -e BOOKITPASSWD=$BOOKITPASSWD \
  --security-opt seccomp:unconfined \
  testcafe/testcafe \
  $BROWSERS /tests
