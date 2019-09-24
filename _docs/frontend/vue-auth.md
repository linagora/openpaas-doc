---
title: Vue Authentication
category: Frontend
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

There are 2 ways to authenticate users in Vue applications:

1. Rely on Basic Authentication (login/password) and JWT token
2. Rely on [OpenID Connect](https://openid.net/connect/) (OIDC)

OpenID Connect has been chosen as the default authentication/authorization module of the OpenPaaS platform. Basic Authentication is mainly keep to ease development of applications without having to deal with the OpenID Connect setup and configuration.

## Application Configuration

### Variables

Switching between authentication methods is possible with the help of the `VUE_APP_AUTH` environment variable. Possible values are `basic` and `oidc`(defaults to `basic`).

```sh
VUE_APP_AUTH=oidc npm run serve
```

### Vue router

Routes are set to public/private using the `auth` field in [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html):

```js
export default new Router({
  base: ApplicationSettings.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "/",
      name: routeNames.HOME,
      component: Home,
      meta: {
        auth: true
      }
    }
  ]
});
```

## Basic Authentication

On Basic Authentication mode, the user has to fill a login/password form then:

1. A HTTP call is made with Basic Authentication header to a JWT generation endpoint
2. The JWT token is saved in the Vuex Store
3. All the following HTTP calls will use this JWT token in the Authorization header
4. OpenPaaS server will use this token to authenticate the user in the request process

### Configuration

There is no specific configuration on the application side for Basic Authentication.

## OpenID Connect Authentication

On OpenID Connect Authentication mode, the application will rely on the OpenID Connect Authorization server to manage the authentication and authorization workflows. As a result, the application will get a JWT token which will be used exactly like in the steps 2,3,4 of the Basic Authentication workflow.

### Configuration

In order to use OIDC, the application needs to be configured to reach the OIDC server. This configuration has to be set in the `src/public/env/openpaas.js` file.

The `oidc` data is required in this mode:

```js
window.openpaas = {
  // Define the authentication method to use: "oidc" or "basic" (defaults to "basic" when not defined)
  VUE_APP_AUTH: "oidc",
  //
  // OpenID Connect configuration
  oidc: {
    // `authority` is the OpenID Connect Authority: lemonLDAP, keycloak, etc...
    authority: "http://localhost:8888/auth/realms/master",
    // `clientId` is defined on the authority and needs to match the local one.
    // A good practice is to have a generated string
    clientId: "openpaas-seed",
    // `redirectUri` is the application URL the user agent is redirected after login on the authority server
    // "/oidc-callback" is the local Vue application route handling the redirect
    // This redirect URI must be declared as valid redirect URI on the authority server client definition
    redirectUri: "http://localhost:8081/oidc-callback",
    // `postLogoutUri` is the application URL the user agent is redirected after logout on the authority server
    // "/login" is the local Vue application route handling the redirect
    // This redirect URI must be declared as valid redirect URI on the authority server client definition
    postLogoutRedirectUri: "http://localhost:8081/login",
    // `responseType` is what is response types expected by the client
    responseType: "id_token token",
    // `scope` are used by the application during authentication to authorize access to a user's details
    scope: "openid email profile"
  }
}
```

1. The configuration above assumes that the application is available on `http://localhost:8081`. This value **has to be updated** based on your application URL
2. The `authority` URL has to be updated based on your OIDC server settings

More details on how to setup OIDC on the OpenPaaS Platform are available in the [OIDC page](/apis/auth/oidc).