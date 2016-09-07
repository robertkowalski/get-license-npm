
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
  const path = require('path')
  const p = path.join(__dirname, 'get-license-npm')

  // callback based API
  getLicenseInfo(p, (err, res) => {
    console.log(res)
  })

  // Promise based API
  getLicenseInfo(p)
    .then((res) => {
      console.log(res)
    })

// returns:

{
  "license": "MIT",
  "licenseFile": "/Users/robert/projects/get-license-npm/LICENSE",
  "repo": "https://github.com/robertkowalski/get-license-npm"
}
```
