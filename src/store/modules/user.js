import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser } from '@/api/sys'
import md5 from 'md5'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // 用户信息
    const userInfo = ref({})

    // 用户登录请求
    const loginFn = async (loginForm) => {
      const { password } = loginForm
      const res = await loginUser({
        ...loginForm,
        password: password ? md5(password) : ''
      })
      console.log(res)
      token.value = res.token
    }

    return { token, loginFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
