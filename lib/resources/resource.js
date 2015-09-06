'use strict'

var URL = require('url')
var request = require('superagent')
var extend = require('xtend/mutable')
var utils = require('../utils')

function Resource (opts) {

  this._client = opts.client
  this.path = opts.path

}

Resource.prototype = {

  get: function (opts) {
    opts = extend(this.options, opts)
    return this._createPromise('GET', opts)
  },

  post: function (opts, data) {
    return this._createPromise('POST', opts, data)
  },

  _createPromise: function (method, opts, data) {
    var self = this

    return new Promise(function (resolve, reject) {
      self._request(method, data, opts, function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
    })

  },

  _handleError: function (err) {
    throw err
  },

  _createURL: function (protocol, host, path) {

    return URL.format({
      protocol: protocol,
      host: host,
      pathname: path
    })
  },

  _getOption: function (key) {
    return this._client._getOption(key)
  },

  _request: function (method, data, options, callback) {
    var self = this

    if (typeof options === 'function') {
      callback = options
      options = null
    }

    var isSecure = self._getOption('protocol') === 'https'
    var protocol = (isSecure ? 'https' : 'http')

    var headers = {
      'Authorization': 'OAuth ' + self._getOption('access_token'),
      'User-Agent': self._getOption('user_agent'),
      'Content-Type': 'application/json'
    }

    var query = extend({
      'client_id': self._getOption('client_id'),
      'app_version': self._getOption('app_version')
    }, options)

    // interpolate path with options
    var path = utils.interpolatePath(self.path, query)

    var url = self._createURL(
      protocol, self._getOption('host'), path
    )

    var req = request(method, url)
      .query(query)
      .accept('application/json')
      .set(headers)
      .on('error', self._handleError)

    if (method.toUpperCase() === 'POST') req.send(data)

    req.end(callback)
  }

}

module.exports = Resource
