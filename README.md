[![Build Status](https://travis-ci.org/robertkowalski/get-license-npm.svg?branch=master)](https://travis-ci.org/robertkowalski/get-license-npm)

# get-license-npm

Tries to find a license file.
If no license file given, tries to get license information from the
`package.json`.

Adds repository url and path (for manual checks).

## API

### getLicense(pathToNodeModule, [optionalCallback])

returns a Promise which is resolved. If an oldschool callback is
provided, the callback is called.


#### Example:

```js
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
```

## Contributing

`get-license-npm` is an OPEN Open Source Project. This means that:

  Individuals making significant and valuable contributions are given commit-
  access to the project to contribute as they see fit. This project is more like
  an open wiki than a standard guarded open source project.

More infos in [CONTRIBUTING.md](https://github.com/robertkowalski/get-license-npm/blob/master/CONTRIBUTING.md)
