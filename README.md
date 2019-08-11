# module-mapper-webpack-plugin [![Build Status](https://travis-ci.com/bolasblack/module-mapper-webpack-plugin.svg?branch=master)](https://travis-ci.com/bolasblack/module-mapper-webpack-plugin) [![Coverage Status](https://coveralls.io/repos/github/bolasblack/module-mapper-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/bolasblack/module-mapper-webpack-plugin?branch=master)

## Usage

```bash
yarn add module-mapper-webpack-plugin -D
```

```js
// webpack.config.ts

import { ModuleReplaceWebpackPlugin, replacePath } from 'module-mapper-webpack-plugin'

export default {
  // ...
  plugins: [
    new ModuleReplaceWebpackPlugin({
      async replacer(requestInfo) {
        // modify requestInfo object directly
        requestInfo.request = 'absolute path or path relative to issuer'

        // or return a new partial requestInfo
        return {
          request: 'absolute path or path relative to issuer',
        }

        // for example:
        if (
          !/\/file\.overlay\b/.test(requestInfo.contextInfo.issuer) &&
          /\/file\b/.test(requestInfo.request)
        ) {
          return {
            request: replacePath(
              reqPath =>
                path.resolve(
                  path.resolve(requestInfo.context, reqPath),
                  '../file.overlay.js',
                ),
              d.request,
            ),
          }
        }
        return requestInfo
      },
    } as ModuleReplaceWebpackPlugin.ConstructOptions)
  ],
}
```

## Development

```bash
yarn build # build code
yarn watch # build and watch code
```
