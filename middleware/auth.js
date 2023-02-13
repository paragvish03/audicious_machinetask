const jwt = require("jsonwebtoken")


exports.checktoken = async function (req, res, next) {

    let token = req.cookies.jwt_token
    try {

        if (token) {
            jwt.verify(token, 'surajsingh', function (err, decode) {
                if (err) {
                    res.send({ message: 'session invalid or expire' })
                } else {
                    req.ID = decode.id
                    next()
                }

            })
        } else {
            res.send({ message: ' PLEASE LOGIN FIRST' })
        }
    } catch (error) {
        res.send(error)
    }

}