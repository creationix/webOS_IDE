var CodeNotebook = (function () {

  var Gtk = imports.gi.Gtk;
  Seed.include("app/CodeEditor.js");

  function init() {

    // Private

    
    // Public
    var self = this;
    this.loadFile = function (path) {
      print("Creating new page for: " + path);
      var codeEditor = new CodeEditor();
      var label = new Gtk.Label({label:path});
      self.append_page(codeEditor, label);
      codeEditor.show_all();
      label.show_all();
      codeEditor.loadFile(path);      
      print("Creating new page2");
    };
    
    // Implementation
    this.set_show_tabs(true);
    this.set_show_border(true);
    this.set_visible(true);
    this.set_can_focus(true);
    this.set_scrollable(true);

  }
  
  return new GType({
    parent: Gtk.Notebook.type,
    name: "CodeNotebook",
    init: init
  });
  
}());

