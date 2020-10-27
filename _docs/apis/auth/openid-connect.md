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

OpenPaaS supports [OpenID Connect](https://openid.net/connect/) (OIDC) as Authentication/Authorization module.
OIDC can be used to authenticate users when they reach OpenPaaS ESN and when they launch an OpenPaaS powered application: User is redirected to the OIDC login page, authenticates, and is then redirected to the initial application.

The current page describes how to configure and use OIDC to provide this Single Sign On (SSO) support in OpenPaaS.

## authentication flow

We have three parties:

* the web application, running in the browser
* the API server
* the OIDC server

The flow goes as follow:

1. the user agent hits the **web application**
2. the **web application** checks its connection status, then redirect to the **OIDC server** authorization_endpoint
3. the user logs in
4. the **OIDC server** redirects to the **web application**, using a specific hash in the URL `#/auth/oidc/callback`
5. the **web application** is now connected and has a bearer token
6. the **web application** issues a request to the **API server**. It adds a header `Authorization: bearer [bearer token provided by the OIDC server]`
7. the **API server** issues a connection to the **OIDC server**, using the bearer token, to get the user informations
8. the **API server** now knows the identity of the user, and proceeds to the query

## Authenticating incoming REST API calls

In order to allow applications to call OpenPaaS APIs, the OIDC strategy must be enabled on the OpenPaaS ESN backend. The current section explains how to configure it.

### API Configuration

The `openid-connect` strategy must be added to the list of API strategies in the `config/default.*.json` file:

```json
"auth": {
  "apiStrategies": ["basic-mongo-ldap", "basic-mongo", "openid-connect", "bearer", "jwt"]
}
```

This strategy will:

1. Get the `Bearer` token from the incoming HTTP request
2. Try to authenticate user from the token
3. Try to retrieve the user from the token by requesting the OIDC server
4. "Mount" the OpenPaaS user from retrieved OIDC user email
5. Pass the request to the next handler

In order to retrieve the user from the token by requesting the OIDC server, OpenPaaS needs to be configured correctly: Configuration is described in the `OIDC Configuration` below.

## Authenticating users

OIDC can also be used for SSO at the OpenPaaS portal level. The OpenPaaS Web application acts as an OIDC Relying Party (commonly called 'client'): The user will be redirected to the OIDC login page when required.

### Configuration

1. On the OIDC provider side, a client must be created. In this howto we use `openpaas-esn` value as `client_id`.
2. The OpenPaaS configuration must be updated to include the `openpaas-esn` client as described in the `OIDC Configuration` section below.

Required fields for the configuration are:

  - `client_id`: `openpaas-esn` in this example
  - `client_secret` is the unique, generated secret provided by the OIDC server
  - `issuer_url` is the Issuer URL of your OIDC server. If defined, it overrides the one defined at the top level. It is frequently the URL of the auth server, like `https://auth.openpaas.example`
  - `authorization_url` is the authorization endpoint
  - `token_url` is the token endpoint
  - `user_info_url` is the token to fetch user information
  - `end_session_endpoint` is the URL used to end the user session ([Spec](https://openid.net/specs/openid-connect-session-1_0.html#RPLogout))


## OIDC Configuration

The configuration is platform-wide and so has to be set in the `core` module in the `openid-connect` settings:

```json
{
  "name": "core",
  "configurations": [
    {
      "name": "openid-connect",
      "value": {
        "issuer_url": "http://localhost:8888/auth/realms/master",
        "clients": [
          {
            "client_id": "an-openpaas-client",
            "client_secret": "34b398b7-79fe-4ab1-b53c-b68c20743558",
            "issuer_url": "http://issuer:8888/auth/realms/master"
          },
          {
            "client_id": "openpaas-esn",
            "client_secret": "34b398b7-79fe-4ab1-b53c-b68c20743559",
            "issuer_url": "http://issuer:8888/auth/realms/master",
            "authorization_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/auth",
            "token_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/token",
            "user_info_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/userinfo",
            "end_session_endpoint": "http://issuer:8888/auth/realms/master/protocol/openid-connect/logout"
          }
        ]
      }
    },
    // ...
  ]
}
```

Where:

- `issuer_url` is the Issuer URL of your OIDC server. This value will be used if none is defined in the client item from the `clients` array below.
- `clients`is an array of OIDC clients (Relying Party) where:
  - `client_id` is the ID of the client you configured in the OIDC server
  - `client_secret` is the unique, generated secret provided by the OIDC server
  - `issuer_url` is the Issuer URL of your OIDC server. If defined, it overrides the one defined at the top level.
  - `authorization_url` is the authorization endpoint. *Required for `linagora.esn.oidc` module.*
  - `token_url` is the token endpoint. *Required for `linagora.esn.oidc` module.*
  - `user_info_url` is the token to fetch user information. *Required for `linagora.esn.oidc` module.*
  - `end_session_endpoint` is the URL used to end the user session ([Spec](https://openid.net/specs/openid-connect-session-1_0.html#RPLogout)).

Lots of OIDC servers implement the "Well Known" URL. It's something like `https://auth.openpaas.example/.well-known/openid-configuration`.

| OpenPaaS configuration | OIDC server well known JSON key |
|------------------------|---------------------------------|
| issuer_url             | issuer                          |
| authorization_url      | authorization_endpoint          |
| token_url              | token_endpoint                  |
| user_info_url          | userinfo_endpoint               |
| end_session_endpoint   | end_session_endpoint            |

These values are available on distinct locations based on the OIDC server you use. More details are given below.

Until there is an UI to configure it, the only ways to set these values are:

1. Update the document in the MOngoDB `configurations` collection
2. Call the configuration REST API with a platform administrator credentials such as:

    ```sh
     curl -d "@configuration.json" -H "Content-Type: application/json" --user admin@open-paas.org:secret -X PUT http://localhost:8080/api/configurations\?scope\=platform
    ```

    Where `configuration.json` is a file which contains the configuration you want to set such as:

    ```json
    [
      {
        "name": "core",
        "configurations":
        [
          {
            "name": "openid-connect",
            "value": {
              "issuer_url": "http://localhost:8888/auth/realms/master",
              "clients": [
                {
                  "client_id": "openpaas",
                  "client_secret": "2ec1a41d-b008-444c-a867-fa9985f7183b"
                },
                {
                  "client_id": "openpaas-esn",
                  "client_secret": "34b398b7-79fe-4ab1-b53c-b68c20743559",
                  "issuer_url": "http://issuer:8888/auth/realms/master",
                  "authorization_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/auth",
                  "token_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/token",
                  "user_info_url": "http://issuer:8888/auth/realms/master/protocol/openid-connect/userinfo",
                  "end_session_endpoint": "http://issuer:8888/auth/realms/master/protocol/openid-connect/logout"
                }
              ]
            }
          }
        ]
      }
    ]
    ```

## User provisioning

When delegating authentication to OIDC, the users will be provisioned in the OpenPaaS backend when required:

- When OpenPaaS ESN is loading user at login
- When OpenPaaS application is calling REST APIs

In order to provision the user in the right domain, OpenPaaS will rely on the email address provided by the OIDC UserInfo endpoint and provision following these steps:

1. Extracting the email Top-Level Domain (TLD)
2. Searching a domain with the name from email address TLD
    - If domain found then create a user in this domain
    - Else do not provision user

For example, if the user email address is `name@open-paas.org`, search a domain with name `open-paas.org` then create user in this domain if it exists, else fail.

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
7. Every time an application will have to use this OIDC client, you will have to update the `Valid redirect URIs` by adding the application ones. As an example, for OpenPaaS Vue applications, you have to add 2 redirect URLs each time. If the application is running at [http://localhost:8081](http://localhost:8081):
  - http://localhost:8080/inbox/#/auth/oidc/callback
  - Note: For development purposes you can define redirect URLs with wildcards like http://localhost:8080/* and http://localhost:8081/*
8. You also have to add `Web origins` to allow CORS based on your application deployment. For development purposes, `*` is enough.
9. Click on `Save`
10.You can now get the `client_secret` from the `Credentials` tab:
  ![Keycloak Credentials](/images/apis/auth/oidc/keycloak_client_credentials.png)

You can now configure OpenPaaS by putting the right value in platform configuration. For example, from the screenshots above, and if keycloak is running on port 8888:

```json
{
  "name": "openid-connect",
  "value": {
    "issuer_url": "http://localhost:8888/auth/realms/master",
    "clients": [
      {
        "client_id": "openpaas",
        "client_secret": "96a97f8d-2a73-46e2-b602-512e034ea5f0",
        "authorization_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/auth",
        "token_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/token",
        "user_info_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/userinfo",
        "end_session_endpoint": "http://localhost:8888/auth/realms/master/protocol/openid-connect/logout"
      }
    ]
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

If you have a LDAP directory running somewhere in your environment, you can also use the keycloak user federation feature and import your LDAP users. Check the keycloak documentation for more details at [https://www.keycloak.org/docs/6.0/server_admin/#_ldap](https://www.keycloak.org/docs/6.0/server_admin/#_ldap).
