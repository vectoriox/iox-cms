FROM node:13.12.0-alpine3.10

ARG ENV

COPY . /tmp/iox-cms-server

RUN npm install -g @nestjs/cli \ 
    && mkdir /opt/iox-cms-client \
    && mkdir /opt/iox-cms-server \
    && cd /tmp/iox-cms-server \
    && npm install \
    #&& if [ "$ENV" = "test" ] ; then ng build ; else ng build --prod ; fi \
    && npm run build \
    && cp -r /tmp/iox-cms-server/dist/. /opt/iox-cms-server \
    && rm -r /tmp/iox-cms-server 

WORKDIR /opt/iox-cms
RUN node main.js

EXPOSE 3000 3000