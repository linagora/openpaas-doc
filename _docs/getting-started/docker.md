---
title: Get started with Docker
category: 1. Getting started
order: 1
---

The easiest way to try OpenPaaS from your local machine is to use [Docker Compose](https://docs.docker.com/compose/).
We assume that you already have Git, and Docker Compose, installed on your machine. Run the
following commands:

```shell
# grab the docker-compose file
wget https://raw.githubusercontent.com/linagora/openpaas-esn/master/docker-compose.yml
# launch it
PROVISION=true docker-compose up
```

_We set `PROVISION=true` to create some sample data. You only need it the first
time you launch Docker Compose._

Launching the platform may take some time (1-2 minutes), grab a coffee and when
it is ready you can access the application at __http://localhost:8080__ with
username __admin@open-paas.org__ and password __secret__

List of other (non admin) users created:

|    user email address |   password |
|-----------------------|------------|
| user1@open-paas.org   | secret |
| user2@open-paas.org   | secret |
| user3@open-paas.org   | secret |
| user4@open-paas.org   | secret |
| user5@open-paas.org   | secret |
| user6@open-paas.org   | secret |
| user7@open-paas.org   | secret |
| user8@open-paas.org   | secret |
| user9@open-paas.org   | secret |

# Discover

Some videos to help discover the product:

## Global presentation (EN)

<iframe width="560" height="315" src="https://www.youtube.com/embed/7d7ZlD8u82s" frameborder="0" allowfullscreen></iframe>

## Unified Inbox introduction (FR)

<iframe width="560" height="315" src="https://www.youtube.com/embed/OaR-i9cKYbo" frameborder="0" allowfullscreen></iframe>

## Calendar introduction (FR)

<iframe width="560" height="315" src="https://www.youtube.com/embed/5HevB9W5tPE" frameborder="0" allowfullscreen></iframe>
