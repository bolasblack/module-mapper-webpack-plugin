import * as path from 'path'
import * as webpack from 'webpack'
import { ModuleMapperWebpackPlugin, replacePath } from './index'

describe('ModuleMapperWebpackPlugin', () => {
  it('works', async () => {
    const stats = await runWebpack({
      replacer(d) {
        if (
          d.context.includes('__fixtures') &&
          !/\/file\.overlay\b/.test(d.contextInfo.issuer) &&
          /\/file\b/.test(d.request)
        ) {
          return {
            request: replacePath(
              reqPath =>
                path.resolve(
                  path.resolve(d.context, reqPath),
                  '../file.overlay.js',
                ),
              d.request,
            ),
          }
        }

        return d
      },
    })

    expect(stats.modules != null).toBe(true)
    expect(stats.modules!.filter(isFileJs)).toHaveLength(4)
  })
})

function isFileJs(m: webpack.Stats.FnModules) {
  return /\/file\.js\b/.test(m.name) && /\/file\.overlay\.js\b/.test(m.issuer!)
}

function runWebpack(options: ModuleMapperWebpackPlugin.ConstructOptions) {
  return new Promise<webpack.Stats.ToJsonOutput>((resolve, reject) => {
    webpack(
      {
        mode: 'none',
        entry: './index.js',
        output: {
          filename: 'null',
          path: '/dev',
        },
        context: path.resolve(__dirname, './__fixtures/'),
        plugins: [new ModuleMapperWebpackPlugin(options)],
      },
      (err, stats) => {
        if (err) {
          reject(err)
          return
        }

        if (stats.hasErrors()) {
          reject(new Error(stats.toString()))
          return
        }

        resolve(stats.toJson())
      },
    )
  })
}
