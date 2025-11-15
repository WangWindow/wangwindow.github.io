---
layout: doc
title: 写在前面
description: 介绍博客定位、技术栈和内容规划
date: 2025-11-15
tags:
  - 博客搭建
  - VitePress
  - GitHub Pages
---

# 写在前面

搭这个博客的主要目的：

1. 把平时零散的笔记沉淀下来，方便自己复盘。
2. 记录在 Vue、Vite、工程化相关方向的实践经验。
3. 让 GitHub Pages 成为一个可持续迭代的「技术档案馆」。

## 技术栈一览

- 构建：基于 [VitePress](https://vitepress.dev/) 的静态站点
- 运行环境：GitHub Pages
- 包管理：Bun / npm
- 部署：GitHub Actions 自动构建 & 发布

后续计划按主题来整理，比如：

- VitePress 主题与自定义组件
- Vue 3 + Vite 的实践踩坑
- 日常开发中的小工具与工作流

## 如何本地预览

```bash
bun install
bun run docs:dev
```

访问 `http://localhost:5173` 即可预览站点。

## 后记

如果你在使用类似的技术栈搭建博客，希望这里的配置与实践可以给你一个可直接复用的参考模版。
