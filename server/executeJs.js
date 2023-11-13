const {exec} = require("child_process");
const executeJs = async(filepath)=>{
    return await new Promise((resolve, reject)=>{
        exec(`node ${filepath}`, 
        (error, stdout, stderr)=>{
            if(error){
                console.log("error : ", error);
                reject({error, stderr});
            }
            if(stderr){
                console.log("stderr : ", stderr);
                reject(stderr);
            }
            console.log("stdout : ", stdout);
            resolve(stdout);
        });
    })
}
module.exports = {executeJs};