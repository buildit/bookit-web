#!/usr/bin/env sh


function hackNginxConf() {
  NGINX_CONF=bookit-app.conf
  NGINX_CONF_D=/etc/nginx/conf.d

  ACTUAL_BOOKIT_API_URL_ESC=$(echo ${ACTUAL_BOOKIT_API_URL} | sed 's/\//\\\//g')
  cat ${NGINX_CONF_D}/${NGINX_CONF} | sed "s/^ *proxy_pass *.*;/    proxy_pass ${ACTUAL_BOOKIT_API_URL_ESC}\/;/" > /tmp/${NGINX_CONF}
  cp /tmp/${NGINX_CONF} ${NGINX_CONF_D}/${NGINX_CONF}
}

hackNginxConf && \
  envsubst < /opt/app/config.js.template > /opt/app/config.js && \
  nginx -g 'daemon off;'
