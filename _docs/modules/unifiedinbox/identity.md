---
title: Identity
category: OpenPaaS Modules - Unified Inbox
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

To send outgoing email from OpenPaaS, you will need to set up at least one email identity. Email identities allow you to choose which address you want to use to send an email. You can set up as many identities as you need once domain administrator allows.

### Identity structure
An identity contains:
* Required attributes:
  - Description: To describe for an identity
  - Name: The name of an identity
  - Email address: The email to fill the `From` field when sending an email

* Optional attributes:
  - Reply to address: Once defined, this email will be filled the `To` field instead of `email address` when the recipients reply to sender
  - Mobile signature: The identity signature that is displayed when composing an email on desktop screen
  - Desktop signature: The identity signature that is displayed when composing an email on mobile screen

The valid values for `Email adress` and `Reply to address` of a specific user are:
- The user primary email
- The user email aliases
- The domain aliases if domain administrators allow by the following steps:
  - Go to `Administration` module
  - Then `Modules` page. Expand `Unifiedinbox` configuration form
  - In the `Identities` part. Turn on `Allow users to choose identity emails from domain aliases`

  ![unifiedinboxConfigFormDomainAliases](/images/modules/unifiedinbox/configFormDomainAliases.jpg)

### Identity types
There are two types of identity:
- Default: The default identity of a user will be fill the `From` field as default when the user opens an email composer. A user only has one default identity.
- Additional: A user can have multiple additional identities that he can choose to fill the `From` field when composing an email
  ![unifiedinboxConfigFormDomainAliases](/images/modules/unifiedinbox/composerChooseIdentity.png)

## Authorization

Domain administrators are able to manage identities of their domain members.

Domain members can see their identities. To manage their identites, they need the authorization from their domain administrators. A domain administrator can allow his domain members to manage their identities by the following steps:

- Go to `Administration` module
- Then `Modules` page. Expand `Unifiedinbox` configuration form
- In the `Identities` part. Turn on `Allow users to manage their identities`

![unifiedinboxConfigForm](/images/modules/unifiedinbox/configForm.jpg)

## Manage identities

Identities management interface of a specific user is available in a tab in user profile page

![identityTab](/images/modules/unifiedinbox/identityTab.png)

### Management actions
There are 3 management actions: add, edit and remove.
- Users can set the default identity when adding a new identity or updating an existing identity
- Users can remove additional identities but cannot remove the default identity