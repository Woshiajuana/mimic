
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const { rootOutputPath } = require('./config').directoryConfig;
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
        parameters,
    } = options;
    try {
        const { app, env, version } = require('./cmdParams.json');
        const { resource } = JSON.parse(fs.readFileSync(path.join(cmdPath, `${app}/${env}/${version}/tree.json`)));

    } catch (e) {
        output.error('md5.cmd.js=>', `md5计算错误：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-m', '--md5'],
};

module.exports = Handle;
