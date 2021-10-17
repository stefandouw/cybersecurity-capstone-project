# Cybersecurity Capstone Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Requirements

* Have the latest version of Node installed
* An IDE like IntelliJ installed
* A MySQL server running on localhost with default port
* A database on the MySQL server named 'capstone'

## Angular server

Run `npm install` to install all the required dependencies. <br />
After that run `npm start` for an Angular server. <br />
Navigate to `http://localhost:5813/` <br />
Database dump at `http://localhost:5813/dbdump`

## Node server

Run `node server/server.ts` in a separate terminal to start the node server. <br />
This server listens on port 3000: `http://localhost:3000/`

## Configuration

MySQL details can be configured at `server/config.ts` <br />
Environment variables can be configured at `src/environment/environment.ts`
