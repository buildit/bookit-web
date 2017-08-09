#!/usr/bin/env bash
envsubst < /opt/app/config.js.template > /opt/app/config.js && nginx -g 'daemon off;'
