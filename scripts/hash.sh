#!/bin/bash
# generate integrity attribute
set -e
set -o pipefail
hash=$(shasum -b -a 384 $1 | awk '{print $1}' | xxd -r -p | base64)
echo "<script
  src=\"https://cdn.jsdelivr.net/npm/data-template@1.8.0/$1\"
  crossorigin=\"anonymous\"
  integrity=\"sha384-$hash\"
></script>"
