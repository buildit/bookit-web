#!/bin/bash

set -e

openssl aes-256-cbc -K $encrypted_0c4d71dbdba1_key -iv $encrypted_0c4d71dbdba1_iv -in ./deploy/ec2/travis.enc -out ./deploy/ec2/travis -d
chmod 600 ./deploy/ec2/travis
scp -o StrictHostKeyChecking=no -i ./deploy/ec2/travis ./deploy/dev/docker-compose.yml app@bookit.riglet.io:/home/app/
ssh -o StrictHostKeyChecking=no -i ./deploy/ec2/travis app@bookit.riglet.io 'docker-compose pull; docker-compose down; docker-compose up -d'
