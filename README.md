<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

- [Description](#description)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [Development](#development)
  - [Decorators](#decorators)
    - [`@PublicEndpoint()`](#publicendpoint)
- [Documentation](#documentation)

## Description

the backend that powers world best automated grass cutter

## Installation

**BEFORE DOING ANYTHING PLEASE INSTALL `YARN` **

Can go online and find how to install yarn

```bash
# install all the dependencies
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
asd# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Development

The server listens to port 3000

Read https://docs.nestjs.com/controllers to build some fundamentals on how to work with nestjs.

### Decorators

We have a custom decorator that is used to help build a public endpoint

#### `@PublicEndpoint()`

This decorator will allow the an endpoint or a set of endpoints to not need jwt token header.

Example

```typescript
@PublicEndpoint() // <-- the extra decorator
@Controller('auth')
export class AuthController {
  ...
  @Get('login')
  ...
  @Get('logout')
}
```

In this scenario, the both `login` and `logout` endpoints will be public as they all fall under the `auth` controller.

```typescript
@Controller('auth')
export class AuthController {
  ...
  @PublicEndpoint() // <-- the extra decorator
  @Get('login')
  ...
  @Get('logout')
}
```

In this scenario, only `login` will be open to public. The rest of the endpoints under `auth` will need authentication.

## Documentation

Swagger is used to document the REST API. It can be accessed locally [here](http://localhost:3000/api)

Read [here](https://docs.nestjs.com/openapi/introduction) on how to build the Swagger according to OpenApi specs.
