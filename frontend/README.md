# frontend

PoC project with Spring Boot 2 (Java 10) as backend and (React, Redux) as frontend.

User types in a auto-completion input field (suggestions are provided querying an ElasticSearch instance) names of locations, which, when selected, are shown on a Map.

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

``` bash
# Project was generated with 'create-react-app', with 'react-scripts-ts' taking care of all configuration files.
# To have full control of the webpack,babel,... configuration files run
yarn run eject

# but notice that after the configuration won't be managed for you anymore. You'll be on your own.
```
