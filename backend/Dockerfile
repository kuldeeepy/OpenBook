# Dockerfile example with postinstall concept

FROM node:16-bullseye-slim

# Install system dependencies and xvfb
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        wget \
        gnupg \
        software-properties-common \
        ca-certificates \
        xvfb \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Run npm install
RUN npm ci

# Copy the rest of the application files into the container
COPY . .

# Expose any necessary ports (if your app needs to listen to a port)
# EXPOSE 3000

# Start Xvfb and then run the app
CMD xvfb-run --server-args="-screen 0 1280x1024x24" node index.js




# FROM ghcr.io/puppeteer/puppeteer:19.7.2

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# CMD [ "node", "index.js" ]