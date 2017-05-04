---
title: Expose Angular modules
category: OpenPaaS module deep dive
order: 3
---

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

  function exampleModuleController() {
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

What we just did here is to create a new router just like [we did in a previous example]({{ site.baseurl }}{% link _docs/modules/module-deep-dive/add-backend-api.md %}).

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