#!/bin/bash
set -e
set -o pipefail

cd public
npx esbuild base.js --minify > base.min.js
gzip -f -k base.min.js

du -sh --apparent-size base.*