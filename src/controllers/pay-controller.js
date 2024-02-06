const e = require("express");
const prisma = require("../config/prisma");

exports.getPaymentInfo = async (req,res,next) => {
    const { id } = req.params
    try{
        const PaymentData = await prisma.payment.findFirst({
            where : {
                id : id,
                Customer_ID : req.header.userid
            }
        })
        res.json({ PaymentData })
    }
    catch(err){
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
