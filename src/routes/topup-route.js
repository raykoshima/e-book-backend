const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/authorization')
const topupControl = require('../controllers/topup-controller')

router.post("/",authenticate,topupControl.createTopupID)
router.get("/status/:id",authenticate,topupControl.getTopupStatus)
router.get("/me",authenticate,topupControl.getUserTopup)

module.exports = router;
