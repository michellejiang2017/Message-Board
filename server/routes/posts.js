const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let ret = [];
    // Do things to get the data...
    res.status(200).json(ret);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    // Do the same as before
    res.status(200).json({ id });
});

// other routes

module.exports = router;