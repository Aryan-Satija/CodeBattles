const fs = require("fs");
const path = require("path");
const dirCodes = path.join(__dirname, "codes");
const {v4:uuid} = require("uuid");
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursove: true});
}
const generateFile = async(file, format)=>{
    try{ 
        const jobId = uuid();
        const filename = `${jobId}.${format}`;
        const filepath = path.join(dirCodes, filename);
        await fs.writeFileSync(filepath, file);
        return filepath;
    } catch(err){
        console.log("error", err);
        console.log("--------", err.message, "---------");
    }
}
module.exports = {generateFile};