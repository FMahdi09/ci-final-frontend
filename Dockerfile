## build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY ./package* ./

RUN npm ci

COPY ./ ./

RUN npm run build

## serve stage
FROM nginx:1.26.0-alpine as serve

COPY --from=builder /app/dist /var/www

COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]