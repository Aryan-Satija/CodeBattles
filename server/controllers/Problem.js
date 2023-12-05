const Problem = require("../models/Problem.js");
exports.createProblem = async(req, res)=>{
    try{
        const {name, description, difficulty, examples, initCode, driverRunCode} = req.body;
        if(!name || !description || !difficulty || !examples || !initCode || !driverRunCode){
            return res.status(400).json({
                success: false,
                message: "ALL THE FIELDS ARE REQUIRED"
            })
        }
        const problem = await Problem.create({name, description, difficulty, examples, initCode, driverRunCode});
        return res.status(200).json({
            success: true,
            problem,
            message: "TASK SUCCESSFULL"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR",
            error: err.message
        })
    }
}
exports.viewProblems = async(req, res)=>{
    try{
        const problems = await Problem.find({});
        return res.status(200).json({
            success: true,
            problems,
            message: "TASK SUCCESSFULL"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR",
            error: err.message
        })
    }
}
exports.solveProblem = async(req, res)=>{
    try{
        const {id} = req.body;
        const problem = await Problem.findById(id);
        return res.status(200).json({
            success: true,
            data: problem
        })
    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}