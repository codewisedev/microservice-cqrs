FROM node:20-alpine3.17 AS ashland
WORKDIR /app/ashland
COPY /ashland/package*.json ./
RUN npm install --force
COPY /ashland/ .
COPY /env/ .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine3.17 AS gallatin
WORKDIR /app/gallatin
COPY /gallatin/package*.json ./
RUN npm install --force
COPY /gallatin/ .
COPY /env/ .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine3.17 AS nashville
WORKDIR /app/nashville
COPY /nashville/package*.json ./
RUN npm install --force
COPY /nashville/ .
COPY /env/ .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]