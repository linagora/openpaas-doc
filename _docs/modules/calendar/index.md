---
title: Overview
category: OpenPaaS Calendar Module
order: 1
---

![The calendar module]({{ site.url }}/images/modules/calendar/calendar.png)

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
- Calendar delegation
- Public calendars and subscriptions

and more advanced ones:

- Full text search
- Realtime synchronization between browsers

The following sections will go deep into details of some of the above mentioned features.

### Shared Calendars

The calendar module supports two kinds of external calendars:

* Delegated calendars: when an owner delegates his own calendars to other users. For example, a manager can delegate his calendars to his secretary.
* Public calendars: an owner can set his calendars to public. Other users, or external ones, can subscribe to such calendars and see events.

There are some differences between these types of shared calendars, the main ones are:

* Delegated calendars represent a privileged access for a given calendar to a specific user.
* Public calendars can be seen by everyone, and any user can add it. In some cases, any users are also abe to create events in public calendars.

### Technical considerations

* When a user has a delegated calendar, a new instance of the given calendar is created for him on the backend side.
* When a user add a public calendar, the backend will create a subscription for this calendar. A subscription is an object owned by the user and stored in the backend. This object has a reference towards the public calendar along with its own properties.

