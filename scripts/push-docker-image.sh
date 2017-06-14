!#/bin/bash

set -ev

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_EVENT_TYPE" == "push" ]; then
  export IMG_VERSION=`node -p -e "require('./package.json').version"`
  echo "Building $IMG_VERSION"
  docker build -t builditdigital/bookit-web:$IMG_VERSION .
  docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  docker push builditdigital/bookit-web:$IMG_VERSION
  docker tag builditdigital/bookit-web:$IMG_VERSION builditdigital/bookit-web:latest
  docker push builditdigital/bookit-web:latest
fi
