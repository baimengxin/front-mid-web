import router from '@/router'
import { useUserStore } from '@/store'
import { message } from '@/libs'

/**
 * 处理需登录页面的访问权限
 */
router.beforeEach((to, from) => {
  const store = useUserStore()

  // 无需登录就能访问的页面
  if (!to.meta.user) {
    return
  }

  // 已登录
  if (store.token) {
    return true
  }

  // 未登录，警告然后返回首页
  message('warn', '登录失效，请重新登录!')
  return '/'
})
