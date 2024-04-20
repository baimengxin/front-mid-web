import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 历史记录数据
    const historys = ref([])

    // 新增历史数据
    const addHistoryFn = (newHistory) => {
      // 1. 不可出现重复的记录
      const isFindIndex = historys.value.findIndex(
        (item) => item === newHistory
      )

      // 2. 如果出现重复的，则删除之前的数据
      if (isFindIndex !== -1) {
        historys.value.splice(isFindIndex, 1)
      }

      // 3. 新增的历史记录位于头部
      historys.value.unshift(newHistory)
    }

    // 删除单个数据
    const deleteHistoryFn = (index) => {
      historys.value.splice(index, 1)
    }

    // 全部删除
    const deleteAllHistoryFn = () => {
      historys.value = []
    }

    return { historys, addHistoryFn, deleteHistoryFn, deleteAllHistoryFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
