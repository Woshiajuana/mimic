
// 整个打包项目的配置文件 该配置只在打包的时候参与作用 不会打包进入实际业务代码

// 获取 ip
const ip = (() => {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0; i < iface.length; i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
})();

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
        app: 'wow',
        // app名称
        name: '码可',
        // 版本
        version: '0.0.0',
        // 入口文件
        entry: 'mk_app',
        // 发布
        release: {
            // 本地
            bd: {
                // app名称
                name: '码可',
                // 版本
                version: '0.0.1',
                // 入口文件
                entry: '',
                // 基础
                base: '',
                // 环境
                env: {
                    path: '',
                    filename: '',
                    config: {

                    },
                },
                // 皮肤
                skin: {
                    path: '',
                    filename: '',
                    config: {

                    },
                },
            },
        },
    },
};

module.exports = {
    directoryConfig,
    applicationConfig,
};
