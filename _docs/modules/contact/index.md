---
title: Overview
category: OpenPaaS Modules - Contact
order: 1
---

![The contact module](/images/modules/contact/contact.png)

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The contact module brings powerful and realtime contact support into the OpenPaaS platform.
It is composed of several components:

- A frontend component. Built using Angular.
- A backend component which can be split into two parts:
  - A DAV compliant backend built on top of [Sabre](http://sabre.io/)
  - A specific backend, built using Node.js, which mainly listen to specific technical events and so provides realtime support and data indexing.

## Install

### OpenPaaS Module

The contact module is provided in the [OpenPaaS modules directory](https://ci.linagora.com/linagora/lgs/openpaas/esn/modules/linagora.esn.contact) and enabled by default.

### Sabre Server

The calendar module needs a Sabre server to run. Thanks to its plugin system, the default Sabre distribution has been extended to provide more advanced features. Installation instructions can be found in the [esn-sabre repository](https://ci.linagora.com/linagora/lgs/openpaas/esn-sabre/blob/master/README.md).

## Features

The contact module provides standard features:

- CardDAV support
- Contact creation/edition/deletion

and more advanced ones:

- Full text search
- Realtime synchronization between browsers
- Social networks contact import and synchronization
- [Collected contacts](/modules/contact/collected/)
- [Shared address books](/modules/contact/shared/)
