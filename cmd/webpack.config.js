
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();
const { directoryConfig } = require('./config');
const { name, env, app, version } = require('./cmdParams.json');

output.info('webpack.config.js=>', `即将开始【app: ${name} 】【环境: ${env}】打包`);

let entry = {};
const {
    rootDirectoryPath,
    excludeDirectory,
    includeExtName,
    rootOutputPath,
} = directoryConfig;
const rootDirectoryAbsolutePath = path.join(cmdPath, rootDirectoryPath);
;(function walk(directory) {
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        const fileStat = fs.statSync(fullPath);
        const fileExtName = path.extname(fullPath);
        const fileDirArr = (path.join(directory, path.basename(fullPath, fileExtName))).replace(rootDirectoryAbsolutePath, '').replace(/\\/g, '/').split('\/');
        const fileLastDir = fileDirArr[fileDirArr.length - 1];
        if (fileStat.isFile() && includeExtName.indexOf(fileExtName) > -1) {
            fileDirArr.shift();
            entry[Array.from(new Set([...fileDirArr])).join('_')] = `${fullPath}?entry=true`;
        } else if (fileStat.isDirectory() && excludeDirectory.indexOf(fileLastDir) === -1) {
            walk(fullPath);
        }
    });
})(rootDirectoryAbsolutePath);

module.exports = {
    entry,
    output: {
        path: path.join(cmdPath, rootOutputPath, `${app}/${env}/${version}`),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'utils': path.resolve(__dirname, '../src/utils/'),
            'plugins': path.resolve(__dirname, '../src/plugins/'),
            'components': path.resolve(__dirname, '../src/components/'),
            'api': path.resolve(__dirname, '../src/api/'),
            'extends': path.resolve(__dirname, '../src/api/extends/'),
            'config': path.resolve(__dirname, '../src/config/'),
            'services': path.resolve(__dirname, '../src/services/'),
            'appConfig': path.resolve(__dirname, '../cmd/config/'),
            'text': path.resolve(__dirname, '../src/text/'),
            'url': path.resolve(__dirname, '../src/url/'),
            'mixins': path.resolve(__dirname, '../src/mixins/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js(\?[^?]+)?$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, '../node_modules/wow-weex-ui'),
                    path.resolve(__dirname, '../node_modules/wow-weex-plugin'),
                    path.resolve(__dirname, '../node_modules/wow-cool'),
                    path.resolve(__dirname, '../src'),
                ],
                // exclude: /node_modules/,
            },
            {
                test: /\.(we|vue)(\?[^?]+)?$/,
                loader: 'weex-loader',
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true,
            }
        }),
        new webpack.BannerPlugin({
            banner: '// { "framework": "Vue" }\n',
            raw: true,
            exclude: [],
        }),
    ]
};
