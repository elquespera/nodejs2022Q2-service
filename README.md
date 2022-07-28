# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Download

```
git clone https://github.com/elquespera/nodejs2022Q2-service.git
```

## Checkout `database` branch

```
git checkout database
```

## Rename .env.example to .env

```
mv .env.example .env
```


## Installing NPM modules

```
npm install
```

## Build & start app and database containers with `docker-compose`

```
docker-compose up --build
```

After building the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After thie app has started in `docker`, open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
