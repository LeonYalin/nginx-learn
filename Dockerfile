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
  --with-http_image_filter_module=dynamic \
  --modules-path=/etc/nginx/modules

# compile and install the nginx binary
RUN cd nginx-1.21.6 && make && make install
EXPOSE 80 443

# start nginx in the foreground (this will keep the container alive)
CMD ["nginx", "-g", "daemon off;"]