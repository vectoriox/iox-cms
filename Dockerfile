
FROM node:13.12.0-alpine3.10

COPY . /opt/iox-cms
WORKDIR /opt/iox-cms
RUN npm install
RUN npm run build

CMD ["npm", "start"]

EXPOSE 1337 1337


