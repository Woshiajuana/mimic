
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const { directoryConfig, applicationConfig } = require('./config');
const cmdPath = process.cwd();
const { rootOutputPath } = directoryConfig;
const oss = require('ali-oss');

const Handle = (options, data, next) => {
    try {
        let {
            params,
        } = options;
        if (!params)
            throw '未指定设置发布参数';
        output.success('oss.cmd=>', `指定发布参数【${params}】`);
        const {
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
        } = params = ((params) => {
            let objParams = {};
            params.split('::').forEach((param) => {
                let [key, value] = param.split('=');
                if (key, value)
                    objParams[key] = value;
            });
            return objParams;
        })(params);

    } catch (e) {
        output.error('oss.cmd=>', `md5计算错误：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-o', '--oss'],
};

module.exports = Handle;
