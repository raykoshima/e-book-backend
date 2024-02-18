const express = require("express")
const router = express.Router()
const authenticate = require('../middlewares/authorization')
const userOrderControl = require("../controllers/user-order-controller")

router.get("/",authenticate,userOrderControl.getUserOrder)
router.post("/new",authenticate,userOrderControl.createOrder)

module.exports = router