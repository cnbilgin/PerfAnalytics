FROM node:14.15.5-alpine3.13
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


EXPOSE 3000
CMD ["npm", "start"]