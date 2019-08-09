
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();
const { directoryConfig } = require('./config');

const { rootDirectoryPath, excludeDirectory, includeExtName, rootOutputPath } = directoryConfig;
let entry = {};

(function (dir) {
    dir = dir || '.';
    const directory = path.join(cmdPath, rootDirectoryPath, dir);
    console.log(directory);
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        const fileStat = fs.statSync(fullPath);
        const fileExtName = path.extname(fullPath);
        if (fileStat.isFile() && includeExtName.indexOf(fileExtName) > -1) {

        } else if (['components'].indexOf() === -1) {

        }
    });

})();

module.exports = {

};
