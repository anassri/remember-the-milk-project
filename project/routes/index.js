const express = require("express");
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.get("/", (req, res) => {
     res.send("Home page");
});

router.get('/projects', (req, res) => {
     res.render('projects-list');
});

module.exports = router;