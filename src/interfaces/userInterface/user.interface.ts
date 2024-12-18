import { Request } from "express";
import { Schema } from "mongoose";

export interface User {
    _id:Schema.Types.ObjectId,
    created_at: Date;
    updated_at: Date;
    email: string;
    password: string;
    username: string;
   
  }


export interface CustomRequest extends Request {
    user?: User;

  }