---
title: Overview
category: OpenPaaS Modules - Job Queue
order: 1
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

In OpenPaaS ESN system, there are scenarios or tasks which consume a lot of system resources such as CPU time, memory, network bandwidth or IO. For example: reindex elasticsearch indices, import contacts and events from files or social accounts, send alarm emails to calendar event attendees, etc.

Processing such tasks in NodeJS becomes even more challenging due to its single threaded and if you try to run them in parallel, system might become laggy or even crash.

Solution to handle such tasks is to build a queue of tasks and process each task one by one so that each task is given good enough system resources.

`linagora.esn.jobqueue` is a OpenPaaS ESN core module which base on [Kue](https://github.com/Automattic/kue).This module provides APIs to create and manage queue job in OpenPaaS ESN.

## How it works?

- We need to register a worker by the worker name and its handler when starting OpenPaaS system
- If we want to execute a job, we need add the job to queue. To do that, we need to submit job with two params:
  - Worker name: job queue gets the corresponding handler from registered workers by name
  - Job data: after having handler, job queue then add a new job to queue with the handler and job data

### Register a worker

The worker object to register is defined as:

```javascript

const jobName = 'contact-import';

dependencies('jobqueue').lib.addWorker({
  name: jobName,
  handler: {
    handle
    getTitle
  }
})

function handle(job) {
  const { user, account } = job.data;

  // must return a promise
  return importContact(user, account);
}

function getTitle(jobData) {
  return `Import ${jobData.type} contacts for user ${jobData.user._id}`;
}

```

### Calling a worker to do his job

Once registered, you can call worker job by his name and data:

```javascript

const jobData = { user, account };

dependencies('jobqueue').lib.submitJob(jobName, jobData);

```

_Note that the `jobData` must be as lightweight as possible since it is stored in Redis_

### Job object

To get job object by his id:

```javascript

dependencies('jobqueue').lib.getJobById(jobId);

```