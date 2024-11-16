FROM node:latest

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

RUN apt-get update && apt-get install -y xvfb

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["xvfb-run", "--server-args=-screen 0 1024x768x24", "node", "index.js"]


# FROM ghcr.io/puppeteer/puppeteer:19.7.2

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# CMD [ "node", "index.js" ]