const UsersDao = require('../dao/UsersDao')
const UserAction = require('../action/UserAction')

class UserController {

    constructor() {
        this.dao = new UsersDao()
        this.userAction = new UserAction()
    }

    new (req, res) {
        const userDto = req.body
        const user = this.userAction.getUser(userDto)
        this.dao.new(user, (error, result) => {
            res.json(result)
        })
    }


}

module.exports = new UserController()