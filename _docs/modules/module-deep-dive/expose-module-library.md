---
title: Expose a library
category: OpenPaaS module deep dive
order: 2
---

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