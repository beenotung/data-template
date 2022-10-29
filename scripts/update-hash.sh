#!/bin/bash
set -e
set -o pipefail
./scripts/size.sh
./scripts/hash.sh base.js >> README.md
./scripts/hash.sh base.min.js >> README.md
