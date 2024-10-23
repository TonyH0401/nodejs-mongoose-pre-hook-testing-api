# Testing MongooseJS's stackable .pre() hook, nested paths, sub docs and serving static resources in NodeJS

Welcome to testing MongooseJS's stackable `.pre()` hook, nested paths, sub docs and serving static resources in NodeJS.

This project serves as a comprehensive guide, offering testing and implementation insights.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variable](#Environment-Variable)
- [Quick Start](#Quick-Start)
- [Development Documentation](#development-documentation)
- [To Do](#to-do)

## Introduction

This project offers testing MongooseJS's stackable `.pre()` hook, nested paths, sub docs and serving static resources in NodeJS. You should check out the documentations and notes below.

This project's functionalities include:

- Testing `.pre()` hooks stackable property.
- Testing nested paths and sub docs.
- Testing serving static resource.

## Getting Started

I recommend running this project on **NodeJS v20+** or **NodeJS v22+**. This project was originally run on **NodeJS v21.7.1** and **npm@10.5.0**.

### Installation

To get started, you need to download this project from the GitHub repository and navigate to the project's folder.

```sh
cd nodejs-mongoose-pre-hook-testing-api/
```

You need to dowload the project's dependencies.

```sh
npm install
```

Additionally, you should download an extra package for running the project, it's called [**nodemon**](https://www.npmjs.com/package/nodemon).

```sh
npm i nodemon --save-dev
```

### Environment Variable

This step is **important**! Create an `.env` file to store the application's credentials. These are the credentials you will need.

```sh
BE_PORT="" # IMPORTANT: This is the back end port, you need to have this variable for the project to work!
MONGODB_URI=""
MONGODB_SERVER_NAME="SimpleUsersNews"
```

## Quick Start

Run the project using the following command(s).

```sh
npm start
```

Or, if you have already downloaded nodemon using `npm i nodemon --save-dev`, you can also run the project using the following commands(s).

```sh
npm run api
```

These are the URLs that will be accessed. P.S: I will add the Postman docs as soon as possible.

```sh
.../api/v1/users/...
.../api/v1/books/...
.../api/v1/posts/...
```

---

## Development Documentation

_Order from newest to oldest_

### 2024/10/23

- NodeJS's process goes from top to bottom in a order.
- If you have defined `/:id` and `/demo` routes in this order, it will never run the `/demo` route, it will always run `/:id` route every single time. When you call for `/demo`, it will call for `/:id` with `demo` as the value, like this `:id = demo`.
- To fix this, you just need to change the position such as `/demo` first then `/:id` later or you can have 2 separate routes such as `/:id` and `/demo/demo`

### 2024/10/15

- There was a weird thing with `express-rate-limit` where the package keeps giving errors about a `tsconfig` file, I couldn't find the `tsconfig` file. I tried to perform some troubleshooting method, it was resolve but I don't know which method resolved it, so I will list them here:
  - Try download the `@ts` expansion for `express-rate-limit`.
  - Try uninstalling `express-rate-limit` and its `@ts` expansion pack.
  - Try reload the VSCode window (twice).
  - Try download `express-rate-limit` again (no `@ts` expansion).

### 2024/10/14

- Initialize: the project
