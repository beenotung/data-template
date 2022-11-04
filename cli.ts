#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'
import { copyTemplate, getDest, hasExec } from 'npm-init-helper'
import { basename, join } from 'path'

async function main() {
  let srcDir = join(__dirname, 'template')
  let dest = await getDest()
  await copyTemplate({
    srcDir,
    dest,
    updatePackageJson: true,
    verbose: true,
  })
  let name = basename(dest)
  if (name !== 'my-app') {
    // update project name in README.md
    let file = join(dest, 'README.md')
    let text = readFileSync(file)
      .toString()
      .replace(/my-app/g, name)
    writeFileSync(file, text)
  }
  console.log(
    `
Done.

Get started by typing:

  cd ${dest}
`.trim(),
  )

  if (hasExec('pnpm')) {
    console.log(`  pnpm i`)
    console.log(`  npm run dev`)
  } else if (hasExec('yarn')) {
    console.log(`  yarn install`)
    console.log(`  yarn dev`)
  } else {
    console.log(`  npm i`)
    console.log(`  npm run dev`)
  }
}
main().catch(e => console.error(e))
