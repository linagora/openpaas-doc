---
title: Calendar Resources
category: OpenPaaS Modules - Calendar
order: 3
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

OpenPaaS users can book physical resources from the Calendar module: Meeting room, car, projector or any other resource people might schedule a time to use.
This chapter describes the steps used to implement resource support in the calendar module.

**Note:** Resource is a general concept provided and managed in the [linagora.esn.resource module](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.resource).

### Requirements

- A resource can be booked by adding it as attendee in an event
- Adding a resource as attendee to an event follows the same process as adding an user as attendee to an event
- There is are managers to accept or decline the event in the resource calendar: The event is automatically accepted ie the resource is booked
- Calendar resources have their own calendar in the CalDAV server. When a resource is booked, an event is added to the resource calendar.

## Creating a calendar resource

Until a page is provided to create resources, they can be created from the resource REST API:

**Request**
```
POST /linagora.esn.resource/api/resources

{
  name: 'Meeting Room 1'
  description: 'The big meeting room at the first floor',
  type: 'calendar'
}
```

**Response**
```
HTTP 201 - Created

{
    "__v": 0,
    "_id": "59cba12b35cb3e03c3148dac",
    "name": "Meeting Room 1",
    "description": "The big meeting room at the first floor",
    "type": "calendar",
    "creator": "599da2a9b7cd7d161eaad48d",
    "domain": "599da2a5b7cd7d161eaad487",
    "timestamps": {
        "creation": "2017-09-27T13:01:31.732Z"
    }
}
```

Where:

- **_id** is the resource id
- **creator** is the id of the user who created the resource
- **domain** is the domain the resource belongs to. By default, it is set to the domain the user was connected when he created the resource

The calendar module will then create the related resource calendar like this:

1. Once a resource is created, it is published on the `resource:created` local topic.
2. The calendar module listens to the `resource:created` topic. If the resource received has a valid type value (`calendar`), it creates a new calendar for the resource by calling the CalDAV server
3. Calendar is available in the CalDAV server under the `/resources/${_id}/calendars/events.json` path.

## Booking a resource from an event

For now, in oder to book a resource, it has to be added as attendee to an event as other users. From the UI point of view, this is exactly the same as adding any other user to the event: Searching for the resource in the attendee search field and add it by clicking on the suggestion.

On the ICS point of view, a resource is translated as an attendee with specific values:

```
ATTENDEE;CN="Meeting Room 1";CUTYPE=RESOURCE;PARTSTAT=ACCEPTED;MAILTO:id@openpaas-domain.org
```

Where

- **CN** (Common Name) is generated from the resource name
- **CUTYPE** (Calendar User Type) is set to `RESOURCE`
- **PARTSTAT** is automatically set as `ACCEPTED`
- **MAILTO** is set to a generated email address with the resource._id as email local-part and the domain name the resource belongs to as email domain

When the CalDAV backend will receive the event ICS, it will extract attendees, and for the ones with `CUTYPE=RESOURCE`, it will retrieve the resource calendar from the `mailto`local-part, then create the event.
