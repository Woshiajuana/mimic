
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
            params.split('&').forEach((param) => {
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
        const releaseEnv = release[env];
        if (!releaseEnv)
            throw `【${app}】应用配置无【${env}】环境配置`;
        

    } catch (e) {
        output.error('release.cmd=>', `发布app错误：${e}`);
    } finally {
        next();
    }



    // let [env, dir] = params.split(':');
    // if (!env) {
    //     output.warn('release.cmd=>', '未指定设置环境');
    //     return next();
    // }
    // let regular = require('./config').applicationConfig;
    // if (regular.indexOf(env) === -1) {
    //     output.error('release.cmd=>', `环境设置错误，环境为：${env}`);
    //     return next();
    // }
    // try {
    //     output.info('release.cmd=>', `设置环境 => ${env}`);
    //     let content_env = fs.readFileSync(path.join(cmdPath, `src/config/env.${env}.config.js`));
    //     output.info('release.cmd=>', `${env}环境内容如下：\n${content_env}`);
    //     content_env = `import env from './env.${env}.config';\nexport default env;`;
    //     fs.writeFileSync(path.join(cmdPath, 'src/config/env.config.js'), content_env);
    //     output.success('release.cmd=>', `设置环境成功 => ${env}`);
    // } catch (e) {
    //     output.error('release.cmd=>', `设置环境错误：${e}`);
    // } finally {
    //     next();
    // }
};

// 参数 options
Handle.options = {
    cmd: ['-r', '--release'],
};

module.exports = Handle;
