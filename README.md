# CQRS example

## Installation

Go to all service and run this command:

```bash
npm install
```

## Run Using Docker

- Install Docker and Docker-compose
- run the following command

Back to root project and run this command:

```bash
sudo docker-compose --env-file docker.env -f docker-compose.yml up --build
```

## Run Test

Go to nashville service and run this command:

```bash
npm run test:e2e e2e/domain/*.e2e-spec.ts
```

## WebSocket

- URL: ws://nashville:3003
- Event: GET_TASK

## API Document Url

- Nashville (http://localhost:3003/api)
