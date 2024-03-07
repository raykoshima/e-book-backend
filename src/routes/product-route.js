const express = require("express");
const productController = require("../controllers/product-controller");
const AdminAuthenticate = require('../middlewares/adminauth')

const router = express.Router();

router.get("/getall",AdminAuthenticate,productController.getallProduct)
router.get("/",AdminAuthenticate,productController.searchProduct)

router.get("/page/:page",productController.getProductByPage)
router.get("/id/:id",productController.getProductByID)
// router.get("/search",productController.searchProduct)


module.exports = router;
