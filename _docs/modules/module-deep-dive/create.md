---
title: Minimal module
category: OpenPaaS module deep dive
order: 1
---

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