import express from 'express'
import { createUser } from '../Controllers/User/createUser.controller';
import { loginUser } from '../Controllers/User/loginUser.controller';
import { validateLogin, validateRegister } from '../services/validation';

const router = express.Router();

  
router.post('/register',validateRegister,createUser)
router.post('/login', validateLogin,loginUser)




export default router