import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'WangWindow 的博客',
  description: '记录前端、Vue 和工程化实践的个人博客',
  titleTemplate: ':title | WangWindow Blog',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/intro-to-blog' },
      { text: 'Playground', link: '/posts/vitepress-vue-playground' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '指南',
          items: [
            { text: '写在前面', link: '/posts/intro-to-blog' },
          ]
        },
        {
          text: '实践笔记',
          items: [
            { text: 'VitePress + Vue Playground', link: '/posts/vitepress-vue-playground' },
          ]
        }
      ],
      '/': [
        {
          text: '示例',
          items: [
            { text: 'Markdown 示例', link: '/markdown-examples' },
            { text: 'API 示例', link: '/api-examples' },
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本页大纲'
    },

    lastUpdatedText: '最后更新于',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WangWindow/wangwindow.github.io' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2025-present WangWindow'
    }
  }
})
