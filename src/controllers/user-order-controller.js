const e = require("express");
const prisma = require("../config/prisma");

exports.getUserOrder = async(req,res,next) => {
    try {
        const rs = await prisma.order.findMany({
            where: {
                UserID: Number(req.user.id)
            }
        })
        if (rs.length === 0) {
            return res.json({ message: "you not have any order" })
        }
        res.json(rs)
    } catch (err) {
        next(err)
    }
}

exports.createOrder = async(req,res,next) => {
    try {
        const { cartid } = req.body
        const data = await prisma.cart.findFirst({
            where : {
                id : Number(cartid),
                paid : 0
            }
        })
        if(!data){
            return res.status(404).json({message : "cart not found"})
        }
        const productdata = await prisma.product.findFirst({
            where : {
                id : Number(data.ProductID)
            }
        })
        const userdata = await prisma.user.findFirst({
            where : {
                id : Number(req.user.id)
            }
        })
        const newwallet = Number(userdata.Wallet) - Number(productdata.Price)
        if(newwallet <= 0){
            return res.json({message : "You not have enough money"});
        }
        const rs = await prisma.order.create({
            data : {
                UpdateAt : new Date(),
                CartID : Number(cartid),
                ProductID : Number(data.ProductID),
                UserID : Number(req.user.id)
            }
        })
        await prisma.user.update({
            where : {
                id : Number(req.user.id)
            },
            data : {
                Wallet : newwallet
            }
        })
        await prisma.cart.update({
            where : {
                id : Number(cartid)
            },
            data : {
                paid : 1
            }
        })
        res.json({message : `You have been bought book name ${productdata.Name}`})
    } catch (err) {
        next(err)
    }
}