import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { useCategoryStore } from '@/store'
import { isMobileTerminal } from '@/utils/flexible'

export const useAppStore = defineStore('app', () => {
  // 当前选中的分类
  const currentCategory = ref(ALL_CATEGORY_ITEM)
  // 搜索文本
  const searchText = ref('')
  // 路由跳转类型
  const routerType = ref('none')

  // 修改 路由跳转类型
  const changeRouterTypeFn = (newType) => {
    routerType.value = newType
  }

  const getRouterTypeFn = computed(() => {
    if (!isMobileTerminal.value) {
      return (routerType.value = 'none')
    }
    console.log('执行了', routerType.value)
    return routerType.value
  })

  // 切换选中分类
  const changeCurrentCategoryFn = (newCategory) => {
    currentCategory.value = newCategory
  }

  const currentCategoryIndex = computed(() => {
    const store = useCategoryStore()

    return store.categoryData.findIndex(
      (item) => item.id === currentCategory.value.id
    )
  })

  // 修改搜索文本
  const changeSearchTextFn = (newText) => {
    searchText.value = newText
  }

  return {
    currentCategory,
    searchText,
    routerType,
    getRouterTypeFn,
    changeRouterTypeFn,
    changeCurrentCategoryFn,
    currentCategoryIndex,
    changeSearchTextFn
  }
})
