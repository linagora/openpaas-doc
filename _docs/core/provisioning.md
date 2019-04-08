---
title: Provisioning
category: OpenPaaS Core
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

OpenPaaS resources can be provisioned from several sources. This chapter details them.

## Platform Administrator

In order to be able to do management operations, a platform administrator is needed. A platform administrator can be provisioned from environment variables:

- `INIT_PLATFORMADMIN_USERNAME`: The email to be used for the platform administrator account
- `INIT_PLATFORMADMIN_PASSWORD`: The password to be used for the platform administrator account

If, **and only if**, there are no platform administators defined in OpenPaaS, a new platform administrator will be created at startup from these environment variables.
