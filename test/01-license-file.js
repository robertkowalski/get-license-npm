const tap = require('tap')
const test = tap.test
const path = require('path')
const waterfall = require('async/waterfall')

const getLicenseInfo = require('../')

const dirs = [
  'pkg-with-licence-file',
  'pkg-with-licence-md',
  'pkg-with-licence-txt',
  'pkg-with-license-file',
  'pkg-with-license-md',
  'pkg-with-license-txt'
]

const uppercase = dirs.map((dir) => {
  return function t (cb) {
    const f = path.join(__dirname, '/fixtures/uppercase-license/', dir)

    test(`gets licenses uppercase ${dir}`, (t) => {
      getLicenseInfo(f, (err, res) => {
        if (err) throw err

        tap.ok(res.licenseFile)
        cb(null)
        t.end()
      })
    })
  }
})

const lowercase = dirs.map((dir) => {
  return function t (cb) {
    const f = path.join(__dirname, '/fixtures/lowercase-license/', dir)

    test(`gets licenses lowercase ${dir}`, (t) => {
      getLicenseInfo(f, (err, res) => {
        if (err) throw err

        tap.ok(res.licenseFile)
        cb(null)
        t.end()
      })
    })
  }
})

waterfall(uppercase)
waterfall(lowercase)
