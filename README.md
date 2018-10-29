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
Build `docker build -t odds-worklog:dev .`

Run `docker run --name web-odds-worklog -p 80:80 odds-workslog:dev`

Navigate to [http://localhost](http://localhost)

## Docker run from image
Login `docker login registry.odds.team`

Run `docker run --name web-odds-worklog -p 80:80 --rm registry.odds.team/worklog/web.odds-worklog:dev`

can test result with (http://139.5.147.149/)

## Development server

Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

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
