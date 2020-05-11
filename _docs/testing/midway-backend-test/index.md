---
title: Midway Backend Test
category: OpenPaaS Test Automation
order: 1
---

## Table of contents

{:.no_toc}

- Here is the ToC, this line is needed to generate...
{:toc}

## I. What is it

Midway backend test is a type of test automation that we are using in our OpenPaaS development.

Other test automation types are:

- Unit frontend test
- Unit backend test
- Unit storage test

Midway backend test is created by the developer that worked with a specific feature or API. He needs to make sure that the midway backend test covers as many cases of his API as possible.

It helps reduce QA testing time and gives the developer quick feedback about his code.

We should prioritize write midway backend tests for our APIs.

## II. Why do we need midway backend test

To make sure that our APIs are working properly with external services such as MongoDB, Redis, RabbitMQ, and ElasticSearch.

This helps us to be confident that nothing breaks after refactoring our code and it integrates tightly with our CI/CD platform Gitlab, which again, helps us to deploy products faster and safer.

## III. How to work with midway backend test

### How to run tests

OpenPaaS uses Mocha, Chai, and Supertest behind the scenes to run/execute/perform the midway backend tests.

#### Run all tests

You can check the detail of each command in file `Gruntfile.js` located in the root folder of project core ESN

##### 1. For core ESN

You need to run this command:

```shell
grunt docker-test-midway-backend
```

This command will do 3 things:

- Set up environment and necessary service containers (MongoDB, Redis, RabbitMQ, and ElasticSearch) which is needed when running the tests.
- Run the actual midway backend tests.
- Kill all service containers and clean the environment after finishing tests.

##### 2. For awesome modules inside of core ESN project

You need to run this command:

```shell
grunt docker-test-modules-midway
```

Similar to the test in core ESN, this command will do 3 things:

- Set up environment and necessary service containers (MongoDB, Redis, RabbitMQ, and ElasticSearch) which is needed when running the tests of awesome modules.
- Run the actual module midway backend tests.
- Kill all service containers and clean the environment after finishing tests.

##### 3. For external awesome modules (code is not included in the core ESN project)

In external awesome modules, there is no Grunt task for setting up the environment or creating service containers. So you need to start these services (MongoDB, Redis, RabbitMQ, and ElasticSearch) by yourself before running the module midway backend tests.

You can run these 4 commands manually:

```shell
docker run -d --name esn-test-mongo -p 27017:27017 mongo:3.4.13

docker run -d --name esn-test-redis -p 6379:6379 redis:latest

docker run -d --name esn-test-rabbit -p 5672:5672 rabbitmq:3.6.5-management

docker run -d --name esn-elas -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
```

Or you can create a shell file, for example: `setup-test-services.sh`:

```shell
#!/bin/sh
docker run -d --name esn-test-mongo -p 27017:27017 mongo:3.4.13
docker run -d --name esn-test-redis -p 6379:6379 redis:latest
docker run -d --name esn-test-rabbit -p 5672:5672 rabbitmq:3.6.5-management
docker run -d --name esn-elas -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
```

And run:

```shell
chmod +x setup-test-services.sh
./setup-test-services.sh
```

Using this way, you don't have to remember each command on the next time you want to start test services.

After that, you need to run this command:

```shell
grunt test-midway-backend
```

This command will do only 1 thing:

- Run the actual midway backend tests of this external module.

#### Run a single test

Running a single test is very similar to running all tests above, you just need to find the test that you want to run, add `.only` and run the corresponding command.

For example:

Update the test that you want to run like this:

![Run one test only]({{ site.url }}/images/testing/midway-backend-test/run-one-test.png)

Then run:

```shell
grunt docker-test-midway-backend
```

