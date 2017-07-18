---
title: Cookies
category: Auth
order: 2
---

### How to authenticate a given user to the OpenPaaS platform?

From his credentials, you'll authenticate a user and then get this user's object containing domains ids to which he belongs to.

### Let's see details:

Log your user into the application by issuing a `POST` request to `/login` URL.
The response will contain a cookie which you will be able to use in next requests as long as the session is open. <br/>

#### Parameters:

`Name: credentials (body)`
>
The credentials for authentication. For example:
{% highlight json linenos %}
{
  "username": "string",
  "password": "string",
  "rememberme": true,
  "recaptcha": {
    "data": {},
    "needed": true
  }
}
{% endhighlight %}

#### Responses:

`Code: 200`
>
We will have as response the user object which contains the user's domain ids.

`Code: 400`
>
Bad request. Invalid request body or parameters.

`Code: 403`
>
Forbidden. The user does not have enough rights.

`Code: 500`
>
Internal server error - Something went bad on the server side.
