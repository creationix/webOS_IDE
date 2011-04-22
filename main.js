
(function () {

  var Gtk = imports.gi.Gtk;
  Seed.include("lib/utils.js");
  Seed.include("app/MainWindow.js");

  Gtk.init(null, null);

  var mainWindow = new MainWindow();
  mainWindow.signal.hide.connect(Gtk.main_quit);
  mainWindow.resize(1024, 600);
  mainWindow.show_all();

  readdir('app').forEach(function (name) {
    mainWindow.loadFile("app/" + name);
  });


  Gtk.main();

}());

