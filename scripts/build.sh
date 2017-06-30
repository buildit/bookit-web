#!/bin/bash

# This is hardcoded to find the yarn cache INSIDE the docker image
# we're building, which right now appears to be jammed into
# /usr/local/share/.cache/yarn/v1.
#
# If it's possible, we should switch to using shell
# escape/interpolation to find the cache dir with `yarn cache dir`

DIR=$(dirname "$(cd -P -- "$(dirname -- "$0")" && pwd -P)")

cd $DIR

if [ ! -f .yarn-cache.tgz ]; then
  echo "+ build: Init empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build -t bookit-web:latest .

docker run \
  --rm \
  --entrypoint cat \
  bookit-web:latest \
  /tmp/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "+ build: Saving Yarn cache"

  docker run \
    --rm \
    --entrypoint tar \
    bookit-web:latest \
    czf - /usr/local/share/.cache/yarn/v1/ > .yarn-cache.tgz

  echo "+ build: Saving yarn.lock"

  cp /tmp/yarn.lock yarn.lock
fi

cd -
