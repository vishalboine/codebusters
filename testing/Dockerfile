FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
npm install playwright
COPY . .
RUN npm run testcase