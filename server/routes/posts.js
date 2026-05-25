const express = require("express");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
    let ret = [];
    // Do things to get the data...
    res.status(200).json(ret);
});

module.exports = router;