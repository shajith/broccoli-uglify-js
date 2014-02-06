module.exports = function (broccoli) {
  var UglifyJS = require('uglify-js')

  UglifyJSFilter.prototype = Object.create(broccoli.Filter.prototype)
  UglifyJSFilter.prototype.constructor = UglifyJSFilter
  function UglifyJSFilter (inputTree, options) {
    this.inputTree = inputTree
    this.options = options || {}
  }

  UglifyJSFilter.prototype.extensions = ['js']
  UglifyJSFilter.prototype.targetExtension = 'js'

  UglifyJSFilter.prototype.processString = function (string) {
    var result = UglifyJS.minify(string, {
      fromString: true,
      mangle: this.options.mangle,
      compress: this.options.compress,
      output: this.options.output
    })
    return result.code
  }

  return function (inputTree, options) {
    return new UglifyJSFilter(inputTree, options)
  }
}
