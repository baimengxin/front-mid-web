import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // 用户信息
    const userInfo = ref({})

    // 注册用户
    const registerFn = async (regForm) => {
      const { password } = regForm
      return await registerUser({
        ...regForm,
        password: password ? md5(password) : ''
      })
    }

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

    // 退出登录
    const logoutFn = () => {
      token.value = ''
      userInfo.value = {}

      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }

    return { token, userInfo, loginFn, logoutFn, registerFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
