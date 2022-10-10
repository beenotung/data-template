import { readFileSync, writeFileSync } from 'fs'
import { copyTemplate, getDest } from 'npm-init-helper'
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
  pnpm i
  npm run dev

Installation Alternatives:

  pnpm i
  slnpm
  yarn
  npm install
`.trim(),
  )
}
main().catch(e => console.error(e))
