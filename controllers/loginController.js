const Model = require('../models/userModel');
const passwordHash = require('password-hash');

module.exports = {
    login: async (req,res,next) => {
        if(req.body.email && req.body.password) {
            const data = await Model.findOne();
            const truePassword = passwordHash.verify(req.body.password, data.password);
            const base_url = req.protocol + '://' + req.get('host')
            if(data.email == req.body.email && truePassword) {
                res.cookie(`email`,req.body.email);
                res.cookie(`password`,req.body.password);
                
                res.send(`
                Login Success, wait for redirect
                <script>
                    window.location.href = "${base_url}"
                </script>
                `);
            } else {
                res.render('auth', {
                    error: true
                });
            }        
        } else {
            res.render('auth', {
                error: false
            })
        }
    },

    verifyLogin: async (req,res,next) => {
        const {email, password} = req.cookies;
        if(email && password) {
            const data = await Model.findOne();
            const truePassword = passwordHash.verify(password, data.password);

            if(truePassword) {
                next()
                return;
            }
        }

        res.redirect('/login')
    },

    logout: (req,res,next) => {
        res.clearCookie('email')
        res.clearCookie('password')

        res.send(`
        Logout Success, wait for redirect
        <script>
            window.location.href = "${base_url}"
        </script>
        `)
    }
}