---
title: Kibana
category: Devops
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

## Overview

[Kibana](https://www.elastic.co/products/kibana) is a tool we use to visualize and navigate into Elasticsearch data.

## Run with Docker

The Elasticsearch version used in OpenPaaS does not allow to use the latest Docker image for Kibana. Here are the instruction to run a valid Kibana version with Docker:

```
docker run -d -e "ELASTICSEARCH_URL=http://HOST:POST" -p 5601:5601 kibana:4.5
```

Where `ELASTICSEARCH_URL` is the URL of the Elasticsearch instance you want Kibana to connect to (i.e. the URL the Kibana container can reach). Once started, you can open the Kibana Web UI from [http://localhost:5601/](http://localhost:5601/):

![The kibana UI](/images/devops/kibana.png)
