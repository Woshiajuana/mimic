
import fs_extra from 'fs-extra'
import path from 'path'
import baseConfig from './config/base.config'
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
    let ipConfig = require('./config/ip.config').default;
    let appConfig = require('./config/app.config').default;
    let base = baseConfig[env] || `http://${ipConfig}:32580/dist/${env}`;
    let outTree = Object.assign({
        app: 'app',
        base,
        version: '0.0.1',
        entry: 'app',
        resource: {},
    }, appConfig);
    let oldOutTree = Object.assign({
        app: 'app',
        base,
        version: '0.0.1',
        entry: 'app',
        resource: {},
    }, appConfig);
    log(`设置APP入口文件为：${outTree.entry}`);
    log(`设置APP页面JS基础地址为：${outTree.base}`);
    log(`即将遍历views目录下APP所有页面`);
    (function findDirBuildTree(dir) {
        dir = dir || '.';
        let directory = path.join(__dirname, './../src/views', dir);
        fs_extra.readdirSync(directory).forEach((file) => {
            let full_path = path.join(directory, file);
            let stat = fs_extra.statSync(full_path);
            let ext_name = path.extname(full_path);
            let dir_arr = full_path.substring(full_path.indexOf('views') + 6).replace(/\\/g, '/').split('\/');
            let last_dir = dir_arr[dir_arr.length - 1];
            if (stat.isFile() && (ext_name === '.vue' || ext_name === '.js')) {
                let file_path = path.join(dir, path.basename(file, ext_name));
                let file_path_arr = file_path.replace(/\\/g, '/').split('\/');
                file_path_arr = unique(file_path_arr);
                let name = file_path_arr.join('_');
                if (ext_name === '.vue') {
                    outTree.resource[name] ? outTree.resource[name].src = name + '.js' : outTree.resource[name] = { src: name + '.js' };
                    oldOutTree.resource[name] = name + '.js';
                } else if (file_path.indexOf('.meta.json') > -1) {
                    let json = require( path.join(__dirname, './../src/views', file_path + '.js')).default;
                    name = name.split('.')[0];
                    name = name.split('_');
                    name = unique(name);
                    name = name.join('_');
                    outTree.resource[name] ? outTree.resource[name].meta = json : outTree.resource[name] = { meta: json };
                }
            } else if (['components'].indexOf(last_dir) === -1 && stat.isDirectory()) {
                let sub_dir = path.join(dir, file);
                findDirBuildTree(sub_dir);
            }
        })
    })();
    log(`即将生成tree.json`);
    fs_extra.createWriteStream('tree.json',{defaultEncoding:'utf8'});
    fs_extra.createWriteStream('old_tree.json',{defaultEncoding:'utf8'});
    fs_extra.writeFileSync('./tree.json', JSON.stringify(outTree, null, 4));
    fs_extra.writeFileSync('./old_tree.json', JSON.stringify(oldOutTree, null, 4));
    fs_extra.ensureDirSync(`./dist/${env}`);
    fs_extra.writeFileSync(`./dist/${env}/tree.json`, JSON.stringify(outTree, null, 4));
    fs_extra.writeFileSync(`./dist/${env}/old_tree.json`, JSON.stringify(oldOutTree, null, 4));
    return resolve(env);
});

// 参数 options
Handle.options = {
    cmd: ['-t', '--tree'],
};

// 成功
Handle.success = (res, next) => {
    log(`生成tree.json操作完成`);
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;

function unique(array){
    let n = [];
    for(let i = 0; i < array.length; i++){
        if (n.indexOf(array[i]) === -1 && array[i] !== 'index') n.push(array[i]);
    }
    return n;
}
