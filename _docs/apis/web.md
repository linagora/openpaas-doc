---
title: Web API
category: APIs
order: 1
---

The OpenPaaS Web API allows you to build applications that interact with OpenPaaS in more complex ways than the integrations we provide out of the box.

## Basics

### Authentication

There are several ways to authenticate through OpenPaaS API: [Basic](/apis/authentication/#basic), [Cookies](/apis/authentication/#cookies), [OAuth](/apis/authentication/#oauth).

### Pagination

Request that return multiple items can be _paginated_. You can specify an offset with the `offset` query parameter and the number of elements can be defined by using the `limit` one.

```
curl 'https://HOST:PORT/api/RESOURCE?limit=50&offset=20'
```

This request will return `50` items starting at the `20`th one i.e. from `20` to `70`.
