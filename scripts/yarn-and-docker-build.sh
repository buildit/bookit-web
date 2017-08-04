#!/bin/bash

set -e

if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  cd $(dirname "$(cd -P -- "$(dirname -- "$0")" && pwd -P)")

  echo "Building production code..."
  yarn build

  echo "Building docker image for $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA..."
  docker build -t $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA .

  cd -
fi
