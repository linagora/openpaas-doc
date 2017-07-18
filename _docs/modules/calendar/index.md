---
title: Overview
category: OpenPaaS Modules - Calendar
order: 1
---

![The calendar module](/images/modules/calendar/calendar.png)

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

## Shared Calendars

The calendar module supports two kinds of shared calendars:

* **Delegated calendars**: when an owner delegates his own calendars to other users. For example, a manager can delegate his calendars to his secretary.
* **Public calendars**: an owner can set his calendars to public. Other users, or external ones, can subscribe to such calendars and see events.

There are some differences between these types of shared calendars, the main ones are:

* Delegated calendars represent a privileged access for a given calendar to a specific user.
* Public calendars can be seen by everyone, and any user can add them. In some cases, any users are also abe to create events in public calendars.

Shared calendars come with **rights**: Rights are applied to users who are looking at other users calendars.

- **Free/Busy**: User can only see that the calendar owner is free or busy in a timeperiod. The details of the events are not available.
- **Read**: User has access to all the event informations but can not change anything.
- **Write**: User has access to all the event informations and can change anything.
- **Administration**: User can do anything on the calendar (edit, delete, etc) as well as on the calendar events.

### Public calendars

In order make a calendar public, the user has to change the _Public right_ to _Free/Busy_, _Read_ or _Write_ during the calendar creation, or on the calendar settings page as shown below.

![The calendar settings page, change public level](/images/modules/calendar/calendar-public-change-settings.png)

Once a calendar is public, other users can _subscribe_ to it by going to the _Shared Calendars_ page and by doing a search. Public calendars are linked to their creator, so in order to find them, the user has to search for the creator to find all his public calendars.

In the screenshot below, one public calendar is displayed. In order to subscribe to this public calendar, the user has to click on the _Add_ toggle button then on _Save_.

![The shared calendars page, searching a public calendar](/images/modules/calendar/calendar-public-search.png)

The calendar is now displayed as a _Shared calendar_. The user can see events and create some if _Write_ rights are set on the public calendar.

### Delegated calendars

A user can delegate his calendar by adding users in the delegation section in the calendar settings pages. A user which is added is called a _Sharee_. In order to add a user as _sharee_:

1. Search for user, once found, click on it
2. Set the right level
3. Click on _Add_
4. The user is added to the list of _Sharee_

![The calendar delegation, adding user step 0](/images/modules/calendar/calendar-delegate-add-user-0.png)

![The calendar delegation, adding user step 1](/images/modules/calendar/calendar-delegate-add-user-1.png)

![The calendar delegation, adding user step 2](/images/modules/calendar/calendar-delegate-add-user-2.png)

Once the calendar is saved, it is "ready to be delegated": The _sharee_ can not do anything until he adds the delegated calendar to his calendars. This is possible by going to the _Shared calendars_ page and by doing a search just like for public calendars.

In the screenshot below, one delegated calendar is displayed. In order to add this delegated calendar, the _sharee_ has to click on the _Add_ toggle button then on _Save_.

![The shared calendars page, searching a delegated calendar](/images/modules/calendar/calendar-delegated-search.png)

The calendar is now displayed as a _Shared calendar_. The _sharee_ can see events and create some if _Write_ or _Administration_ rights are set on the calendar.


### Technical considerations

* When a user has a delegated calendar, a new instance of the given calendar is created for him on the backend side.
* When a user add a public calendar, the backend will create a subscription for this calendar. A subscription is an object owned by the user and stored in the backend. This object has a reference towards the public calendar along with its own properties.

