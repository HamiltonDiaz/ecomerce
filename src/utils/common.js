const jwt =require('jsonwebtoken')
const {keys} = require('../keys')

const createToken= (user) =>{
    return jwt.sign({
        id:user.id,
        email: user.email,
    },keys.jwtSecret)
}

module.exports={
    createToken
}