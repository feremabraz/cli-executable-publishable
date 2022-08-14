#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import url from 'url'

let args = process.argv.slice(2)
let argv = {}

for (var i = 0; i < args.length; i++) {
  var arg = args[i]
  if (arg.indexOf('--') === 0) {
    arg = arg.substring(2)
    var index = arg.indexOf('=')
    if (index > 0) {
      argv[arg.substring(0, index)] = arg.substring(index + 1)
    } else {
      argv[arg] = true
    }
  }
}

if (argv.debug) {
  console.log(argv)
  console.log(args)
}

if (argv.help) {
  console.log(
    'Usage: cli-executable-publishable [--help] [--version] [--debug] [--hello <value>]',
  )
  process.exit(0)
}

if (argv.version) {
  var filename = url.fileURLToPath(import.meta.url)
  var packagePath = path.dirname(filename) + '/package.json'
  var packageJSON = fs.readFileSync(packagePath)
  var version = JSON.parse(packageJSON).version
  console.log(version)
  process.exit(0)
}

if (argv.hello) {
  const value = args[args.findIndex((item) => item === '--hello') + 1]
  console.log(`Hello ${value}`)
  process.exit(0)
}

console.log('Unknown command.')
process.exit(1)
