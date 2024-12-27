import jwt from 'jsonwebtoken'


const generateToken = (_id:String) => {
    return jwt.sign( {_id} , process.env.JWT_SECRET!, {
        expiresIn: '3h'
    })
}

export default generateToken