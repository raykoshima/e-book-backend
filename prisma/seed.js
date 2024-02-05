const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const downloadData = [
    {url : 'url1'},
    {url : 'url2'},
    {url : 'url3'},
    {url : 'url4'},
    {url : 'url5'},
    {url : 'url6'},
    {url : 'url7'},
    {url : 'url8'},
    {url : 'url9'},
    {url : 'url10'},
    {url : 'url11'},
    {url : 'url12'},
    {url : 'url13'},
    {url : 'url14'},
    {url : 'url15'},
    {url : 'url16'},
    {url : 'url17'},
    {url : 'url18'},
    {url : 'url19'},
    {url : 'url20'},
]

const productData = [
    {Name: 'Product 1', Description: 'Description of Product 1', PublishDate: new Date(), Author: 'Author 1', Price: 100, Tag: 'Tag 1', Image: 'image1.jpg', DownloadID: 1},
    {Name: 'Product 2', Description: 'Description of Product 2', PublishDate: new Date(), Author: 'Author 2', Price: 150, Tag: 'Tag 2', Image: 'image2.jpg', DownloadID: 2},
    {Name: 'Product 3', Description: 'Description of Product 3', PublishDate: new Date(), Author: 'Author 3', Price: 200, Tag: 'Tag 3', Image: 'image3.jpg', DownloadID: 3},
    {Name: 'Product 4', Description: 'Description of Product 4', PublishDate: new Date(), Author: 'Author 4', Price: 250, Tag: 'Tag 4', Image: 'image4.jpg', DownloadID: 4},
    {Name: 'Product 5', Description: 'Description of Product 5', PublishDate: new Date(), Author: 'Author 5', Price: 300, Tag: 'Tag 5', Image: 'image5.jpg', DownloadID: 5},
    {Name: 'Product 6', Description: 'Description of Product 6', PublishDate: new Date(), Author: 'Author 6', Price: 350, Tag: 'Tag 6', Image: 'image6.jpg', DownloadID: 6},
    {Name: 'Product 7', Description: 'Description of Product 7', PublishDate: new Date(), Author: 'Author 7', Price: 400, Tag: 'Tag 7', Image: 'image7.jpg', DownloadID: 7},
    {Name: 'Product 8', Description: 'Description of Product 8', PublishDate: new Date(), Author: 'Author 8', Price: 450, Tag: 'Tag 8', Image: 'image8.jpg', DownloadID: 8},
    {Name: 'Product 9', Description: 'Description of Product 9', PublishDate: new Date(), Author: 'Author 9', Price: 500, Tag: 'Tag 9', Image: 'image9.jpg', DownloadID: 9},
    {Name: 'Product 10', Description: 'Description of Product 10', PublishDate: new Date(), Author: 'Author 10', Price: 550, Tag: 'Tag 10', Image: 'image10.jpg', DownloadID: 10},
    {Name: 'Product 11', Description: 'Description of Product 11', PublishDate: new Date(), Author: 'Author 11', Price: 600, Tag: 'Tag 11', Image: 'image11.jpg', DownloadID: 11},
    {Name: 'Product 12', Description: 'Description of Product 12', PublishDate: new Date(), Author: 'Author 12', Price: 650, Tag: 'Tag 12', Image: 'image12.jpg', DownloadID: 12},
    {Name: 'Product 13', Description: 'Description of Product 13', PublishDate: new Date(), Author: 'Author 13', Price: 700, Tag: 'Tag 13', Image: 'image13.jpg', DownloadID: 13},
    {Name: 'Product 14', Description: 'Description of Product 14', PublishDate: new Date(), Author: 'Author 14', Price: 750, Tag: 'Tag 14', Image: 'image14.jpg', DownloadID: 14},
    {Name: 'Product 15', Description: 'Description of Product 15', PublishDate: new Date(), Author: 'Author 15', Price: 800, Tag: 'Tag 15', Image: 'image15.jpg', DownloadID: 15},
    {Name: 'Product 16', Description: 'Description of Product 16', PublishDate: new Date(), Author: 'Author 16', Price: 850, Tag: 'Tag 16', Image: 'image16.jpg', DownloadID: 16},
    {Name: 'Product 17', Description: 'Description of Product 17', PublishDate: new Date(), Author: 'Author 17', Price: 900, Tag: 'Tag 17', Image: 'image17.jpg', DownloadID: 17},
    {Name: 'Product 18', Description: 'Description of Product 18', PublishDate: new Date(), Author: 'Author 18', Price: 950, Tag: 'Tag 18', Image: 'image18.jpg', DownloadID: 18},
    {Name: 'Product 19', Description: 'Description of Product 19', PublishDate: new Date(), Author: 'Author 19', Price: 1000, Tag: 'Tag 19', Image: 'image19.jpg', DownloadID: 19},
    {Name: 'Product 20', Description: 'Description of Product 20', PublishDate: new Date(), Author: 'Author 20', Price: 1050, Tag: 'Tag 20', Image: 'image20.jpg', DownloadID: 20},
]

const run = async () => {

    await prisma.download.createMany({
        data : downloadData
    })
    await prisma.product.createMany({
        data: productData
    })
}

run()