---
title: Search
category: OpenPaaS Core
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The OpenPaaS Core provides a `search` module which relies on [Elasticsearch](https://www.elastic.co/products/elasticsearch).
This page will provides all the informations for a developer to use the core module in order to index and search data.

## Indexing data

The core `elasticsearch` [module](https://ci.linagora.com/linagora/lgs/openpaas/esn/tree/master/backend/core/elasticsearch) provides a `listeners` module which must be used to register a listener. This listener will be in charge of handling everything needed to transform data from OpenPaaS to Elasticsearch, indexing data to the right place, etc...

Registering a listener in the search module is as easy as giving a valid object. As an example, let's say that we want to index `messages` coming from a chat module:

{% highlight javascript linenos %}
const listeners = dependencies('elasticsearch').listeners;

listeners.addListener({
  events: {
    add: 'message:create',
    update: 'message:update',
    remove: 'message:delete'
  },
  denormalize: (message) => {
    // do something with input data (coming from topic defined above)
    // then return the data to be indexed
    return {
      text: message.message,
      date: message.timestamps.created_at
    };
  },
  getId: (message) => message._id.toString(),
  type: 'message',
  index: 'message.idx'
});
{% endhighlight %}

- `events`: The listener will listen on several events coming from the `pubsub` module as defined in lines 5 to 9. The listener automatically subscribe to the topics defined (`message:create`, `message:update` and `message:remove`) and will do whatever needed: Index data on a `create` event, update indexed data on an `update` event, delete indexed data on a `remove event`. **The only thing needed for the developer here is to publish data on the right topic**.
- `denormalize`: This function is called each time a data is created or updated to transform data into a JSON object which will be indexed in Elasticsearch.
- `getId`: This function is called on `create`, `update`, `remove` to determine the identifier of the document in Elasticsearch based on input data
- `type`: The type of data defined in Elasticsearch
- `index`: The Elasticsearch index where data is indexed

Note that calling `addListener` will return a set of functions you can also use to make calls to Elasticsearch yourself:

{% highlight javascript linenos %}
const { listeners } = dependencies('elasticsearch');

const searchHandler = listeners.addListener(x);

//searchHandler.indexData(data, callback)
//searchHandler.removeFromIndex(data, callback)
{% endhighlight %}

Once the listener is registered, indexing data is as easy as:

{% highlight javascript linenos %}
const { local } = dependencies('pubsub');
const message = {
  message: 'This is a wonderful message',
  timestamps: {
    created_at: new Date()
  }
};

local('message:create').publish(message);
{% endhighlight %}

The listener will be called automatically, and message will be indexed into Elasticsearch.

## Search data

Making calls to Elasticsearch must be achieved from the `elasticsearch` module with the `searchDocuments` function:

{% highlight javascript linenos %}
const elasticsearch = dependencies('elasticsearch');
const query = {}; // some ES query https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html

elasticsearch.searchDocuments({
  index: 'message.idx',
  type: 'message',
  from: 0,
  size: 10,
  body: query
}, (err, result) => {
  if (err) {
    return console.log('I failed to search messages', err);
  }

  console.log('Search results', result.hits.hits);
});
{% endhighlight %}

This will search messages in the `message.idx` index in the Elasticsearch service and return the search results.
