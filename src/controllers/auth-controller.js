const bcrypt = require("bcryptjs")
const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) => {
    try {
    const {email, password, confirmPassword, displayname, phone, profilepicture} = req.body
    //validation
    if( !(email && password && confirmPassword && displayname) ) {
        return next( new Error(`please fill input`))
    }
    if( (password !== confirmPassword )){
        throw new Error(`Confirm password not match`)
    }

    const emailCheck = await prisma.customer.findFirst({
        where :{
            Email:email
        }
    })

    if(emailCheck !== null){
        return next(new Error(`this email is exitesd`))
    }

    // console.log(emailCheck)

    const hashedPassword = await bcrypt.hash(password,8)

    const data = {
        Email:email,
        Password: hashedPassword,
        Displayname:displayname,
        Phone:phone,
        Profilepicture:profilepicture, 
    }
    // console.log(data)
    await prisma.customer.create({ // insert to database
        data : data
    })
    
    res.status(201).send("Successfully Register!")
    // res.json({ data })
    } catch (err) {
        next(err)
    }
    
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------


exports.login = async (req,res,next) => {
    const { email , password } = req.body;
    try {
        if( !(email.trim() && password.trim())){
            throw new Error("Please Fill Input")
        }
        const customer = await prisma.customer.findFirstOrThrow({
            where:{
                Email:email
            }
        })
        const pwOk = await bcrypt.compare(password,customer.Password)
        if(!pwOk) {
            throw new Error('invalid password')
        }
        const payload = { id: customer.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
            expiresIn: '1d'
        })
        res.json({token : token})
    } catch (err) {
        console.log(err.message)
        next(err)
    }
    
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getMe = (req,res,next) => {
    res.json(req.customer)
}