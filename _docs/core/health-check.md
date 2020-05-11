---
title: Health Check
category: OpenPaaS Core
order: 6
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The Health check API represents your OpenPaaS health status.  You can use it to monitor services in OpenPaaS.

## REST API

The health check API is used to retrieve health status of services.
### GET /api/healthcheck:
Query for all services health status.

#### Authentication:
This API provides two kinds of information:
  - Public: Global status of all services.
  - Private: Advance information of services. User must authenticate as a `platform admin` to retrieve this kind of information.

#### Response
##### Schema

**Public Response**
```
{
  "status": "healthy"
}
```

**Private Response**
```
{
  "status": "unhealthy",
  "checks": [
    {
        "componentName": "mongodb",
        "status": "healthy",
        "details": null
    },
    {
        "componentName": "redis",
        "status": "healthy",
        "details": null
    },
    {
        "componentName": "rabbitmq",
        "status": "healthy",
        "details": null
    },
    {
        "componentName": "elasticsearch",
        "status": "healthy",
        "details": null
    },
    {
        "componentName": "ldap",
        "status": "unhealthy",
        "details": {
          "cause": "Health check: Something went wrong with LDAP connection.",
          "info": [
            {
              "configuration": {
                "mapping": {},
                "url": "dummy",
                "adminDn": "test",
                "adminPassword": "test",
                "searchBase": "test",
                "searchFilter": "(test={{username}})"
              },
              "usage": {
                "auth": true,
                "search": true,
                "autoProvisioning": true
              },
              "name": "test",
              "domainId": "5e9888463662616055f5c3be",
              "state": "unhealthy",
              "message": "dummy is an invalid LDAP URL (protocol)"
            }
          ]
        }
    }
  ]
}
```

**status**: Global status of all services, can be `healthy` or `unhealthy`.
 + `healthy`: All services work normally.
 + `unhealthy`: One or more service is currently not working or under an unstable condition.

**checks**: An array of health statuses.

Child attributes:
- componentName (string): The name of the service/component.
- status (string): Current status of the service, can be `healthy` or `unhealthy`.
  + `healthy`: Service works normally.
  + `unhealthy`: Service is currently not working or under an unstable condition.
- details: (object): Contain advance information of the service.

##### Status
- **200 - OK**: The check has answered with a global `healthy` status.
- **503 - Service Unavailable**: The check has answered with a global `unhealthy` status.

### GET /api/healthcheck/:name:
Query for a single service health status.

#### Authentication:
This API requires user to authenticate as a `platform admin` in order to retrieve information.

#### Request
This API accepts one parameter as the name of the service. The `name` parameter is case-insensitive.
```
/api/healthcheck/mongodb
```

To get a list of available service names for performing health check, please refer to API [GET /api/healthcheck/services](#get-apihealthcheckservices) as described below.

#### Response
##### Schema

```
{
  "componentName": "ldap",
  "status": "unhealthy",
  "details": {
    "cause": "Health check: Something went wrong with LDAP connection.",
    "info": [
      {
        "configuration": {
          "mapping": {},
          "url": "dummy",
          "adminDn": "test",
          "adminPassword": "test",
          "searchBase": "test",
          "searchFilter": "(test={{username}})"
        },
        "usage": {
          "auth": true,
          "search": true,
          "autoProvisioning": true
        },
        "name": "test",
        "domainId": "5e9888463662616055f5c3be",
        "state": "unhealthy",
        "message": "dummy is an invalid LDAP URL (protocol)"
      }
    ]
  }
}
```

Where:
- componentName (string): The name of the service/component.
- status (string): Current status of the service, can be `healthy` or `unhealthy`.
  + `healthy`: Service works normally.
  + `unhealthy`: Service is currently not working or in an unstable condition.
- details: (object): Contain advance information of the service.

##### Status
- **200 - OK**: The check has answered with a `healthy` status.
- **401 - Unauthorized**: User has not logged in.
- **403 - Forbidden**: User has not authenticated as a `platform admin`.
- **404 - Not Found**: Service with the provided name cannot be found.
- **503 - Service Unavailable**: The check has answered with a `unhealthy` status.


### GET /api/healthcheck/services:
Query for all available service names.

#### Authentication:
This API requires user to authenticate as a `platform admin` in order to retrieve information.

#### Response
##### Schema
A response of this API can be fully defined like this:
```
{
  "services": ["mongodb", "redis", "rabbitmq", "elasticsearch"]
}
```

**services** : An array of available service names.

##### Status
- **200 - OK**: API is working normally, returns a list of available service names.
- **401 - Unauthorized**: User has not logged in.
- **403 - Forbidden**: User has not authenticated as a `platform admin`.
- **500 - Server Errors**: Internal Server Error.

## For developers
### Register a new health check provider
The health check module is available at `backend/core/health-check`. To register a service as a health check provider, we should separate the logic into a file `health-check.js`. For each service we have a separated `heath-check.js` file.

#### HealthCheckProvider
HealthCheckProvider is a class used to modelize services. Its constructor requires the name of the service and a function called `checker`. The `checker` function will be defined in detail next section.

```js
const { HealthCheckProvider } = dependencies('health-check');
  new HealthCheckProvider(SERVICE_NAME, checker);
```

#### Checker function
`Checker` is an async function. Its main purpose is to call for some APIs / Methods/ Functions to check for status of service, then return a promise contains formatted messages. We created 2 helper functions to build formatted messages for checker: `buildHealthyMessage` and `buildUnhealthyMessage`

```js
function checker() {
  return checkConnection()
    .then(result => (result ? buildHealthyMessage(SERVICE_NAME) : buildUnhealthyMessage(SERVICE_NAME, message)))
    .catch(error => {
      return buildUnhealthyMessage(error);
    });
}
```
In the example provided above, we call a function to check for the connection of service, then build the formatted message and return it.
Each service has its own functions / methods or APIs to check for health or connection status.

#### Register function

To make a service available for health check API, call the `register` method inside the init function of that service:

```js
const { registry } = dependencies('health-check');
// Here we declare the register function to call inside the init function of the service we want to register as a Health Check Provider.
function register() {
  return registry.register(new HealthCheckProvider(SERVICE_NAME, checker));
}

module.exports = {
  register
}
```

After that, import and call the function where the service was initialized.

```js
  const healthCheck = require('./health-check');
  healthCheck.register();
```

After registered successfully, your service will be available via the Health Check API.

### Get registered services

In case you want to get all registered services, call the `getRegisteredServiceNames` method:

```js
const { getRegisteredServiceNames } = dependencies('health-check');
getRegisteredServiceNames();
// ['mongodb', 'rabbitmq', 'redis', 'elasticsearch']
```

### Retrieve health status of services

Health check module provides you 2 methods to get the health status of services, `check` and `checkWithDetails`.
These two return a promise which contains the formatted result of services.
```js
  const { check, checkWithDetails } = dependenies('health-check');
  check().then((result) => {
    // Do something with the result here
  });
  checkWithDetails(['mongodb', 'elasticsearch']).then((result) => {
    // Do something with the result here
  });
```
Those two functions accept a parameter, `serviceNames`. The parameter is an array of service names that function will return the result for. If unset, functions will return the status of all services registered.
The difference between `check` and `checkWithDetails` is `check` does not return data with `details` field, while `checkWithDetails` does. This provides us the ability to protect the sensitive data, prevent it from exposing to unnecessary client.
