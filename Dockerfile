FROM node:8.9-alpine

ENV NODE_ENV test

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm start