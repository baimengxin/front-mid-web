import { createApp } from 'vue'
import './styles/index.scss'

import App from './App.vue'
import router from '@/router'
import { useREM } from '@/utils/flexible'

// 根据屏幕宽度初始化字体大小
useREM()

createApp(App).use(router).mount('#app')
