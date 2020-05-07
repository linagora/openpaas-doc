---
title: Technical users
category: OpenPaaS Modules - Admin
order: 6
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

Technical users are users having accessibility to data of a domain to perform some technical tasks. For instance, reindexing contacts from MongoDB to Elasticsearch. A default technical user is created by executing the init.js file locating at bin/commands when initializing the server.

Every technical user belongs to a particular domain. Each domain manages multiple technical users belonged to it. 

Technical users page is used to manage technical users in OpenPaaS. It supports creating, editing and removing technical users.
Currently, only **domain admin** can use this feature.

## Creating a technical user

A technical user is stored in ESN MongoDB and belongs to a domain where it is created.
Here are the steps to create a technical user:

1. Click floating adding button to show "Add a technical user" form
2. Fill name, description, type and data. A new data field can be added by clicking "ADD A NEW DATA FIELD" button.
3. Click on _Add_

![Creating a technical user](/images/modules/admin/technical-users/technical-user-creation.png)

If successful, the technical user is added to the list of technical users.

## Editing a technical user

After creating a technical user, the domain admin can modify its name, description, type and data fields.
Here are the steps to edit a technical user:

1. Click "more actions" button on the technical user item to show the contextual menu
2. Click on _Edit_ to show "Edit a technical user" form
3. Modify its information
4. Click on _Edit_

![Editing a technical user - step 1](/images/modules/admin/technical-users/technical-user-editing-1.png)

![Editing a technical user - step 2](/images/modules/admin/technical-users/technical-user-editing-2.png)

If successful, the technical user is updated on the list of technical users.

## Removing a technical user

Here are the steps to remove a technical user:

1. Click "more actions" button on the technical user item to show the contextual menu
2. Click on _Remove_ to show "Remove technical user" form
3. Click _Remove_ to confirm removing that technical user

![Removing a technical user](/images/modules/admin/technical-users/technical-user-removing.png)

If success, the technical user is removed from the list of technical users.

When all of the technical users in a particular domain are removed, some technical tasks for that domain such as reindexing cannot be executed.
