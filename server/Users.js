class User {
  constructor () {
    this.joined = false
    this.connectedAt = Date.now()
  }
}

class Users {
  constructor (store) {
    this.users = {}
    this.countChangeSubscribers = []
    this.store = store
  }

  add (id) {
    this.users[id] = new User()
    this.countChangeSubscribers.forEach(cb => cb())
  }

  remove (id) {
    delete this.users[id]
    this.countChangeSubscribers.forEach(cb => cb())
  }

  get count () {
    return Object.keys(this.users).length
  }

  onCountChange (cb) {
    this.countChangeSubscribers.push(cb)
  }
}

module.exports = Users
