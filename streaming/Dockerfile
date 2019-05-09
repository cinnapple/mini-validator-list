FROM node:10.6.0-alpine

WORKDIR /usr/app

COPY ./package.json /usr/app/

RUN yarn install --production

COPY ./bin /usr/app/bin/
