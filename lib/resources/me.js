'use strict'

var Resource = require('./resource')

function Me (client) {
  Resource.call(this, { client: client, path: '/me' })
}

Me.prototype.constructor = Resource.prototype.constructor
Me.prototype = Object.create(Resource.prototype)

module.exports = Me
