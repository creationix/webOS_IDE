var MainWindow = (function () {

  var Gtk = imports.gi.Gtk;
  Seed.include("app/CodeEditor.js");
  Seed.include("app/FileTree.js");

  function init() {

    // Private

    var vbox = new Gtk.VBox();
    var hPaned = new Gtk.HPaned();
    var statusBar = new Gtk.Statusbar();
    var codeEditor = new CodeEditor();
    var fileTree = new FileTree();
    
    // Public
    
    this.loadFile = function (path) {
      codeEditor.loadFile(path);
    };
    
    // Implementation
    this.set_title("webOS IDE");
    vbox.pack_start(hPaned, true, true);
    hPaned.add1(fileTree);
    hPaned.add2(codeEditor);
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

