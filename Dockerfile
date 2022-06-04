FROM node:lts-alpine 
WORKDIR /app

EXPOSE 3000

CMD [ "yarn", "start:docker" ]