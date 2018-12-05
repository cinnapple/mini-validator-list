FROM node:10.6.0-alpine

WORKDIR /usr/api

COPY ./package.json ./yarn.lock ./.env /usr/api/

RUN yarn install --production

COPY ./build /usr/api/build/

EXPOSE 8081

CMD ["yarn", "run", "start"]
