---
title: Shared Address Books
category: OpenPaaS Modules - Contact
order: 3
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

### Overview

The Contact module supports two kinds of shared address books:

* **Public address books**: an owner can set his address books to public. Other users in the same domain can subscribe to such address books.
* **Delegated address books**: an owner can delegate his own address books to other users in the same domain.

There are some differences between these types of shared address books, the main ones are:

* Public address books can be seen by everyone, and any user can subscribe to them.
* Delegated address books represent a privileged access for a given address book to a specific users.

Shared address books come with **rights**: Rights are applied to users who are looking at other users address books.

- **Read**: User has access to all the contact information but can not change anything.
- **Write**: User has access to all the contact information and can update/delete contacts.
- **Administration**: User not only has read/write rights but also can share (public and delegate) address books.

### Public address books

In order to make an address book public, the user has to change the _Public right_ to _Read_ or _Write_ on the address book settings page as shown below.

![The address book settings page, change public level](/images/modules/contact/addressbook-public-change-settings.png)

Once an address book is public, other users can _subscribe_ to it by searching for owners' name in _Shared address book_ dialog.

![Add shared address book button](/images/modules/contact/addressbook-add-sharing.png)

Public address books are linked to their creator, so in order to find them, the user has to search for the creator to find all his public address books. In order to subscribe to this public address book, the user has to click on the _Add_ toggle button then on _Save_.

![The shared address book dialog, searching a public address book](/images/modules/contact/addressbook-public-search.png)

The address books is now displayed as a _Shared address book_. The user can see contacts and create some if _Write_ rights are set on the public address book.

### Delegated address books

A user can delegate his address books to others by adding them to _Delegation_ list. A user who is added called a sharee. In order to add a sharee:

1. Go to address book Setting page, switch to Delegation tab
2. Search for user
3. Set the right level for selected user
4. Click _Add_ to add the user in to delegation list
5. Click _Save_ in sub header to save the delegation list

![The address book delegation, adding user step 0](/images/modules/contact/addressbook-delegate-add-user-0.png)

![The address book delegation, adding user step 1](/images/modules/contact/addressbook-delegate-add-user-1.png)

![The address book delegation, adding user step 2](/images/modules/contact/addressbook-delegate-add-user-2.png)

Once the address book is saved, it is "ready to be delegated": The _sharee_ can not do anything until he subscribes the delegated address book. This is possible by going to the _Shared address books_ page then do a search just like for public address books.

In the screenshot below, one delegated address book is displayed. In order to add this delegated address book, the _sharee_ has to click on the _Add_ toggle button then on _Save_.

![The shared address books page, searching a delegated address book](/images/modules/contact/addressbook-delegated-search.png)

The address book is now displayed as a _Shared address book_, the _sharee_ can see contacts as default. He can create, edit or remove contacts if _Write_ or _Administration_ rights are set to him. If _Administration_ rights is set, the _sharee_ can delegate the address book.


### Technical considerations

* When a user add a public address book, the backend will create a subscription for this address book. A subscription is an object owned by the user and stored in the backend. This object has a reference towards the public address book along with its own properties.
* When a user has a delegated address book, a new instance of the given address book is created for him on the backend side.
