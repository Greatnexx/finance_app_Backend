import jwt from 'jsonwebtoken'
import{ Schema} from 'mongoose'


const generateToken = (_id:String) => {
    return jwt.sign( {_id} , process.env.JWT_SECRET!, {
        expiresIn: '3h'
    })
}

export default generateToken