From node:latest

WORKDIR /app

ARG NODE_ENV=production

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","server"]