var connect = require('../DBconnection');
const util = require('util');
var mySql = require('../DBconnection');
const query = util.promisify(mySql.con.query).bind(mySql.con);

class courseRepository {
    constructor() {
    }
 
    async changegrade(sid, cid, newgrade) {
        try {
            const insertQuery = 'UPDATE enrollments SET grade = ? WHERE studentid = ? AND courseid = ? ';
            await query(insertQuery, [newgrade, sid, cid]);
            return "succesfull";
        } catch (err) {
            throw err;
        }
    }
    async enrollcourse(sid, cid) {
        try {
            const insertQuery = 'INSERT INTO enrollments (studentid, courseid, status,grade, enrolleddate, dropdate)VALUES(?, ?, 1, NULL, CURRENT_DATE, NULL) ';
            await query(insertQuery, [sid, cid]);
            return "succesfull";
        } catch (err) {
            throw err;
        }
    }
    async dropcourse(cname, sid) {
        try {
            const insertQuery = 'UPDATE enrollments AS e JOIN course AS c ON e.courseid = c.id SET e.status = 3 , e.dropdate = CURRENT_DATE() WHERE e.studentid = ? AND c.name = ?  AND e.status != 3';
            await query(insertQuery, [sid, cname]);
            return 1;
        } catch (err) {
            throw err;
        }
    }
    async dropcoursestd(cid, sid) {
        try {
            const insertQuery = 'UPDATE enrollments  SET status = 3 , dropdate = CURRENT_DATE() WHERE studentid = ? AND courseid = ?  AND status != 3';
            await query(insertQuery, [sid, cid]);
            return 1;
        } catch (err) {
            throw err;
        }
    }
    async addcourse(name, credits, description) {
        try {
            const insertQuery = 'INSERT INTO course (name, credits, description) VALUES (?,?,?)';
            await query(insertQuery, [name, credits, description]);
            return "succesfull";
        } catch (err) {
            throw err;
        }
    }

    getstudentsforcourse(course) {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT s.firstname, s.lastname, s.id  FROM person s JOIN enrollments e ON s.id = e.studentid JOIN course c ON e.courseid = c.id WHERE c.name = ? AND e.status = 1; ', [course], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var productsArray = [];

                            for (var i = 0; i < result.length; i++) {
                                productsArray.push(result[i]); // push the entire result[i] object
                                console.log(result[i]);
                            }

                            resolve(productsArray);
                        }
                    }
                }
            );
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'select * from course', (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var productsArray = [];

                            for (var i = 0; i < result.length; i++) {
                                productsArray.push(result[i]); // push the entire result[i] object
                                console.log(result[i]);
                            }

                            resolve(productsArray);
                        }
                    }
                }
            );
        });
    }
    enrolledcourses(id) {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT c.name AS course_name, c.id,grade FROM enrollments AS sc JOIN course AS c ON sc.courseid = c.id WHERE sc.studentid = ? AND sc.status = 1;', [id], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var coursesarray = [];

                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }



                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
    allenrolledcourses() {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT ec.studentid, ec.courseid, c.name AS course_name FROM enrollments ec JOIN course c ON ec.courseid = c.id where status = 1 ; ', (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var coursesarray = [];

                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }

                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
    getcoursesnames() {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT name from course ', (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var coursesarray = [];

                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }

                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
 

    nbcredits(id) {
        return new Promise((resolve, reject) => {

            connect.con.query(

                'SELECT SUM(credits) AS totalCredits FROM course WHERE id IN (SELECT courseid FROM enrollments WHERE studentid = ? and status = 1 )',

                [id],
                (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length === 0 || result[0].totalCredits === null) {
                            resolve(0); // Return 0 if there are no credits or if result is null
                        } else {
                            resolve(result[0].totalCredits); // Resolve with the total sum of credits
                        }
                    }

                }
            );
        });
    }
    oldcourses(id) {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT c.name AS course_name, sc.grade FROM enrollments sc JOIN course c ON sc.courseid = c.id WHERE sc.studentid = ? and status = 2 OR     status = 1', [id], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var coursesarray = [];

                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }



                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
    oldcoursesall() {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT c.name AS course_name, sc.grade,sc.courseid , sc.studentid FROM enrollments sc JOIN course c ON sc.courseid = c.id where status = 2 or status = 1  ', (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length === 0) {
                            resolve([]);
                        } else {
                            var coursesarray = [];
                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }
                            console.log(coursesarray);
                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
    getcoursesthatcanenroll(id) {
        return new Promise((resolve, reject) => {
            connect.con.query(
                'SELECT DISTINCT c.id, c.name, c.credits, c.description FROM course c LEFT JOIN enrollments e ON c.id = e.courseid AND e.studentid = ? WHERE e.status IS NULL OR  e.status = 3', [id], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.length === 0) {
                            resolve([]);
                        } else {

                            var coursesarray = [];

                            for (var counter = 0; counter < result.length; counter++) {
                                coursesarray.push(result[counter]); // push the entire result[i] object
                                console.log(result[counter]);
                            }



                            resolve(coursesarray);
                        }
                    }
                }
            );
        });
    }
}

module.exports = courseRepository;
