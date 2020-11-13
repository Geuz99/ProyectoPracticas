
import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    
    let token = req.headers['authorization'];
    console.log("token",token)
  
    if (!token) return res.status(403).json({ message: "No tiene usuario logueado" });
  
    token = token.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauhtorized Request');
    }
        
    try {
      const decoded = jwt.verify(token, 'llave');
      console.log("decoded", decoded)
      //req.userId = decoded.idus;
      console.log("req.userId", req.userId)   
  
      next();
      
    } catch (error) {
      return res.status(401).json({ message: "No esta Autorizado!" });
    } 

};