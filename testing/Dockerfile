FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "playwright", "install", "chromium"]
RUN npm run testcase