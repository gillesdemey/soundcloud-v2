'use strict'

var SoundCloud = require('../')

var client = new SoundCloud({
  access_token: '1-16343-2026783-fc93d86ce44a25d9',
  client_id: 'f17c1d67b83c86194fad2b1948061c9e',
  app_version: 'v1.0.0'
})

client
  .tracks({ id: 222053868 })
  .related({ limit: 1 })
  .get()
  .then(function (res) {
    console.log(res.body.collection[0].title)
  })
  .catch(function (err) {
    console.error(err)
  })

client.me().get()
  .then(function (res) {
    console.log(res.body.username)
  })
  .catch(function (err) {
    console.error(err)
  })

client.activities().get()
  .then(function (res) {
    console.log(res.body.collection[0].type)
  })
  .catch(function (err) {
    console.error(err)
  })

client.stream().get()
  .then(function (res) {
    console.log(res.body.collection[0].track.title)
  })
  .catch(function (err) {
    console.error(err)
  })
