// https://vitepress.dev/guide/custom-theme
import { h, type App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoCounter from './components/DemoCounter.vue'
import NowTime from './components/NowTime.vue'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里自定义布局插槽
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('DemoCounter', DemoCounter)
    app.component('NowTime', NowTime)
  }
}

export default theme
