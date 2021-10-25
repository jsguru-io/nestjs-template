## Description

[NestJS](https://docs.nestjs.com/) template project with predefined features like validation,
database setup, error handling, containerization, modularity and many more,
with the purpose of enabling rapid development, where developers don't need
to perform individual, and potentially different, setups for each project.

## Installation & running

We are using [Docker](https://www.docker.com/) as our containerization tool in order to avoid
conflicts between different environments and OSs.

In order to install and run this application you need to `git clone` this project into
your local environment.

After that, you'll need to create your own `.env` file, the easiest way is to copy existing
`.env.example` into your new `.env` file, and change environment variables values according to your needs:
```bash
$ cp .env.example .env
```

Next step, you need to build the docker image and run the container:
```bash
$ docker-compose up -d
```

This command will read configuration from `docker-compose.yml` and perform image building and container running,
with all needed services defined there.

`-d` flag stands for `Detached Mode` which means the container will run without a need for open terminal session/window.

If you need to rebuild the image and container, you can add `--build` flag, like this:
```bash
$ docker-compose up -d --build
```

If you need to recreate the image from the scratch, ignoring the cache, do it like this:
```bash
$ docker-compose up -d --build --force-create
```

If you need to restart the container, do so like this:
```bash
$ docker-compose restart
```

When you are done with the work you need to stop the containers:
```bash
$ docker-compose down
```

If you need to trace the logs in the runtime of the service, eg. `api` service that is defined
in `docker-compose.yml` file, you can do it like this:
```bash
$ docker-compose logs -f api
```

If you need to perform some command inside target container, eg. for `api` service and `ls -la` command,
you can do it like this:
```bash
$ docker-compose exec api sh -c "ls -la"
```

## About the app/project

### Package manager
We are using [yarn](https://yarnpkg.com/) as our package manager for this application.

### Environment/config variables
This section explains the purpose of defined environment variables and what they represent:

- `APP_ENV`: The environment in which the application is running. Most common are `local`, `development`, `production`.
- `APP_PORT`: Port that is open inside the docker container, the inner port, the one which nestjs app listens to.
- `APP_OUT_PORT`: Port that is open for the outside world, that is accessible publicly.
- `APP_DEBUG_PORT`: Debug port that is open inside docker container, the inner port
- `APP_DEBUG_OUT_PORT`: Debug port that is open for the outside world, this port is used for debug configuration for devs IDEs.
- `DB_TYPE`: Type of database driver that is being used for the application. Usually we will use `postgres` as db, but the possible ones are `mysql`, `postgres`, `sqlite` and `mssql`.
- `DB_HOST`: Host, IP or domain name of your database.
- `DB_PORT`: Port of your database connection.
- `DB_USER`: Database user that will have access to database in name of app.
- `DB_PASSWORD`: Password for the database user.
- `DB_NAME`: Database name for this app.

### Code linting

We use [prettier](https://prettier.io/) and [eslint](https://eslint.org/) to make our code more readable and unified.

`prettier` should be already running in the background while you code,
but it's always good to prettify your code before the final commit and push:
```bash
$ yarn format
```

Also, we have zero tolerance towards errors and warnings that come out as `eslint` command output.
The command for eslinting is:
```bash
$ yarn lint
```

And whatever errors or warnings come out as a result, we have to address them.

## Testing

TODO...

## Todos
- Add `example` module that will serve as placeholder module for this project
- Add database configuration, add `sequelize-ts` package and implement typescript migrations mechanism;
- Add global validation pipe with usage of `class-validator`
- Enable global errors handling, decide the format of thrown errors/exceptions
- Add Docker configuration for production build
- Add documentation and explanation for testing

## Relevant links
- [JSGuru](https://jsguru.io/)
- [NestJS](https://docs.nestjs.com/)
