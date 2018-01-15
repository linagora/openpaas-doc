---
title: Get started with Linux
category: 1. Getting started
order: 2
---

## Table of contents
{:.no_toc}

* Here is the ToC, this line is needed to generate...
{:toc}

Installing OpenPaas on a Linux server is very easy using provided system packages.
This installation method is currently only supported on _Debian Jessie_ and _RHEL 7_ (or its community companion _CentOS 7_).

> Make sure you are starting from a minimal installation for both distributions; the machine should only have standard system utilities (and ssh service).

# Setup the target machine

## Hostname

Set the target machine's hostname using the following command:
```bash
hostnamectl set-hostname openpaas.local
```

Make sure the hostname is correctly resolved locally using this command:
```bash
echo "127.0.0.1 openpaas.local openpaas james.openpaas.local dav.openpaas.local" | tee -a /etc/hosts
```
## Bootstrap the installation

We provide a small bootstrap script to quickly setup the required repositories on the machine you will install OpenPaas on. To use it, simply run, as _root_:

```bash
wget -qO - get.open-paas.org | bash
```

or

```bash
curl -s get.open-paas.org | bash
```

depending on the availability of either `wget` or `curl` on your system.

# Install packages

Once the bootstrap script has run, you can install the required packages.

### On Debian Jessie

As _root_:

- Remove exim
```bash
apt-get remove -y ^exim*
```
> Removing the default mail transfer agent (_exim_) is required because OpenPaas comes with a full-featured mail server that also serves as a MTA.

- Install openjdk-8
```bash
apt-get install -t jessie-backports openjdk-8-jdk
update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

- Install OpenPaaS packages
```bash
apt-get install -y openpaas openpaas-davserver openpaas-james
```

To make sure services are started and enabled on boot, run the following commands as _root_:

```bash
systemctl enable {mongod,elasticsearch,cassandra,redis-server,rabbitmq-server,nginx,james,openpaas}
systemctl start {mongod,elasticsearch,cassandra,redis-server,rabbitmq-server,nginx,james,openpaas}
```

### On Debian Stretch

As _root_:

- Install openjdk-8
```bash
apt-get install openjdk-8-jdk
update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

- Install OpenPaaS packages
```bash
apt-get install -y openpaas openpaas-davserver openpaas-james
```

To make sure services are started and enabled on boot, run the following commands as _root_:

```bash
systemctl enable {mongodb,elasticsearch,cassandra,redis-server,rabbitmq-server,nginx,james,openpaas}
systemctl start {mongodb,elasticsearch,cassandra,redis-server,rabbitmq-server,nginx,james,openpaas}
```

### On RHEL or CentOS

As _root_, run:

```bash
yum erase -y postfix
yum install -y openpaas openpaas-davserver openpaas-james
```

> Removing the default mail transfer agent (_postfix_) is required because OpenPaaS comes with a full-featured mail server that also serves as a MTA.

To make sure services are started and enabled on boot, run the following commands as _root_:

```bash
systemctl enable {mongod,elasticsearch,cassandra,redis,rabbitmq-server,php-fpm,nginx,james,openpaas}
systemctl start {mongod,elasticsearch,cassandra,redis,rabbitmq-server,php-fpm,nginx,james,openpaas}
```

You will also need to configure the firewall to access the different needed ports. For a simple test you can deactivate it:

```bash
systemctl stop firewalld
```

# Initialize OpenPaaS

To create a domain and your first administrator, run the following command as the _openpaas_ user or as _root_:

```bash
opctl init --email admin@openpaas.local
```

User is created by default as Domain admin.  
If needed, set your user as Platform Admin (see <a target="_blank" href="/modules/admin/index/#platform-mode">Platform mode</a>) with the following command:
```bash
opctl platformadmin init --email admin@openpaas.local
```

The command also provision configurations, hence you need to restart OpenPaaS and
James to make these services work properly with the new configurations:

```bash
systemctl restart {james,openpaas}
```

# Enjoy

OpenPaaS is installed using the `openpaas.local` hostname by default, meaning you must access it using this hostname. To do this, add the following line to your `/etc/hosts` file (unless you can make openpaas.local resolve to the machine's IP address using a DNS server):

```bash
x.x.x.x openpaas.local davserver.openpaas.local james.openpaas.local
```

You can then open a compatible browser to `http://openpaas.local` and login using _admin@openpaas.local_ with password _admin_.

# Discover

Some videos to help discover the product:

## Global presentation (EN)

<iframe width="560" height="315" src="https://www.youtube.com/embed/7d7ZlD8u82s" frameborder="0" allowfullscreen></iframe>

## Unified Inbox introduction (FR)

<iframe width="560" height="315" src="https://www.youtube.com/embed/OaR-i9cKYbo" frameborder="0" allowfullscreen></iframe>

## Calendar introduction (FR)

<iframe width="560" height="315" src="https://www.youtube.com/embed/5HevB9W5tPE" frameborder="0" allowfullscreen></iframe>
