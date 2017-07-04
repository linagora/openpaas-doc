---
title: Overview
category: OpenPaaS Calendar Module
order: 1
---

## Shared Calendars

The calendar module supports two kinds of external calendars:

* Delegated calendars: when an owner delegates his own calendars to other users. For example, a manager can delegate his calendars to his secretary.
* Public calendars: an owner can set his calendars to public. Other users, or external ones, can subscribe to such calendars and see events.

There are some differences between these types of shared calendars, the main ones are:

* Delegated calendars represent a privileged access for a given calendar to a specific user.
* Public calendars can be seen by everyone, and any user can add it. In some cases, any users are also abe to create events in public calendars.

### Technical considerations

* When a user has a delegated calendar, a new instance of the given calendar is created for him on the backend side.
* When a user add a public calendar, the backend will create a subscription for this calendar. A subscription is an object owned by the user and stored in the backend. This object has a reference towards the public calendar along with its own properties.

