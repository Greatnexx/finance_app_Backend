import { Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/userInterface/user.interface";
import jwt from "jsonwebtoken";
import { ErrorCode } from "../utils/Errors/Error";
import { getErrorCode } from "../utils/Errors/Error";
import redis from "../config/redis";

const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token!: string;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const secretKey = process.env.JWT_SECRET || 'your-secret-key'; 

      // Verify the token
      const user: any = jwt.verify(token, secretKey);

      const redisToken = await redis.get(`auth_token:${user._id}`)

      if(!redisToken){
       res.status(401).json({message:'Invalid Token or expired'});
      }
      req.user = user;

      return next();
    }

    // If no token is found
    res.status(401);
    throw new Error(ErrorCode.TOKEN_EXPIRED);
  } catch (error: any) {
    res.status(401);
    res.json({
      error: true,
      code: getErrorCode(error.message),
      message: error.message,
    });
  }
};

export { protect };