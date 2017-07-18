---
title: REST API
category: OpenPaaS Modules - Calendar
order: 2
---

## Introduction

The OpenPaaS calendar API uses jCal specification as defined in the [jCal RFC](https://tools.ietf.org/html/rfc7265) which defines a JSON format for iCalendar.

### Prerequisites

- The following samples assumes that you followed the steps to get the cookies used to authenticate user as defined in [Authentication documentation](./integrations-authentication.html)
- In several places in the following REST API samples, parameters will be defined by using `{mustache}`. Developers will have to replace values by valid ones
- Standard errors are not listed which does not means that they will not occur (HTTP 4XX and 5XX ones)

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
