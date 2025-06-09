class courseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
   
    async getstudentsforcourse(course) {

        var result = await this.courseRepository.getstudentsforcourse(course);
        return result;

    }
    async enrollcourse(sid, cid) {

        var result = await this.courseRepository.enrollcourse(sid, cid);
        return result;

    }
    async dropcourse(cname, sid) {

        var result = await this.courseRepository.dropcourse(cname, sid);
        console.log(result);
        return result;

    }
    async dropcoursestd(cid, sid) {

        var result = await this.courseRepository.dropcoursestd(cid, sid);
        console.log(result);
        return result;

    }
    async dbchangegrade(sid, cid, newgrade) {

        var result = await this.courseRepository.changegrade(sid, cid, newgrade);
        return result;

    }
    
    async addcourse(name, credits, description) {
       
        var result = await this.courseRepository.addcourse( name, credits, description);
        return result;
       
    }
    async getallcourses() {
        try {
            var result = await this.courseRepository.getAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
    async showenrolledcourse(id) {
        try {
            var result = await this.courseRepository.enrolledcourses(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getcoursesnames() {
        try {
            var result = await this.courseRepository.getcoursesnames();
            return result;
        } catch (error) {
            throw error;
        }
    }
    async enrolledcourses(id) {
        try {
            var result = await this.courseRepository.enrolledcourses(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getcoursesthatcanenroll(id) {
        try {
            var result = await this.courseRepository.getcoursesthatcanenroll(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
   
    async allenrolledcourses() {
        try {
            var result = await this.courseRepository.allenrolledcourses();
            return result;
        } catch (error) {
            throw error;
        }
    }
    async nbcredits(id) {
        try {
            var result = await this.courseRepository.nbcredits(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async oldcourses(id) {
        try {
            var result = await this.courseRepository.oldcourses(id);
            return result;
        } catch (error) {
            throw error;
        }

    }
    async oldcoursesall() {
        try {
            var result = await this.courseRepository.oldcoursesall();
            return result;
        } catch (error) {
            throw error;
        }

    }
}



module.exports = courseService;
