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
- 2 OpenPaaS core components. Built using angularjs and nodeJS.
- A 'backend' component: [Jitsi](https://jitsi.org)

## Installation

This guide provides you all the steps required to intall the videoconference application.

### 1. Install Jitsi

We use a modified version of the [Jitsi docker-compose project](https://github.com/jitsi/docker-jitsi-meet) to run jitsi locally:

- Clone [https://ci.linagora.com/linagora/lgs/openpaas/docker-jitsi-meet](https://ci.linagora.com/linagora/lgs/openpaas/docker-jitsi-meet)
- Switch to `openpaas-dev` branch
- Start jitsi: `docker-compose up -d`
- Jitsi is now up and running, you can join conference on [http://localhost:8000](http://localhost:8000)

### 2. Install the required modules

The videoconference application comes with 2 core modules:

1. `linagora.esn.videoconference` provides core videoconference integration within OpenPaaS
2. `linagora.esn.videoconference.calendar` provides calendar module integration

As any other modules, clone them from git and use `npm link` to install them in OpenPaaS:

```
git clone https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.videoconference.git
git clone https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.videoconference.calendar.git

cd linagora.esn.videoconference
npm install
npm link

cd ../
cd linagora.esn.videoconference.calendar
npm install
npm link

cd $ESN_PATH # your ESN folder
npm link linagora.esn.videoconference
npm link linagora.esn.videoconference.calendar
```

Finally, add `linagora.esn.videoconference` and `linagora.esn.videoconference.calendar` in the `modules` array of `$ESN_PATH/config/default.json`.

### 3. Install the videoconference application

Follow the instructions from [https://ci.linagora.com/linagora/lgs/openpaas/openpaas-videoconference-app](https://ci.linagora.com/linagora/lgs/openpaas/openpaas-videoconference-app)

## Configure

In order to work, the ESN must be configured with several URLs:

1. the Jitsi instance URL
2. the Videoconference Web application.

As an administrator, log in into OpenPaaS, go to the `administration/modules/videoconference`, then fill URLs:

![Configure module header](/images/modules/videoconference/configuration.png)