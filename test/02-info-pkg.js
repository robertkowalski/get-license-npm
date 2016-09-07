const tap = require('tap')
const test = tap.test
const path = require('path')

const getLicenseInfo = require('../lib/index.js')

test('gets license from package json', (t) => {
  const f = path.join(__dirname, '/fixtures/pkg-with-license-in-json')

  getLicenseInfo(f, (err, res) => {
    if (err) throw err

    tap.equal(res.licenseFile, false)
    tap.equal(res.license, 'MIT')

    t.end()
  })
})

test('gets repo from package json', (t) => {
  const f = path.join(__dirname, '/fixtures/pkg-with-license-in-json')

  getLicenseInfo(f, (err, res) => {
    if (err) throw err

    tap.equal(res.licenseFile, false)
    tap.equal(res.repo, 'https://github.com/robertkowalski/get-license-npm')

    t.end()
  })
})

test('nothing provided', (t) => {
  const f = path.join(__dirname, '/fixtures/pkg-no-data')

  getLicenseInfo(f, (err, res) => {
    if (err) throw err

    tap.equal(res.licenseFile, false)
    tap.equal(res.repo, false)

    t.end()
  })
})

test('promise interface', (t) => {
  const f = path.join(__dirname, '/fixtures/pkg-with-license-in-json')

  getLicenseInfo(f)

    .then((res) => {
      tap.equal(res.licenseFile, false)
      tap.equal(res.repo, 'https://github.com/robertkowalski/get-license-npm')

      t.end()
    }, (err) => { throw err })
})
