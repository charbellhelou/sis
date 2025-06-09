const middleware = require('../Services/middleware.js');
const session = require('express-session');
var path = require('path');
var express = require('express');

var app = express();
var HTMLpath = path.join(__dirname, "Public");
app.use(express.static('Public'));

class courseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getcoursesnames(req, res) {
        try {
            var courses = await this.courseService.getcoursesnames();
            res.render('newdropcourseadmin', { courses });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    }









    async getstudentsforcourse(req, res) {
        var course = req.body.currentCourseName;
        console.log(course);
        course = course.trim();
        console.log(course);
        try {
            //get needed variables and continue fromm this point stull have another endpoint and make sure ajax works
            var data = await this.courseService.getstudentsforcourse(course);
            console.log(data);
            if (data !== undefined) {
                console.log(data);
                res.send(data);
                
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }

    async getcoursesthatcanenroll(id) {

        try {
            var result = await this.courseService.getcoursesthatcanenroll(id);

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }

    async changegrade(req, res) {
        const sid = req.body.sid;
        const cid = req.body.cid;
        const grade = req.body.grade;

        try {
            var result = await this.courseService.changegrade(sid, cid, grade);
            if (result === "succesfull")
                res.status(201).json({
                    message: 'grade changed ',
                    status: 201,

                });
        } catch (error) {
            console.error('Error during grade change:', error);
            res.status(400).json({
                error: error.message || 'grade did not change',
                status: 400
            });
        }
    }

    async enroll(req, res) {

        let sid = req.session.user.userid;
        var cid = req.body.cid;
        try {
            var result = await this.courseService.enrollcourse(sid, cid);

            if (result == "succesfull") {

                res.send({
                    status: 200
                });

            } else {

                res.send({
                    status: 400
                });
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }

    }

    async dropcourse1(req, res) {

        
        let sid = req.body.studentId;
        var cname = req.body.courseName;
        cname = cname.trim();
        console.log(sid);
        console.log(cname);
        try {
            var result = this.courseService.dropcourse(cname, sid);

            if (result == "succesfull") {

                res.send("course has been dropped");
               

            } else {

                res.send({
                    status: 400
                });
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }



    }

    async dropcourse(req, res) {


        let sid = req.session.user.userid;
        var cid = req.body.cid;
        console.log(sid);
        try {
            var result = this.courseService.dropcoursestd(cid, sid);

            if (result = 1) {

                res.send({
                    status: 200
                });

            } else {

                res.send({
                    status: 400
                });
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }



    }

    async changegrade1(req, res) {

        try {
            var courses = await this.oldcoursesall();
            res.render('changegrade', courses);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async courseaddpage(req, res) {


        try {

            res.render('courseaddpage');

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    }

    async showreg(req, res) {
        res.render('register');
    }

    async std(req, res) {


        let user = req.session.user;
        res.render('student', { user })
        // res.sendFile(path.join(__dirname, './Public/Html/student.html'));


    }

    async dbchangegrade(req, res) {


        try {
            var sid = req.body.sid;
            var cid = req.body.cid;
            var newgrade = req.body.newgrade;
            console.log(cid);
            console.log(sid);
            console.log(newgrade);
            var result = await this.courseService.dbchangegrade(sid, cid, newgrade);

            if (result == "succesfull") {
                res.status(200).send({ status: 200 });

            } else {
                res.status(400).send({ status: 400 });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, status_error: 'Internal Server Error' });

        }
    }

    async addcourse(req, res) {

        const name = req.body.courseName;
        const credits = req.body.credits;
        const description = req.body.description;



        try {
            var result = await this.courseService.addcourse(name, credits, description);
            if (result === "succesfull")
                res.status(200).json({
                    message: 'course added ',
                    status: 200,

                });
        } catch (error) {
            console.error('Error during addition of course:', error);
            res.status(400).json({
                error: error.message || 'course addition  failed',
                status: 400
            });
        }
    }

    async checkfordroppedcourse(req, res) {
        try {
            let id = req.session.user.userid;

            // var result = await courseController.getcoursesthatcanenroll(id);

            var nbcredits = await this.courseService.nbcredits(id);
            console.log(nbcredits);
            if (nbcredits < 8) {

                res.send({
                    status: 201

                });
            }
            else {
                res.send({
                    status: 200
                });
            }


        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }



    }

    async checkforaddcourse(req, res) {
        try {
            let id = req.session.user.userid;

            var nbcredits = await this.courseService.nbcredits(id);
            console.log(nbcredits);
            if (nbcredits > 18) {

                res.send({
                    status: 201

                });
            }
            else {
                res.send({
                    status: 200
                });
            }


        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getcourses() {

        try {
            var result = await this.courseService.getallcourses();

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }

   
   
    async getenrolledcourses(id) {

        try {
            var result = await this.courseService.enrolledcourses(id);

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }
    async getallenrolledcourses() {

        try {
            var result = await this.courseService.allenrolledcourses();

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }
    async displaystdcourses(req, res) {
        try {

            let id = req.session.user.userid;
            var result = await this.getoldcourses(id);
            var courses = result.courses;
            console.log(courses);
            res.render('showcourses', { courses })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
   


    
    async displaystdaddcourses(req, res) {
        try {



            let id = req.session.user.userid;

            var result = await this.getcoursesthatcanenroll(id);
            var courses = result.courses;

            res.render('courseadd', { courses })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    };

    async displaydropcoursesadmin(req, res) {

        try {
            var result = await this.getallenrolledcourses();
            var courses = result.courses;
            console.log(courses);
            res.render('coursedropadmin', { courses })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async adminmenu(req, res) {
        let user = req.session.user;
        res.render('admin', { user })
    }
    async login(req, res) {
        res.render('login')
    }
    async hp(req, res) {
        try {
            var result = await this.getcourses();

            var courses = result.courses;
            let user = req.session.user;
            res.render('homepage', { courses, user })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    };
    async getoldcourses(id) {

        try {
            var result = await this.courseService.oldcourses(id);

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }
    async oldcoursesall() {

        try {
            var result = await this.courseService.oldcoursesall();

            if (result !== undefined) {

                return {
                    courses: result,
                    status: 200
                };

            } else {

                return {
                    prodcuts: undefined,
                    status: 404
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                status_error: 'Internal Server Error'
            };
        }
    }
    async showenrolledcourse(req, res) {
        try {

            let id = req.session.user.userid;
            var result = await this.getenrolledcourses(id);
            var courses = result.courses;
            console.log(courses);
            res.render('showenrolledcourses', { courses })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async showdropcourses(req, res) {
        try {



            let id = req.session.user.userid;
            var result = await this.getenrolledcourses(id);
            var courses = result.courses;

            res.render('coursedrop', { courses })

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    }


}
module.exports = courseController;
