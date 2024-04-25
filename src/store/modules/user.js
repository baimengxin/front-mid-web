import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'

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
      token.value = res.token
      profileFn()
    }

    // 获取用户信息
    const profileFn = async () => {
      const data = await getProfile()
      console.log(data)
      userInfo.value = data
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        } `,
        6000
      )
    }

    return { token, userInfo, loginFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
