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

    const emailCheck = await prisma.user.findFirst({
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
    await prisma.user.create({ // insert to database
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
        const user = await prisma.user.findFirstOrThrow({
            where:{
                Email:email
            }
        })
        const pwOk = await bcrypt.compare(password,user.Password)
        if(!pwOk) {
            throw new Error('invalid password')
        }
        const payload = { id: user.id }
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
    res.json(req.user)
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

exports.updateUser = async (req,res,next) =>{
    const { oldPassword, newPassword ,confirmNewPassword, displayname, phone, profilepicture } = req.body
    const uid = req.user.id
    try {
        if( newPassword && newPassword !== confirmNewPassword ){
            throw new Error(`New password not match`)
        }
        if( newPassword && !oldPassword ){
            throw new Error(`Please input oldpassword`)
        }

        const data = await prisma.user.findFirst({
            where : {
                id : uid
            }
        })
        delete data.Backend

        let userData = {
            Password: data.Password,
            Displayname: data.Displayname,
            Phone: data.Phone,
            ProfilePicture: data.ProfilePicture
        }

        if(newPassword){
            const pkCheck = await bcrypt.compare(oldPassword,data.Password)
            if(!pkCheck){
                throw new Error(`Invaild Password`)
            }
            const newpasshashed = await bcrypt.hash(newPassword,8)
            userData.Password = newpasshashed
        }
        if(displayname){
            userData.Displayname = displayname
        }
        if(phone){
            userData.Phone = phone
        }
        if(profilepicture){
            userData.ProfilePicture = profilepicture
        }
        // console.log(userData)

        await prisma.user.update({
            where : {
                id : uid
            },
            data : userData
        })
        res.json({message : `Successfully Update ${data.Email}`})
    } catch (err) {
        next(err)
    }
}