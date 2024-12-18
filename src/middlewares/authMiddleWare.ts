import { Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/userInterface/user.interface";
import jwt from "jsonwebtoken";
import { ErrorCode } from "../utils/Errors/Error";
import { getErrorCode } from "../utils/Errors/Error";

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
      const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use your secret key

      // Verify the token
      const user: any = jwt.verify(token, secretKey);
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