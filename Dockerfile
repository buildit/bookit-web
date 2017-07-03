FROM node:8-alpine

ENV TERM=xterm FORCE_COLOR=1

RUN yarn config set cache-folder /root/.yarn-cache

ADD package.json yarn.lock /tmp/
# ADD .cache/.yarn-cache.tgz /

RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app

WORKDIR /opt/app

RUN yarn build

# IMPORTANT!
# https://docs.docker.com/engine/reference/builder/#add
