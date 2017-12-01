let mongoose = require('mongoose')

class UsersDao {
  
  constructor() {
    this.User = mongoose.model('User')
  }

  new(user, callback) {
    return this.User.create(user, callback)
  }

}

module.exports = UsersDao