---
title: Screensharing
category: OpenPaaS Modules - VideoConference
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Browser

Screensharing is supported natively in Firefox while it needs a browser extension on Chrome.
The Chrome extension sources are available at [https://ci.linagora.com/linagora/lgs/openpaas/jidesha](https://ci.linagora.com/linagora/lgs/openpaas/jidesha) (Fork of [https://github.com/jitsi/jidesha](https://github.com/jitsi/jidesha)).

The extension has to be configured to allow Chrome to access to Jitsi instances defined in its manifest file. For example, if the Jitsi instance is running on jitsi.open-paas.org, then the manifest.json file has to be updated accordingly:

```
"matches": [
    "*://jitsi.open-paas.org/*"
]
```

To package the extension and distribute it, follow the instruction on the [repository README](https://ci.linagora.com/linagora/lgs/openpaas/jidesha/blob/master/README.md).

## Server configuration

The Jitsi server needs to be configured to allow screensharing as described [https://ci.linagora.com/linagora/lgs/openpaas/jidesha/blob/master/README.md#enter-your-extensions-hash-id-into-your-jitsi-meet-installation](https://ci.linagora.com/linagora/lgs/openpaas/jidesha/blob/master/README.md#enter-your-extensions-hash-id-into-your-jitsi-meet-installation).

On the Docker based jitsi deployment, the extension id has to be defined in the this [config.js file](https://ci.linagora.com/linagora/lgs/openpaas/docker-jitsi-meet/blob/janus-hublin-deployment/web/rootfs/defaults/config.js#L149).