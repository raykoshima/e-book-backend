const e = require("express");
const prisma = require("../config/prisma");

exports.changeTopUpStatus = async (req,res,next) => {
    const { id } = req.params
    const { status } = req.body
    let wallet = 0
    try {
        if(status !== "PAID" && status !== "CANCEL"){
            throw new Error(`Please use right status`)
        }
        const rs = await prisma.topup.findFirstOrThrow({
            where : {
                id : Number(id)
            }
        }).catch(()=>{ throw new Error(`topup not found`)})
        const oldwallet = await prisma.user.findFirst({
            where : {
                id : rs.UserID
            }
        })
        // console.log(`old wallet amount of ${oldwallet.Email} is ${oldwallet.Wallet}`)
        
        const update = await prisma.topup.update({
            where : {
                id : Number(id)
            },
            data : {
                Status : status
            }
        })
        if(status === rs.Status){
            return res.status(409).json({message : `Status of this topup is already ${status}`})
        }
        if(status === "CANCEL" && rs.Status === "PENDING"){
            return res.status(400).json(`They have to paid first to cancel`)
        }

        if(status === "PAID"){
            wallet = oldwallet.Wallet + rs.Amount
        }
        if(status === "CANCEL"){
            wallet = oldwallet.Wallet - rs.Amount
        }
        await prisma.user.update({
            where : {
                id : rs.UserID
            },
            data : {
                Wallet : wallet
            }
        })
        res.json({message : `Change Status to ${status} and UPDATE wallet`})
    } catch (err) {
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

