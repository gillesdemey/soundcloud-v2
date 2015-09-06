'use strict'

var Resource = require('./resource')

function Stream (client) {
  Resource.call(this, { client: client, path: '/stream' })
}

Stream.prototype.constructor = Resource.prototype.constructor
Stream.prototype = Object.create(Resource.prototype)

module.exports = Stream
