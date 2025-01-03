import express from 'express';
import connectDb from './db/config';
import dotenv from 'dotenv';
import cors from 'cors';
import { Response,Request } from 'express';
import Feedback from './models/FeedbackModel';

dotenv.config();
const app = express();

//routes import
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import linkRoutes from './routes/linkRoutes';
import tagRoutes from './routes/TagRoutes';

//middlewares
app.use(express.json());
app.use(cors({
    origin:'*',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
}));
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/content',contentRoutes);
app.use('/api/v1/link',linkRoutes);
app.use('/api/v1/tag',tagRoutes);
app.post('/api/v1/feedback',async(req:Request,res:Response)=>{
    try {
        const {feedback} = req.body;
        const response = await Feedback.create({feedback});
        res.send({message:"Thanks for your valuable feedback"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})

app.get('/',(req:Request,res:Response)=>{
    res.json('Hello world')
})

const PORT = process.env.PORT || 3000;

//connect to db
connectDb();


//connect to server
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
