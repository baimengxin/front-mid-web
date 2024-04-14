<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '46px'
})

// item 元素的下标
const currentItemIndex = ref(0)

// 存储所有的 item
let elItem = []
// 获取所有的 item 元素
const setItemRef = (el) => {
  if (el) {
    elItem.push(el)
  }
}

// 数据改变，dom未执行时
onBeforeUpdate(() => {
  // 当数据发生改变时，可能会导致 数组的数据增多，所以当数据变化时，设置为空
  elItem = []
})

// 获取 ul 元素，计算偏移量
const ulRef = ref(null)
const { x: ulScrollLeft } = useScroll(ulRef)

watch(currentItemIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = elItem[val].getBoundingClientRect()

  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
})

// item 点击事件
const onItemClick = (index) => {
  currentItemIndex.value = index
  isOpenPopup.value = false
}

// 弹窗状态
const isOpenPopup = ref(false)
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulRef"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡图标 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100 ': currentItemIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>

  <m-popup v-model="isOpenPopup">
    <MenuVue :categorys="data" @onItemClick="onItemClick" />
  </m-popup>
</template>

<style lang="scss" scoped></style>
