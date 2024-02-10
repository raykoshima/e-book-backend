const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// const downloadData = [
//     {url : 'url1'},
//     {url : 'url2'},
//     {url : 'url3'},
//     {url : 'url4'},
//     {url : 'url5'},
//     {url : 'url6'},
//     {url : 'url7'},
//     {url : 'url8'},
//     {url : 'url9'},
//     {url : 'url10'},
//     {url : 'url11'},
//     {url : 'url12'},
//     {url : 'url13'},
//     {url : 'url14'},
//     {url : 'url15'},
//     {url : 'url16'},
//     {url : 'url17'},
//     {url : 'url18'},
//     {url : 'url19'},
//     {url : 'url20'},
// ]

const hashedPassword = bcrypt.hashSync("1234",5)
const userData = [
    {
        Email:"rayko@gmail.com",
        Password:hashedPassword,
        Displayname:"MrRAYTH",
    }
]

const productData = [
    {Name: 'Product 1', Description: 'Description of Product 1', PublishDate: new Date(), Author: 'Author 1', Price: 100, Tag: 'Tag 1', ImageUrl: 'image1.jpg', DownloadUrl: 'url1'},
    {Name: 'Product 2', Description: 'Description of Product 2', PublishDate: new Date(), Author: 'Author 2', Price: 150, Tag: 'Tag 2', ImageUrl: 'image2.jpg', DownloadUrl: 'url2'},
    {Name: 'Product 3', Description: 'Description of Product 3', PublishDate: new Date(), Author: 'Author 3', Price: 200, Tag: 'Tag 3', ImageUrl: 'image3.jpg', DownloadUrl: 'url3'},
    {Name: 'Product 4', Description: 'Description of Product 4', PublishDate: new Date(), Author: 'Author 4', Price: 250, Tag: 'Tag 4', ImageUrl: 'image4.jpg', DownloadUrl: 'url4'},
    {Name: 'Product 5', Description: 'Description of Product 5', PublishDate: new Date(), Author: 'Author 5', Price: 300, Tag: 'Tag 5', ImageUrl: 'image5.jpg', DownloadUrl: 'url5'},
    {Name: 'Product 6', Description: 'Description of Product 6', PublishDate: new Date(), Author: 'Author 6', Price: 350, Tag: 'Tag 6', ImageUrl: 'image6.jpg', DownloadUrl: 'url6'},
    {Name: 'Product 7', Description: 'Description of Product 7', PublishDate: new Date(), Author: 'Author 7', Price: 400, Tag: 'Tag 7', ImageUrl: 'image7.jpg', DownloadUrl: 'url7'},
    {Name: 'Product 8', Description: 'Description of Product 8', PublishDate: new Date(), Author: 'Author 8', Price: 450, Tag: 'Tag 8', ImageUrl: 'image8.jpg', DownloadUrl: 'url8'},
    {Name: 'Product 9', Description: 'Description of Product 9', PublishDate: new Date(), Author: 'Author 9', Price: 500, Tag: 'Tag 9', ImageUrl: 'image9.jpg', DownloadUrl: 'url9'},
    {Name: 'Product 10', Description: 'Description of Product 10', PublishDate: new Date(), Author: 'Author 10', Price: 550, Tag: 'Tag 10', ImageUrl: 'image10.jpg', DownloadUrl: 'url10'},
    {Name: 'Product 11', Description: 'Description of Product 11', PublishDate: new Date(), Author: 'Author 11', Price: 600, Tag: 'Tag 11', ImageUrl: 'image11.jpg', DownloadUrl: 'url11'},
    {Name: 'Product 12', Description: 'Description of Product 12', PublishDate: new Date(), Author: 'Author 12', Price: 650, Tag: 'Tag 12', ImageUrl: 'image12.jpg', DownloadUrl: 'url12'},
    {Name: 'Product 13', Description: 'Description of Product 13', PublishDate: new Date(), Author: 'Author 13', Price: 700, Tag: 'Tag 13', ImageUrl: 'image13.jpg', DownloadUrl: 'url13'},
    {Name: 'Product 14', Description: 'Description of Product 14', PublishDate: new Date(), Author: 'Author 14', Price: 750, Tag: 'Tag 14', ImageUrl: 'image14.jpg', DownloadUrl: 'url14'},
    {Name: 'Product 15', Description: 'Description of Product 15', PublishDate: new Date(), Author: 'Author 15', Price: 800, Tag: 'Tag 15', ImageUrl: 'image15.jpg', DownloadUrl: 'url15'},
    {Name: 'Product 16', Description: 'Description of Product 16', PublishDate: new Date(), Author: 'Author 16', Price: 850, Tag: 'Tag 16', ImageUrl: 'image16.jpg', DownloadUrl: 'url16'},
    {Name: 'Product 17', Description: 'Description of Product 17', PublishDate: new Date(), Author: 'Author 17', Price: 900, Tag: 'Tag 17', ImageUrl: 'image17.jpg', DownloadUrl: 'url17'},
    {Name: 'Product 18', Description: 'Description of Product 18', PublishDate: new Date(), Author: 'Author 18', Price: 950, Tag: 'Tag 18', ImageUrl: 'image18.jpg', DownloadUrl: 'url18'},
    {Name: 'Product 19', Description: 'Description of Product 19', PublishDate: new Date(), Author: 'Author 19', Price: 1000, Tag: 'Tag 19', ImageUrl: 'image19.jpg', DownloadUrl: 'url19'},
    {Name: 'Product 20', Description: 'Description of Product 20', PublishDate: new Date(), Author: 'Author 20', Price: 1050, Tag: 'Tag 20', ImageUrl: 'image20.jpg', DownloadUrl: 'url20'},
]
const run = async () => {

    // await prisma.download.createMany({
    //     data : downloadData
    // })
    await prisma.product.createMany({
        data: productData
    })
    await prisma.user.createMany({
        data: userData
    })
}

run()