import express from 'express'
import Content from '../models/ContentModel';
import authMiddleware from '../middlewares/authMiddleware';
import ogs from 'open-graph-scraper';
import { Response,Request } from 'express';
const router = express.Router();



//add new content
router.post('/',authMiddleware,async (req:Request,res:Response)=>{
    const {title,link,description,image,linkTitle,tags} = req.body;
    const userId = req.userId;
    try {
        const content = await Content.create({
            title,
            description,
            link,
            userId,
            image,
            linkTitle,
            tags
        })
        res.status(200).send({message:"Successfully created",content:content,success:true})
    } catch (error) {
        res.status(400).send({message:"Internal Error",success:false})
    }
})

//fetchin all content
router.get('/',authMiddleware,async (req:Request,res:Response)=>{
    const userId = req.userId;
    try {
        const contents = await Content.find({userId});
        res.status(200).send({contents:contents,success:true});
    } catch (error) {
        res.status(400).send({message:"Internal error",success:false})
    }
})

//updating content with Id
router.post('/update/:id',authMiddleware,async (req:Request,res:Response)=>{
        const {id} = req.params;
        const userId = req.userId;
        const {title,link,description,image,linkTitle,tags} = req.body;
        try {
            const content = await Content.findOneAndReplace({_id:id},{
                title,
                link,
                description,
                userId,
                image,
                linkTitle,
                tags
            },{new:true})
            res.status(200).send({message:"Successfully Updated",content:content,success:true});
        } catch (error) {
            res.status(400).send({message:"Internal Error",success:false});
        }
})

//delete a content
router.delete('/delete/:id', authMiddleware,async (req:Request,res:Response)=>{
    const contentId = req.params.id;
    const userId = req.userId;
    try {
        const content = await Content.deleteOne({_id:contentId,userId:userId})
        res.status(200).send({
            message:"Successfully deleted",
            content:content,
            success:true
        })
    } catch (error) {
        res.status(400).send({
            message:"Internal Error",
            success:false
        })
    }
})


router.post("/metadata", async (req:Request,res:Response) => {

    const { url } = req.body;  
    if (!url) {
        res.status(400).json({error:"No url provided"})
        return;
    }
        try {
            const { result,response } = await ogs({ url });
            res.send(result);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch metadata" });
          }
  });





export default router;
