FROM node:13.8-alpine as base

RUN apk --no-cache add build-base python yarn git

WORKDIR /app

COPY package.json yarn.* ./
COPY ./api/package.json yarn.* ./api/
COPY ./web/package.json yarn.* ./web/

RUN yarn install && yarn cache clean


FROM base as build

COPY . /app

RUN yarn ws:web build


FROM node:13.8-alpine as release

WORKDIR /app

COPY --from=base /app/api/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/api/src ./
COPY --from=build /app/web/build ./webapp

CMD ["node", "-r", "esm", "server.js"]
