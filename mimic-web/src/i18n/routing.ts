import { defineRouting } from 'next-intl/routing'

export const locales = ['zh', 'en']

export const defaultLocale = locales[0]

export const routing = defineRouting({
  localePrefix: 'as-needed',

  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
})
