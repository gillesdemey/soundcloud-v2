'use strict'

var Resource = require('./resource')

function Related (client, opts) {
  Resource.call(this, { client: client, path: '/tracks/:id/related', options: opts })
  this.options = opts
  return this
}

Related.prototype.constructor = Resource.prototype.constructor
Related.prototype = Object.create(Resource.prototype)

module.exports = Related
