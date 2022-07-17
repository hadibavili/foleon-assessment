# Foleon Node.js Assessment

This Rest API serves Page, Row, Column, and Content (Title, Image, Quote, Paragraph).

## Introduction

As per the assignment, I chose an OOP structure for implementing this Rest API, which is why I have decided to utilize `Nest.js` to ensure an integrated and scalable architecture in order to meet the needs of the API.

During the design of the database structure, I found the documentation a bit unclear, so I used the `Many To Many` relationships between tables, which is scalable and helps to avoid having redundant data.

After installing and running the application, you can access the Swagger documentation at - [`http://localhost:3000/api`](http://localhost:3000/api)

As well, I have deployed rest APIs on my own server, which you can access via the following link:
[`http://167.235.229.29:3000/api`](http://167.235.229.29:3000/api)

## Links

- [Database Diagram](https://dbdiagram.io/d/62d1486acc1bc14cc5c604ef)

## Technologies

- **NestJS** - Main Framework
- **OpenAPI (Swagger)** - API documentation
- **Sequelize** ORM
- **Jest** Testing Framework
- **MySQL** DataBase
- **Class-Validator** Validation
- **SuperTest** (e2e HTTP tests)

## If I had more time, I would like to add or modify:

- Refactor my code to detect bugs and bottlenecks.
- Track errors and logs with a log tracker library. (e.g. Datadog)

## Installation

Clone `.env.example` to `.env` once you change the environment variables with desired values.

The `.env.example` file contains environment variables like authentication for MySQL database used by `docker-compose`.

Before you can start the project locally, you will need to install the dependencies:

```bash
  npm install --force
```

Use the following commands to run MySQL DataBase with Docker:

```bash
  docker compose up -d
```

As a next step, run the DataBase migration and seed the DataBase with samples data:

```bash
  npm run migrate
  npm run seed
```

The last step is to run the application in the development mode.

```bash
  npm run start:dev
```

## Test

Run the following command for e2e testing

```bash
  npm run test:e2e
```

## Demo

The link below provides a short video that explains how it works.

https://s8.gifyu.com/images/foleon-demo720.gif
