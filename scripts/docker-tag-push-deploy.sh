#!/bin/bash

set -e

if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  DIR=$(dirname "$(cd -P -- "$(dirname -- "$0")" && pwd -P)")
  cd $DIR

  # echo "Building production code..."

  # yarn build

  # echo "Building docker image for $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA..."

  docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

  echo "Pushing $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA to dockerhub..."

  # docker build -t $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA .
  docker push $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA
  docker tag $DOCKER_ORG/$DOCKER_REPO:$COMMIT_SHA $DOCKER_ORG/$DOCKER_REPO:latest
  docker push $DOCKER_ORG/$DOCKER_REPO:latest

  echo "Deploying to AWS EC2..."

  openssl aes-256-cbc -K $encrypted_0c4d71dbdba1_key -iv $encrypted_0c4d71dbdba1_iv -in ./deploy/ec2/travis.enc -out ./deploy/ec2/travis -d
  chmod 600 ./deploy/ec2/travis
  scp -o StrictHostKeyChecking=no -i ./deploy/ec2/travis ./docker-compose.yml app@bookit.riglet.io:/home/app/
  ssh -o StrictHostKeyChecking=no -i ./deploy/ec2/travis app@bookit.riglet.io 'docker-compose pull; docker-compose down; docker-compose -f docker-compose.yml -f bookit.yml up -d'

  cd -
fi
