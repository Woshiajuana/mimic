
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();

const

(function (dir) {
    dir = dir || '.';
    const directory = path.join(cmdPath, 'src/views', dir);
    console.log(directory);
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        const fileStat = fs.statSync(fullPath);
        const fileExtName = path.extname(fullPath);
        if (fileStat.isFile() && fileExtName === '.vue') {

        } else if (['components'].indexOf() === -1) {

        }
    });

})();

const webpackConfig = {

};

module.exports = webpackConfig;
