const express = require("express");
const router = express.Router();
const {createProblem, viewProblems, solveProblem} = require('../controllers/Problem.js');
const {auth, isAdmin, isStudent} = require('../middlewares/auth.js');
// router.post("/draft", auth, isAdmin, createProblem);
router.post("/draft", createProblem);
router.get("/view", viewProblems);
router.post("/solve", auth, isStudent, solveProblem);
module.exports = router;