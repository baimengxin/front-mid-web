/**
 * 全局注册指令
 */
export default {
  async install(app) {
    // 获取 module 文件下的任意 js 文件
    const directives = import.meta.glob('./module/*.js')

    for (const [key, value] of Object.entries(directives)) {
      const d = await value()
      // 拼接
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      // 注册指令
      app.directive(name, d.default)
    }
  }
}
