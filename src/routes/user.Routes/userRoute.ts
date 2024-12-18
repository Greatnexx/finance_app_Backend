import express from 'express'
import { createUser } from '../../Controllers/user.controllers/createUser.controller';
import { loginUser } from '../../Controllers/user.controllers/loginUser.controller';

const router = express.Router();

router.post('/register',createUser)
router.post('/login',loginUser)




export default router