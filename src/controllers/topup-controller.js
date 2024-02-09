const e = require("express");
const prisma = require("../config/prisma");

exports.createTopupID = async (req,res,next) => {
    const { amount } = req.body
    try{
        if(!(amount)){
            throw new Error(`Please Fill Input`)
        }
        const topupData = {
            "Amount" : amount,
            "UserID" : req.user.id
        }
        const rs = await prisma.topup.create({
            data : topupData
        })
        res.json({ rs })
    }
    catch(err){
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getTopupStatus = async (req,res,next) => {
    const { id } = req.params
    try {
        if(!(id)){
            return res.status(404).json({message:"not found"})
        }
        const rs = await prisma.topup.findFirstOrThrow({
            where: {
                id : Number(id),
                UserID : Number(req.user.id)
            }
        })
        res.json({id : rs.id , Status : rs.Status})
    } catch (err) {
        next(err)
    }
}