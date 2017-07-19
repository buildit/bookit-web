#!/bin/bash

set -e

if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  yarn test:unit:coverage && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
fi
