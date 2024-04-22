import { h, render } from 'vue'
import messageComponent from './index.vue'

/**
 * @param {*} type 类别
 * @param {*} content 文本
 * @param {*} duration 展示时长，默认 3000 毫秒
 * */
export const message = (type, content, duration = 3000) => {
  // 动画结束时的回调
  const onDestroy = () => {
    // 3. 销毁 render
    render(null, document.body)
  }

  // 1. 返回 vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })

  // 2. 渲染 render
  render(vnode, document.body)
}
