
import { Response,Request,NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"]?.split(" ")[1];
    const decode = jwt.verify(token as string,process.env.JWT_SECRET as string);
    if(decode){
        if(typeof decode === "string"){
            res.status(403).json({
                message: "You are not logged in"
            })
            return; 
        }
        req.userId = (decode as JwtPayload).userId;
        next();
    }else{
        res.status(403).send({message:"You are not logged in",success:false});
        return;
    }
}

export default authMiddleware;