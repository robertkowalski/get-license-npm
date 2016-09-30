const tap = require('tap')
const test = tap.test

const getLicenseInfo = require('../lib/index.js')

test('invokes callback on module not found error', (t) => {
  const f = '/fooo/bar/baz'

  getLicenseInfo(f, (err, res) => {
    tap.equal(err.code, 'MODULE_NOT_FOUND')

    t.end()
  })
})

test('rejects promise on module not found error', (t) => {
  const f = '/fooo/bar/baz'

  getLicenseInfo(f).then(() => {}).catch((err) => {
    tap.equal(err.code, 'MODULE_NOT_FOUND')

    t.end()
  })
})
