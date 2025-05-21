[![Build Status](https://github.com/oddsteam/web.odds-worklog/actions/workflows/deployment-odds-cloud.yml/badge.svg)](https://github.com/oddsteam/web.odds-worklog/actions)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=web-odds-worklog&metric=coverage)](https://sonarcloud.io/summary/new_code?id=web-odds-worklog)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=web-odds-worklog&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=web-odds-worklog)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=web-odds-worklog&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=web-odds-worklog)
# Odds Worklog
### Online Prod [http://worklog.odds.team/](http://worklog.odds.team/) ###
### Online Dev [http://worklog-dev.odds.team:32835/](http://worklog.odds.team/) ###

# API
### [http://worklog-dev.odds.team/api/v1/](http://worklog-dev.odds.team/api/v1/) ###

# Swagger
### [http://worklog-dev.odds.team/api/v1/swagger/index.html](http://worklog-dev.odds.team/api/v1/swagger/index.html) ###

# Test trgger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Docker build and run production
Build `docker build -t odds-worklog:prod .`

Run `docker run --name web-odds-worklog -p 80:80 odds-workslog:prod`

Navigate to [http://localhost](http://localhost)


## Docker run from image
Login `docker login registry.odds.team`

Run `docker run --name web-odds-worklog -p 80:80 --rm registry.odds.team/worklog/web.odds-worklog:prod`

## Development server
#### Set node version

Node version `v18.12.0` works on my machine.

#### Install node modules

Since our Angular is very old, we need to install with `--legacy-peer-deps`

```
npm i --legacy-peer-deps
```

Run `ng serve` for a dev server that connects the app to the API on https://worklog-dev.odds.team/.

If you want to connect the app to the API on http://localhost:8080, use the following command:

```bash
ng serve --configuration local
```

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Alternatively, you can run the command below as well. This will run the `ng` in the `node_modules/.bin` folder.

```bash
npm run ng serve -- --configuration local
```

**Note:** The `--` separator means we want to pass the params to the script via the `npm` command.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
