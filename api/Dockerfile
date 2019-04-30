FROM node:10.6.0-alpine

WORKDIR /usr/app

COPY ./package.json ./yarn.lock ./index.js /usr/app/

COPY ./schema /usr/app/schema

RUN yarn install --production
