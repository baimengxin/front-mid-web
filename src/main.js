import { createApp } from 'vue'
import './styles/index.scss'

import App from './App.vue'
import router from '@/router'
import pinia from '@/store'

// 注册  vite-plugin-svg-icons
import 'virtual:svg-icons-register'
import { useREM } from '@/utils/flexible'
import useTheme from '@/utils/theme'

// 通用组件
import mLibs from '@/libs'
// 自定义指令
import mDirectives from '@/directives'

// 根据屏幕宽度初始化字体大小
useREM()

createApp(App).use(router).use(pinia).use(mLibs).use(mDirectives).mount('#app')

// 初始化主题色 (需要保证 已经注册了 pinia)
useTheme()
