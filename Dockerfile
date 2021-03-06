FROM alpine:3.14

# install dependencies to compile nginx sources
RUN apk update && apk --no-cache add build-base
RUN apk add --no-cache --virtual .build-deps \
  gcc \
  libc-dev \
  make \
  openssl-dev \
  pcre-dev \
  zlib-dev \
  linux-headers \
  curl \
  gnupg \
  libxslt-dev \
  gd-dev \
  geoip-dev

# download and unzip nginx sources
RUN apk add --no-cache wget
RUN wget "http://nginx.org/download/nginx-1.21.6.tar.gz" -O nginx.tar.gz && \
  tar -zxvf nginx.tar.gz

# run the configure script to pre-configure custom installation
RUN cd nginx-1.21.6 && ./configure \
  --sbin-path=/usr/bin/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --with-pcre \
  --pid-path=/var/run/nginx.pid \
  --with-http_ssl_module \
  --with-http_v2_module \
  --with-http_image_filter_module=dynamic \
  --modules-path=/etc/nginx/modules \
  --without-http_autoindex_module

# compile and install the nginx binary
RUN cd nginx-1.21.6 && make && make install
EXPOSE 80 443

# install openssl & generate a self-signed ssl certificate
RUN apk add --update openssl && \
  rm -rf /var/cache/apk/* && \
  mkdir /etc/nginx/ssl && \
  openssl req -x509 -days 365 -nodes -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/self.key -out /etc/nginx/ssl/self.crt \
  -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.nginx-learn.com"

# start nginx in the foreground (this will keep the container alive)
CMD ["nginx", "-g", "daemon off;"]