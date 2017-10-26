---
title: EventSourcing
category: OpenPaaS Core
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Events

Almost all actions in the OpenPaaS platform produce events, most of them are published in the [local pubsub channel](/core/pubsub/) to allow extensibility and reactivity. A first implementation stores Every event published in any pubsub topic in the Elasticsearch platform instance in the `core.events.idx` index.
