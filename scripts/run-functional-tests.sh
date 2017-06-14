!#/bin/bash

docker pull builditdigital/bookit-server:latest
docker run -d -p 8888:8888 builditdigital/bookit-server:latest
docker build . -t builditdigital/bookit-web:test
docker run -d -p 3001:80 -e API_BASE_URL=http://localhost:8888 builditdigital/bookit-web:test
sleep 10; yarn test:functional
