---
title: Vue Components
category: Frontend
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

A collection of Vue components are available to build Vue applications. Components are available at [https://github.com/linagora/vue-openpaas-components](https://github.com/linagora/vue-openpaas-components) and can be used as dependency in any other OpenPaaS Vue projects.

```
npm install @linagora/vue-openpaas-components
```

Once installed, you can use them in your application by importing them:

```js
import Vue from 'vue';
import OpenPaaSComponents from '@linagora/vue-openpaas-components';

Vue.use(OpenPaaSComponents);
```

Components are then available and can be used in any other component. For example, to display an OpenPaaS user avatar with its online status:

```
<template>
  <op-avatar size="48">
    <!-- Slots are not yet available, will work on this later -->
    <op-status :status="user.status" slot="bottom-right">
  </op-avatar>
</template>
```

## Develop new components

To add new components, you will have to follow some conventions. For example, to create a `xyz` component:

1. Always use the `op` prefix
2. Create a folder named `opXyz` under `src/components`
3. Create your Vue component in a `src/components/opXyz/opXyz.vue` file
4. In `src/components/opXyz/index.js` file, import your Vue component, then export it like

    ```js
    import opXyz from './opXyz.vue';

    export { opXyz };
    export default opXyz;
    ```

5. In `src/components/index.js`, export your component

    ```js
    export * from './opXyz';
    ```

6. The component will be automatically registered as a global component and you will be able to use it like `<op-xyz/>`

## Use in development mode

While you are developing new components, you will need to link the current project in your Vue project with `npm link`:

1. In this project run `npm link`
2. In your project run `npm link vue-openpaas-components`
