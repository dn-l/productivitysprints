const logger = require('./logger')
const countries = require('./countries')

class User {
  constructor (id) {
    this.connected = true
    this.id = id
    this.countryCode = 'Unknown'
  }

  setGeo (geo) {
    if (!geo) {
      return
    }
    this.countryCode = geo.country
    this.ll = geo.ll
    logger.verbose('User#join', this)
  }

  join () {
    if (this.connected) {
      this.joined = true
    }
    logger.verbose('User#join', this)
  }

  idle () {
    this.joined = false
    logger.verbose('User#idle', this)
  }

  disconnect () {
    this.joined = false
    this.connected = false
    logger.verbose('User#disconnect', this)
  }

  setReport (report) {
    this.report = report
    logger.verbose('User#setReport', this)
  }
}

class Users {
  constructor () {
    this.items = { }
  }

  add (id) {
    const user = new User(id)
    this.items[id] = user
    logger.verbose('Users#add', user)
    return user
  }

  idleAll () {
    for (var id in this.items) {
      this.items[id].idle()
    }
    logger.verbose('Users#idleAll')
  }

  cleanup () {
    Object.keys(this.items).forEach(id => {
      if (!this.items[id].connected) {
        delete this.items[id]
      }
    })
  }

  getJoinedLl () {
    return Object.values(this.items).filter(({ connected, joined }) => connected && joined).map(({ ll }) => ll)
  }

  getIdleLl () {
    return Object.values(this.items).filter(({ connected, joined }) => connected && !joined).map(({ ll }) => ll)
  }

  collectStats () {
    return Object
      .values(this.items)
      .filter(({ report }) => report)
      .reduce((stats, user) => {
        const { countryCode, report } = user
        if (stats[countryCode]) {
          stats[countryCode].reports.push(report)
        } else {
          let countryName = 'Unknown'
          const countryDetails = countries[countryCode]
          if (countryDetails) {
            countryName = countryDetails.name
          }
          stats[countryCode] = {
            countryName,
            reports: [report]
          }
        }
        return stats
      }, {})
  }

  onCountChange (cb) {
    this.countChangeSubscribers.push(cb)
  }
}

module.exports = Users
