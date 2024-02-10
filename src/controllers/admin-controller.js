const e = require("express");
const prisma = require("../config/prisma");

exports.changeTopUpStatus = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body
    let wallet = 0
    try {
        if (status !== "PAID" && status !== "CANCEL") {
            throw new Error(`Please use right status`)
        }
        const rs = await prisma.topup.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        }).catch(() => { throw new Error(`topup not found`) })
        const oldwallet = await prisma.user.findFirst({
            where: {
                id: rs.UserID
            }
        })
        // console.log(`old wallet amount of ${oldwallet.Email} is ${oldwallet.Wallet}`)

        const update = await prisma.topup.update({
            where: {
                id: Number(id)
            },
            data: {
                Status: status
            }
        })
        if (status === rs.Status) {
            return res.status(409).json({ message: `Status of this topup is already ${status}` })
        }
        if (status === "CANCEL" && rs.Status === "PENDING") {
            return res.status(400).json(`They have to paid first to cancel`)
        }

        if (status === "PAID") {
            wallet = oldwallet.Wallet + rs.Amount
        }
        if (status === "CANCEL") {
            wallet = oldwallet.Wallet - rs.Amount
        }
        await prisma.user.update({
            where: {
                id: rs.UserID
            },
            data: {
                Wallet: wallet
            }
        })
        res.json({ message: `Change Status to ${status} and UPDATE wallet` })
    } catch (err) {
        next(err)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

//chatGPT optimizations
exports.updateProduct = async (req, res, next) => {
    const { name, description, publishDate, author, price, tag, imageUrl, downloadUrl } = req.body;
    const { id } = req.params;

    try {
        let data = await prisma.product.findFirst({
            where: {
                id: id
            }
        });

        if (!data) {
            return res.status(404).json({ message: `Product with id ${id} does not exist` });
        }

        let productData = {};

        if (name !== undefined && name !== data.Name) {
            productData.Name = name;
        }
        if (description !== undefined && description !== data.Description) {
            productData.Description = description;
        }
        if (publishDate !== undefined && publishDate !== data.PublishDate) {
            productData.PublishDate = publishDate;
        }
        if (author !== undefined && author !== data.Author) {
            productData.Author = author;
        }
        if (price !== undefined && price !== data.Price) {
            productData.Price = price;
        }
        if (tag !== undefined && tag !== data.Tag) {
            productData.Tag = tag;
        }
        if (imageUrl !== undefined && imageUrl !== data.ImageUrl) {
            productData.ImageUrl = imageUrl;
        }
        if (downloadUrl !== undefined && downloadUrl !== data.DownloadUrl) {
            productData.DownloadUrl = downloadUrl;
        }

        if (Object.keys(productData).length > 0) {
            await prisma.product.update({
                where: {
                    id: id
                },
                data: productData
            });
        }

        res.json({ message: `Successfully updated product with id ${id}` });
    } catch (err) {
        next(err);
    }
};

// // my code that I write
// exports.updateProduct = async (req, res, next) => {
//     const { name, description, publishDate, author, price, tag, imageUrl, downloadUrl } = req.body
//     const { id } = req.params
//     try {
//         const data = await prisma.product.findFirstOrThrow({
//             where: {
//                 id: id
//             }
//         }).catch(()=>{res.status(404).json({message : `product id ${id} is not exist`})})

//         let productdata = {
//             Name:data.Name,
//             Description:data.Description,
//             PublishDate:data.PublishDate,
//             Author:data.Author,
//             Price:data.Price,
//             Tag:data.Tag,
//             ImageUrl:data.ImageUrl,
//             DownloadUrl:data.DownloadUrl
//         }
//         if(name){
//             productdata.Name = name
//         }
//         if(description){
//             productdata.Description = description
//         }
//         if(publishDate){
//             productdata.PublishDate = publishDate
//         }
//         if(author){
//             productdata.Author = author
//         }
//         if(price){
//             productdata.Price = price
//         }
//         if(tag){
//             productdata.Tag = tag
//         }
//         if(imageUrl){
//             productdata.ImageUrl = imageUrl
//         }
//         if(downloadUrl){
//             productdata.DownloadUrl = downloadUrl
//         }

//         await prisma.product.update({
//             where : {
//                 id : id
//             },
//             data : productdata
//         })
//         res.json({message : `Successfully Update product id ${id}`})
//     } catch (err) {
//     next(err)
// }
// }