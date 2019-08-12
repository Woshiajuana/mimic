
// 整个打包项目的配置文件 该配置只在打包的时候参与作用 不会打包进入实际业务代码

const cmdPath = process.cwd();
const path = require('path');

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
                    path: path.join(cmdPath, '/src/config'),
                    filename: 'env.config.js',
                    prompt: '本地环境、资源配置',
                    config: {
                        env: '1',
                    },
                },
                // 皮肤
                skin: {
                    path: '',
                    filename: '',
                    prompt: '本地环境、资源配置',
                    config: {
                        skin: '2',
                    },
                },
            },
        },
        // 生成 tree.json 配置
        tree: [
            {
                path: path.join(cmdPath, '.'),
                filename: 'old_tree.json',
                mode: 'old',
            },
            {
                path: path.join(cmdPath, '.'),
                filename: 'tree.json',
                mode: 'new',
            },
        ],
    },
};

module.exports = {
    directoryConfig,
    applicationConfig,
};
