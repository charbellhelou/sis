class userService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async confirmlogin(email, password) {
        try {
            var user = await this.userRepository.checklogin(email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async registerUser(firstname, lastname, email, password, role) {
        // Validate if passwords match
        //if (password !== confirmPassword) {
        //  throw new Error('Passwords do not match');
        // }

        // Check if the user already exists
        //const existingUser = await this.userRepository.getUserByUsername(username);
        // if (existingUser) {
        //  throw new Error('User already exists');
        // }

        // Add the new user to the repository
        var result = await this.userRepository.addUser(firstname, lastname, email, password, role);
        return result;
        // Optional: You can return a user DTO or any other relevant information
        // const newUser = await this.userRepository.getUserByUsername(username);
        //return new UserDTO(newUser.user_id, newUser.first_name, newUser.last_name, newUser.username);
    }
}


module.exports = userService;
