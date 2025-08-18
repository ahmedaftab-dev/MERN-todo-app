const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const RegisterController=async (req,res)=>{
    try{
            const { username, email, password } = req.body;
             if (!username || !email || !password) {
                return res.status(400).send({
                    success:false,
                    message:"All fields are required"
                })
             }

            const existingUser=await UserModel.findOne({email});
            if(existingUser){
               return res.status(400).send({
                    success:false,
                    message:"User already exists"
                })
            }
               const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
            const newUser=new UserModel({username,email,password:hashedPassword})
            await newUser.save()

            res.status(200).send({
                success:true,
                message:"User registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    password:newUser.password
                },
            })

    }
   catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Network error occured"
        })
    }
    // return res.status(200).send(`<div>On Register page</div>`)
}
const LoginController=async (req,res)=>{
    try{
         const { email, password } = req.body; 
          if (!email || !password) {
      return res.status(400).send({ 
        success:false,
        message: "Email and password are required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ 
        success:false,
        message: "Invalid credentials" 
    });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success:false,
         message: "Invalid credentials"
         });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET || "mysecretkey", // secret key (use .env in production)
      { expiresIn: "1d" } // token validity
    );
    res.status(200).send({
        success:true,
        token,
        user:{
            id: user._id,
        username: user.username,
        email: user.email,
        }
    })
    }
    catch(error){
           console.log(error)
            res.status(500).send({
            success:false,
            message:"Network error occured"
        })
    }
}
module.exports = {RegisterController,LoginController}