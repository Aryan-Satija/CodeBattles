const {exec} = require("child_process");
const fs = require("fs");
const path = require("path");
outputDir = path.join(__dirname, "outputs");
if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, {recursive: true});
}
const executeCpp = async(filepath)=>{
    const jobId = path.basename(filepath).split(".")[0];
    const outputPath = path.join(outputDir, `${jobId}.exe`);
    return new Promise((resolve, reject)=>{
        exec(`g++ ${filepath} -o ${outputPath} && cd ${outputDir} && .\\${jobId}.exe`, 
        (error, stdout, stderr)=>{
            if(error)
                reject({error, stderr});
            if(stderr)
                reject(stderr);
            resolve(stdout);
        });
    })
}
module.exports = {executeCpp};