'use strict'

exports.interpolatePath = function (path, opts) {

  return path.split('/')
    .map(replaceOption)
    .join('/')

  function replaceOption (part) {
    for (var option in opts) {
      if (part === ':' + option) return opts[option]
    }
    return part
  }

}
