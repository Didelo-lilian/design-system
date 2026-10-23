FROM node:26.12.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run tokens && npm run build-storybook

FROM nginxinc/nginx-unprivileged:1.31.7-alpine
LABEL org.opencontainers.image.source=https://github.com/Didelo-lilian/design-system
COPY --from=build /app/storybook-static /usr/share/nginx/html
