const express = require("express");
const {createCollege,getInternDetails} = require("../controllers/collegeController")
const {createIntern} = require('../controllers/internController')

const router = express.Router();

// College routes
router.post('/functionup/colleges',createCollege)
router.get('/functionup/collegeDetails/:collegeName',getInternDetails)

// Intern routes
router.post('/functionup/interns',createIntern)

module.exports = router;