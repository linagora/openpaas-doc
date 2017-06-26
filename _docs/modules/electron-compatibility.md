---
title: Make your module compatible with Eletron builds
category: OpenPaaS Modules
order: 4
---

OpenPaaS uses [ElectronJS](https://electron.atom.io/) to provide the users a desktop client.

Modules should follow some rules to be able to work using Electron.

**URL prefixing**

When serving the application from a server, there is obviously real problem on what is the server... On the contrary, on a desktop application, the application should know the URL of the server. OpenPaaS supports different ways of doing so.

***Make your Restangular instances managed***

Most of the server calls are run through Restangular. We provide a system to make a module's restangular instance aware of the server URL.

Here is the code before :

```javascript
angular.module('great.module')
  .factory('greatModuleAPI', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/great/api');
      RestangularConfigurer.setFullResponse(true);
    });
  });
```

The module have to use the **manageRestangular** method of the **httpConfigurer** service.

Here is the Electron compatible code:

```javascript
angular.module('great.module')
  .factory('greatModuleAPI', function(Restangular, httpConfigurer) {
    var restangularInstance = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setFullResponse(true);
    });

    // I tell httpConfigurer to manage the base URL of my restangular instance
    httpConfigurer.manageRestangular(restangularInstance, '/great/api');

    return restangularInstance;
  });
```

We can see two main differences between the code before and after:

1. we don't use the native **restangular.setBaseUrl()** method anymore
2. we call **httpConfigurer.manageRestangular()** with the module's restangular instance, and the base URI of the module (which is the same we used to set using **RestangularConfigurer.setBaseUrl(...)**).

***Fix your $http (and other) calls***

For a vast variety of reasons, modules may not use Restangular. In that case, the **httpConfigurer** service provides a nifty **getUrl()** method to help the developer setting the right final URL.

Here is the code before:

```javascript
angular.module('great.module')
  .factory('generateJwtToken', function($http) {
    return function() {
      return $http.post('/api/jwt/generate');
    };
  });
```

and the code after:

```javascript
angular.module('great.module')
  .factory('generateJwtToken', function($http, httpConfigurer) {
    return function() {
      return $http.post(httpConfigurer.getUrl('/api/jwt/generate'));
    };
  });
```

Here, we only return the result of **httpConfigurer.getUrl()** instead of directly setting the URI.
