---
title: Basic Access
category: APIs - Auth
order: 1
---

Basic Access Authentication is a method for a HTTP client to provide username and password when making a HTTP request to the server as described in the [RFC2617](https://tools.ietf.org/html/rfc2617).

## curl sample

We assume that the a user is registered in OpenPaaS with username `admin@open-paas.org` and password `secret`. To illustrate the API response, we are calling the `/api/user` endpoint which returns the current authenticated user.

**Request**

```
curl --user admin@open-paas.org:secret http://localhost:8080/api/user
```

**Response**

{% highlight json linenos %}
{
  "_id":"592294b7666cdc5db24b3e31",
  "firstname":"admin",
  "lastname":"admin",
  "preferredEmail":"admin@open-paas.org",
  "emails":[
    "admin@open-paas.org"
  ],
  "domains":[
    {
      "domain_id":"592294b7666cdc5db24b3e32",
      "joined_at":"2017-05-22T07:35:20.228Z"
    }
  ],
  "avatars":[
  ],
  "accounts":[
    {
      "type":"email",
      "timestamps":{
        "creation":"2017-05-22T07:35:19.562Z"
      },
      "preferredEmailIndex":0,
      "emails":[
        "admin@open-paas.org"
      ],
      "hosted":false
    }
  ],
  "followers":0,
  "followings":0,
  "isPlatformAdmin":false,
  "disabled":false,
  "configurations":{
    "modules":[
      {
        "name":"core",
        "configurations":[
          {
            "name":"application-menu.profile",
            "value":true
          },
          {
            "name":"homePage",
            "value":"calendar.main"
          },
          {
            "name":"businessHours",
            "value":[
              {
                "daysOfWeek":[
                  1,
                  2,
                  3,
                  4,
                  5
                ],
                "start":"09:00",
                "end":"18:00"
              }
            ]
          },
          {
            "name":"datetime",
            "value":{
              "use24hourFormat":false
            }
          }
        ]
      },
      {
        "name":"linagora.esn.unifiedinbox",
        "configurations":[

        ]
      }
    ]
  }
}
{% endhighlight %}
