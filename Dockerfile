FROM node:10.16.0-alpine as node

WORKDIR /app

COPY ./ /app/

RUN apk add --update git && npm i --force

RUN npm run build_dev

FROM nginx:1.13
COPY --from=node /app/dist/tedpros /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
