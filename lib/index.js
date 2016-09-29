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

module.exports = getLicense
function getLicense (modulePath, optionalCallback) {
  return new Promise((resolve, reject) => {
    const pkg = require(path.join(modulePath, 'package.json'))

    const tasks = LICENSES.map(makeTask.bind(this, modulePath))

    parallel(tasks, (err, licensePath) => {
      if (err) throw err

      licensePath = licensePath.reduce((acc, el) => {
        if (el) return el
        return acc
      }, false)

      const res = {
        license: pkg.license,
        licenseFile: licensePath,
        repo: getRepo(pkg),
        private: !!pkg.private
      }

      if (optionalCallback) optionalCallback(null, res)

      resolve(res)
    })
  }, (err) => {
    throw err
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
      if (err) throw err

      if (stats.isFile()) return cb(null, where)

      return cb(null, false)
    })
  }
}
