FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn -v
RUN yarn

# remove build layer and copy over the necessary data
FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app .

COPY . .

EXPOSE 3000