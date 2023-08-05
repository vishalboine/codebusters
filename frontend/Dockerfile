FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd testing
RUN npm install
RUN npm run playright
RUN cd frontend
RUN npm run build
FROM nginx:1.23.3-alpine
RUN mkdir /usr/share/logs
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]