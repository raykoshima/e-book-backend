const express = require("express");
const router = express.Router();
const AdminAuthenticate = require('../middlewares/adminauth')
const adminControl = require("../controllers/admin-controller")

router.get("/",AdminAuthenticate,(req,res,next)=>{
    console.log(req.user)
    res.json({message:"welcome admin"})
})
router.patch("/topup/update/:id/",AdminAuthenticate,adminControl.changeTopUpStatus)

module.exports = router;
