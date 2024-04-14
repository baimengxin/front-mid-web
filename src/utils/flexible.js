import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备，判断依据为屏幕的宽度是否大于指定值（1280）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 初始化 rem 的基准值，最大为 40px
 * */
export const useREM = () => {
  // 定义最大的 font-size
  const MAX_FONT_SIZE = 40

  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 获取 html 标签
    const html = document.querySelector('html')
    // 获取根元素 font-size 标准，屏幕宽度 / 10
    // （以 Iphone 为例 Iphone 6 屏幕宽度为 375，则标准 fontSize 为 37.5）
    let FontSize = window.innerWidth / 10
    FontSize = FontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : FontSize
    // 设置 html 标签的 css 属性
    html.style.fontSize = FontSize + 'px'
  })
}

/**
 * 判断当前是否为移动设备，公司项目使用这个
 */
// export const isMobileTerminal = computed(() => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   )
// })
