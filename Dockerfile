# STEP 1 build static website
FROM node:8.12.0-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm install

# Copy project files into the docker image
COPY .  /app

# Build production
RUN npm run build --prod


# STEP 2 build a small nginx image with static website
FROM nginx:1.14.0-alpine

## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/odds-worklog /app/dist/odds-worklog
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf