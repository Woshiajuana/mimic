
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    params = params ? params.toLocaleLowerCase() : '';
    console.log(params);
    try {
        if (!params)
            throw '未指定设置发布参数';
        // 格式化参数
        const {
            app,
            env,
        } = params = ((params) => {
            let objParams = {};
            params.split('::').forEach((param) => {
                let [key, value] = param.split('=');
                if (key, value)
                    objParams[key] = value;
            });
            return objParams;
        })(params);
        if (!app)
            throw '未指定发布app';
        if (!env)
            throw '未指定发布env';

        const {
            applicationConfig,
        } = require('./config');
        const application = applicationConfig[app];
        if (!application)
            throw `applicationConfig无【${app}】应用配置`;
        const {
            release,
        } = application;
        const releaseEnvs = release[env];
        if (!releaseEnvs)
            throw `【${app}】应用配置无【${env}】环境配置`;

        // 读写配置
        ((releaseEnvs) => {
            for (let key in releaseEnvs) {
                const relEnv = releaseEnvs[key];
                if (typeof relEnv === 'object') {
                    let {
                        path,
                        filename,
                        config,
                    } = relEnv;
                    if (path && filename && config) {
                        if (typeof config !== 'string')
                            config = JSON.stringify(config);
                        fs.ensureDirSync(path);
                        fs.writeFileSync(`${path}/${filename}`, `import env from ${JSON.stringify(config)}`);
                    }
                }
            }
        })(releaseEnvs);



    } catch (e) {
        output.error('release.cmd=>', `发布app错误：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-r', '--release'],
};

module.exports = Handle;
