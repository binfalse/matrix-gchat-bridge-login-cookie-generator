#!/usr/bin/env bash

manifest=""
target="gchat-login-cookie"

if [ -n "$2" ]
then
  commit="$2"
else
  commit=$(git log --format="%h" -n 1)
fi

if [ -z "$commit" ]
then
  echo "didn't find current commit id"
  exit 1
fi

if [ "$1" = "v2" ]
then
  manifest="manifest-v2.json"
  target="$target-v2-$commit.zip"
elif [ "$1" = "v3" ]
then
  manifest="manifest-v3.json"
  target="$target-v3-$commit.zip"
else
  echo "please call with 'v2' or 'v3'"
  exit 1
fi

if [ -e "manifest.json" ]
then
  echo "manifest.json exists... will not overwrite..."
  exit 2
fi

target="dist/$target"

echo "building $target"

mkdir -p dist

cp "$manifest" manifest.json
zip -r "$target" cookies* icons manifest.json
rm manifest.json
