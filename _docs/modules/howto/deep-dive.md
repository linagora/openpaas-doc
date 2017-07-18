---
title: Deep dive
category: OpenPaaS Modules
order: 3
---

# TOC

{:toc}

## Minimal Module

The most simple OpenPaaS module got a name, and returns an instance of the AwesomeModule object.

The module name is free, although, by convention, we use the dot separator, going to generic to specific. For example:

    linagora.esn.unifiedinbox.twitter

The **linagora.esn** prefix is used by the core team, so please don't use it, or ask us ! (we're gentlemen, don't worry).

The module files should be in a folder that have the exact name of the module. That is how the module loader finds the modules.


Example of a minimal OpenPaaS module :

_com.example.module/index.js_:

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const esnModule = new AwesomeModule('com.example.module', {});

module.exports = esnModule;
{% endhighlight %}
Needless to say that this module does absolutely nothing.

## Add backend API

One thing you'll certainly have to do when developing on the OpenPaaS platform, is to add some backend endpoint. To achieve that, we use the [Express](https://expressjs.com/) framework, and more precisely the [Router](http://expressjs.com/en/4x/api.html#router). You then use the WebServer Wrapper module to add your routes into the platform web server.

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const esnModuleRouter = require('./backend/router');

const esnModule = new AwesomeModule('com.example.module', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],
  states: {
    deploy: deploy
  }
});

function deploy(dependencies, callback) {
  const webserver = dependencies('webserver-wrapper');
  webserver.addApp('example', esnModuleRouter(dependencies));
  callback();
}

module.exports = esnModule;
{% endhighlight %}

Now let's dig into that piece of code, we'll comment the most important lines.

On **line 7**, we ask the OpenPaaS module system to inject the webserver wrapper module (whose full name is "linagora.esn.core.webserver.wrapper"). We also tell it to expose it with the label "webserver-wrapper", which means that, when we need to acces that module, we use the `dependencies('webserver-wrapper')` call.

We add on **line 10** the declaration of the **deploy state** for our module. All OpenPaaS modules states are declared using functions, taking two arguments, the _dependencies_ function allowing your module to access the dependencies it previously asked for, and a _callback_ function, which is a node-style callback, meaning that the first argument of that function should be an error (if any).

Now let's see what we do in the deploy state. We get the webserver wrapper module library on **line 15**, and assign it to the _webserver_ variable.

Now, and it's the important part of the stuff, we call on **line 16** the _addApp_ method exposed by the webserver module library. This method takes two arguments: a string representing the URI namespace of your module, and an express Router.

{% highlight javascript %}
addApp(String, Router)
{% endhighlight %}

That basically means, that our module API will expose all its endpoints after the "/example/" URL path. We'll get back at it just after having described a first API route.

Finally, on line 17, we launch the _callback_ method, telling the OpenPaaS module framework that our module has finished transitioning to the **deploy** state, without any trouble. Should we have encountered a problem, we'd have called the callback with an error as the first argument, for example:

{% highlight javascript %}
callback(new Error('Something wrong happened here'));
{% endhighlight %}


On line 3, we include a local file _./backend/router_, here is an example content of that file:

{% highlight javascript linenos %}
const express = require('express');

module.exports = esnModuleRouter;

function esnModuleRouter(dependencies) {
  const router = express.Router();

  router.get('/api', function(req, res) {
    res.status(200).json({ok: true});
  });

  return router;
}
{% endhighlight %}

Meaning, we declare a endpoint on the _/api_ URI. But, if you remember well, we used the OpenPaaS **addApp('example', ourRouter)** method to include our routes in the global OpenPaaS web server. Provided that our root URL is _https://localhost/_, then our module endpoint will be reachable at the URL _https://localhost/example/api_.

## Expose a library

OpenPaaS modules can expose libraries to other modules. Libraries allow other modules to use the features you provide. For example, a _user_ module may expose a _get()_ and a _create()_ method.

Let's expose some dumb library for the sake of the tutorial. First of all, we'll create the library that we'll return. We create the file _backend/lib.js_ file in our module folder, with the following content:

{% highlight javascript linenos %}
function exampleLib(dependencies) {
  const library = {
    get: function() {
      return 'Hey, I am an example';
    }
  };

  return library;
}

module.exports = exampleLib;
{% endhighlight %}

Our library exposes a _get()_ method, that returns an example, which is, for now, a String. Now, we'll instruct the OpenPaaS module framework that we export this library.

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const exampleLib = require('./backend/lib');

const esnModule = new AwesomeModule('com.example.module', {
  states: {
    lib: lib
  }
});

