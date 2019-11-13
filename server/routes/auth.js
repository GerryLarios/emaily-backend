const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
    
    app.get('/auth/google/callback', passport.authenticate('google'), (res, req) => {
        res.redirect('/surveys');
    })
    
    app.get('/api/current_user', (req, res) => { res.send(req.user) })

    app.get('/api/logout', (req, res) => {
        req.logout()
        if(req.user)
            res.send("Still loggin in")
        else
            res.redirect('/')
    })
}