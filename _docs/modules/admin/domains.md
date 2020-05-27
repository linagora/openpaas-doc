---
title: Domains
category: OpenPaaS Modules - Admin
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

Domains page is used to manage domains in OpenPaaS. It supports creating and editing domains.
Only **platform admin** can use this feature.

## Creating a domain

Creating a [domain](https://hosting.review/web-hosting-glossary/#26) also creates its first administrator and corresponding domain in James server.
Here are the steps to create a domain:

1. Click floating adding button to show "New domain" form
2. Fill domain name, company name and administrator email/password
3. Click on _Create_ or press _Enter_

![Creating a domain](/images/modules/admin/domains/domain-creation.png)

If success, the domain is added to the list of domains.

## Editing a domain

After creating a domain, platform admin can change its company name.
Here are the steps to edit a domain:

1. Click "more actions" button on the domain item to show contextual menu
2. Click on _Edit_ to show "Edit domain" form
2. Change the company name
3. Click on _Save_ or press _Enter_

![Editing a domain - step 1](/images/modules/admin/domains/domain-editing-1.png)

![Editing a domain - step 2](/images/modules/admin/domains/domain-editing-2.png)

If success, the domain is updated in the list of domains.

## Fixing error when creating the corresponding domain in James server

There are maybe error when creating the corresponding domain in James server. In that case, domain item has an error indicator at the right side. Platform admin can open contextual menu to see detail of error and try to fix it.
Here are the steps to fix error:

1. Click "more actions" button on the domain item to show contextual menu
2. Click on error line (in red) to show fixing error dialog
3. Click on _AUTO FIX_ to try to re-create the domain in James server or click on _SETTINGS_ to see if James settings is correct

![Fixing error - step 1](/images/modules/admin/domains/domain-fix-error-1.png)

![Fixing error - step 2](/images/modules/admin/domains/domain-fix-error-2.png)

If error is fixed, the error indicator will be removed.
