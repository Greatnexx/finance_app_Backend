import jwt from 'jsonwebtoken'


const generateToken = (_id:string) => {
    return jwt.sign( {_id} , process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export default generateToken