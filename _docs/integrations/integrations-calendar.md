---
title: Calendar
category: OpenPaaS Integrations
order: 4
---

# Table of contents
<!-- TOC -->

- [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Prerequisites](#prerequisites)
    - [Shared Calendars](#shared-calendars)
      - [The difference between both types of shared calendars](#the-difference-between-both-types-of-shared-calendars)
        - [Functionally](#functionally)
        - [Technically](#technically)
      - [How an OpenPaaS user should deal with these types of shared calendars?](#how-an-openpaas-user-should-deal-with-these-types-of-shared-calendars)
  - [CRUD operations](#crud-operations)
    - [Get available calendars](#get-available-calendars)
      - [Request](#request)
      - [Response](#response)
    - [Create a calendar](#create-a-calendar)
      - [Request](#request-1)
    - [List events in calendar](#list-events-in-calendar)
      - [Request](#request-2)
    - [Create an event in a calendar](#create-an-event-in-a-calendar)
      - [Request](#request-3)
      - [Response](#response-1)
    - [Delete an event](#delete-an-event)
      - [Request](#request-4)
      - [Response](#response-2)

<!-- /TOC -->
## Introduction

The OpenPaaS calendar API uses jCal specification as defined in the [jCal RFC](https://tools.ietf.org/html/rfc7265) which defines a JSON format for iCalendar.

### Prerequisites

- The following samples assumes that you followed the steps to get the cookies used to authenticate user as defined in [Authentication documentation](./integrations-authentication.html)
- In several places in the following REST API samples, parameters will be defined by using `{mustache}`. Developers will have to replace values by valid ones
- Standard errors are not listed which does not means that they will not occur (HTTP 4XX and 5XX ones)

### Shared Calendars
The calendar module supports two kinds of external calendars:

* Delegated calendars: when an owner delegates his own calendars to other users. For example, a manager can delegate his calendars to his secretary.

* Public calendars: an owner can set his calendars to public, so as it can be seen by any other user, who can add them if he wants.

#### The difference between both types of shared calendars

##### Functionally

* Delegated calendars represent a privileged access for a given calendar to a specific user

* Public calendars can be seen by everyone, and any user can add it.

##### Technically

* When a user has a delegated calendar, a new instance of the given calendar is created for him.

* When a user add a public calendars, the user creates a subscription for this calendar. A subscription is an object owned by the user and stored in sabre. This object has a reference towards the public calendar along with its own properties

#### How an OpenPaaS user should deal with these types of shared calendars?

Both types of shared calendars are presented the same way for OpenPaaS users. Indeed, an OpenPaaS user has only to deal with external calendars. This is, they are all presented the same way for users.


## CRUD operations

### Get available calendars

#### Request

```
GET https://HOST:PORT/dav/api/calendars/{userId}.json
```

**Headers**

```
accept: application/calendar+json
```

#### Response

The response is formatted using [Hypertext application Language](https://en.wikipedia.org/wiki/Hypertext_Application_Language). Calendar list is available in the `_embedded` element as `dav:calendar` array. The `href` value is the calendar URL which can be used to do operations on the calendar.

_As of 170503 and reported in [CAL-670](https://ci.open-paas.org/jira/browse/CAL-670), the href links are not well formatted._

**Body**

{% highlight json linenos %}
{
  "_links":{
    "self":{
      "href":"/sdav/calendars/57fca675a91c8d01a36ac26b.json"
    }
  },
  "_embedded":{
    "dav:calendar":[
      {
        "_links":{
          "self":{
            "href":"/sdav/calendars/57fca675a91c8d01a36ac26b/events.json"
          }
        },
        "calendarserver:ctag":"http://sabre.io/ns/sync/101"
      },
      {
        "_links":{
          "self":{
            "href":"/sdav/calendars/57fca675a91c8d01a36ac26b/aee302d8-12dc-4c8d-94cf-991da9b453ab.json"
          }
        },
        "dav:name":"My public calendar",
        "caldav:description":"",
        "calendarserver:ctag":"http://sabre.io/ns/sync/7",
        "apple:color":"#f7e511"
      }
    ]
  }
}
{% endhighlight %}

### Create a calendar

#### Request

The `{userId}` is the id of the authenticated user.

```
POST https://HOST:PORT/dav/api/calendars/{userId}.json
```

**Body**

{% highlight json linenos %}
{
  "id": "ebdfe2b9-694a-4dc3-98fa-0f7acbfdc739",
  "dav:name": "My calendar name",
  "apple:color": "#68c289",
  "caldav:description": "The calendar description"
}
{% endhighlight %}

### List events in calendar

#### Request

```
REPORT https://openpaas.linagora.com/dav/api/calendars/57fca675a91c8d01a36ac26b/events.json'
```

**Body**

{% highlight json linenos %}
{
  "match": {
    "start": "20170430T000000",
    "end": "20170613T000000"
  }
}'
{% endhighlight %}

### Create an event in a calendar

In order to create an event, the user must send the new event as jCal in an existing calendar (the list of calendars and their URL can be found as described above).

#### Request

The `{eventId}` is defined by the developer. We suggest to use an uuid generator to have unique ids.

```
PUT https://HOST:PORT/dav/api/calendars/{userId}/{calendarId}/{eventId}.ics
```

**Body**

{% highlight json linenos %}
[
  "vcalendar",
  [],
  [
    [
      "vevent",
      [
        [
          "uid",
          {},
          "text",
          "0d52de98-127c-4625-8583-57ec07e9bfd9"
        ],
        [
          "transp",
          {},
          "text",
          "OPAQUE"
        ],
        [
          "dtstart",
          {
            "tzid":"Europe/Berlin"
          },
          "date-time",
          "2017-05-03T16:00:00"
        ],
        [
          "dtend",
          {
            "tzid":"Europe/Berlin"
          },
          "date-time",
          "2017-05-03T17:00:00"
        ],
        [
          "organizer",
          {
            "cn":"Christophe HAMERLING"
          },
          "cal-address",
          "mailto:chamerling@linagora.com"
        ],
        [
          "class",
          {},
          "text",
          "PUBLIC"
        ],
        [
          "summary",
          {},
          "text",
          "Barcamp doc test"
        ],
        [
          "location",
          {},
          "text",
          "Paris"
        ],
        [
          "description",
          {},
          "text",
          "Blahblah"
        ],
        [
          "attendee",
          {
            "partstat":"NEEDS-ACTION",
            "rsvp":"TRUE",
            "role":"REQ-PARTICIPANT",
            "cn":"Michael BAILLY"
          },
          "cal-address",
          "mailto:mbailly@linagora.com"
        ],
        [
          "attendee",
          {
            "partstat":"ACCEPTED",
            "rsvp":"FALSE",
            "role":"CHAIR"
          },
          "cal-address",
          "mailto:chamerling@linagora.com"
        ]
      ]
    ]
  ]
]
{% endhighlight %}

#### Response

``` json
{"id":"491cd007-3646-4fe2-93a5-7a8281e9e36d"}
```

### Delete an event

#### Request

```
DELETE https://HOST:PORT/dav/api/calendars/{userId}/{calendarId}/{eventId}.ics
```

#### Response

**Body**

{% highlight json %}
{"id":"491cd007-3646-4fe2-93a5-7a8281e9e36d"}
{% endhighlight %}
