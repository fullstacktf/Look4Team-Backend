FROM node:12.13.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
COPY build .
EXPOSE 3000
CMD ["npm", "start"]