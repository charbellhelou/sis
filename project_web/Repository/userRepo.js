const util = require('util');
var mySql = require('../DBconnection');
const query = util.promisify(mySql.con.query).bind(mySql.con);



class userRepo {
    constructor() { }

    checklogin(email, password) {
        return new Promise((resolve, reject) => {
            mySql.con.query(
                'select * from person where email = ? AND password = ?', [email, password], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length === 0) {
                            resolve(undefined);
                        } else {
                            var user = {
                                userid: result[0].id,
                                firstname: result[0].firstname,
                                lastname: result[0].lastname,
                                email: result[0].email,
                                role: result[0].type
                            };
                            resolve(user);
                        }

                    }
                }
            );
        });
    }
    async addUser(firstname, lastname, email, password, role) {
        try {
            const insertQuery = 'INSERT INTO person (firstname, lastname, email, password, type) VALUES (?,?,?,?,?)';
            await query(insertQuery, [firstname, lastname, email, password, role]);
            return "succesfull";
        } catch (err) {
            throw err;
        }
    }

   
}
module.exports = userRepo;
