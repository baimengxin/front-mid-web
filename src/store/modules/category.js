import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

export const useCategoryStore = defineStore('category', () => {
  const categoryData = ref([ALL_CATEGORY_ITEM])

  /**
   * 获取分类列表数据
   * */
  const loadCategoryFn = async () => {
    const { categorys } = await getCategory()
    categoryData.value = [ALL_CATEGORY_ITEM, ...categorys]
  }
  return { categoryData, loadCategoryFn }
})
