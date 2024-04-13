# 项目简介

前中台的解决方案

技术栈为：vue3 + vue-router + pinia + tailwindcss



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
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
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
import "./styles/index.scss";
```



## 3. sass

```shell
pnpm install -D sass
```
