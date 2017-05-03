---
title: Integrations - Authentication
category: OpenPaaS Integrations
order: 2
---

Login into the application by issuing a `POST` request.
The response will contain a cookie which you will be able to use in next request as long as the session is open. <br/>
Here it is the URL: `/login`

Parameters:

`Name: credentials (body)`
>
The credentials for authentication. For example:
```
{
  "username": "string",
  "password": "string",
  "rememberme": true,
  "recaptcha": {
    "data": {},
    "needed": true
  }
}
```

Responses:

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
