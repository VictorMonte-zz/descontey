FROM node:11-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 50051

CMD [ "npm" , "run", "start" ]