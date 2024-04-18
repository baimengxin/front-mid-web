<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识的 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器 key: 所在列 val: 列高
const columnHeightObj = ref({})
/**
 * 构建记录各列的高度的对象
 * 初始化各列高度的对象，初始列高 为 0
 * */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}

  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度 (不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)
/**
 * 计算容器宽度
 * */
const useContainerWidht = () => {
  // getComputedStyle 会返回一个 CSSStyleDeclaration 对象
  // paddingLeft paddingRight 是字符串类型
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )

  // 容器左边距
  // parseFloat() 转换为 float 浮点数类型，对于包含小数点或者科学计数法表示的数字字符串非常有用
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度 = 实例.offsetWidth - 左右内边距
  // offsetWidth 返回一个元素宽度(不包含外边距)
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  // 如果是 5 列，则存在 4 个列间距
  return (props.column - 1) * props.columnSpacing
})

/**
 * 开始计算
 * */
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidht()

  // 计算列宽 = (容器总宽度 - 列间距合计) / 列数
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
})
</script>

<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
    <template v-if="columnWidth && data.length">
      <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
      <div
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>

    <div v-else>加载中...</div>
  </div>
</template>

<style lang="scss" scoped></style>
