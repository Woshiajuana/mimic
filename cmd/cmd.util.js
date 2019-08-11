
const read = () => {
    let cmdJson = {};
    try {
        cmdJson = require('./cmd.json');
    } catch (e) {

    }
    return cmdJson;
};

const write = () => {

};


export default {

}