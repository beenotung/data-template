import { readFileSync, writeFileSync } from 'fs'
import { cloneTemplate, getDest } from 'npm-init-helper'
import { basename, join } from 'path'

async function main() {
  let dest = await getDest()
  await cloneTemplate({
    gitSrc: 'https://github.com/beenotung/spa-lite#monorepo',
    srcDir: 'template',
    dest,
    updatePackageJson: true,
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
