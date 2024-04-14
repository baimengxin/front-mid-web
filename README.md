# 项目简介

前中台的解决方案

技术栈为：vue3 + vue-router + pinia + tailwindcss

# 项目结构

```shell
├── src
│   ├── App.vue // 项目根组件，一级路由出口
│   ├── api // 接口请求
│   ├── assets // 静态资源
│   │   ├── icons // svg icon 图标
│   │   ├── images // image 图标。比如:xxx.png
│   │   └── logo.png // logo
│   ├── components // 通用的业务组件。比如：一个组件在多个页面中使用到
│   ├── constants // 常量
│   ├── directives // 自定义指令
│   ├── libs // 通用组件，可用于构建中台物料库或通用组件库
│   ├── main.js // 入口文件
│   ├── permission.js // 页面权限控制中心
│   ├── router // 路由
│   │   ├── index.js // 路由处理中心
│   │   └── modules // 路由模块
│   │       ├── mobile-routes.js // 移动端路由
│   │       └── pc-routes.js // PC 端路由
│   ├── store // 全局状态
│   │   ├── getters.js // 全局状态访问处理
│   │   ├── index.js // 全局状态中心
│   │   └── modules // 状态子模块
│   ├── styles // 全局样式
│   │   └── index.scss // 全局通用的样式处理
│   ├── utils // 工具模块
│   ├── vendor // 外部供应资源。比如：人类行为认证
│   └── views // 页面组件。与 components 的区别在于：此处组件对应路由表，以页面的形式展示
│       └── layout // 用于 PC 端，分割一级路由和二级路由
│           ├── components // 该页面组件下的业务组件
│           └── index.vue // layout 组件
├── tailwind.config.js // wailwind css 配置文件，与 src 平级
└── vite.config.js // vite 配置文件，与 src 平级
```

# 项目创建

## 1. vite 创建项目

```shell
pnpm create vite
```

## 2. tailwindcss

1. 安装 Tailwind CSS

```shell
pnpm install -D tailwindcss postcss autoprefixer

# 生成 tailwind.config.js 和 postcss.config.js 文件
npx tailwindcss init -p
```

2. 配置模板文件的路径

```js
export default {
  // Tailwind 应用范围
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

3. 将加载 Tailwind 的指令添加到你的 CSS 文件中

```css
// 导入 tailwind 的基础指令组件
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 导入 css 样式
   在 `mian.js` 中导入样式

```js
import './styles/index.scss'
```

## 3. sass

```shell
pnpm install -D sass
```

## 4. vue-router

```shell
pnpm install --save vue-router
```

## 5. pinia

```shell
pnpm install --save pinia
```

## 6. vueuse

```shell
pnpm i @vueuse/core
```

## 7. axios

```shell
pnpm i --save axios
```

## 8. vite-plugin-svg-icons

因为在 vite 中需要配置静态资源的处理
`https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md`

```shell
pnpm install vite-plugin-svg-icons -D
```
