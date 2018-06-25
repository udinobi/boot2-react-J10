# Frontend

## Configuration

The frontend app provides 3 configuration profiles :

| Profile | Config file |
| --- | --- |
development | ```frontend/.env.dev```
staging | ```frontend/.env.staging```
production | ```frontend/.env.prod```

Configuration values common to all different profiles are in ```frontend/.env```.

The "*Running the frontend app locally*" section explains how to select a specific profile.

## Building the frontend app (Mac/Linux)

1. Install nvm

    ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash```

2. Install Node.js

    ```nvm install node```

3. Install yarn

   ```curl -o- -L https://yarnpkg.com/install.sh | bash```

4. Install Node modules

    ```shell
    cd frontend
    yarn install
    ```

5. Production build

    ```yarn build```

## Running the frontend app locally

```shell
cd frontend
yarn start
```
```yarn start``` runs the app in development mode. You can also run the app by ```yarn start:staging``` or ```yarn start:prod``` when you need a different profile.

- *NOTE*: If your system Browser is not Google Chrome but you want to use Chrome for this app enter ...

```shell
cd frontend
yarn chrome
```

Still, run ```yarn chrome:staging``` or ```yarn chrome:prod``` to use a different profile.

The frontend app uses the OpenWeatherMap service to display weather information for the locations selected. You will then need an API key from OWM to provide to the frontend app via configuration files or as an environment variable. For instance, in the latter case you can start the frontend with ...

   ```REACT_APP_OWM_API_KEY=k1234567890 yarn start```

... of course replacing ```k1234567890``` with your own OWM key.
