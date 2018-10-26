---
title: Vue.js
category: Frontend
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

We choose [Vue.js](https://vuejs.org) as the framework to develop new Web applications within OpenPaaS. This page describes architecture, best practices and explain choices we made.

## Dependencies

Here is the (uncomplete) list of dependencies used to build a Vue app:

- [Vue](https://vuejs.org/), [vue-router](https://router.vuejs.org/), [vuex](https://vuex.vuejs.org/)
- HTTP Client: [axios](https://github.com/axios/axios), [vue-axios](https://github.com/imcvampire/vue-axios)
- Material design: [Vuetify](https://vuetifyjs.com/) and so [Stylus](http://stylus-lang.com/)
- Templates: HTML, [PUG](https://pugjs.org) with the help of the right loaders
- Auth: [@websanova/vue-auth](https://pugjs.org)
- Tests: [Jest](https://jestjs.io/)

## Environment

We use latest Vue version, [Vue CLI 3](https://cli.vuejs.org/) and Node 10.x:

- You will need Node and we recommend using [nvm](https://github.com/creationix/nvm) to manage your Node version, so install it first if you do not already use it.
- Install Node 10 with nvm `nvm install 10`, then switch if needed `nvm use 10`
- Install Vue CLI `npm install -g @vue/cli`

## Bootstrap a new application

A "seed" is available at [https://github.com/linagora/vue-openpaas-seed](https://github.com/linagora/vue-openpaas-seed). It uses all the dependencies listed above and provides an OpenPaaS compatible layout. By using this seed as basis for other apps, you will be sure to be compliant with all the good practices defined in this guide.

### 1. Clone the seed

(Replace `my-app` by your app name)

```
git clone git@github.com:linagora/vue-openpaas-seed.git my-app
```

You will have to change several things in the files, expecially the application name and description in `package.json`.

### 2. Install dependencies

```
cd my-app
npm install
```

### 3. Configure

The application can be configured by updating the `.env` files as described in the [Vue CLI documentation](https://cli.vuejs.org/guide/mode-and-env.html#example-staging-mode). Values defined in the `.env` file are used at several places in the app (from the store), and can be adapted to your environment. For example, while in development, you can redefine your OpenPaaS instance URL in a `.env.development.local` file which will never be commited (so you can also push secrets in it).

```
VUE_APP_SUPER_SECRET=A super secret thing
VUE_APP_OPENPAAS_URL=http://localhost:8080
```

### 4. Develop

Once done, you can start developping:

- You can start the app in dev mode with `npm run serve`
- Or, use the Vue CLI UI `vue ui` and browse to your application.

![The Vue CLI UI](/images/frontend/vuejs-cli-ui.png)

## Best practices

### Project files layout

We use the default layout provided by vue-cli:

- All the configuration files are at the root of the repository
- Application code is under `src`
- `src/App.vue` and `src/main.js` are the application entry point
- `src/*.*` files are used to configure the application
- `src/components` is used for 'reusable components'
- `src/services` are business services: auth, API clients, everything which is not related to Vue
- `src/store` is where the vuex store lives in. As defined in the Store section, we use modules in the store, so each module has its own folder like `src/store/moduleA` and `src/store/moduleB`
- `src/views` is used for application 'pages'. These views are the one which are used by the router. The views are using the components from `src/components`

### State Management

There are tons of articles around the Web to understand why managing state the [Flux-way](https://facebook.github.io/flux/) is easy and powerful.
The choice was not hard, just because Vue is simple and provides just the right tools, [Vuex](https://vuex.vuejs.org/) is used as state manager, and we rely on the [modular approach](https://vuex.vuejs.org/guide/modules.html) so that we can scale our app.

As shown in `src/store/`:

![The Vue State](/images/frontend/vuejs-store.png)

### Routing

[vue-router](https://router.vuejs.org/) is used as the application router.

- We use name-based routing as defined in [https://router.vuejs.org/guide/essentials/named-routes.html](https://router.vuejs.org/guide/essentials/named-routes.html)
- By using `vue-auth`, routes can be protected and so user will be redirected to the login page until he is authenticated. For example (from `src/router.js`):

```js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false
      }
    }
  ]
});
```

The user will be redirected to the `Login` page if he is not authenticated when opening the `Home` page.

### Authentication

The authentication is a complex subject and depends on the way application are hosted in OpenPaaS. Basically, they can be hosted as any other traditional AngularJS application, i.e. in an OpenPaaS module which is served by the OpenPaaS ESN, or they can be hosted in their own 'runtime', for example, in a distinct container, or as static assets.

#### ESN-hosted application

As described in the ESN authentication documentation, AngularJS application relies on cookies to authenticate user: A session cookie is sent with each request. This will be the same if the Vue application is hosted on a module, if not, new authentication mechanisms have to be implemented in the Vue application.

#### PaaS-hosted application

By 'PaaS-hosted', it means that the application is not hosted in an OpenPaaS ESN NodeJS module. It is hosted somewhere else, in a Docker container, served by an Apache server, etc...

##### JWT

[websanova@vue-auth](https://github.com/websanova/vue-auth) is used to implement JWT based authentication: When a user fills his login/password on the login page, a single `POST /api/jwt/generate` request is sent to the OpenPaaS backend, to get a JWT token for the given user. The token is then pushed in the application state and reused in all HTTP calls to OpenPaaS.

##### Cookies

This is not available right now and it hardly depends on how application are deployed in OpenPaaS:

If a user who is authenticated within OpenPaaS opens a Vue powered application running somewhere else in the PaaS, we should be able to not ask the password again and again. There are several ways to do this, one will be to push a JWT token in the cookie and extract this JWT token when the Vue application is launched.

**T O D O: This needs to be checked**

##### LemonLDAP

**T O D O: Check how Lemon can be used, (and is already used)**

### Reusing components

Some frontend components are available as described in [Vue Components](/frontend/vue-components/). If for some reason, you need a component which is not provided by this module but you think it will be useful to share, please consider adding it to the module.

### Using OpenPaaS Core API

**T O D O: We need a dedicated module.**

## Build

Building the application can be done from npm `npm run build` or from Vue UI. It will generate the application in the `dist` folder.

