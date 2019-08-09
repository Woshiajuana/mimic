
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();
const { directoryConfig } = require('./config');

let entry = {};
const { rootDirectoryPath, excludeDirectory, includeExtName, rootOutputPath } = directoryConfig;
const rootDirectoryAbsolutePath = path.join(cmdPath, rootDirectoryPath);
(function walk(directory) {
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        const fileStat = fs.statSync(fullPath);
        const fileExtName = path.extname(fullPath);
        const fileDirArr = fullPath.replace(rootDirectoryAbsolutePath, '').replace(/\\/g, '/').split('\/');
        const fileLastDir = fileDirArr[fileDirArr.length - 1];
        if (fileStat.isFile() && includeExtName.indexOf(fileExtName) > -1) {
            console.log('fileDirArr => ', fileDirArr.pop());
            entry[unique(fileDirArr).join('_')] = `${fullPath}?entry=true`;
        } else if (excludeDirectory.indexOf(fileLastDir) === -1) {
            walk(fullPath);
        }
    });

})(rootDirectoryAbsolutePath);

function unique(array){
    let n = [];
    for(let i = 0; i < array.length; i++){
        if (n.indexOf(array[i]) === -1 && array[i] !== 'index') n.push(array[i]);
    }
    return n;
}

console.log(entry);

module.exports = {

};
