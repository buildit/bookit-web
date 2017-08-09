#!/usr/bin/env bash

pip install --user awscli
PATH=$PATH:/$HOME/.local/bin

aws s3 cp s3://rig.mthomas.bookit.dev6.us-east-1.build/app-deployment ./scripts/ --recursive
chmod +x ./scripts/*.sh
