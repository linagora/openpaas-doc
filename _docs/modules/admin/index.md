---
title: Overview
category: OpenPaaS Modules - Admin
order: 1
---

![The admin module](/images/modules/admin/admin.png)

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

The [linagora.esn.admin](https://github.com/linagora/linagora.esn.admin) module allows domain and platform administrator to configure/manage the configuration at the corresponding level.

## Install

You can install admin module by following the [OpenPaaS Module installation](/modules/howto/install/).

## Features

The module provides configuration interfaces in two modes: domain and platform which corresponding domain and platform permissions. You need have at least one of those permissions to access the module.

Once you logged in the OpenPaaS, you can see the **Administration** item in _Application menu_

![The application menu](/images/modules/admin/application_menu.png)

And if you have both permissions, you can switch between modes

![Platform mode](/images/modules/admin/switch_mode.png)

### Domain mode

If you are a domain administrator, you will see the configuration pages at domain mode.

![Domain mode](/images/modules/admin/domain_mode.png)

- **General**: Configure the system stuffs like business hours, time format.
- **Features**: Enable/disable the features in OpenPaaS modules.
- **Mail**: Configure mail configuration which will be used to OpenPaaS platform send/receive the email with the users.
- **Users**: Manage domain members.
- **Roles**: Manage domain roles.
- **DAV**: Configure DAV server which is required by [Calendar](/modules/calendar/index/) and [Contact](/modules/contact/index/) modules
- **LDAP**: Configure LDAP configurations which can be used for authentication and attendee provider.
- **Web**: Configure the address you want people to type in their browser to reach your OpenPaaS instance.
- **Modules**: Each module in OpenPaaS can have its own configuration form allows domain administrator to configure the configuration of those modules.
- **Autoconf**: Define the configuration file template used by the autoconfiguration mechanism (for Thunderbird).
- **Theme**: Define the theme, logo and favicon of OpenPaas.

### Platform mode

If you are a platform administrator, you will see the configuration pages at platform mode

![Platform mode](/images/modules/admin/platform_mode.png)

- **General**: Same as the General page in domain mode, plus the ability to change the max login retries.
- **Features**: Same as in domain mode.
- **Mail**: Same as in domain mode.
- **DAV**: Same as in domain mode.
- **Modules**: Same as in domain mode.
- **James**: Configure James server URL.
- **JWT**: Define the algorithm, public-key and private-key that will be used to encode/decode JSON web tokens in the ESN instances.
- **Social connections**: Configure social connections (Google, Facebook, Github and Twitter).
- **[Domain](/modules/admin/domains/)**: Manage the domains.
