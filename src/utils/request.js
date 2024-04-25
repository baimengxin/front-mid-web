import axios from 'axios'
import { useUserStore } from '../store/modules/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  const store = useUserStore()
  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  config.headers.icode = 'helloqianduanxunlianying'
  return config // 必须返回配置
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data

    if (success) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    const store = useUserStore()
    // 处理 token 超时
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token 超时，退出登录
      store.logoutFn()
    }

    // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
