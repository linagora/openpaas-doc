---
title: Overview
category: APIs - Auth
order: 0
---

There are several ways to authenticate/authorize users in OpenPaaS:

- [Basic Access Authentication](/apis/auth/basic).
- [Cookies](/apis/auth/cookies).
- [OAuth](/apis/auth/oauth). Even if OAuth [is not an authentication protocol](https://oauth.net/articles/authentication/), this section shows how to use OAuth in OpenPaaS.
- Single sign-on (SSO). [SSO](https://en.wikipedia.org/wiki/Single_sign-on) is a property of _access control_ of multiple related, yet independent, software systems. With this property, a user logs in with a _single ID_ and _password_ to gain access to a connected system or systems without using different _usernames_ or _passwords_, or in some configurations seamlessly sign on at each system. OpenPaaS supports single sign-on(SSO) by external modules:
  - [LemonLDAP](/apis/auth/lemonldap): provided by the [linagora.esn.lemonldap](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.lemonldap) module.
