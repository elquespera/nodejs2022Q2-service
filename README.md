# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Clone the repository & change into project directory
=======
## Download

```bash
git clone https://github.com/elquespera/nodejs2022Q2-service.git
cd nodejs2022Q2-service
```

## Checkout `logging` branch

```
git checkout database
```

## Rename .env.example to .env

```
mv .env.example .env
```


## Installing NPM modules

```bash
git checkout logging
```

## Rename `.env.example` to `.env`

```bash
mv .env.example .env
```

## Build & start app and database containers with `docker-compose`

## Installing NPM modules

```bash
npm install
```

## Build & start app and database containers with `docker-compose`

```bash
docker-compose up --build
```

After building the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After thie app has started in `docker`, open new terminal and enter:

To run all tests

```bash
npm run test:auth
```

To run only one of all test suites

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```
