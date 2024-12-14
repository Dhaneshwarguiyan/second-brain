import Tag from "../models/TagModel";
import express from 'express'
import { Response,Request } from 'express';


const router = express.Router();

router.post('/', async(req:Request,res:Response)=>{
    const {text} = req.body;
    try {
        const response = await Tag.create({
            text
        })
        res.status(200).send({message:"Successfully added Tag",response:response})
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
})

//to get all tags
router.get('/all', async(req:Request,res:Response)=>{
    try {
        const response = await Tag.find({});
        res.status(200).send({message:"Successfully fetched",response:response})
    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
})

export default router;