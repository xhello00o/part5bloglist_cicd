FROM node:16

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./backend  ./backend

CMD [ "npm", "run","start-test" ]