#!/usr/bin/env bash

aws s3 cp s3://${S3_BUCKET_BASE}.${AWS_DEFAULT_REGION}.build/app-deployment ./scripts/ --recursive
chmod +x ./scripts/*.sh
