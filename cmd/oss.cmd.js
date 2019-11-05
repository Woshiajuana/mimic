
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
            throw '未指定设置上传参数';
        output.success('oss.cmd=>', `指定上传参数【${params}】`);
        let {
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
            config,
        } = params = ((params) => {
            let objParams = {};
            params.split('::').forEach((param) => {
                let [key, value] = param.split('=');
                if (key, value)
                    objParams[key] = value;
            });
            return objParams;
        })(params);

        config = ((c) => {
            let arrConfig = [];
            c.split(',').forEach((item) => {
                let [ entry, output ] = item.split(':');
                arrConfig.push({ entry, output: output || '' });
            });
            return arrConfig;
        })(config);

        let loop, arr = [];
        (loop = (i) => {
            let objDir = config[i];
            if (!objDir) return null;
            let { entry, output } = objDir, run;
            (run = (e, o) => {
                fs.readdirSync(e).forEach((file) => {
                    const fullPath = path.join(e, file);
                    const fileStat = fs.statSync(fullPath);
                    if (fileStat.isFile()) {
                        arr.push({ o: `${o}/${file}`, p: fullPath });
                    } else if (fileStat.isDirectory()) {
                        run(fullPath, `${o}/${file}`);
                    }
                });
            }) (path.join(cmdPath, entry), output);
            loop(++i);
        }) (0);

        let client = new OSS({
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
        });

        (loop = (i) => {
            let objFile = arr[i];
            if (!objFile) return null;
            let { o, p } = objFile;
            client.put(o, p).then((res) => {
                output.success('oss.cmd=>', `文件 ${p} 上传到 ${o} 成功`);
                loop(++i);
            }).catch((err) => {
                throw err;
            });
        }) (0);

    } catch (e) {
        output.error('oss.cmd=>', `上传失败：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-o', '--oss'],
};

module.exports = Handle;
