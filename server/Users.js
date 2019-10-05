class Users {
  constructor () {
    this.users = {}
    this.countChangeSubscribers = []
  }

  add (id, geo) {
    let country = 'Unknown'
    let ll
    if (geo) {
      country = geo.country
      ll = geo.ll
    }
    this.users[id] = { country, ll }
    this.countChangeSubscribers.forEach(cb => cb())
  }

  join (id) {
    const user = this.users[id]
    if (user) {
      user.joined = true
    }
    this.countChangeSubscribers.forEach(cb => cb())
  }

  setProductivity (id, productivity) {
    const user = this.users[id]
    if (user) {
      user.productivity = productivity
    }
  }

  idleAll () {
    for (var id in this.users) {
      this.users[id].joined = false
    }
  }

  remove (id) {
    delete this.users[id]
    this.countChangeSubscribers.forEach(cb => cb())
  }

  get joinedCount () {
    return Object.values(this.users).filter(({ joined }) => joined).length
  }

  get idleCount () {
    return Object.keys(this.users).length
  }

  onCountChange (cb) {
    this.countChangeSubscribers.push(cb)
  }
}

module.exports = Users
