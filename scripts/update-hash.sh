#!/bin/bash
set -e
set -o pipefail
./scripts/size.sh
cp template/public/base.js .
cp template/public/base.min.js .
./scripts/hash.sh base.js >> README.md
./scripts/hash.sh base.min.js >> README.md
