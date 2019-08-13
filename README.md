# market

> APP

## Author

> Ajuan <979703986@qq.com>

## 目录结构

```
project
├── cmd                                     // node命令目录
│   ├── webpack.config.js                   // webpack 配置文件
│   ├── cmd.js
│   ├── index.js
│   ├── release.cmd.js                      // node 执行脚本
│   ├── md5.cmd.js                          // node 执行脚本
│   ├── config.js                           // 整体项目配置文件
├── dist                                    // 产出目录 可配置
├── node_modules                            // 依赖包
├── src                                     // 项目目录
│   ├── components                          // 公共组件目录
│   ├── config                              // 项目基本配置
│   ├── plugins                             // 插件目录
│   ├── utils                               // 工具目录
│   ├── services                            // 服务目录
│   ├── views                               // 页面目录
│   │   └── wow
├── static                                  // 静态资源目录
│   ├── images
│   ├── html
│   ├── json
├── mock                                    // mock 数据目录
|   ├── common.tool.js
├── .babelrc                                // babel 配置文件
├── .editorconfig                           // 代码格式文件
├── .gitignore                              // 忽略文件
├── package.json
├── package-lock.json
├── README.md
```

## 操作命令

> npm run serve => 启动一个本地服务

> npm run dev   => 本地打包JS

> npm run test  => 测试打包JS

> npm run build => 生产打包JS

> node cmd -r           [string]    =>  设置发布的环境
> node cmd --release    [string]    =>  设置发布的环境

> node cmd -m                       =>  生成 md5
> node cmd --md5                    =>  生成 md5


### 样式命名

> 小写英文
> 中划线 -

```
<div class="node-demo">

```

### 属性命名

> 小写英文
> 驼峰
> 数组加前缀 arr
> 节点加前缀 nd
> 对象加前缀 obj
> 数字加前缀 num
> 字符加前缀 str
> boolean   is

```
data () {
    return {
    }
}

```

### 方法命名

> 驼峰写法，至少两个单词
> 表用户操作加前缀 handle

```
methods: {
    handleJump() {},
    jumpPage(){},
}

```

