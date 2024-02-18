const e = require("express");
const prisma = require("../config/prisma");

exports.getCartByUser = async(req,res,next) => {
    try {
    const rs = await prisma.cart.findMany({
        where : {
            UserID : Number(req.user.id)
        }
    })
    if(rs.length === 0){
        return res.json({message : "you not have any cart"})
    }
    res.json(rs)
    } catch (err) {
        next(err)
    }
    
}

exports.userAddCart = async (req,res,next) => {
    try {
    const { id } = req.params
    if(isNaN(id)){
        return res.status(400).json({message : "please input id"})
    }
    const checkifexited = await prisma.cart.findFirst({
        where: {
            UserID : Number(req.user.id),
            ProductID : Number(id)
        }
    })
    if(checkifexited){
        return res.json({message : "Cart with tihs product is alerady exited"})
    }
    const data = await prisma.product.findFirst({
        where: {
            id : Number(id)
        }
    })
    if(!data){
        return res.status(404).json({message : "product you request is not found"})
    }
    const rs = await prisma.cart.create({
        data : {
            UserID : Number(req.user.id),
            ProductID : Number(id)
        }
    })
    res.status(201).json({message : "Successfully Create Cart"})
    } catch (err) {
        next(err)
    }
    
}

exports.userDeleteCart = async (req,res,next) => {
    try {
        // id for request is product id to search in cart
        const { id } = req.params
        if(isNaN(id)){
            return res.status(400).json({message : "please input id"})
        }
        const data = await prisma.cart.findFirst({
            where : {
                UserID : Number(req.user.id),
                ProductID : Number(id)
            }
        })
        if(!data){
            return res.status(404).json({message : "product you request is not found"})
        }
        await prisma.cart.delete({
            where : {
                id : Number(data.id)
            }
        })
        res.json({message : "Successfully Delete"})
    } catch (err) {
        next(err)
    }
}