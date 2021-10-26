FROM node:14

WORKDIR /usr/src/app

COPY ./dist/index.js .
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production

EXPOSE 8080

CMD [ "node", "index.js" ]
