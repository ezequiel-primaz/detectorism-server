# Adonis API application

## Setup

Clone the repo and then run `npm install`.

Install MySQL and create a database to this project.

Here are all environment variables you must set on your .env file:
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=0JA5u1q3PiNdX11ylfk0jPZaJbMKzNeb
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=<YOUR_DB_USER>
DB_PASSWORD=<YOUR_DB_PASSWORD>
DB_DATABASE=<YOUR_DB_SCHEMA>
HASH_DRIVER=bcrypt

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Startup your server

```js
npm run dev
```