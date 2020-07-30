# Look Up API

## Pre-requisite

- node 12.16.3
- npm 6.14

## Getting started

- **git clone**
- **npm install**
- **create environement variables**
- **create your .env file**
- **npm run dev** : Start local development server using **nodemon**

## Environment variables

```bash
    DB_HOST=localhost #database host
    DB_USER=johndoe #database user
    DB_PASSWORD=superpassword #password of the database user
    DB_DATABASE=sample #database name
    DB_DIALECT=mysql #one of mysql | postgres | mssql | mariadb | sqlite
    DB_TEST=sample_test #database for test env
    PORT=5050 #port to listen for your server
    secret=yoursecretforjwt #secret used for jwt encryption
    CLIENT_URLS=http://local.fr #list of authorized clients.
    #if you need to set many clients, please add ", " between each of them like the following:
    # CLIENT_URLS=http://local.fr, http://test.com, http://johndoe.io
```

## Execution and writing of tests

- **npm test** : Start test server using mocha
- Using **Chai** and **Chai-http** with method _`should`_

## Curious behavior

- importing a route in a model will **_crash_** or **_not validate_** your tests

## Authors

##### [Marc](https://github.com/Neo-Ryo)

##### [Marion](https://github.com/Marion-H)

##### [Adèle](https://github.com/Adelebp)

##### [Jp](https://github.com/jpgrindcore007)

##### [Tommy](https://github.com/Tommychinn)
