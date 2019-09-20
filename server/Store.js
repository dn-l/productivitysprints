const redis = require('redis')
const logger = require('./logger')

class Store {
  constructor (prefix) {
    const client = redis.createClient({ prefix })

    this._get = (key) => new Promise((
      resolve, reject
    ) => client.get(key, (err, result) => {
      const event = 'Store#get'
      if (err) {
        logger.warn(event, { prefix, key, err })
        reject(err)
      }
      logger.verbose(event, { prefix, key, result })
      resolve(result)
    }))

    this._set = (key, value) => new Promise((
      resolve, reject
    ) => client.set(key, value, (err, result) => {
      const event = 'Store#set'
      if (err) {
        logger.error(event, { prefix, key, err, value })
        reject(err)
      }
      logger.verbose(event, { prefix, key, result, value })
      resolve(result)
    }))
  }

  set (key, value) {
    return this._set(key, JSON.stringify(value))
  }

  async get (key) {
    try {
      const str = await this._get(key)
      return JSON.parse(str)
    } catch {
      return undefined
    }
  }
}

module.exports = Store
