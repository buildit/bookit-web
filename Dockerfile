FROM node:8-alpine

ENV TERM=xterm

ADD package.json yarn.lock /tmp/
ADD .yarn-cache.tgz /

RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app

WORKDIR /opt/app
