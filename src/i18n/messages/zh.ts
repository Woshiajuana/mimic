// eslint-disable-next-line import/no-anonymous-default-export
export default {
  hi: '嘿！你好吗？',

  RootLayout: {
    title: {
      template: '阿倦',
      default: '阿倦',
      description: '阿倦个人网站、作品集',
    },
  },

  ThemeSwitcher: {
    label: '切换主题',
    light: '浅色模式',
    dark: '深色模式',
    system: '跟随系统',
  },

  LocaleSwitcher: {
    label: '切换语言',
    locale: '{locale, select, zh {🇨🇳 中文} en {🇺🇸 English} other {Unknown}}',
  },

  HomePage: {},

  PostPage: {
    title: '博客',
  },

  ProjectsPage: {
    title: '项目',
  },
}
