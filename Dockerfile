# STEP 1 build static website
FROM node:8.12.0-alpine as builder

RUN apk update && apk add --no-cache make git

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN cd /app && npm install
RUN npm rebuild

# Copy project files into the docker image
COPY .  /app

# Test and build production
RUN cd /app
# RUN npm run test --watch=false
RUN npm run build --prod


# STEP 2 build a small nginx image with static website
FROM nginx:1.14.0-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/odds-worklog /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf