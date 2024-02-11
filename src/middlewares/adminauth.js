const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({message : "Unauthorized"})
        }
        const token = authorization.split(' ')
        const payload = jwt.verify(token[1], process.env.JWT_SECRET_KEY)

        const user = await prisma.user.findFirst({
            where: {
                id: payload.id,
                Backend: Number(process.env.ADMIN_NUMBER)
            }
        });

        if (!user) {
            return res.status(403).json({message : "Sorry, you don't have access rights to this content"})
        }

        delete user.Password
        delete user.Backend
        req.user = user

        next()
    } catch (err) {
        next(err)
    }
};
