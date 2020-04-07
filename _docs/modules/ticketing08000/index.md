---
title: Overview
category: OpenPaaS Modules - Ticketing 08000
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
![ticketing 08000Linux](/images/modules/ticketing08000/ticketing.png)
Ticketing 08000Linux adds the ability for clients to create support tickets / issues concerning supported software under a scope of a contract and interact with experts and admins.


it consists of:

- frontend app built using VueJS.
- OpenPaaS component as backend, built using nodeJS.

## Installation

here are the steps required to install the Ticketing 08000Linux after you have installed OpenPaas

### 1. install the backend component

- edit your `$ESN_PATH/config/default.json` and add `ticketing08000linux.backend` to the modules list
```
  ...
  "modules": [
  ...,
  ticketing08000linux.backend
  ],
  ...
```

- add the ticketing backend component `"ticketing08000linux.backend": "linagora/ticketing08000linux.backend"` to esn dependencies in `$ESN_PATH/packages.json`.
- install the dependencies `npm install` and run your esn.

- for development check the component [docs](https://ci.linagora.com/linagora/lps/studio/ticketing08000linux.backend/blob/master/README.md)

### 2. install the frontend app

- clone [https://ci.linagora.com/linagora/lps/studio/ticketing08000linux](https://ci.linagora.com/linagora/lps/studio/ticketing08000linux)
- install the project using `npm install`
- run the development server using `npm run server`
- now the application is up and running on `localhost:8081` ( if esn is already running )

to build the frontend for production just run `npm run build` and host the contents of the `dist` folder to in your web server ( exemple `nginx` )

## configuration:

change the environment variables in `public/end/openpaas.js` to match your OpenPaaS instance:
- `VUE_APP_OPENPAAS_URL` url to  the openpaas instance with the ticketing backend component installed.
- `SSP_URL` your SSP url to be used to reset user passwords.
