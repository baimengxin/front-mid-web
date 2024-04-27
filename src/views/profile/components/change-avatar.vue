<script>
const EMITS_CLOSE = 'close'

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store'
import { getOSSClient } from '@/utils/sts'
import { message } from '@/libs'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE])
const loading = ref(false)
// 图片的实例
const imgTarget = ref(null)
let cropper
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imgTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

// 关闭的回调事件
const close = () => {
  emits(EMITS_CLOSE)
}

// 确定按钮的回调事件
const onConfirmClick = () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    putObjectToOSS(blob)
  })
}

// 进行 oss 上传
let ossClient = null
const store = useUserStore()

const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }

  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`

    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file)
  } catch (error) {
    message('error', error)
  }
}
</script>

<template>
  <div class="overflow-auto flex flex-col items-center">
    <!-- 移动端 ×号 -->
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img ref="imgTarget" :src="blob" />

    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>

<style lang="scss" scoped></style>
