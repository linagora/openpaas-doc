---
title: Domain address book
category: OpenPaaS Modules - Contact
order: 4
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
- Domain address book contains contacts, which is shared among members of single domain.
- Domain administrator can enable or disable the address book.
- By default, domain members can see all the contacts.
- Domain members can get more access such as: add, edit, delele the contacts or share rights of the address book to other members when they are delegated by an address book's administrator.

## Management
### Enable
- Only domain administrator can enable domain address book feature on modules admin page.

![Enable or disable domain address book](/images/modules/contact/enable-disable-domain-address-book.png)

- Enabling the address book will make it visible in `Contacts` page of all domain users, the address book will be put in **Domain address book** section of sidebar.

![Domain address book section](/images/modules/contact/domain-address-book-section.png)

### Disable
- Only domain administrator can disable domain address book feature on modules admin page.
- Disabling will hide the address book and its contacts to all domain users. All the contacts and configurations are preserved.

### Role of members
- Domain address book is an address book. Therefore, the address book inherit features of a common address book such as: ***Public right*** and ***Deligate***.
- Adminstrator of the domain address book is the domain member has rights to ***read***, ***write*** and ***share*** (public and delegate) the address book. Read how to use [shared address book](/modules/contact/shared).
- Because the contacts in the address book are shared resources. The data should be trusted for using by other domain members. Adminstrators need to consider before sharing rights to a certain user.
