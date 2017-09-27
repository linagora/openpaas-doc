---
title: Collected contacts
category: OpenPaaS Modules - Contact
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

OpenPaaS provides a contact collector feature which goal is to automatically create contacts from several sources without any user interaction.
These collected contacts are then available in a specific user addressbook called `collected` and available in the contact module as other contacts.

Current collector sources are:

- [Calendar module](/modules/calendar/index/): When an event is created in a calendar, the event attendees are collected.
- James Mail Server (Under development): When an email is sent, recipients are collected.

## Install

### Collector engine

The engine in charge of listening to collector sources and of creating contacts is provided by the [linagora.esn.contact.collect](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.contact.collect) module. It is installed by default in the OpenPaaS distribution.

**Repository:** [https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.contact.collect.git](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.contact.collect.git)

### Calendar collector source

The source in charge of listening to calendar events create/update and publishing into the collector engine is provided by the [linagora.esn.calendar.collect.email](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar.collect.email). It is installed by default in the OpenPaaS distribution.

**Repository:** [https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar.collect.email.git](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar.collect.email.git)

## API

The contact collector module listens to events on the `collector:email` exchanges on the OpenPaaS AMQP provider (RabbitMQ). Once a message is received, it is processed to add new emails as contacts in a specific CardDAV addressbook (`collected` address book) of the current user.

### Messages

Message content to be published on `collector:email` AMQP exchange must follow the following rules:

- Message payload is a JSON as String.
- Message must contain the userId or the userEmail which will be used to identify the OpenPaaS user to collect contacts for.
- Message must contain an array of emails.

#### Message with userId

OpenPaaS user will be found using the given `userId`.

``` json
{
  "userId": "57fca675a91c8d01a36ac26b",
  "emails": ["user1@open-paas.org", "User2 <user2@open-paas.org>", "John Doe <john.doe@open-paas.org>", "user3@open-paas.org"]
}
```

#### Message with userEmail

OpenPaaS user will be found using the given `userEmail`.

``` json
{
  "userEmail": "admin@open-paas.org",
  "emails": ["user1@open-paas.org", "User2 user2@open-paas.org", "John Doe john.doe@open-paas.org", "user3@open-paas.org"]
}
```
