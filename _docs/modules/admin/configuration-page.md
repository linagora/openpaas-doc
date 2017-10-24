---
title: Add a configuration page
category: OpenPaaS Modules - Admin
order: 3
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
Let's say you have a configuration used somewhere around OpenPaaS and you want to allow administrator to configure it. Then the best place for having it configurable is a page in [Administration](https://github.com/linagora/linagora.esn.admin) module.

## Build configuration page

### Register your page
First step, you need to define a router state for your page in `frontend\app\app.routes.js`.
For example:
``` javascript
  .state('admin.domain.configpage', {
    url: '/configpage',
    views: {
      'root@admin': {
        template: '<admin-configpage />'
      }
    }
  });
```
Note that, the template must match your corresponding angular component of the page.


In order to have an entry of your configuration page displayed in module sidebar, add an object to `ADMIN_PAGES` constant in `frontend\app\app.constants.js`.
For example:
``` javascript
  {
    id: 'configpage',
    name: 'Config Page',
    icon: 'mdi-library-books',
    displayIn: {
      domain: false,
      platform: true
    }
  }
```
 - **id**: your page's id, it needs to match the url linked to your page as you specified in router state
 - **name**: your configuration page name which is displayed in sidebar
 - **icon**: a mdi icon that will be shown next to the page name
 - **displayIn**: decides whether your configuration page is displayed in domain level, platform level or both.

### Start building your page

Create a directory for your own configuration in `frontend\app`. Here is where you put all front-end files for your page (component, controller, service, template,...).

### Template

A page in Admin module often composed of two components:

- **subheader**, it contains the title and optionally a save button for your configuration form.
- A component for your entire page, it handles the main logic, configuration form.

Depends on the properties of the configuration, there could be more smaller sub-component needed for your page. You are advised to utilize both dumb and smart components.

#### Controller

In Admin module, there are already a set of helper services for retrieving and saving configurations. Check `frontend/app/common/config/admin-domain-config.service.js` for the source code.

To get your configuration from back-end side:
``` javascript
  adminDomainConfigService.get(domainId, configName)
    .then(function(data) {
      //Handle retrieved configuration
    });
```
- **domainId** specifies the target domain of your configuration, use as `platform` for getting platform configuration.

- **configName** is the configuration you want to retrieve.

To save your configuration:
``` javascript
  asyncAction({
    progressing: 'Saving configuration...',
    success: 'Configuration saved',
    failure: 'Failed to save configuration'
  }, function() {
    adminDomainConfigService.set(domainId, configName, data);
  });
```
Since `adminDomainConfigService.set` returns a promise. You can use a helper function for this process called `asyncAction`, where it tracks the status of the promise and pop out a message upon the status, whether the `set` function failed, succeeded or still running.
