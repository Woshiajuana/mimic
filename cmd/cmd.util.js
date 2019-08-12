
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();

const read = (file, mode = 'require') => {
    let cmdJson = {};
    try {
        cmdJson = ;
    } catch (e) {
        output.error(`cmd.util=>`, e);
    }
    return mode === 'require'
        ? require(file) : fs.readFileSync(path.join(cmdPath, file));
};

const write = (file, content) => {
    fs.writeFileSync(path.join(cmdPath, file), content);
};


module.exports = {
    read,
    write,
};
