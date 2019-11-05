---
title: People API
category: OpenPaaS Core
order: 5
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The OpenPaaS Core provides the people API which is used to:

1. Search accross several people-related sources: `members`, `contacts`, `resources`, `groups`, ...
2. Get a resolved person by finding a matching object from a particular field (e.g email address)

## API

The people API is used to retrieve `persons`. A `person` is a resource which can be defined like this:

```
{
  "id": "5bf7d8ccb4177e001c8a1efe",
  "objectType": "user",
  "emailAddresses": [
    {
      "type": "work",
      "value": "brucewillis@open-paas.org"
    }
  ],
  "names": [
    {
      "type": "principal",
      "displayName": "Bruce Willis"
    }
  ],
  "photos": [
    {
      "type": "main",
      "url": "/users/api/123/avatar"
    }
  ]
}
```

### Register provider

#### Searcher

The people module is available at `backend/core/people`. The people module uses 'searchers' to lookup to persons and send them back in the right format. Searchers can be registered like this:

```js
const { service, Model, PeopleSearcher } = dependencies('people');
const userSearcher = new PeopleSearcher('user', searcher, denormalizer, priority);

service.addSearcher(userSearcher);
```

Where `searcher` is a function which returns a Promise which resolves with an Array of resources:

```js
function resolver({ term, context, pagination }) {
  const options = { search: term, domains: [context.domain], limit: pagination.limit };

  return new Promise((resolve, reject) => {
    search(options, (err, result) => {
      if (err) {
        return reject(err);
      }

      result && result.list ? resolve(result.list) : resolve([]);
    });
  });
}
```

Where `denormalizer` is a function which returns a Promise which resolves with a `Model.Person` from an element coming from the `resolver` result:

```js
function denormalizer({ source }) {
  const denormalized = denormalize(source);

  const email = new Model.EmailAddress({ value: source.email, type: 'default' });
  const name = new Model.Name({ displayName: `${source.firstName} ${source.lastName}` });
  const photo = new Model.Photo({ url: `/api/avatars/${source._id}/avatars` });

  return Promise.resolve(
    new Model.Person({
      id: denormalized._id,
      objectType: 'user',
      emailAddresses: [email],
      names: [name],
      photos: [photo]
    })
  );
}
```

and where `priority` is the resolver priority. Higher priority means sending back these resolver results first in the list.

### Resolver

The people module use `resolver` to find exactly a person that has a property field matched with the given value. Following the searcher format, resolver can be registered like this:

```js
const { service, Model, PeopleResolver } = dependencies('people');
const userResolver = new PeopleResolver('user', resolver, denormalizer, defaultPriority);

service.addResolver(userResolver);
```

Where `resolver` is a function which returns a Promise which resolves with only at most one resource.

```js
function resolver({ fieldType, value, context }) {
  if (fieldType === FIELD_TYPES.EMAIL_ADDRESS) {
    return new Promise((resolve, reject) => {
      findByEmail(value, { domainId: context.domain._id}, (err, user) => {
        if (err) return reject(err);

        resolve(user);
      });
    });
  }

  return Promise.resolve();
}
```

The priority of each resource type is determined by API users, the `defaultPriority` property will be used when the prioritized order is not provided by API users.

### REST API

### POST api/people/search

Search for persons on various types

**Request Body**
```JSON
{
  "q": "bruce",
  "objectTypes": ["user", "contact", "ldap"]
  "limit": 10,
}
```

- `q` is the text to search in persons
- `objectTypes` are the types of person to look for
- `limit` is the max number of resources to send back per objectType

**Response**

```JSON
[
  {
    "id": "5bf7d8ccb4177e001c8a1efe",
    "objectType": "user",
    "emailAddresses": [
      {
        "type": "work",
        "value": "brucewillis@open-paas.org"
      }
    ],
    "names": [
      {
        "type": "principal",
        "displayName": "Bruce Willis"
      }
    ],
    "photos": [
      {
        "type": "avatar",
        "url": "https://open-paas.org/api/users/5bf7d8ccb4177e001c8a1efe/avatar"
      }
    ]
  },
  {
    "id": "5bf7d8ccb4177e001c8a1eff",
    "objectType": "contact",
    "emailAddresses": [
      {
        "type": "home",
        "value": "brucelee@open-paas.org"
      }
    ],
    "names": [
      {
        "type": "principal",
        "displayName": "Bruce Lee"
      }
    ],
    "photos": [
      {
        "type": "avatar",
        "url": "https://open-paas.org/api/users/5bf7d8ccb4177e001c8a1eff/avatar"
      }
    ]
  }
]
```

### GET api/people/resolve/{:fieldType}/{:value}

Retrieve a single resolved object that have a field matching specific value

**Parameters**
- fieldType: the field to find the resolved object (e.g emailAddress)
- value: the value to query

**Request Query Parameters**

- objectTypes: A list of object types to find the matching objects and also the priority order for resolving process

Optional, by default resolver will handle all object types by orders: `user, group, contact`. Supported object types for the moment are `user, contact, group`.


**Response:**

```JSON
{
  "id": "5bf7d8ccb4177e001c8a1efe",
  "objectType": "user",
  "emailAddresses": [
    {
      "type": "work",
      "value": "brucewillis@open-paas.org"
    }
  ],
  "names": [
    {
      "type": "principal",
      "displayName": "Bruce Willis"
    }
  ],
  "photos": [
    {
      "type": "avatar",
      "url": "https://open-paas.org/api/users/5bf7d8ccb4177e001c8a1efe/avatar"
    }
  ]
}
```
