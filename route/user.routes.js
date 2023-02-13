
const controller = require('../controller/user')
const {checktoken} = require('../middleware/auth')
const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
	windowMs: 24* 60*60 * 1000, // 24 HR
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
module.exports= function(app){
    //authorisation and signup
    app.post('/login',[apiLimiter],controller.loginpage)
    app.post('/register',controller.createuser )

    //user managment
    app.get('/edituser/:id',[checktoken], controller.edituserejs   )
    app.post('/edit/:id',[checktoken],controller.edituser )
    app.post('/delete/:id',[checktoken],controller.deleteuser )
    app.get('/getone/:id',[checktoken],controller.getoneuser )
    app.get('/getall',[checktoken],controller.getalluser )

}


