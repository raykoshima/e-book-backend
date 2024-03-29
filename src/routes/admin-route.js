const express = require("express");
const router = express.Router();
const AdminAuthenticate = require('../middlewares/adminauth')
const adminControl = require("../controllers/admin-controller")

router.get("/",AdminAuthenticate,(req,res,next)=>{
    console.log(req.user)
    res.json({message:"welcome admin"})
})
router.patch("/topup/update/:id",AdminAuthenticate,adminControl.changeTopUpStatus)
router.patch("/product/update/:id",AdminAuthenticate,adminControl.updateProduct)
router.post("/product/new",AdminAuthenticate,adminControl.createNewProduct)
router.delete("/product/delete/:id",AdminAuthenticate,adminControl.deleteProduct)

module.exports = router;
