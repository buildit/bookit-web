#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [[ -z "$TRAVIS_PULL_REQUEST" || $TRAVIS_PULL_REQUEST == "false" ]] && [[ -z "$TRAVIS_BRANCH" || $TRAVIS_BRANCH == "75-automate-create-travis-iam-user" ]]; then
  DOCKERNAME=bookit_functional_tests
  DOCKER_COMPOSE_YAML_FILENAME=${1:-docker-compose.testcafe.yml}
  DOCKER_CONTAINER_NAME=${2:-bookit_testcafe}

  cleanup () {
    docker-compose -p $DOCKERNAME kill > /dev/null 2>&1
    docker-compose -p $DOCKERNAME rm -f > /dev/null 2>&1
  }

  awsparam () {
    echo `aws ssm get-parameters --region us-east-1 --names $1 --with-decryption --output text | cut -f 4`
  }

  trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"' HUP INT QUIT PIPE TERM

  export BOOKITUSER=$(awsparam BUILDIT_REGULAR_USER_NAME)
  export BOOKITPASSWD=$(awsparam BUILDIT_REGULAR_USER_PASSWORD)
  export CLOUD_CONFIG=$(awsparam CLOUD_CONFIG)
  export BUILDIT_SECRET=$(awsparam BUILDIT_SECRET)

  docker-compose -f ${DOCKER_COMPOSE_YAML_FILENAME} -p ${DOCKERNAME} up -d > /dev/null 2>&1

  TEST_EXIT_CODE=$(docker wait ${DOCKER_CONTAINER_NAME})
  docker logs ${DOCKER_CONTAINER_NAME}

  if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
    printf "${RED}tests failed${NC} - exitcode: $TEST_EXIT_CODE\n"
  else
    printf "${GREEN}tests passed${NC} - exitcode: $TEST_EXIT_CODE\n"
  fi

  cleanup

  exit $TEST_EXIT_CODE
else
  printf "${GREEN}skipping functional tests${NC}\n"
fi
