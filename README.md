# Adonis API application

## Setup

Clone the repo and then run `npm install`.

Install MySQL and create a database to this project.

Here are all environment variables you must set on your .env file:<br>
**HOST**=127.0.0.1<br>
**PORT**=3333<br>
**NODE_ENV**=development<br>
**APP_NAME**=AdonisJs<br>
**APP_URL**=http://${HOST}:${PORT}<br>
**CACHE_VIEWS**=false<br>
**APP_KEY**=0JA5u1q3PiNdX11ylfk0jPZaJbMKzNeb<br>
**DB_CONNECTION**=mysql<br>
**DB_HOST**=127.0.0.1<br>
**DB_PORT**=3306<br>
**DB_USER**=<YOUR_DB_USER><br>
**DB_PASSWORD**=<YOUR_DB_PASSWORD><br>
**DB_DATABASE**=<YOUR_DB_SCHEMA><br>
**HASH_DRIVER**=bcrypt<br>

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Startup your server

```js
npm run dev
```
