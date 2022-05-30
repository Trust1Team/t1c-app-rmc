# Read my cards

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Setup local environment with docker compose

### Build the image locally

```shell script
docker build -t eu.gcr.io/t1t-pre-prod/read-my-cards:latest .
```

```sh
docker run -it -p 8080:8080 -e VUE_APP_T1C_URL="https://t1c.t1t.io" -e VUE_APP_T1C_PORT="51883" "eu.gcr.io/t1t-pre-prod/read-my-cards:latest"
```

### Push built images
To push the images make sure you are logged in to the correct gcloud environment
```shell script
gcloud config set project t1t-pre-prod
```

and then make sure docker is configured
```shell script
gcloud auth configure-docker   
```
