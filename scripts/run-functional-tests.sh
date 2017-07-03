#!/bin/bash

set -ev

# docker-compose instead of all this!
# docker-compose up -d
# sleep 10; yarn test:functional
# docker-compose down

docker pull builditdigital/bookit-server:latest
docker run -d -p 8888:8888 builditdigital/bookit-server:latest
docker build . -t builditdigital/bookit-web:latest
docker run -d -p 3001:80 -e API_BASE_URL=http://localhost:8888 builditdigital/bookit-web:latest
sleep 10; yarn test:functional
