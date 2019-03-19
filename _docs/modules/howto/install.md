---
title: Install
category: OpenPaaS Modules
order: 4
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

As described in the previous sections, OpenPaaS modules can be developed independently from the OpenPaaS platform. Once done, they have to be installed in the platform. While waiting for a runtime deployment, you will have to do some manual operations to add modules in the platform as listed below.

**Note: We assume that you already have a valid Node.JS version and NPM installed on your host**

## Manual installation

Modules can not be hot deployed in the OpenPaaS platform. Once installed following the instructions below, you will have to restart the platform (or start it if it was not started...).

### From source

1. Get the sources from your SCM client, or download them from the repository manager and put them in the `modules` directory in the OpenPaaS one. For example, if your module is `my.awesome.module`, it should go in `modules/my.awesome.module` (note that if you put the module source somewhere else, you can use symbolic links).
2. In the module folder (`modules/my.awesome.module/`), install the dependencies. A simple `npm install` should be enough. If not, check the module `README.md` to be sure.

### From npm registry

If the module you want to use is available in the NPM registry, you can follow the following instructions.

1. Change working directory to the OpenPaaS one
2. Install the module from npm `npm install my.awesome.module`

### Configure

In all the cases, a manual installation is not enough. You have to configure OpenPaaS to take the module into account by enabling it. This is achieved by modifying the `config/default.json` by adding the module in the `modules` array:

``` json
 "modules": [
    "linagora.esn.account",
    "linagora.esn.calendar",
    "linagora.esn.contact",
    "...",
    "my.awesome.module"
 ]
```
