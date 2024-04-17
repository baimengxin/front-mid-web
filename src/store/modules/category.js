import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categoryData = ref(CATEGORY_NOMAR_DATA)

    /**
     * 获取分类列表数据
     * */
    const loadCategoryFn = async () => {
      const { categorys } = await getCategory()
      categoryData.value = [ALL_CATEGORY_ITEM, ...categorys]
    }
    return { categoryData, loadCategoryFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
