#!/bin/bash
set -e
set -o pipefail

cd template/public
npx --yes esbuild base.js --minify > base.min.js
gzip -f -k base.min.js

../../scripts/du.js base.*
