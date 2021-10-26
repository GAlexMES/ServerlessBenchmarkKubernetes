FROM node:slim

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./handler.js ./
COPY .env ./
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start" ]
