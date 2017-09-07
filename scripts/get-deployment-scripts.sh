#!/usr/bin/env bash

pip install --user awscli
PATH=$PATH:/$HOME/.local/bin

aws s3 cp s3://${S3_BUCKET_BASE}.${AWS_DEFAULT_REGION}.build/app-deployment ./scripts/ --recursive
chmod +x ./scripts/*.sh
