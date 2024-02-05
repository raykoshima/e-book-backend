const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("Unauthorized")
        }
        if (!(authorization.startsWith('Bearer'))) {
            throw new Error("Unauthorized")
        }
        const token = authorization.split(' ')
        const payload = jwt.verify(token[1], process.env.JWT_SECRET_KEY)
        // console.log(`token is ${token[1]}`)
        // console.log(payload)

        const customer = await prisma.customer.findFirstOrThrow({
            where: {
                id: payload.id
            }
        })
        // console.log(user)
        // ส่ง request customer กลับไป
        delete customer.Password
        req.customer = customer

        next()
    } catch (err) {
        next(err)
    }

}