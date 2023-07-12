FROM node:20-alpine3.17 AS ashland
WORKDIR /app/ashland
COPY /ashland/package*.json ./
COPY /ashland/ .
RUN npm install --force
RUN npm run build
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine3.17 AS gallatin
WORKDIR /app/gallatin
COPY /gallatin/package*.json ./
COPY /gallatin/ .
RUN npm install --force
RUN npm run build
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine3.17 AS nashville
WORKDIR /app/nashville
COPY /nashville/package*.json ./
COPY /nashville/ .
RUN npm install --force
RUN npm run build
CMD [ "npm", "run", "start:dev" ]