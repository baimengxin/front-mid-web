/**
 * vite 自动注册组件
 * 1. 使用 vite 的 Glob 导入 功能：该功能可以帮助我们在 文件系统中导入多个模块 import.meta.glob()
 * 2. vue 的 defineAsyncComponent 方法，该方法可以创建一个 按需加载的异步组件
 * */
import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    // 1. 获取当前路径任意文件夹下的 index.vue 文件
    // ('./*/index.vue') 当前文件下的，任意文件下的，index.vue 文件
    const components = import.meta.glob('./*/index.vue')
    // 2. 遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      // 3. 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
