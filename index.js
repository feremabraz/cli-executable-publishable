#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import url from 'url'

const args = process.argv.slice(2)
const argv = {}

args.forEach((arg) => {
  if (arg.indexOf('--') === 0) {
    arg = arg.substring(2)
    const index = arg.indexOf('=')
    if (index > 0) {
      argv[arg.substring(0, index)] = arg.substring(index + 1)
    } else {
      argv[arg] = true
    }
  }
})

if (argv.debug) {
  console.log(argv)
  console.log(args)
}

if (argv.help) {
  console.log('This is a CLI template.')
  console.log('')
  console.log('Usage: cli-executable-publishable [options]')
  console.log('')
  console.log('Options:')
  console.log('  --help     Shows this help.')
  console.log('  --debug    Prints passed options and their arguments.')
  console.log('  --version  Current version.')
  console.log('  --hello    Echoes the given argument.')
  console.log('')
  console.log('Examples:')
  console.log('  $ cli-executable-publishable --hello=world')
  console.log('  $ cli-executable-publishable --hello world')
  process.exit(0)
}

if (argv.version) {
  const filename = url.fileURLToPath(import.meta.url)
  const packagePath = `${path.dirname(filename)}/package.json`
  const packageJSON = fs.readFileSync(packagePath)
  const version = JSON.parse(packageJSON).version
  console.log(version)
  process.exit(0)
}

if (argv.hello) {
  const value = args[args.findIndex((item) => item === '--hello') + 1]
  if (value.indexOf('=') > 0) {
    console.log(`Hello ${value.substring(value.indexOf('=') + 1)}!`)
  } else {
    console.log(`Hello ${value}!`)
  }
  process.exit(0)
}

console.log('Unknown command.')
process.exit(1)
