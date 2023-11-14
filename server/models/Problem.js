const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const ProblemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        enum: ["Easy", "Medium", "Hard"]
    },
    examples:{
        type: [String],
    },
    initCode:{
        type: String,
        required: true
    },
    driverRunCode:{
        type:String,
        required: true 
    }
}) 
module.exports = model("Problem", ProblemSchema);