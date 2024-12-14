import express from 'express'
import Content from '../models/ContentModel';
import Link from '../models/LinkModel';
import linkGenerator from '../utils/utils';
import authMiddleware from '../middlewares/authMiddleware';
import { Response,Request } from 'express';


const router = express.Router();

//creating a shareable link
router.post('/share',authMiddleware,async (req:Request,res:Response)=>{
    const userId = req.userId;
    const share = req.body.share;
    try {
        const link = await Link.findOne({userId});
        if(share){
            //if the link is already shared
            if(link){
                res.status(200).send({hash:link.hash});
                return;
            }
            //Generating a unique link
            const hash:string = linkGenerator(10);
            //Updating the link in the database
            const response = await Link.create({
                userId:userId,
                hash:hash
            })
            res.status(200).send({
                hash:hash
            })
        }else{
            //Deleting the entry because the share option is disabled
            await Link.deleteOne({
                userId
            })
            res.status(200).send({message:"Successfully deleted link"})
        }
    } catch (error) {
        res.status(403).send({message:"Something went wrong."})
    }
})

//opening a shared link
//this route will not be authenticated and anyone with the link can access the brain
router.get('/:shareLink',async (req:Request,res:Response)=>{
    const link = req.params.shareLink;
    try {
        //using the link find the user and then access its brain
        const user = await Link.findOne({hash:link}).populate('userId');
        if(user){
            const content = await Content.find({userId:user?.userId});
            res.status(200).send({
                user,
                content
            })
        }else{
            //if the user doesnt exist 
            res.status(404).send({message:"No user exist",success:false})
        }

    } catch (error) {
        res.status(404).send({
            message:"Link is Invalid",
            success:false
        })
    }
})

export default router;