const { Strategy, ExtractJwt } = require('passport-jwt')
const { keys } = require('../keys')
const { getUserId } = require('../models/user')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret
}

//done es la petición
module.exports = new Strategy(options, async (payload, done) => {
    try {
        const user= await getUserId(payload);
        if(user){
            return done(null, user)
        }
        return done(null, false)
    } catch (error) {
        console.log("Passport: " + error)
    }
})