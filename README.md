# .

## 依赖项

- `tailwindcss`

- `@daysnap/utils`

- `motion` 动画库

[官网](https://motion.dev/docs/react-quick-start)

- `shadcn/ui` UI

[官网](https://ui.shadcn.com/)
[中文官网](https://www.shadcn.com.cn/)

```sh
# 初始化
npx shadcn@latest init

# 添加组件
npx shadcn@latest add button
```

- `next-themes` 主题切换

- `clsx`

- `next-intl` 国际化

[官网](https://next-intl.dev/)

- `lucide-react` ICON

- `@next/bundle-analyzer`

- `copy-to-clipboard` 复制粘贴

- `@bprogress/next`

[官网](https://bprogress.vercel.app/)

- `prettier-plugin-tailwindcss` Tailwind CSS 建议的排序顺序


## 问题

### App Router 没法监听路由点击，导致没法增加顶部进度条

问题参考：

- https://github.com/vercel/next.js/issues/46173
- https://stackoverflow.com/questions/76645648/how-to-build-a-progressbar-in-nextjs-in-the-new-app-router

解决：

- https://www.npmjs.com/package/next-nprogress-bar
- https://www.ewbang.com/community/article/details/999943515.html