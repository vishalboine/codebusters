FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@7
COPY . .
RUN npx install playwright chrome
COPY . .
RUN npm run testcase