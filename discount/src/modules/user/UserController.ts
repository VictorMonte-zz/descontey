import UserRepository from './UserRepository';

class UserController {

    constructor() { }

    getAll() {
        return UserRepository.find({});
    }
}

export default new UserController();
