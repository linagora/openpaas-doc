#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)
release_message="Updated at ${rev}"

TARGET_REPO="linagora/openpaas-doc"
TARGET_BRANCH="gh-pages"

git config --global user.name "CI Bot"
git config --global user.email "bot@linagora.com"

git clone https://${GITHUB_TOKEN}@github.com/${TARGET_REPO}.git --branch ${TARGET_BRANCH} deploy
mv deploy/.git _site/

cd _site
ls -R .
git add -A .
git commit --allow-empty -m "$release_message"
git push -q origin HEAD:$TARGET_BRANCH
