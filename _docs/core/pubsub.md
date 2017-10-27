---
title: Pubsub
category: OpenPaaS Core
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The OpenPaaS Core provides several publish/subscribe components:

- `local`: Events published in this pubsub component will only be delivered to the same local OpenPaaS instance listeners
- `global`: Events published in this pubsub component will be delivered to *all* the OpenPaaS instance listeners

## API

Both local and global pubsub are providing the same API. Getting a pubsub instance is as easy as getting it from the OpenPaaS dependencies manager:

```js
const {local, global} = dependencies('pubsub');
```

Once you have the instance, you can subsribe and publish events.

### Subscribe

``` js
const pubsub = dependencies('pubsub').local;

pubsub.topic('my:topic').subscribe(event => {
  console.log('This will be called when event is published in topic', event);
});
```

### Publish

``` js
const pubsub = dependencies('pubsub').local;
const event = {id: 1, data: {}};

pubsub.topic('my:topic').publish(event);
```

## Local pubsub

The local pubsub is built using the Node.js EventEmitter. This means that any object can be published in this pubsub component but it is highly encouraged to publish `Event` instances:

```js
const pubsub = dependencies('pubsub').local;
const { Event } = dependencies('models'); // https://github.com/linagora/openpaas-esn/blob/master/backend/core/models/event.js
const e = new Event(/* Check the doc for args */)

pubsub.topic('my:topic').publish(e);
```

## Global pubsub

The global pubsub is built using [RabbitMQ](https://www.rabbitmq.com/) as message broker. This allows OpenPaaS to use and rely on all the mechanisms provided by RabbitMQ and so have some high warranty level delivering messages.

**Note:** It is recommended to push only JSON data in the global pubsub.