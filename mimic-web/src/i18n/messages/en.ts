// eslint-disable-next-line import/no-anonymous-default-export
export default {
  hi: 'Hi！How are you？',

  RootLayout: {
    title: {
      template: 'AJuan',
      default: 'AJuan',
      description: `AJuan's Personal Website and Portfolio`,
    },
  },

  ThemeSwitcher: {
    label: 'Toggle theme',
    light: 'Light Mode',
    dark: 'Dark Mode',
    system: 'Follow System',
  },

  LocaleSwitcher: {
    label: 'Change language',
    locale: '{locale, select, zh {🇨🇳 中文} en {🇺🇸 English} other {Unknown}}',
  },

  HomePage: {},

  PostPage: {
    title: 'Blog',
  },

  ProjectsPage: {
    title: 'Projects',
  },
}
