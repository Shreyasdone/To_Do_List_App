import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authorization = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.JWT_SECRET || "ShreyasDone", (err,decoded) => {
        if(err) {
            console.error("Invalid or Expired token");
            return res.sendStatus(403);
        }
        req.user = decoded;
        next();
    })
}