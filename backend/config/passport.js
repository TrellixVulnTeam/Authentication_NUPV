const passport = require("passport")
const passportLocal = require("passport-local")

const localStrategy = passportLocal.Strategy

const users = require("../users.json")


passport.use(new localStrategy({ usernameField: 'email' }, (username, password, done) => {
    const user = users.find(user => user.email === username && user.password === password)

    if(!user) {
        return done(null, false)
    }
    return done(null, user)

}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id)
    done(null, user)
})



module.exports = passport