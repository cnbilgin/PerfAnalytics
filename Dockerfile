FROM node:14.15.5-alpine3.13 AS reactbuilder

COPY ./perf-analytics-dashboard .
RUN npm install
RUN npm run build


FROM node:14.15.5-alpine3.13
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=reactbuilder /build/* ./dashboard/
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]