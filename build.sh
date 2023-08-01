#!/usr/bin/env bash

manifest=""
target="gchat-login-cookie"

if [ "$1" = "v2" ]
then
  manifest="manifest-v2.json"
  target="$target-v2.zip"
elif [ "$1" = "v3" ]
then
  manifest="manifest-v3.json"
  target="$target-v3.zip"
else
  echo "please call with 'v2' or 'v3'"
  exit 1
fi

if [ -e "manifest.json" ]
then
  echo "manifest.json exists... will not overwrite..."
  exit 2
fi

mkdir -p dist

cp "$manifest" manifest.json
zip -r "dist/$target" cookies* icons manifest.json