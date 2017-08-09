FROM nginx:alpine

COPY nginx/bookit-app.conf /etc/nginx/conf.d/

WORKDIR /opt/app

ADD build .

COPY nginx/config.js.template .

# special script to run properly in AWS ECS
COPY scripts/run-in-aws.sh .
