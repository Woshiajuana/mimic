/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  vueIndentScriptAndStyle: true,

  // https://www.npmjs.com/package/prettier-plugin-tailwindcss
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  tailwindFunctions: ['clsx', 'twMerge', 'cn', 'tw'],
}
