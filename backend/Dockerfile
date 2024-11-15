# Start from an official Node.js image
FROM node:18-slim

# Install necessary system dependencies, including xvfb
RUN apt-get update && apt-get install -y \
  xvfb \
  libnss3 \
  libxss1 \
  libgdk-pixbuf2.0-0 \
  libx11-xcb1 \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  wget \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the default command to run the app
CMD ["node", "index.js"]

# Expose port if needed (e.g., for a web server)
EXPOSE 3000



# FROM ghcr.io/puppeteer/puppeteer:19.7.2

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# CMD [ "node", "index.js" ]