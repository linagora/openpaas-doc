---
title: Overview
category: OpenPaaS Modules - SmartSLA
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
![SmartSLA](/images/modules/smartsla/SmartSLA_en.png)
SmartSLA adds the ability for clients to create support tickets / issues concerning supported software under a scope of a contract and interact with experts and admins.


it consists of:

- frontend app built using VueJS.
- OpenPaaS component as backend, built using nodeJS.

## Installation

here are the steps required to install the SmartSLA after you have installed OpenPaas

### 1. install the backend component

`$ESN_PATH` is your openpaas installation path

`$SMARTSLA_PATH` is your SmartSLA installation path

- clone and install the project

```
git clone https://ci.linagora.com/linagora/lgs/smartsla/smartsla-backend.git
cd smartsla-backend
npm i
export SMARTSLA_PATH=$(pwd)
```bash
- link the module to openpaas

```bash
cd $ESN_PATH/modules
ln -s $SMARTSLA_PATH smartsla-backend
```

- add it to the modules list:

edit your `$ESN_PATH/config/default.json` and add `smartsla-backend` to the modules list
```json
  ...
  "modules": [
  ...,
  smartsla-backend
  ],
  ...
```

- for development check the component [docs](https://ci.linagora.com/linagora/lgs/smartsla/smartsla-backend/blob/master/README.md)

### 2. install the frontend app

- clone and install the project:

```bash
git clone https://ci.linagora.com/linagora/lgs/smartsla/smartsla-frontend.git
cd smartsla-frontend
npm i
```
- run the development server using `npm run server`
- now the application is up and running on `localhost:8081` ( if esn is already running )

to build the frontend for production just run `npm run build` and host the contents of the `dist` folder to in your web server ( exemple `nginx` )

## configuration:
### 1. frontend

change the environment variables in `public/end/openpaas.js` to match your OpenPaaS instance:
- `VUE_APP_OPENPAAS_URL` is your openpaas instance url where the SmartSLA backend component is installed.
- `SSP_URL` is your SSP url to be used to reset user passwords.
- `LIMESURVEY_URL` is your limesurvey instance url.
- `SUPPORT_ACCOUNT` customize your SmartSLA information.

### 2. backend

- Set the limesurvey API in the configuration: http://limesurvey.smartsla.local is our limesurvey instance url

```bash
export $ESN_URL="http://localhost:8080/"
export $ESN_ADMIN="admin@open-paas.org"
export $ESN_PASS="secret"
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/json' $ESN_URL -u "$ESN_ADMIN:$ESN_PASS"  -d '[
  {
    "name": "smartsla-backend",
    "configurations": [
      {
        "name": "limesurvey",
        "value": {
          "surveyId": 491487,
          "apiUrl": "http://limesurvey.smartsla.local/index.php/admin/remotecontrol/",
          "username": "admin",
          "password": "password"
        }
      }
    ]
  }
]'
```
