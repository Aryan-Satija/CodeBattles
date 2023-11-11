const {generateFile} = require("../generateFile.js");
const {executeCpp} = require("../executeCpp.js");
const {executePy} = require('../executePy.js'); 
exports.runProgram = async(req, res)=>{
    try{
        const {language="cpp", code} = req.body;
        if(!code){
            return res.status(400).json({
                success: false, 
                message: "Empty Code Body"
            })
        }
        const filepath = await generateFile(code, language);
        let output;
        if(language === "cpp")
            output = await executeCpp(filepath);
        else
            output = await executePy(filepath);
        
        return res.status(200).json({
            success: true, 
            output
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}