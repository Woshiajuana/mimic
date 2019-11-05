
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();
const OSS = require('ali-oss');

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
        output.success('region=>', region);
        output.success('accessKeyId=>', accessKeyId);
        output.success('accessKeySecret=>', accessKeySecret);
        output.success('bucket=>', bucket);
        let client = new OSS({
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
        });
        // (async () => {
            client.put('test.txt', path.join(cmdPath, 'cmd/cmd.js')).then(() => {
                console.log('成功')

            }).catch(() => {
                console.log('失败')
            });
            // await client.put('test.txt', 'xxx');
            // output.success('oss.cmd=>', `上次成功`);
        // })();
    } catch (e) {
        output.error('oss.cmd=>', `上传失败：${e}`);
    } finally {
        next();
    }
};

// let client = new OSS({
//     region: '<Your region>',
//     accessKeyId: '<Your AccessKeyId>',
//     accessKeySecret: '<Your AccessKeySecret>',
//     bucket: '<Your bucket name>',
// });
//
// async function put () {
//     try {
//         let result = await client.put('object-name', 'local-file');
//         console.log(result);
//     } catch (e) {
//         console.log(e);
//     }
// }

// 参数 options
Handle.options = {
    cmd: ['-o', '--oss'],
};

module.exports = Handle;
