(function () {
  // Clean scope to eval code
  function wrap(__dirname, __filename, require, module, exports) {
    eval(imports.gi.Gio.simple_read(__filename));
  }
  (function () {
    var Gio = imports.gi.Gio;
    var modules = {};
    function require(name) {
      if (modules.hasOwnProperty(name)) { return modules[name]; }
      var filename = "app/" + name + ".js";
      var dirname = filename.substr(0, filename.lastIndexOf('/'));
      var exports = modules[name] = {};
      var module = {exports: exports};
      wrap(dirname, filename, require, module, exports);
      return modules[name] = module.exports;
    }
    this.require = require;
  }());
}());

