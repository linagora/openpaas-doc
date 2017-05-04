---
title: Add a backend API
category: OpenPaaS module deep dive
order: 2
---

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