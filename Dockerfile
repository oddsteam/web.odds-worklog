# STEP 1 build static website
FROM trion/ng-cli-e2e:6.2.3 as builder

# Update and install google chrome stable current
RUN apt-get update \
    && apt-get install -y \
      xvfb \
      libosmesa6 \
      libgconf-2-4 \
 && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && (dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install; rm google-chrome-stable_current_amd64.deb; apt-get clean; rm -rf /var/lib/apt/lists/* ) \
 && mv /usr/bin/google-chrome /usr/bin/google-chrome.real  \
 && mv /opt/google/chrome/google-chrome /opt/google/chrome/google-chrome.real  \
 && rm /etc/alternatives/google-chrome \
 && ln -s /opt/google/chrome/google-chrome.real /etc/alternatives/google-chrome \
 && ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome \
 && ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser \
 && ln -s /usr/lib/x86_64-linux-gnu/libOSMesa.so.6 /opt/google/chrome/libosmesa.so

# Create app directory
WORKDIR /app

# Copy project files into the docker image
COPY .  /app

# Install app dependencies
RUN npm install --no-optional && npm rebuild

# Run Unit Test
RUN ng test --watch false

# Run e2e Test
RUN ng e2e

# Build
RUN ng build


# STEP 2 build a small nginx image with static website
FROM nginx:1.14.0-alpine

## Replace default nginx config
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/odds-worklog /app/dist/odds-worklog