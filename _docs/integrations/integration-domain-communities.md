---
title: Integrations - Domain communities
category: OpenPaaS Integrations
order: 3
---

To access all the communities of a domain, you should send a `Get` request including the domain Id as parameter as in this example: `/communities`

Parameters:

`Name: domain_id (query)`
>The id of the domain to fetch communities from.

Responses:

`code: 200`
>
You will have as response an array of communities for the given domain. The list is arranged in alphabetical order of Community title. Each community object contains:
>
`_id`: The id of the community
>
`activity_stream` An object which contains an uuid
>
`creator`: The creator of the community
>
`domain Id`: An array of the domain Ids
>
`member_status`: Tells you if the user belongs to this community or not
>
`members_count`: How many members the community contains
>
`timestamps`: An object which contains the date of the community creation
>
`title`: The title of the community
>
`type`: Could be an open or a private community.
>
For example the following array contains two community objects:
```
[{
  _id: "581b4ff3357d835512ad9703"
  activity_stream: {uuid: "9ccd94a8-9a8c-476f-b67a-9886af5afd31"}
  creator: "57ea5518815e91644a4827b0"
  domain_ids: ["57ea3fe542809b50c989843d"]
  member_status: "none"
  members_count: 9
  objectType: "community"
  timestamps: {creation: "2016-11-03T14:55:47.135Z"}
  title: "OpenPaas"
  type: "open"
},
{
  _id: "581b4ff3357d835512ac7624"
  activity_stream: {uuid: "9ccd94a8-9a8c-476f-b67a-9886af5afd21"}
  creator: "57ea5518815e91644a4827b0"
  domain_ids: ["57ea3fe542809b50c989843d"]
  member_status: "member"
  members_count: 9
  objectType: "community"
  timestamps: {creation: "2016-11-03T14:55:47.135Z"}
  title: "Communication"
  type: "open"
}
]
```

`Code: 400`
>
Bad request. Invalid request body or parameters.

`Code: 401`
>
Unauthorized. The user is not authenticated on the platform.

`Code: 403`
>
Forbidden. The user does not have enough rights.

`Code: 404`
>
Not Found.