You can find more information about `.only` here: [https://mochajs.org/#exclusive-tests](https://mochajs.org/#exclusive-tests)

### How to write a new test

A complete guide to write a new midway backend test would be too long for this document, so we will write another detailed document to do it.

In this document, we will just have a glimpse over what needs to be done:

- Check this file first `test/midway-backend/all.js`. This file configures everything required to run the tests.
- Then you need to write your test cases in the corresponding folders. For example `api` or `middleware`.
- Normal test cases usually start with a `describe` block, and inside of this block, we have some `it` blocks.

For example,

```javascript
describe('GET /api/activitystreams/:uuid', function() {

        it('should send back 401 when not logged in', function(done) {
          helpers.api.requireLogin(app, 'get', '/api/activitystreams/' + activitystreamId, done);
        });

        it('should send back 404 when the activity stream does not exist', function(done) {
          const incorrectUUID = uuidV4();

          helpers.api.loginAsUser(app, email, password, function(err, loggedInAsUser) {
            expect(err).to.not.exist;
            loggedInAsUser(request(app).get('/api/activitystreams/' + incorrectUUID))
              .expect(404, done);
          });
        });

        it('should send back 400 when limit parameter is incorrect', function(done) {
          helpers.api.loginAsUser(app, email, password, function(err, loggedInAsUser) {
            expect(err).to.not.exist;
            loggedInAsUser(request(app).get('/api/activitystreams/' + activitystreamId + '?limit=-12'))
              .expect(400, done);
          });
        });

        ...
});
```

You can find more information on Mocha website: [https://mochajs.org/#getting-started](https://mochajs.org/#getting-started) or check some test cases inside of `test/midway-backend` folder of core ESN project or any other external awesome modules.

### Notes

This section contains some of the useful notes that newcomers might have when they start working with ESN.

We will update this section regularly.

#### 1. Out of heap memory issue

Sometimes when running all the midway backend tests of core ESN project, you might see that your computer is not responding and you have to restart it.

The reason is: Mocha loaded all the tests into your computer's memory and run all at once, which will eat all RAM of your computer.

To prevent Mocha from doing this, you need to add `--chunk=1` after every command that runs a large number of tests.

For example:

```shell
grunt docker-test-midway-backend --chunk=1
```

**Note**: Remember, for "Run a single test" case above, do NOT add `--chunk=1` at the end of the command. Doing so will cause it to run all the tests.

#### 2. How module midway tests load MongoDB configuration

In an external awesome module (for example, `linagora.esn.chat`), if you check the file `test/midway-backend/all.js`, you are going to see this line:

```javascript
process.env.NODE_CONFIG = 'test/config';
```

Now come back to the core ESN project, check the file `backend/core/config/index.js`, you will see something like this:

```javascript
'use strict';

// We can define the config path from the NODE_CONFIG
// This may be useful for tests
// Note that it loks that konphyg does not handle undefined and null so we have to be it here this way
var config = process.env.NODE_CONFIG;
if (!config || config === undefined || config === 'undefined' || config === null || config === 'null') {
  config = __dirname + '/../../../config';
}

exports = module.exports = require('konphyg')(config);
```

This environment variable `process.env.NODE_CONFIG` is what decides where the config will be loaded for the midway backend tests of an external awesome module.

And in this case, it loads the config inside of the folder `test/config` of module `linagora.esn.chat`

Now, let's check this file `backend/core/db/mongo/index.js`, you will see this function:

```javascript
function getConnectionStringAndOptions() {
  let dbConfig;

  try {
    dbConfig = config('db');
  } catch (e) {
    return false;
  }

  if (!dbConfig) {
    return false;
  }

  // Note: erasing dbConfig.connectionString here is a dirty hack to avoid presenting the setup wizard to the user.
  // See https://ci.linagora.com/linagora/lgs/openpaas/esn/issues/2412
  dbConfig.connectionString = dbConfig.connectionString || getConnectionStringFromEnvOrDefaults();
  const connectionOptions = dbConfig.connectionOptions || getDefaultOptions();

  return {
    url: dbConfig.connectionString,
    options: connectionOptions
  };
}
```

As you can see, this line `dbConfig = config('db');` is what will load the config from `db.json` inside `test/config` folder, and then send it to `mongoose.connect()` function.
