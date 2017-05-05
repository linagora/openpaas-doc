---
title: Discover OpenPaaS modules
category: OpenPaaS Modules
order: 1
---

The OpenPaaS modules are the most powerfull way to add features into the OpenPaaS Enterprise Social Network. With modules, you can:

* add pages, or widgets, into the ESN web interface
* add REST endpoints, that thid party applications will be able to query
* expose objects and functions to other modules

**Modules quickstart**

In the _modules_ folder of your OpenPaaS ESN installation, create a new folder **com.example.module**. Inside this folder, create a new file index.js, containing:

{% highlight javascript linenos %}
const express = require('express');
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;

const esnModule = new AwesomeModule('com.example.module', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper')
  ],
  states: {
    deploy: function(dependencies, callback) {
      const webserver = dependencies('webserver-wrapper');
      const router = express.Router();

      router.get('/', (req,res) => {
        res.status(200).json({ok: true});
      });

      webserver.addApp('example', router);
      callback();
    }
  }
});

module.exports = esnModule;
{% endhighlight %}
Now, open the configuration file *config/default.dev.json*, and add the new modules at the end of your modules list:

{% highlight json linenos %}
{
  ...
  "modules": [
    ...,
    "com.example.module"
  ]
}
{% endhighlight %}
Restart your ESN server, using the **grunt dev** command. You can now query your new endpoint :

```bash
$ curl http://localhost:8080/example/
{"ok": true}
```
Let's now dig deeper in the OpenPaaS modules features.