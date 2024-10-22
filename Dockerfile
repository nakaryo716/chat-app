FROM node:21.6.1

WORKDIR /app
COPY . /app

RUN npm install \
    && npm update
