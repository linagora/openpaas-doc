---
title: Elasticsearch
category: OpenPaaS Modules - Admin
order: 5
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview
OpenPaaS integrates Elasticsearch as its search engine. Resources like users, groups, contacts, calendar events, etc, are synchronized between MongoDB database and Elasticsearch so that user can search for resources all around OpenPaaS as fast and accurately as possible.

## Setting up Elasticsearch for OpenPaaS
Make sure you have Elasticsearch up and running on your system under a specific address.

On OpenPaaS, naviagate to "Elasticsearch" menu in Platform administration and enter Elasticsearch address, OpenPaaS will then use this address to send search requests to

![Elasticsearch configuration](/images/modules/admin/elasticsearch/elasticsearch_config.png)

## Synchronize data in Elasticsearch
To make Elasticsearch works and ensure that the data inside it is always up to date, we need to keep the synchronization between MongoDB database and Elasticsearch. However, sometimes we might lose it due to unexpected reasons such as server running out of storage, Elasticsearch's outage, etc, or some expected reasons, namely replacing the current Elasticsearch with a higher version.

OpenPaaS comes with tools to allow platform administrators to manually update the [data mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html) to standard mapping and re-synchronize data from OpenPaaS's MongoDB database to ElasticSearch. These terms are called `reindex` and `re-configure`:

- `re-configure`: data can be stored incorrectly in Elasticseach which leads to strange search behavior on a resource. This issue is due to a resource having incorrect data mapping configuration. Therefore, platform administrators have the ability to correct the standard data mapping configuration for a resource by using `re-configure`.
- `reindex`: re-synchronize all data from MongoDB to Elasticsearch, this includes `re-configure` to make sure the standard mapping is used

In order to `reindex` or `re-configure` data. Under the "Maintenance" page in Platform administration, expanse the "Elasticsearch" section. You can choose to run your desired procedure ("Correct the index configuration (quick)" a.k.a. `re-configure` or "Correct the index configuration and reindex data (slow)" a.k.a. `reindex`) on a single type of resource, make sure that your Elasticsearch address is correctly configured.

![Maintenance](/images/modules/admin/elasticsearch/maintenance.png)

## Upgrade Elasticsearch
Openpaas ESN 1.5 supports both ElasticSearch version 2.x and 6.x. Starting from OpenPaaS ESN 1.6, it is strictly required to use ElasticSearch 6.x. If you're using an older version of Elasticsearch and would like to upgrade to use ElasticSearch 6.x for your OpenPaaS instance, you can follow these steps:

1. Make sure Elasticsearch 6.x is up and running on your system under a specific address.

2. On OpenPaaS, navigate to "Elasticsearch" menu in Platform administration and enter Elasticsearch 6.x address.

3. Navigate to "Maintenance" menu, expanse the "Elasticsearch" section and select "Correct the index configuration and reindex data (slow)" on every resource to reindex all data to new Elasticsearch (search result will then be empty until these tasks are done).
