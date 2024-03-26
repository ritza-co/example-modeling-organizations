# Example Modeling Organizations using FusionAuth's Entity Management Feature

This repo holds a companion node express.js application, called "AwesomeCRM", for the [Modeling Organizations](https://fusionauth.io/docs/extend/examples/modeling-organizations) guide on the FusionAuth website. The guide walks through how to model organizations in FusionAuth using the Entity Management feature.


## Project Contents

The `docker-compose.yml` file and the `kickstart` directory are used to start and configure a local FusionAuth server.

The `/complete-application` directory contains a fully working version of the application.

## Project Dependencies
* Docker, for running FusionAuth
* Node 16 or later, for running the AwesomeCRM Express.js application

## FusionAuth Installation via Docker

In the root of this project directory (next to this README) are two files [a Docker compose file](./docker-compose.yml) and an [environment variables configuration file](./.env). Assuming you have Docker installed on your machine, you can stand up FusionAuth up on your machine with:

```shell
docker compose up -d
```

The FusionAuth configuration files also make use of a unique feature of FusionAuth, called [Kickstart](https://fusionauth.io/docs/v1/tech/installation-guide/kickstart): when FusionAuth comes up for the first time, it will look at the [Kickstart file](./kickstart/kickstart.json) and mimic API calls to configure FusionAuth for use when it is first run. 

> **NOTE**: If you ever want to reset the FusionAuth system, delete the volumes created by docker compose by executing `docker compose down -v`.

FusionAuth will be initially configured with these settings:

* Your client Id is: `e9fdb985-9173-4e01-9d73-ac2d60d1dc8e`
* Your client secret is: `super-secret-secret-that-should-be-regenerated-for-production`
* Your example usernames are
  * `richard@example.com`,  password is `password`
  * `erlich@example.com`,  password is `password`
  * `jared@example.com`,  password is `password`
* Your admin username is `admin@example.com` and your password is `password`.
* Your fusionAuthBaseUrl is 'http://localhost:9011/'

You can log into the [FusionAuth admin UI](http://localhost:9011/admin) and look around if you want, but with Docker/Kickstart you don't need to.

## Running the Example App
To run the application, first go into the project directory

```shell
cd complete-application
```

Install dependencies

```shell
npm install
```

Start the application

```shell
npm start
```
