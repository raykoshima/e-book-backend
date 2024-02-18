const express = require("express")
const router = express.Router()
const authenticate = require('../middlewares/authorization')
const cartControll = require('../controllers/cart-controller')

router.get("/my",authenticate,cartControll.getCartByUser)
router.post("/add/:id",authenticate,cartControll.userAddCart)
router.delete("/delete/:id",authenticate,cartControll.userDeleteCart)


module.exports = router