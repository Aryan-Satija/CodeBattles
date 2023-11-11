const {exec} = require("child_process");
const path = require("path");
const executePy = async(filepath)=>{
    return new Promise((resolve, reject)=>{
        exec(`python ${filepath}`, 
        (error, stdout, stderr)=>{
            if(error)
                reject({error, stderr});
            if(stderr)
                reject(stderr);
            resolve(stdout);
        });
    })
}
module.exports = {executePy};