function lib(dependencies, callback) {
  const library = exampleLib(dependencies);

  callback(null, library);
}

module.exports = esnModule;
{% endhighlight %}

On **line 2**, we include our local library file.

On **line 6**, we tell the OpenPaaS module system that we are now using the lib state to declare a library for other modules to use.

On **line 10**, we create the said lib function, in which we instanciate our library (**line 11**).

Finally, on **line 13**, we launch the module system's callback, passing it the library (as the second argument, the first one being an error if any).

Now, any module that injects our module will benefit our awesome library. Example:

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;

const esnModule = new AwesomeModule('com.example.module2', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'com.example.module', 'example-module')
  ],
  states: {
    lib: function(dependencies, callback) {
      const exampleModule = dependencies('example-module');

      console.log(exampleModule.get()); // Hey, I am an example
    }
  }
});

module.exports = esnModule;
{% endhighlight %}

---

**Q.** How can I access my own library in the other states of my module ?

**A.** The library is exposed as the _this_ variable in the other state declaration functions. Let's take back our module to get an example:

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const exampleLib = require('./backend/lib');

const esnModule = new AwesomeModule('com.example.module', {
  states: {
    lib: lib,
    deploy: deploy
  }
});

function lib(dependencies, callback) {
  const library = exampleLib(dependencies);

  callback(null, library);
}

function deploy(dependencies, callback) {
  console.log(this.get()); // Hey, I am an example
}

module.exports = esnModule;
{% endhighlight %}

On **line 18**, we use our library "get()" method. As said before, our library is exposed as the _this_ variable in the _deploy_ function.

**Q.** I did what you told me, but _this_ is an empty object and not my exported _lib_. Why is that ?

**A.** We guess you used the new ES6 arrow functions to declare your deploy state. With arrow functions, the "this" object is lexically bound to the function. So, in your code, replace:

{% highlight javascript %}
{
  deploy: (dependencies, callback) => {
    this.get();
  }
}
{% endhighlight %}

with:

{% highlight javascript %}
{
  deploy: function (dependencies, callback) {
    this.get();
  }
}
{% endhighlight %}

and it should work as expected.

## Expose Angular module

The OpenPaaS frontend relies heavily on [AngularJS](https://angularjs.org/). The OpenPaaS module framework provides a way to let you add your JavaScript files in the frontend page (so it will add the &lt;script> tags for you). Moreover, it will also add into the main OpenPaaS Angular module the dependencies to your provided modules.

This is a two-steps process. First, you should add to your Express router the ability to serve your JavaScript files. Second, you should tell OpenPaaS, the files that should be included, for a specific OpenPaaS application.

**Serve your JavaScript files**

Let's say that your Angular code is composed of two files. An app.js file, and a controller.js file.

Here is the content of your app.js file:
{% highlight javascript linenos %}
(function() {
  angular.module('com.example.module.angular', []);
})();
{% endhighlight %}

And the content of your controller.js :

{% highlight javascript linenos %}
(function() {
  angular.module('com.example.module.angular')
  .controller('exampleModuleController', ExampleModuleController);

  function ExampleModuleController() {
    this.sayHello = function() {
      console.log('Hello');
    };
  }
})();
{% endhighlight %}

Now, put those two files in the frontend/app folder of your module.

Open the file *backend/router.js* and put the following:

{% highlight javascript linenos %}
const express = require('express');
const resolve = require('path').resolve;
const FRONTEND_PATH = resolve(__dirname, '../frontend');

module.exports = esnModuleRouter;

function esnModuleRouter(dependencies) {
  const router = express.Router();

  router.use(express.static(FRONTEND_PATH));

  return router;
}
{% endhighlight %}

What we just did here is to create a new router just like we did in the backend API chapter.
Next, in the deploy state, we register our router :

{% highlight javascript linenos %}
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const esnModuleRouter = require('./backend/router');

const esnModule = new AwesomeModule('com.example.module', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],
  states: {
    deploy: deploy
  }
});

function deploy(dependencies, callback) {
  const webserver = dependencies('webserver-wrapper');
  webserver.addApp('example', esnModuleRouter(dependencies));
  callback();
}

module.exports = esnModule;
{% endhighlight %}


Now you can check that when pointing your browser to https://localhost:8080/example/app/app.js , you got your JavaScript file served.

We'll now tell the OpenPaaS system that it should add those JavaScript files and the Angular module dependency in the frontend file. To be able to do this, we have to know on what OpenPaaS application we want our Angular files to be injected. Right now, there are two OpenPaaS applications available:

1. welcome

    This is the login page

2. esn

    This is the main application, that you access to when you are logged in

