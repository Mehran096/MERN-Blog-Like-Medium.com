const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/User");
require('dotenv').config()

const createToken = (user) => {
    return jwt.sign({user}, process.env.SECRET, {expiresIn: "7d"});
}

module.exports.registerValidations = [
    body('name').not().isEmpty().trim().withMessage("name is required"),
    body('email').not().isEmpty().trim().withMessage("email is required"),
    body('password').isLength({min: 6}).withMessage("password must be 6 characters long")
]



module.exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors:errors.array()});
    }else{
         try {
            const checkUser = await User.findOne({email})
            if(checkUser){
                return res.status(400).json({errors: [{msg: "Email is already taken"}]});
            }
            //bcrypt password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            
                const user = await User.create({
                    name,
                    email,
                    password: hash
    
                })
                 const token =  createToken(user);
                return res.status(201).json({msg: 'Regsitration Successfully', token });
        
         } catch (error) {
            return res.status(500).json({errors:error});
         }
    }

}

//login validation
module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage('Email is required'),
    body('password').not().isEmpty().trim().withMessage('Password is required')
]

//login API
module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg: "Email is wrong"}]})
        }

         //bcrypt.compare password
         const matched = await bcrypt.compare(password, user.password)
         if(matched){
            const token =  createToken(user);
             return res.status(200).json({msg: 'Login Successfully', token})
         }else{
             res.status(400).json({errors: [{msg: 'Password is wrong'}]})
         }


    } catch (error) {
        console.log({errors:error})
    } 
}