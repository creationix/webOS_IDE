#!/usr/bin/env seed
Seed.include("lib/require.js");

(function main() {

  var Gtk = imports.gi.Gtk;
  var MainWindow = require("MainWindow"),
      utils = require("utils");

  Gtk.init(null, null);

  var mainWindow = new MainWindow();
  mainWindow.signal.hide.connect(Gtk.main_quit);
  mainWindow.resize(1024, 600);
  mainWindow.show_all();

  mainWindow.loadDir("app");

  utils.readdir('app').forEach(function (name) {
    mainWindow.loadFile("app/" + name);
  });

  Gtk.main();

}());

