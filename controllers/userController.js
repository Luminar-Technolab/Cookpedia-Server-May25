const users = require('../models/userModel')
const bcrypt = require('bcrypt')

//register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already exists... Please Login!!!")
        }else{
            const encryptPassword =  await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptPassword,profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
}