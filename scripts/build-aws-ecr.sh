#!/bin/bash

pip install --user awscli
PATH=$PATH:/$HOME/.local/bin

REPO_NAME=bookit-aws-ecr
AWS_REGION=us-east-1
echo "The AWS region is $AWS_REGION"
#COMMIT_SHA=fake
echo "NOTE:  USING FAKE COMMIT_SHA"

EXISTING_REPO=$(aws ecr describe-repositories --region $AWS_REGION --repository-names $REPO_NAME --output text 2>/dev/null)
REPO_EXISTS=$(echo $?)

if [[ $REPO_EXISTS == 0 ]]; then
  echo "Repo already exists ... skipping creation"
  REPO=$(echo $EXISTING_REPO | cut -f 6 -d ' ')
  echo "Did we extract the repo name?  ${REPO}"
else
  echo "Creating repo"
  REPO=$(aws ecr create-repository --repository-name $REPO_NAME --region $AWS_REGION --output text | cut -f 6)
  echo "Created repo:  $REPO"
fi

eval $(aws ecr get-login --region $AWS_REGION)
#eval $(aws ecr get-login --region $AWS_REGION | sed 's/-e none//')
echo "Preparing to tag, repo:  ${REPO},  sha: ${COMMIT_SHA}"

DIR=$(dirname "$(cd -P -- "$(dirname -- "$0")" && pwd -P)")
cd $DIR

docker build --tag "$REPO:$COMMIT_SHA" .
docker push "$REPO:$COMMIT_SHA"
