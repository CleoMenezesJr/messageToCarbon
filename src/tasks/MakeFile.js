import fs from 'fs'

const MakeFile = async (code) => {
    fs.writeFileSync('data.txt', code);
}

export default MakeFile;