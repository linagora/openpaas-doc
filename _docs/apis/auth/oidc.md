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

## Authenticating incoming REST API calls

In order to allow applications to call OpenPaaS APIs, the OIDC strategy must be enabled on the OpenPaaS ESN backend. The current section explains how to configure it.

### API Configuration

The `oidc` strategy must be added to the list of API strategies in the `config/default.*.json` file:

```json
"auth": {
  "apiStrategies": ["basic-mongo-ldap", "basic-mongo", "oidc", "bearer", "jwt"]
}
```

This strategy will:

1. Get the `Bearer` token from the incoming HTTP request
2. Try to retrieve the user from the token by requesting the OIDC server
3. "Mount" the OpenPaaS user from retrieved OIDC user email
4. Pass the request to the next handler

In order to retrieve the user from the token by requesting the OIDC server, OpenPaaS needs to be configured correctly: Configuration is described in the `OIDC Configuration` below.

## Authenticating users

OIDC can also be used for SSO at the OpenPaaS portal level: The user will be redirected to the OIDC login page when required. In order to achieve this, OpenPaaS must be configured and the `linagora.esn.oidc` module must be enabled. Once done, the user will be redirected to the OIDC login/logout pages when needed.

### Configuration

1. The `linagora.esn.oidc` module must be added and enabled. Check the instructions here [https://github.com/linagora/linagora.esn.oidc](https://github.com/linagora/linagora.esn.oidc).
2. The configuration is described in the `OIDC Configuration` section below.

## OIDC Configuration

The configuration is platform-wide and so has to be set in the `core` module in the `oidc` settings:

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
        "authorization_url: "http://localhost:8888/auth/realms/master/protocol/openid-connect/auth",
        "token_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/token",
        "user_info_url: "http://localhost:8888/auth/realms/master/protocol/openid-connect/userinfo"
      }
    },
    // ...
  ]
}
```

Where:

- `issuer_url` is the Issuer URL of your OIDC server
- `client_id` is the ID of the client you configured in the OIDC server
- `client_secret` is the unique, generated secret provided by the OIDC server
- `authorization_url` is the authorization endpoint
- `token_url` is the token endpoint
- `user_info_url` is the token to fetch user information

These values are available on distinct locations based on the OIDC server you use. More details are given below.

**IMPORTANT**: For now, all the applications (OpenPaaS ESN and Vue applications) are sharing the same `client_id` and MUST BE configured as is.

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
  - http://localhost:8081/oidc-callback
  - http://localhost:8081/login
  - http://localhost:8080/linagora.esn.oidc/callback
  - Note: For development purposes you can define redirect URLs with wildcards like http://localhost:8080/* and http://localhost:8081/*
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
    "client_secret": "96a97f8d-2a73-46e2-b602-512e034ea5f0",
    "authorization_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/auth",
    "token_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/token",
    "user_info_url": "http://localhost:8888/auth/realms/master/protocol/openid-connect/userinfo"
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