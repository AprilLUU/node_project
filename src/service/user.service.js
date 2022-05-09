class UserService {
  async create(user) {
    console.log(user)
  }
}

module.exports = new UserService()