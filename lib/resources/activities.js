'use strict'

var Resource = require('./resource')

function Activities (client) {
  Resource.call(this, { client: client, path: '/activities' })
}

Activities.prototype.constructor = Resource.prototype.constructor
Activities.prototype = Object.create(Resource.prototype)

module.exports = Activities
