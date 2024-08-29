import { exec } from 'child_process'

const version = process.env.npm_package_version

if (!version) throw new Error(`Skipping version sync because version='${version}'`)

console.info(`Syncing version v${version} to manifest file.`)

exec(`sed -i '' 's/"version": .*$/"version": "${version}",/' companion/manifest.json`)
