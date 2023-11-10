const express = require("express");
const router = express.Router();
const {runProgram} = require("../controllers/Editor.js");
const { auth, isStudent } = require("../middlewares/auth");
router.post("/run", runProgram);
// router.post("/run", auth, isStudent, runProgram);
module.exports = router;