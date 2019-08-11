import { Plugin, Compiler, compilation } from 'webpack'

export const pluginName = 'ModuleMapperWebpackPlugin'

// https://github.com/webpack/webpack/blob/0beeb7e30a9429b74b2ab0b1e861f55eba90fdd9/lib/Compilation.js#L66
interface ModuleFactoryCreateDataContextInfo {
  issuer: string
  compiler: string
}

// https://github.com/webpack/webpack/blob/5c7996d336ae066043690dc056ac3d7fcb61ca62/lib/NormalModuleFactory.js#L381
// https://github.com/webpack/webpack/blob/0beeb7e30a9429b74b2ab0b1e861f55eba90fdd9/lib/Compilation.js#L72
interface BeforeResolveData {
  contextInfo: ModuleFactoryCreateDataContextInfo
  resolveOptions: any
  context: string
  dependencies: compilation.Dependency[]
  request: string
}

export class ModuleMapperWebpackPlugin implements Plugin {
  private replacer: ModuleMapperWebpackPlugin.Replacer

  constructor(options: ModuleMapperWebpackPlugin.ConstructOptions) {
    this.replacer = options.replacer
  }

  apply(compiler: Compiler) {
    compiler.hooks.normalModuleFactory.tap(pluginName, nmf => {
      nmf.hooks.beforeResolve.tapPromise(
        pluginName,
        async (data: BeforeResolveData) => {
          /* istanbul ignore else */
          if (data) {
            Object.assign(data, await this.replacer(data))
          }

          return data
        },
      )
    })
  }
}

export namespace ModuleMapperWebpackPlugin {
  export type RequestInfo = BeforeResolveData

  export type Replacer = (
    data: RequestInfo,
  ) => Partial<RequestInfo> | Promise<Partial<RequestInfo>>

  export interface ConstructOptions {
    replacer: Replacer
  }
}

export function replacePath(
  replacer: (path: string) => string,
  request: string,
) {
  const parts = request.split('?')
  return [replacer(parts[0]), ...parts.slice(1)].join('?')
}
