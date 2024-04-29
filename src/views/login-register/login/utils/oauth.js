import { useUserStore } from '@/store'
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from '@/constants'
import { message } from '@/libs'
import router from '@/router'

/**
 * 第三方登录统一处理方法
 * @param {*} oauthType 登录方式
 * @param {*} oauthData 第三方数据
 */
export const oauthLogin = async (oauthType, oauthData) => {
  const store = useUserStore()
  const code = await store.loginFn({
    loginType: oauthType,
    ...oauthData
  })

  // 返回  204 表示当前用户未注册，此时给用户一个提示，走注册页面
  if (code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
    message('success', `欢迎您 ${oauthData.nickname}，请创建您的账号`, 6000)
    router.push({
      path: '/register',
      query: {
        reqType: oauthType,
        ...oauthData
      }
    })
    return
  }

  // 否则表示用户已注册，直接进入首页
  router.push('/')
}
