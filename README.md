# todo-list-backend

## Introduction

This project is a simple and fast created CRUD RESTfull API, using Nest.js with typescript.

## Project Requirements

- Stack: Nest.js
- Database: Postgres
- ORM: TypeORM
- Validations: class-validator
- prettier / eslint
- Dockerizer application
- Paginated endpoint
- Softdelete
- Husky
- Crud

## Get Start

To Run this project you need install a [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/products/docker-desktop/)

- Run a npm command in your terminal to get dependencies using:

```bash
npm install
```

- To start a database, have one docker compose just use this command and check file start-db.sh inside of dir scripts to get credentials:

```bash
npm run script:dev:db
```

- to create tables and migratios:

```bash
npm run script:dev:migration
```

- Configure de env variables have one file exemple.
- to start the project use command:

```bash
npm run start:dev
```

- To check if your application is running and test endpoints access documentation endpoint in your browser [Documentation](http://localhost:3000/api).

## Running project with dockercompose

- if you want to run the project with docker-compose you need configure the .env variables after just run the command

```bash
docker compose up --build
```

- to create tables and migratios:

```bash
npm run script:dev:migration
```

## Test Application ( Need finish CI to Cover More percentage of the project )

All tests is created with a jest, to find in project just go to controller or repository folder, extension of the files is "\*.spec.ts".

- to run a all test use yarn test

```
yarn test
```

## Documentation

Api documentation is created using swagger, there is possible to find all endpoints and use cases just go to [Documentation](http://localhost:3000/api/swagger).

## Security

- Need implements a helmt, cors, limit rate to prevent some tipes of attack like a ddos.

## Authentication (Not Created Yet)

- To more security is used a JWT auth, to generate a token when you have credentials and refresh token

## Other

thanks for check the repository!