Let's say our Angular files should be in the _esn_ application. We'll update our deploy state:

{% highlight javascript linenos %}
const glob = require('glob-all');
const resolve = require('path').resolve;
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const esnModuleRouter = require('./backend/router');
const FRONTEND_PATH = resolve(__dirname, 'frontend');


const esnModule = new AwesomeModule('com.example.module', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],
  states: {
    deploy: deploy
  }
});

function deploy(dependencies, callback) {
  const webserver = dependencies('webserver-wrapper');
  webserver.addApp('example', esnModuleRouter(dependencies));

  const frontendModulesFiles = glob.sync([
    FRONTEND_PATH + '/**/*.js'
  ]);
  const frontendRelPathFiles = frontendModulesFiles.map(f => f.replace(FRONTEND_PATH, ''));

  webserver.injectAngularAppModules('example', frontendRelPathFiles, ['com.example.module.angular'], ['esn']);

  callback();
}

module.exports = esnModule;
{% endhighlight %}

Let's detail what we just did here.

On **lines 22 to 25**, we extract the list of JavaScript files that we put in the frontend folder. We use the awesome [glob-all](https://www.npmjs.com/package/glob-all) library for this, but you can as well list files manually in an array.

Then, on **line 27** we call the _injectAngularAppModules()_ function, that takes the following arguments:

{% highlight javascript %}
webserver.injectAngularAppModules(String namespace, [String] javascript files URI, [String] Angular module names, [String] OpenPaaS application);
{% endhighlight %}

* String namespace

    The namespace under which you files are served. It should be the same as the namespace that you set in the _addApp()_ method.

* [String] javascript files URI

    An array of the list of all files that are being included by the browser in the Rich Internet Application

* [String] Angular module names

    An array of the names of Angular modules that our OpenPaaS modules is exposing

* [String] OpenPaaS application

    An array of the OpenPaaS applications that should include your module files and Angular modules.

---
**Optimization**

You can have the OpenPaaS platform optimize for you your JavaScript files, by concatening them and serving one big file instead of several little files. To do that, you have to tell the framework the whole path to your JavaScript files. Here is the updated deploy function:

{% highlight javascript linenos %}
function deploy(dependencies, callback) {
  const webserver = dependencies('webserver-wrapper');
  webserver.addApp('example', esnModuleRouter(dependencies));

  const frontendModulesFiles = glob.sync([
    FRONTEND_PATH + '/**/*.js'
  ]);
  const frontendRelPathFiles = frontendModulesFiles.map(f => f.replace(FRONTEND_PATH, ''));

  webserver.injectAngularAppModules('example', frontendRelPathFiles, ['com.example.module.angular'], ['esn'], {
    localJsFiles: frontendModulesFiles
  });

  callback();
}

module.exports = esnModule;
{% endhighlight %}

We added an options hash to the _injectAngularAppModules()_ method. It contains a _localJsFiles_ property, whose value is the list of JavaScript file for your application.

## Add CSS Rules

The OpenPaaS framework comes bundled with a lot of CSS classes already defined, thanks to our underlying [Material Admin framework](http://byrushan.com/projects/ma/1-5-2/angular/#/home). However, you'll maybe have to add your own CSS rules alongisde your JavaScript files and HTML templates. We use [LESS](http://lesscss.org/) CSS pre-processor. All you have to do is to create a less file, it will inherit all the already defined less rules. Moreover, you'll be able to override less variables, if you need to.

Here is how to append your less rules to the framework:

{% highlight javascript linenos %}
const resolve = require('path').resolve;
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;

const esnModule = new AwesomeModule('com.example.module', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],
  states: {
    deploy: deploy
  }
});

function deploy(dependencies, callback) {
  const webserver = dependencies('webserver-wrapper');
  const myLessFile = resolve(__dirname, 'frontend/style.less');

  webserver.injectLess('example', [myLessFile], ['esn']);

  callback();
}

module.exports = esnModule;
{% endhighlight %}

On **line 16**, we find the absolute path to our less file.

On **line 18**, we use the framework's _injectLess()_ method to register our less file to the list of files that should be compiled and then served to the browser. The injectLess method got the following signature:

{% highlight javascript %}
webserver.injectLess(String namespace, [String] less files absolute path, [String] OpenPaaS application);
{% endhighlight %}

* String namespace

    The namespace under which you files are served. It should be the same as the namespace that you set in the _addApp()_ method.

* [String] less files absolute path

    An array of the list of all less files that we want to include into the compiled CSS file that will be sent to the server.

* [String] OpenPaaS application

    An array of the OpenPaaS applications that should include your module files and Angular modules.
