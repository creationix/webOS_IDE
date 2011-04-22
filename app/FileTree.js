var FileTree = (function () {


  var Gtk = imports.gi.Gtk,
      Gio = imports.gi.Gio,
      GObject = imports.gi.GObject;


  function init() {

    // Private
    var treeView = new Gtk.TreeView();
    var column = new Gtk.TreeViewColumn();
    var model = new Gtk.TreeStore();
    var cellRenderer = new Gtk.CellRendererText();
    
    // Public
    
    
    // Implementation
    model.set_column_types(1, [GObject.TYPE_STRING]);
    treeView.set_model(model);
    treeView.append_column(column);
    column.pack_start(cellRenderer);
    column.add_attribute(cellRenderer, "text", 0);
    this.add(treeView);

///////////////////////////////////
    var row = {};
    model.append(row);
    model.set_value(row.iter, 0, "Hello");

  }
  
  return new GType({
    parent: Gtk.ScrolledWindow.type,
    name: "FileTree",
    init: init
  });
  
}());

