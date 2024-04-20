import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { useCategoryStore } from '@/store'

export const useAppStore = defineStore('app', () => {
  // 当前选中的分类
  const currentCategory = ref(ALL_CATEGORY_ITEM)

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

  return {
    currentCategory,
    changeCurrentCategoryFn,
    currentCategoryIndex
  }
})
