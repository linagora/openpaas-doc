---
title: Shared Mailboxes
category: OpenPaaS Modules - Unified Inbox
order: 3
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

In OpenPaas and James, the notion of a mailbox and a folder is the same.

As a user, I can share my mailbox/folder with other users. When sharing a folder with another user, I have the choice 
currently between two sets of permissions:

* `read and update messages` the user can view the folder, read messages and update some flags on it. he can also forward, reply.
* `Consultation and organize folder` same as above + delete a message, move a message to another shared folder, move to spam.

A user can see all his shared folders in Shared folders tab in Configuration in OpenPaas.

An admin can decide to enable or disable the folder/mailbox sharing for users from the admin panel.
