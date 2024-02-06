const express = require("express");
const router = express.Router();

router.get("/",authenticate,()=>{})

module.exports = router;
