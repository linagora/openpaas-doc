---
title: Debug
category: Dev
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## ESN Backend

Thanks to Node.js debugging tools, it is possible to debug the ESN backend by adding the `--inspect` flag on start:

```
ENV=dev node --inspect server.js
```
The process will start and will first print debugger information like:

```
Debugger listening on ws://127.0.0.1:9229/dd36b398-43ce-419b-8c0f-207c07365672
For help see https://nodejs.org/en/docs/inspector
debug: local/SUBSCRIBE to mongodb:connectionAvailable
```

On recent version of Google Chrome, you will be able to open the Node.js debugger from:

[chrome://inspect/#devices](chrome://inspect/#devices) then click on `inspect` under `server.js`

![Inspect devices](/images/dev/debug-inspect.png)

From the Developer Tools by clicking on the DevTools for Node.js green icon

![Inspect from devtools](/images/dev/debug-inspect-from-devtools.png)

When done, you are able to go to the sources tab, add breakpoints, and debug as you can do when debugging frontend code.

![Debug](/images/dev/debug.png)
