FROM node:16.15.0

WORKDIR /opt/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE ${PORT}

CMD [ "yarn","prod" ]