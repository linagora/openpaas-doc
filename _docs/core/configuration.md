---
title: Configuration
category: OpenPaaS Core
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

OpenPaaS has two types of configuration:
- Local: Defines the local configurations of the current instance
- Global: Defines the configuration which is shared between on all the OpenPaaS instances

## Local configuration

### Overview

Local configuration of the application is stored in the `config/default.json` file.
You should not modify this file directly but instead define the _environment-based_
configuration file, e.g. `config/default.dev.json` for development and
`config/default.production.json` for production deployment.

The application relies on `NODE_ENV` environment variable to know which configuration
file to be loaded. For example, if `NODE_ENV=test`, it will load `config/default.test.json` file.

Note that the configuration defined in `./config/default.json` will not be overridden by the environment-based configuration file but instead inherited from it. The only exception is the array propertices, which will be overridden.

### Usage

The local configurations are stored in JSON structure so it is pretty easy to
read and write this type of configuration.

To read configurations, simply require the module in `backend/core/config`:

```javascript
const config = require('...')('default');

console.log(config.auth.strategies);
```

Since it is stored in file system, you simply modify the file to modify the configurations.

## Global configuration

### Overview

The global configuration is stored in MongoDB under the `configurations` collection
in order to be shared over nodes.

A configurations document has the following structure:

```
{
  "domain_id" : ObjectId("domain_id"),
  "user_id" : ObjectId("user_id"),
  "modules" : [
    {
      "name" : "module name",
      "configurations" : [
        {
          "name" : "config_name",
          "value" : Any
        }, {
          ...
        }
      ]
    }, {
      // other modules
    }
  ]
}
```

#### Configuration scope

Each document has its scope, base on the values of `domain_id` and `user_id`:
- __User-wide__: configurations belong to a specific user in a specific domain, the document must contain both `domain_id` and `user_id`
- __Domain-wide__: configurations belong to a specific domain, the document must contain `domain_id` and no `user_id`
- __System-wide__ (AKA platform-wide): configurations which will be applied to the whole system, the document must not contain neither `domain_id` or `user_id`

#### Configuration inheritance

The global configuration has a concept of inheritance, which means if there is
no configuration in a scope, the configuration in wider scope will be used. For
example, if the user does not specify any configuration, the configuration of
his current domain will be used. And so on, if the configuration of a domain is
not specified, the system-wide configuration will be used.

### Usage

In both frontend and backend, the global configurations can be read by `esn-config`
module.

In backend, the code is placed in `backend/core/esn-config`:

```javascript
const esnConfig = require('..');

// get system-wide configuration
esnConfig('mail')
  .inModule('core')
  .get()
  .then((config) => {
    console.log(config);
  });

// get domain-wide configuration
esnConfig('mail')
  .inModule('core')
  .forUser(user)
  .get()
  .then((config) => {
    console.log(config);
  });

// get user-wide configuration
const userWide = true;

esnConfig('mail')
  .inModule('core')
  .forUser(user, userWide)
  .get()
  .then((config) => {
    console.log(config);
  });
```

In frontend, you simply inject the `esnConfig` service to get the configuration,
the API is a bit different:

```javascript
esnConfig('core.datetime').then(function(config) {
  console.log(config);
});
```
