import fs from 'fs'

const { exec } = require("child_process");

const generateImage = async (code,hash) => {

    if (fs.existsSync('data.txt')) {
        exec(`carbon-now data.txt -t ${hash} -l ` + __dirname)
        return;
    }

    return;
}

export default {generateImage}