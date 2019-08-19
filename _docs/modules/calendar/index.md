---
title: Overview
category: OpenPaaS Modules - Calendar
order: 1
---

![The calendar module](/images/modules/calendar/calendar.png)

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The calendar module brings powerful and realtime calendar support into the OpenPaaS platform.
It is composed of several components:

- A frontend component. Built using Angular.
- A backend component which can be split into two parts:
  - A DAV compliant backend built on top of [Sabre](http://sabre.io/)
  - A specific backend, built using Node.js, which mainly listen to specific technical events and so provides realtime support and data indexing.

## Install

### OpenPaaS Module

If the calendar module is not provided with the OpenPaaS distribution, you can install it by following the installation instructions in the [calendar repository](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar/blob/master/README.md).

### Sabre Server

The calendar module needs a Sabre server to run. Thanks to its plugin system, the default Sabre distribution has been extended to provide more advanced features. Installation instructions can be found in the [esn-sabre repository](https://ci.linagora.com/linagora/lgs/openpaas/esn-sabre/blob/master/README.md).

## Features

The calendar module provides standard calendar features:

- CalDAV support
- Event creation/edition/deletion
- Attendees with accept/decline/...
- Recurrent events
- Alarms
- email notifications
- [Calendar delegation](/modules/calendar/shared/#delegated-calendars)
- [Public calendars and subscriptions](/modules/calendar/shared/#public-calendars)

and more advanced ones:

- [Calendar resources](/modules/calendar/resource/)
- Full text search
- Realtime synchronization between browsers
- [VideoConference link](/modules/videoconference/index)
