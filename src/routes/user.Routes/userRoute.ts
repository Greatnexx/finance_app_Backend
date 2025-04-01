import express from 'express'
import { createUser } from '../../Controllers/User.controllers/createUser.controller';
import { loginUser } from '../../Controllers/User.controllers/loginUser.controller';
import { validateLogin, validateRegister } from 'Services/validation';

const router = express.Router();

  
router.post('/register',validateRegister,createUser)
router.post('/login', validateLogin,loginUser)




export default router