const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/",productController.getallProduct)
router.get("/page/:page",productController.getProductByPage)
router.get("/id/:id",productController.getProductByID)
router.get("/search",productController.searchProduct)

module.exports = router;
