
// 整个打包项目的配置文件 该配置只在打包的时候参与作用 不会打包进入实际业务代码

// directory 配置
const directoryConfig = {
    // 根目录遍历
    rootDirectoryPath: '/src/views',
    // 排除遍历的目录
    excludeDirectory: ['components'],
    // 遍历文件的后缀名
    includeExtName: ['.vue'],
    // 输出根目录
    rootOutputPath: '/dist',
};

// App 配置
const applicationConfig = {
    // APPID
    mk: {
        // app名称
        name: '码可',
        // 版本
        version: '',
        // 入口文件
        entry: '',
        // 基础URL
        base: '',
        // 配置
        config: {
            // 本地
            bd: {
                // 基础URL
                base: '',
                // 环境
                env: {

                }
            }
        }
    }
};

module.exports = {
    directoryConfig,
    applicationConfig,
};
