'use strict'

var TracksResource = require('./resources/tracks')
var ActivitiesResource = require('./resources/activities')
var StreamResource = require('./resources/stream')
var MeResource = require('./resources/me')

var DEFAULT_HOST = 'api-v2.soundcloud.com'
var PACKAGE_VERSION = require('../package.json').version
var DEFAULT_USER_AGENT = 'SoundCloud-v2/v' + PACKAGE_VERSION
var DEFAULT_PROTOCOL = 'https'

function SoundCloud (opts) {

  this._options = {
    host: DEFAULT_HOST,
    protocol: DEFAULT_PROTOCOL,
    user_agent: DEFAULT_USER_AGENT
  }

  this.setClientId(opts.client_id)
  this.setAccessToken(opts.access_token)
  this.setProtocol(opts.protocol)
  this.setUserAgent(opts.user_agent)
  this.setAppVersion(opts.app_version)
  this.setAgent(opts.agent)

}

SoundCloud.prototype = {

  tracks: function (opts) {
    return new TracksResource(this, opts)
  },

  activities: function (opts) {
    return new ActivitiesResource(this, opts)
  },

  stream: function (opts) {
    return new StreamResource(this, opts)
  },

  me: function (opts) {
    return new MeResource(this, opts)
  },

  _setOption: function (key, value) {
    this._options[key] = value
  },

  _getOption: function (key) {
    return this._options[key]
  },

  setClientId: function (id) {
    if (!id) throw new Error('Could not create client: Missing option client_id')
    this._setOption('client_id', id)
  },

  setAccessToken: function (token) {
    if (!token) throw new Error('Could not create client: Missing option access_token')
    this._setOption('access_token', token)
  },

  setAppVersion: function (version) {
    if (!version) return
    this._setOption('app_version', version)
  },

  setUserAgent: function (ua) {
    this._setOption('user_agent', ua || DEFAULT_USER_AGENT)
  },

  setProtocol: function (prot) {
    this._setOption('protocol', prot || DEFAULT_PROTOCOL)
  },

  setAgent: function (agent) {
    if (agent) return this._setOption('agent', agent)
    this._options.protocol === 'https'
      ? this._setOption('agent', require('https').globalAgent)
      : this._setOption('agent', require('http').globalAgent)
  }

}

module.exports = SoundCloud
