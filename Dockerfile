FROM node:16-alpine3.14 AS builder

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
CMD ["yarn", "start:dev"]
