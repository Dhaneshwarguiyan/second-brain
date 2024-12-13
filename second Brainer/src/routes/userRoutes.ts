import express from 'express'
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

const router = express.Router();


//signup route
//zod validation and hashing
router.post('/signup',async (req,res)=>{
    const {username,password,email,fullname} = req.body;
    try {
        const user = await User.create({
            username,
            password,
            fullname,
            email
        })
        res.status(200).send({message:"User Created successfully"})
    } catch (error) {
        res.status(411).send({message:"User Already exists",success:false});
    }
})


//signin... route
router.post('/signin', async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            if(password === user.password){
                const token = jwt.sign({userId:user._id},process.env.JWT_SECRET as string);
                res.status(200).send({
                    username:user.username,
                    token:token
                })
                return;
            }
        }
            res.status(403).send({message:"Wrong email/password"})
        
    } catch (error) {
        res.status(500).send({message:"Internal server Error"});
    }
})

export default router
