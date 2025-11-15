---
layout: doc
title: VitePress + Vue Playground
description: 在 VitePress 中集成 Vue 组件与交互示例
date: 2025-11-15
tags:
  - Vue
  - VitePress
  - Playground
---

# VitePress + Vue Playground

VitePress 的一个优势是：**它本身就是基于 Vite + Vue 构建的**，因此我们可以非常轻松地在文档中直接使用 Vue 组件。

下面通过一个简单的计数器和主题切换小组件，演示如何在博客中加入交互内容。

## 基础用法：直接在 Markdown 中写 Vue

在 VitePress 的 Markdown 文件中，你可以直接写：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">点我：{{ count }}</button>
</template>
```

VitePress 会自动帮你处理打包和渲染。

## 使用自定义组件

通常更推荐把可复用的逻辑抽到组件中，然后在 Markdown 里直接引用。

下面这个组件 `DemoCounter` 定义在 `docs/.vitepress/theme/components/DemoCounter.vue` 中：

<!-- 注意：组件文件稍后会在主题目录中创建 -->

<DemoCounter />

你可以尝试点击按钮，体验一下动态交互。

## 使用全局注册的 Vue 组件

我们也可以在 `.vitepress/theme/index.ts` 中通过 `enhanceApp` 全局注册组件，这样在任意 Markdown 中都能使用。

例如，一个展示当前时间的组件 `NowTime`：

<NowTime />

## 小结

- VitePress 默认支持在 Markdown 中写 Vue 单文件组件风格的代码；
- 也支持通过主题扩展的方式注册全局组件；
- 可以用来做交互式 Demo、Playground、API 可视化等。

接下来，我们会在主题里真正实现上面用到的 `DemoCounter` 和 `NowTime` 组件。
