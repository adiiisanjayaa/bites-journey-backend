# Introduction

This is backend for chat app, this project is made for practice using node js

## :ledger: Index

- [Development](#wrench-development)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)

## :wrench: Development

Below you can find about development environment, file structure, and build.

### :nut_and_bolt: Development Environment

There is one environment in this project DEV.
you can put the env on .env

```
├── .env
```

in the .env you can fill in the required variables as below:

```
PORT=3000
JWT_SECRET=@QEGTUI
API_PATH="/api"
X_API_KEY="binar-36"
JWT_SECRET="@QEGTUI"
```

### :file_folder: File Structure

Below is the main structure folder :

```
.
├── apps
│   ├── config
│   ├── db
│   │   ├── migrations
│   │   ├── schemas
│   │   ├── seeds
│   └── middlewares
│   └── services
│   │   ├── auth
│   │   ├── message
│   │   ├── user
│   └── utils
```

### :hammer: Build

How to run

```
create database name : db_bites_journey
```

```
npm i
```

```
npm run dev
```

POSTMAN: https://www.postman.com/restless-sunset-139594/workspace/public-workspace/collection/16505254-8ab74eec-5a17-481d-b628-c67f00d4e91b?action=share&creator=16505254


deploy :


https://documenter.getpostman.com/view/29068631/2s9YXe6PaC
