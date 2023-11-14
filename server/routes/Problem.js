const express = require("express");
const router = express.Router();
const {createProblem} = require('../controllers/Problem.js');
const {auth, isAdmin} = require('../middlewares/auth.js');
// router.post("/draft", auth, isAdmin, createProblem);
router.post("/draft", createProblem);
module.exports = router;