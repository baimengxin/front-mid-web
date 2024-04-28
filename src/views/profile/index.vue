<script setup>
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/store'
import { confirm, message } from '@/libs'
import { putProfile } from '@/api/sys'
import ChangeAvatarVue from './components/change-avatar.vue'

const router = useRouter()
const store = useUserStore()
const appStore = useAppStore()

const user = ref(store.userInfo)
// 按钮的 loading
const loading = ref(false)

// 选择头像
const inputFileTarget = ref(null)
const onAvatarClick = () => {
  inputFileTarget.value.click()
}

// 控制 dialog 的状态
const isDialogVisible = ref(false)
// 选中的图片
const currentBlob = ref('')

// 选中文件的回调
const onSelectImgHandler = () => {
  // 获取选中的文件
  const imgFile = inputFileTarget.value.files[0]
  // 生成 blob 对象
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isDialogVisible.value = true
}

/**
 * 监听 dialog 的关闭
 * */
watch(isDialogVisible, (val) => {
  if (!val) {
    // 当关闭时，重置头像
    inputFileTarget.value.value = null
  }
})

// 移动端后退处理
const onNavbarLeftClick = () => {
  appStore.changeRouterTypeFn('back')
  router.back()
}

// 移动端退出登录
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    store.logoutFn()
  })
}

// 修改个人信息
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(user.value)
  message('success', '用户信息修改成功')
  store.setUserFn(user.value)
  loading.value = false
}
</script>

<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端 -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick"
        >个人资料</m-navbar
      >

      <!-- pc 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>

      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >

          <!-- 头像部分 -->
          <div class="group relative w-[80px] h-[80px]" @click="onAvatarClick">
            <img
              v-lazy
              class="w-full h-full rounded-[50%]"
              :src="store.userInfo.avatar"
            />

            <!-- 遮罩层 -->
            <div
              class="absolute top-0 w-full h-full rounded-[50%] hidden bg-[rgba(0,0,0,.4)] xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>

          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>

        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="user.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>

        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input v-model="user.title" class="w-full" type="text"></m-input>
        </div>

        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input v-model="user.company" class="w-full" type="text"></m-input>
        </div>

        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input v-model="user.homePage" class="w-full" type="text"></m-input>
        </div>

        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="user.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>

        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>

    <!-- pc 端 -->
    <m-dialog v-if="!isMobileTerminal" title="标题" v-model="isDialogVisible">
      <ChangeAvatarVue :blob="currentBlob" @close="isDialogVisible = false" />
    </m-dialog>

    <!-- 移动端 -->
    <m-popup
      v-else
      :class="{ 'h-screen': isDialogVisible }"
      v-model="isDialogVisible"
    >
      <ChangeAvatarVue :blob="currentBlob" @close="isDialogVisible = false" />
    </m-popup>
  </div>
</template>

<style lang="scss" scoped></style>
