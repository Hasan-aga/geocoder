FROM node:16-alpine 


COPY package*.json ./

RUN yarn install 

COPY . ./

USER node

CMD ["yarn", "start"]

EXPOSE 3000