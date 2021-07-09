FROM node:12.14.1-alpine3.10

ARG ENV

COPY . /tmp/iox-cms-server

RUN apk add --no-cache git

RUN npm i -g @nestjs/cli \ 
    && mkdir /opt/iox-cms-client \
    && mkdir /opt/iox-cms-server \
    && mkdir /opt/iox-cms-server/node_modules \
    && cd /tmp/iox-cms-server \
    && npm install \
    && npm run build \
    && cp -r /tmp/iox-cms-server/dist/. /opt/iox-cms-server \
    && cp -r /tmp/iox-cms-server/node_modules/. /opt/iox-cms-server/node_modules \
    && rm -r /tmp/iox-cms-server

WORKDIR /opt/iox-cms-server
CMD node main.js

EXPOSE 3000 3000