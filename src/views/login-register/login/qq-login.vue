<script>
// QQ 登录的 URL
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
</script>

<script setup>
import { onMounted } from 'vue'
// import { isMobileTerminal } from '@/utils/flexible'
import brodacast from './utils/brodacast'
import { oauthLogin } from './utils/oauth'
import { LOGIN_TYPE_QQ } from '@/constants'

// qq 登录挂起
onMounted(() => {
  QC.Login(
    {
      btnId: 'qqLoginBtn' // 插入按钮的节点 id
    },
    // 登录成功之后的回调，但是需要注意，这个回调只会在《登录回调页面中被执行》
    // 登录存在缓存，登录成功一次之后，下次进入会自动重新登录（即：触发该方法，所以我们应该在离开登录页面时，注销登录）
    (data, opts) => {
      console.log('qq登录成功')
      console.log(data)

      // 注销登录，否则在后续登录中会直接触发该回调
      QC.Login.signOut()

      // 2. 获取当前用户唯一标识，作为判断用户是否已注册的依据
      const accessToken = /access_token=((.*))&expires_in/.exec(
        window.location.hash
      )

      // 3. 拼接请求对象
      const oauthObj = {
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2,
        accessToken
      }
      console.log(oauthObj)

      // 4. 完成跨页面传输
      brodacast.send(oauthObj)

      // 5. 在 PC 端下，关闭第三方窗口
      window.close()
    }
  )
})

/**
 * 登录按钮事件
 */
const onQQLogin = () => {
  openQQWindow()
}

/**
 * 处理 QQ 登录视窗
 */

const openQQWindow = () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )

  // 打开视窗之后开始等待
  brodacast.wait().then(async (oauthObj) => {
    // 登录成功,关闭通知
    brodacast.clear()

    // 执行登录操作
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
    console.log(oauthObj)
  })
}
</script>

<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<style lang="scss" scoped></style>
