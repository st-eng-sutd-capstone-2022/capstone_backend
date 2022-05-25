# Capstone Backend 🔌⚡🚗

Capstone Backend provides the APIs for the various users of the ST-Engineering-Capstone-2022 Platform, such as through a MQTT Client on IOT Capstone Web / Mobile Application(s). It enables users to monitor their status of their boats and the amount of hydrillas collected per boat.

Capstone is deployed as the following set of microservices, reading / writing from a shared MongoDB database. In future, we might start building a messaging layer passing messages using redis-pub-sub if necessary.

This repository is structured as a monorepo, and managed with [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). Packages are located in the `packages` directory, with a `core` package for shared code, such as database models, middleware, message formats and other utilities.

## Local Setup
### Requirements
- node.js (16.14.0 LTS is recommended). it is recommended to use [nvm](https://github.com/nvm-sh/nvm) to install node.js
- npm 8.0 and up is required to use npm workspaces. npm 8.3.1 is included with an install of node.js 16.14.0 LTS

[Optional]:
- a working installation of [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/). Docker and Docker Compose are used to spin up local mongoDB / redis containers for local development.

### Environment Variables
Configuration for the various backend components are passed through [environment variables](https://12factor.net/config). For convenience for local development, each component has its own env file. To set up the env files, copy and paste the `.env.<package>.example` into a new `.env.<package>` file and edit the variables (if needed). The example env files should work by default if developing locally.

### Running Capstone Backend components
Install dependencies for and build the core package, which is used across all packages.

```
npm install -w packages/core
npm run build -w packages/core
```

Install dependencies for and run the package in development mode. nodemon is run in development mode, which will hot-reload the package on changes detected in the source files.

e.g. for development for the dashboard module
```
npm install -w packages/dashboard
npm run dev -w packages/dashboard
```

### Setting up external dependencies via Docker [Optional]
It is recommended to run MongoDB / Redis using Docker.

To start the containers:
```
docker-compose up -d
```

This will set up a dockerized instance of a MongoDB server listening on `localhost:27017`, a instance of Redis on `localhost:6379` and a web-based MongoDB ui (mongo-express) at `localhost:8081`.

To stop and remove the containers
```
docker-compose down
```

### MongoDB Schema Migrations
MongoDB Migrations are done using migrate-mongo and should be done locally after deployment.
All migration scripts for the schemas should sit in the their respective packages under src/package/migrations.
Follow the steps here to setup migrate-mongo:
```
npm i -w packages/core migrate-mongo
cd packages/core
migrate-mongo --init
```
A `migrate-mongo-config.js` file should be created in the workspace. Set the url field and sdatabase field in the `migrate-mongo-config.js` accordingly and change migrationsDir to `migrationsDir: './dist/migrations'` or `migrationsDir: './lib/migrations'` depending on the output directory of the tsconfig.json file.

Add the following scripts to the respective packages' package.json file:
```
"migrate-up": "migrate-mongo up",
"migrate-down": "migrate-mongo down"
```

To do a migration, execute the following commands:
```
cd packages/core
migrate-mongo create datetime-file-name.ts
npm run build
npm run migrate-up
```
All migration logs are stored in the changelog collections in the database.

## Error Handling
Capstone Backend uses custom error handling components to handle throwing of errors with HTTP response codes.

1. [AppError](packages/core/src/errors/AppError.ts): Subtypes of `AppError` should be thrown instead of the Error class if specific HTTP response status codes are needed. If Error class is used, status code will be 500. If error codes are outside of the valid range of status codes as defined by express, 500 will be used as the status code. CapstoneBackend currently supports the following CustomErrors:
  - InvalidParametersError
  - NotAuthorizedError
  - ResourceNotFoundError
  - UnsupportedOperationError
  - ConflictError
2. [AsyncWrapper](packages/core/src/errors/AsyncWrapper.ts): `wrap` is used to wrap all asynchronous controller functions so that any errors thrown can be propogated to the error handling middleware. For example:
```
router.get('/path', wrap(Controller.asyncFunction));
```
3. [ErrorHandler](packages/core/src/middlewares/index.ts): ErrorHandler middleware should be used. It should be the last middleware defined.
```
