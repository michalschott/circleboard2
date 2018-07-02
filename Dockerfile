FROM alpine:3.7

RUN set -xe; \
    apk upgrade --no-cache; \
    apk add git nodejs --no-cache; \
    mkdir /opt/app -p; \
    adduser -D nodejs;

COPY . /opt/app

RUN set -xe; \
    chown -R nodejs. /opt/app

USER nodejs

WORKDIR /opt/app

RUN set -xe; \
    npm install

EXPOSE 4200

CMD ./node_modules/.bin/ng serve --host 0.0.0.0
