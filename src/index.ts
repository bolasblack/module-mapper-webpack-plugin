import { Compiler } from 'webpack'

export const pluginName = 'ModuleMapperWebpackPlugin'

export class ModuleMapperWebpackPlugin {
  private replacer: ModuleMapperWebpackPlugin.Replacer

  constructor(options: ModuleMapperWebpackPlugin.ConstructOptions) {
    this.replacer = options.replacer
  }

  apply(compiler: Compiler): void {
    compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
      nmf.hooks.beforeResolve.tapPromise(pluginName, async (data) => {
        if (data) {
          Object.assign(data, await this.replacer(data))
        }
      })
    })
  }
}

export namespace ModuleMapperWebpackPlugin {
  export type RequestInfo = Compiler['hooks']['normalModuleFactory'] extends {
    call(...args: [{ hooks: { beforeResolve: infer R } }]): any
  }
    ? R extends {
        tapPromise(options: any, fn: (...args: [infer S]) => any): void
      }
      ? S
      : never
    : never

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
): string {
  const parts = request.split('?')
  return [replacer(parts[0]), ...parts.slice(1)].join('?')
}
