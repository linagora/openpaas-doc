---
title: Add CSS rules
category: OpenPaaS module deep dive
order: 3
---

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

