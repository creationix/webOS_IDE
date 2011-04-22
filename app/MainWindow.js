var MainWindow = (function () {

  var Gtk = imports.gi.Gtk;
  Seed.include("app/CodeNotebook.js");
  Seed.include("app/FileTree.js");

  function init() {

    // Private

    var vbox = new Gtk.VBox();
    var hPaned = new Gtk.HPaned();
    var statusBar = new Gtk.Statusbar();
    var codeNotebook = new CodeNotebook();
    var fileTree = new FileTree();
    
    // Public
    
    this.loadFile = function (path) {
      codeNotebook.loadFile(path);
    };
    this.loadDir = function (path) {
      fileTree.loadDir(path);
    }
    
    // Implementation
    this.set_title("webOS IDE");
    vbox.pack_start(hPaned, true, true);
    hPaned.add1(fileTree);
    hPaned.add2(codeNotebook);
    hPaned.set_position(260);
    vbox.pack_start(statusBar);
    this.add(vbox);

  }
  
  return new GType({
    parent: Gtk.Window.type,
    name: "MainWindow",
    init: init
  });
  
}());

