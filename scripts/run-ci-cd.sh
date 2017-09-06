#!/usr/bin/env bash

if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "72-bookit-web-deploy-to-staging" ]]; then
  ./scripts/ecs-deploy.sh -c ${INT_ECS_CLUSTER} -n ${INT_ECS_SERVICE} -i 006393696278.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECS_REPO}:${COMMIT_SHA}
  ./scripts/run-dockerized-functional-tests.sh docker-compose.testcafe.aws.yml bookit_testcafe_aws
  ./scripts/ecs-deploy.sh -c ${STG_ECS_CLUSTER} -n ${STG_ECS_SERVICE} -i 006393696278.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECS_REPO}:${COMMIT_SHA}
fi
