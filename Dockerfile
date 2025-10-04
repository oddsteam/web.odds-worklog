# STEP 1 build static website
FROM trion/ng-cli-e2e:15.2.7 as builder

# Create app directory
WORKDIR /app

# Copy project files into the docker image
COPY .  /app

# Install app dependencies
RUN npm install --no-optional --force && npm rebuild
RUN git config --global --add safe.directory /app
# Run Unit Test
# RUN ng test --watch false

# Run e2e Test
# RUN ng e2e

# Build
ARG ANGULAR_ENV=production
RUN ng build --configuration $ANGULAR_ENV
RUN bash scripts/inject-commit.sh


# STEP 2 build a small nginx image with static website
FROM nginx:1.14.0-alpine

## Replace default nginx config
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/odds-worklog /app/dist/odds-worklog