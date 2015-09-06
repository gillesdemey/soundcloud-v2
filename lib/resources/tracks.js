'use strict'

var Resource = require('./resource')
var RelatedResource = require('./related')
var extend = require('xtend')

function Tracks (client, opts) {
  Resource.call(this, { client: client, path: '/tracks/:id' })
  this.options = opts || {}
  return this
}

Tracks.prototype = Object.create(Resource.prototype)
Tracks.prototype.constructor = Resource.prototype.constructor

Tracks.prototype.related = function (opts) {
  opts = extend(this.options, opts)
  return new RelatedResource(this, opts)
}

module.exports = Tracks
