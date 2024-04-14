import { createApp } from 'vue'
import './styles/index.scss'

import App from './App.vue'
import router from '@/router'

// 注册  vite-plugin-svg-icons
import 'virtual:svg-icons-register'
import { useREM } from '@/utils/flexible'

// 通用组件
import mLibs from '@/libs'

// 根据屏幕宽度初始化字体大小
useREM()

createApp(App).use(router).use(mLibs).mount('#app')
