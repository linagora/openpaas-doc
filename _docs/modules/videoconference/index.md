---
title: Overview
category: OpenPaaS Modules - VideoConference
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The videoconference module brings videoconference support into the OpenPaaS platform.
It is composed of several components:

- A frontend application. Built using Vue.
- An OpenPaaS core component. Built using angularjs and nodeJS.
- A 'backend' component: [Jitsi](https://jitsi.org)

## Develop

This guide provides you all the steps required to develop the videoconference feature correctly.

### 1. Install Jitsi

We use a modified version of the [Jitsi docker-compose project](https://github.com/jitsi/docker-jitsi-meet) to run jitsi locally:

- Clone [https://ci.linagora.com/linagora/lgs/openpaas/docker-jitsi-meet](https://ci.linagora.com/linagora/lgs/openpaas/docker-jitsi-meet)
- Switch to `openpaas-dev` branch
- Start jitsi: `docker-compose up -d`
- Jitsi is now up and running, you can join conference on [http://localhost:8000](http://localhost:8000)

### 2. Install the core module

As any other core module, clone it from [https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.videoconference](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.videoconference) and install it in OpenPaaS `npm link`

### 3. Install the videoconference application

Follow the instructions from [https://ci.linagora.com/linagora/lgs/openpaas/openpaas-videoconference-app](https://ci.linagora.com/linagora/lgs/openpaas/openpaas-videoconference-app)

## Configure

**TODO: This has to be filled once working on configuration**
