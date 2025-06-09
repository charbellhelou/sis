const middleware = require('../Services/middleware.js');
const session = require('express-session');
class userController {
    constructor(userService) {
        this.userService = userService; 
    }

async login(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        try {
            var result = await this.userService.confirmlogin(email, password);

            if (result !== undefined) {

                req.session.user = result;
                console.log(result);
                if (result.role == "admin") {
                    res.send({
                        status: 201
                    });
                }
                else {
                res.send({
                    status: 200
                });
                }

            } else {
                res.send({
                    status: 404
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async registerUser(req, res) {
        
    var firstname = req.body.first_name;
    var lastname = req.body.last_name;
    var email = req.body.mail;
    var password = req.body.pass;
    var role = req.body.role;
    console.log(role);
    
    try {
        var result = await this.userService.registerUser(firstname, lastname, email, password, role);
        if (result == "succesfull") {
                res.send({
                    status: 200
                });
            }
            
         else {
            res.send({
                status: 404
            });
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
}



module.exports = userController;
