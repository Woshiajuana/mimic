
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const { directoryConfig, applicationConfig } = require('./config');
const cmdPath = process.cwd();
const { rootOutputPath } = directoryConfig;

const Handle = (options, data, next) => {
    try {
        const { app, env, version } = require('./cmdParams.json');
        const treeJson = JSON.parse(fs.readFileSync(path.join(cmdPath, 'tree.json')).toString());
        const { tree } = applicationConfig[app];
        for (let key in treeJson.resource) {
            const source = treeJson.resource[key];
            const filename = source.src;
            const filePath = path.join(cmdPath, rootOutputPath, `${app}/${env}/${version}/${filename}`);
            const file = fs.readFileSync(filePath);
            source.md5 = crypto.createHash('md5').update(file).digest('hex');
            output.info('md5.cmd.js=>', `文件【${filename}】的md5值为:【${source.md5}】`);
        }
        tree.forEach((item) => {
            const {
                filename,
                path,
                mode,
            } = item;
            if (mode === 'new') {
                fs.writeFileSync(`${path}/${filename}`, JSON.stringify(treeJson, null, 4));
            }
        });
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
