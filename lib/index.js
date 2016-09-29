'use strict'

const fs = require('fs')
const path = require('path')

const parallel = require('async/parallel')
const hostedGitInfo = require('hosted-git-info')

const LICENSES = [
  'LICENSE',
  'LICENSE.txt',
  'LICENSE.md',
  'LICENCE',
  'LICENCE.txt',
  'LICENCE.md',

  'license',
  'license.txt',
  'license.md',
  'licence',
  'licence.txt',
  'licence.md'
]

const noop = () => {}

module.exports = getLicense
function getLicense (modulePath, optionalCallback) {
  const cb = optionalCallback || noop

  return new Promise((resolve, reject) => {
    let pkg = {}

    try {
      pkg = require(path.join(modulePath, 'package.json'))
    } catch (err) {
      // make sure to invoke callback as well in case of an error here
      cb(err)
      throw err
    }

    const tasks = LICENSES.map(makeTask.bind(this, modulePath))

    parallel(tasks, (err, licensePath) => {
      if (err) {
        cb(err)
        return reject(err)
      }

      licensePath = licensePath.reduce((acc, el) => {
        if (el) return el
        return acc
      }, false)

      const res = {
        license: pkg.license,
        licenseFile: licensePath,
        repo: getRepo(pkg)
      }

      cb(null, res)
      resolve(res)
    })
  })
}

function getRepo (pkg) {
  if (!pkg.repository) return false

  const repo = hostedGitInfo.fromUrl(pkg.repository.url || pkg.repository)

  return repo.browse()
}

function makeTask (modulePath, file) {
  return function task (cb) {
    const where = path.join(modulePath, file)
    fs.stat(where, (err, stats) => {
      if (err && err.code === 'ENOENT') return cb(null, false)
      if (err) return cb(err)

      if (stats.isFile()) return cb(null, where)

      return cb(null, false)
    })
  }
}
