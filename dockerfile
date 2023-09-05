FROM node:18

RUN npm install -g @vue/cli

RUN mkdir /app

WORKDIR /app

COPY . /app

CMD [ "npm", "run", "serve" ]