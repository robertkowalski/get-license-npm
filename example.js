const getLicenseInfo = require('./')
const modulePath = __dirname

// callback based API
getLicenseInfo(modulePath, (err, res) => {
  if (err) return console.log('OH NOES', err)

  console.log(res)
})

// Promise based API
getLicenseInfo(modulePath)
  .then((res) => {
    console.log(res)
  })
  .catch(err => console.log('OH NOES', err))

// returns:
/*
  {
    "license": "MIT",
    "licenseFile": "/Users/robert/projects/get-license-npm/LICENSE",
    "repo": "https://github.com/robertkowalski/get-license-npm",
    "private": false
  }
*/
