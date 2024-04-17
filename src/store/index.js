import { createPinia } from 'pinia'
// 1. 引用
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/category'

const pinia = createPinia()

// 2. 添加到 pinia 实例上
pinia.use(piniaPluginPersistedstate)

export default pinia
