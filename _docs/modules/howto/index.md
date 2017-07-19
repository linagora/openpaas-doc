---
title: Overview
category: OpenPaaS Modules
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate... 
{:toc}

## Overview

OpenPaaS modules (also called [AwesomeModules](https://ci.open-paas.org/stash/projects/AM/repos/awesome-module-manager/browse)) come on top of classic NPM modules, to provide an enterprise grade module system. The main improvements over the classic Node NPM system are:

* OpenPaaS modules brings dependencies, either by name, or by ability
* OpenPaaS modules supports asynchronous loading
* OpenPaaS modules got a lifecycle, and go through states during their initialization

## Modules dependencies

OpenPaaS modules dependencies express, as we can expect, dependencies between modules. This dependency can be either by name, just like NPM, where you say "I'm dependant of the module example-logger version 2.0.0", and also by ability : so you can say "I'm dependant of the logger ability", and any module exposing this ability can be used. OpenPaaS modules use the well known dependency injection pattern, usefull to build extensible, and testable, systems.

## Modules lifecycle

During the startup of the [NodeJS](https://nodejs.org/) server, the modules are loaded. OpenPaaS provides three states. All states are optional: you don't have to code them if you don't need them.

### lib

This is the first step. Upon this step, your module should send back its library, that dependant modules (the modules that requires yours) will receive when they inject it. For example, a "user" module library will certainly expose a get() method, a create() method...

In this state, you can't expect any of the underlying microservices to be ready. In particular, the MongoDB datastore, and pubsub systems, will not be ready at this point

### deploy

The second step is deploy, which means that you should call here all the registration points that your module will use. This includes:

* the [Express](https://expressjs.org) applications you add to the platform
* the [LESS](http://lesscss.org/) files
* the JavaScript client files and [Angular](https://angularjs.org/) Modules
* the pub/sub events you register and subscribe to

### start

In this last step, your module starts actually doing its stuff. For example, if your module should publish a message in the message queue, or if it should send an email on startup, that should be done in that step. Usually, that step is empty.
