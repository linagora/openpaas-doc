---
title: Domain members address book
category: OpenPaaS Modules - Contact
order: 5
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
- Domain members address book (DMAB) is an address book of a domain and contains mapping contacts from **all active domain members**.

![Active user](/images/modules/contact/active-user.png)
An active domain members can login and can be searched on OpenPaaS
{: style="color:gray; font-size: 80%; text-align: center;"}

- Domain administrators can enable, disable and synchronize the address book.
- Platform administrators can also manage the address books for all domains which do not configure DMAB yet. One of the most useful cases is when initializing the system, the platform administrator can manage the address book for all domains.

## Management
### Enable
#### Domain scope
Domain administrators can enable DMAB feature. The following actions will be done:
- Turn on the feature flag of domain.
- Create an address book named ***domain-members*** if it does not exist.
- Create mapping contacts from domain members into the DMAB.

![Enable or disable domain members address book on a domain](/images/modules/contact/enable-disable-domain-members-address-book-on-a-domain.png)

**Result:**
The address book will be put in **Domain members** section of sidebar in `Contacts` page. **All active domain member contacts** are also displayed.

![Domain members address book section](/images/modules/contact/domain-members-address-book-section.png)

#### Platform scope
Platform administrators can enable DMAB feature for domains of platform that has not configured DMAB yet. Below are steps:
- Turn on the feature flag of platform.
- Synchronize each single domain of platform. See [synchronize a DMAB](/modules/contact/domain-members-address-book/#synchronize).

![Enable or disable domain members address books for entire platform](/images/modules/contact/enable-or-disable-domain-members-address-books-for-entire-platform.png)

**Result:**
- On a domain that has not configured DMAB yet, the address book will be put in **Domain members** section of sidebar in `Contacts` page.
- On a domain has its own DMAB's configuration, the display of **Domain members** section depends on DMAB's domain configuration.

### Disable
#### Domain scope
Domain administrators can disable DMAB feature. The following actions will be done:
- Turn off the feature flag of domain.
- Delete the address book.

**Result:**
On success, the address book of the domain will be deleted. Domain members can't see **Domain members** section of sidebar in `Contacts` page.

#### Platform scope
Platform administrators can disable DMAB feature for domains of platform that do not configured DMAB yet. Below are steps:
- Turn off the feature flag of platform.
- Synchronize each single domain of platform. See [synchronize a DMAB](/modules/contact/domain-members-address-book/#synchronize).

**Result:**
- On a domain that has not configured DMAB yet, domain members can't see **Domain members** section of sidebar in `Contacts` page.
- On a domain has its own DMAB's configuration, the display of **Domain members** section depends on DMAB's domain configuration.

### Synchronize
Synchronization allows domain or platform administrators to synchronize DMAB. There are 2 scenarios:
- *The feature is disabled:* For some reasons, Sabre service is stopped when disabling the feature at ESN side, so the address book still there in Sabre. Synchronization will remove this address book.
- *The feature is enabled:* Domain members can be added, updated and blocked. So we need to refresh mapping contacts in DMAB by adding, updating and removing them.

#### Domain scope
Synchronizing DMAB action will get all active users at that time to create new set of domain member contacts

![Synchronize domain members address books for a domain](/images/modules/contact/synchronize-domain-members-address-books-for-a-domain.png)

**Result:**
On success, **domain members contacts** in `Contacts` page will be updated.

#### Platform scope
Platform administrators can synchronize DMAB for all domains that do not configure DMAB feature yet.

![Synchronize domain members address books for entire platform](/images/modules/contact/synchronize-domain-members-address-books-for-entire-platform.png)

**Result:**
- On a domain that has not configured DMAB yet, **domain members contacts** in `Contacts` page will be updated.
- On a domain has its own DMAB's configuration, the display of **Domain members** section and contacts depends on DMAB's domain configuration.