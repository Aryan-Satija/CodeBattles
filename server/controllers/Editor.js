const {generateFile} = require("../generateFile.js");
const {executeCpp} = require("../executeCpp.js") 
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
        const output = await executeCpp(filepath);
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