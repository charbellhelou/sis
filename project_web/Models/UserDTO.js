class UserDTO {
    constructor(id, firstName, lastName, email, password, type) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
    }
}

module.exports = UserDTO;