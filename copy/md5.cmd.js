import crypto from 'crypto'
import fs from 'fs-extra'
import path from 'path'
import _ from 'lodash'
import {
    log
} from 'wow-cmd'

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    let env = params ? params.toLocaleLowerCase() : '';
    let regular = ['bd', 'cs', 'zsc', 'sc'];
    if (!env || regular.indexOf(env) === -1)
        env = require('./config/release.config');
    let tree = fs.readFileSync(path.join(__dirname, `./../dist/${env}/tree.json`));
    tree = JSON.parse(tree);
    _.forEach(tree.resource, (source, key) => {
        const filename = source.src;
        const file = fs.readFileSync(path.join(__dirname, `./../dist/${env}/${filename}`));
        source.md5 = crypto.createHash('md5').update(file).digest('hex');
        log(`${filename}md5值 => ${ source.md5 }`);
    });
    fs.writeFileSync(`./dist/${env}/tree.json`, JSON.stringify(tree, null, 4));
    log('md5计算完成');
    return resolve(env);
});

// 参数 options
Handle.options = {
    cmd: ['-m', '--md5'],
};

// 成功
Handle.success = (res, next) => {
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;
