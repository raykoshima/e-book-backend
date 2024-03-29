const e = require("express");
const prisma = require("../config/prisma");
exports.getallProduct = async (req,res,next) => {
    try{
        // const ProductData = await prisma.product.findFirst({
        //     where: {
        //         Name:'Product 1'
        //     }
        // })
        const ProductData = await prisma.product.findMany({})
        res.json({ ProductData })
    }
    catch(err){
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getProductByPage = async (req,res,next) => {
    try {
        const { page } = req.params
        const item = page * 10
        const item10 = item - 9
        let productPage
        if(page === 1){
         productPage = await prisma.$queryRaw`SELECT * FROM product WHERE id BETWEEN 1 AND 10`
        }else{
         productPage = await prisma.$queryRaw`SELECT * FROM product WHERE id BETWEEN ${item10} AND ${item}`
        }
        if (productPage.length === 0) {
            return res.status(404).json({ message: "there no data to display" });
        }
        const ProductData = productPage
        res.json({ ProductData })
        
    } catch (err) {
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getProductByID = async (req,res,next) => {
    try{
        const { id } = req.params
        
        // const productData = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${id}`
        const productData = await prisma.product.findFirst({
            where : {
                id : Number(id)
            }
        })
        if (productData.length === 0) {
            return res.status(404).json({ message: "item that your request is not exited" });
        }
        res.json({ productData })
    }
    catch(err){
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.searchProduct = async (req,res,next) => {
    // res.json({ query })
    try {
        const { q } = req.query
        const querytirm = q.trim()
        if(querytirm.length === 0){
            return res.status(405).json({message:"please fill input"})
        }

        // const productData = await prisma.product.findMany({
        //     where:{
        //         Name:{
        //             search:`+${querytirm}`
        //         },
        //         Description:{
        //             search:`+${querytirm}`
        //         }
        //     }
        // })
        const ProductData = await prisma.product.findMany({
            where : {
                OR : [
                    {
                        Name: {
                            contains : querytirm
                        }
                    },
                    {
                        Description: {
                            contains : querytirm
                        }
                    },
                    {
                        Author: {
                            contains : querytirm
                        }
                    }
                ]
            }
        })
        if (ProductData.length === 0) {
            return res.status(404).json({ message: "No match item" });
        }
        
    res.json({ ProductData })
        
    } catch (err) {
        next(err)
    }
}