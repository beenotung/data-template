#!/usr/bin/env node

// using readFile instead of stat to be compatible to MacOS
let { readFileSync } = require('fs')
let { argv } = process

let files = argv.slice(2)

let maxFileLength = Math.max(0, ...files.map(file => file.length))

for (let file of files) {
  let size = readFileSync(file).length
  let padding = ' '.repeat(maxFileLength - file.length)
  let line = file + padding + '\t' + size
  if (size >= 1024) {
    line += `\t(${(size / 1024).toFixed(1)} KB)`
  }
  console.log(line)
}
