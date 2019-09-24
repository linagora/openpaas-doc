---
title: OpenID Connect
category: APIs - Auth
order: 4
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

OpenPaaS supports [OpenID Connect](https://openid.net/connect/) (OIDC) as Authentication/Authorization module. The current page describes how to configure and use it.

## Configuration

The `oidc` startegy must be added to the list of API strategies in the `config/default.*.json` file:

```json
"auth": {
  "apiStrategies": ["basic-mongo-ldap", "basic-mongo", "oidc", "bearer", "jwt"]
}
```

This strategy will:

1. Get the `Bearer` token from the incoming HTTP request
2. Try to retrieve the user from the token by requesting the OIDC server
3. Mount the OpenPaaS user from retrieved OIDC user email
4. Pass the request to the next handler

In order to retrieve the user from the token by requesting the OIDC server, OpenPaaS needs to be configured to reach the OIDC server with a pair of tokens.

The configuration is platform-wide and so has to be set in the `core` module under the `oidc`:

```json
{
  "name": "core",
  "configurations": [
    {
      "name": "oidc",
      "value": {
        "issuer_url": "http://localhost:8888/auth/realms/master",
        "client_id": "openpaas",
        "client_secret": "34b398b7-79fe-4ab1-b53c-b68c20743558",
      }
    },
    // ...
  ]
}
```

Where:

- `issuer_url` is the Issuer URL of your OIDC server
- `client_id` is the ID of the client you configured in the OIDC server side
- `client_secret` is the unique, generated secret provided by the OIDC server

These values are available on distinct locations based on the OIDC server you use. More details are given below.

## OIDC Servers

The current section will give details on how to use and configure OIDC self-hosted servers as part of a development process. **This is not supposed to be used as-is in production environments**.

### Keycloak

[Keycloak](https://www.keycloak.org/) is an Open Source Identity and Access Management which can be used as OIDC server.

In the following instructions, it is assumed that Keycloak has is running on port 8888 and that we are using the `master` realm i.e.

```sh
docker run -p 8888:8080 jboss/keycloak
```

The easiest way to go is to use Docker as described in the [Docker Hub page](https://hub.docker.com/r/jboss/keycloak/).

Once logged in as admin, you should have access to the realm configuration page on [http://localhost:8888/auth/admin/master/console/#/realms/master](http://localhost:8888/auth/admin/master/console/#/realms/master).

In order to use OpenID Connect in OpenPaaS, you will have to create a `Client` in keycloak:

1. Go to `Clients`, then click on `Create`.
2. Set `openpaas` as `Client ID`
3. Toggle `Consent Required` to `ON`
4. Toggle `Display client on consent screen` to `ON`
5. Toggle `Implicit Flow Enabled` to `ON`
6. Set `Access` Type to `confidential`
  ![Keycloak Create Client 1](/images/apis/auth/oidc/keycloak_create_client_1.png)
  ![Keycloak Create Client 2](/images/apis/auth/oidc/keycloak_create_client_2.png)
7. Every time an application will have to use this OIDC client, you will have to update the `Valid redirect URIs` by adding the application ones. As an example, for OpenPaaS Vue applications, you have to add 2 redirect URLs each time. For example, if the application is running at [http://localhost:8081](http://localhost:8081):
  - http://localhost:8081/oidc-callback
  - http://localhost:8081/login
8. You also have to add `Web origins` to allow CORS based on your application deployment. For development purposes, `*` is enough.
9. Click on `Save`
10.You can now get the `client_secret` from the `Credentials` tab:
  ![Keycloak Credentials](/images/apis/auth/oidc/keycloak_client_credentials.png)

You can now configure OpenPaaS by putting the right value in platform configuration. For example, from the screenshots above, and if keycloak is running on port 8888:

```json
{
  "name": "oidc",
  "value": {
    "issuer_url": "http://localhost:8888/auth/realms/master",
    "client_id": "openpaas",
    "client_secret": "75046a84-7344-45e1-a8f3-4210c973ae74"
  }
}
```

In order to get user information from their access token, keycloak needs to be configured to have the same users as the ones available in OpenPaaS. Check the keycloak documentation for more information on this.

For development purposes, you can create users by hand in keycloak and use them in your daily development process:

1. Go to `Users`
2. Click on `Add user`
3. Fill the form, be sure to put the same email as the one you have in OpenPaaS user database
4. Click on `Save`
  ![Keycloak Add User](/images/apis/auth/oidc/keycloak_add_user.png)
5. Go in the `Credentials` tab, then set a `New password` and `Password confirmation`
6. Toggle `Temporary` to `OFF`
7. Hit `Enter` to save
  ![Keycloak User Credentials](/images/apis/auth/oidc/keycloak_user_credentials.png)

### LemonLDAP

Tests are ongoing, as documentation.