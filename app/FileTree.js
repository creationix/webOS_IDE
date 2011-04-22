
var Gtk = imports.gi.Gtk,
    Gio = imports.gi.Gio,
    GObject = imports.gi.GObject;
var utils = require("utils");

module.exports = new GType({
  parent: Gtk.ScrolledWindow.type,
  name: "FileTree",
  init: init
});

function init() {

  // Private
  var treeView = new Gtk.TreeView();
  var column = new Gtk.TreeViewColumn();
  var model = new Gtk.TreeStore();
  var cellRenderer = new Gtk.CellRendererText();
  var iconRenderer = new Gtk.CellRendererPixbuf();
  var row = {};
  
  // Public
  
  this.loadDir = function (path) {
    var files = utils.readdir(path);
    for (var i = 0, l = files.length; i < l; i++) {
      model.append(row);
//        model.set_value(row.iter, 0, treeView.render_icon_pixbuf(Gtk.STOCK_FILE, 32));
      model.set_value(row.iter, 1, files[i]);
    }
  };
  
  // Implementation
  model.set_column_types(2, [ GObject.TYPE_STRING, GObject.TYPE_STRING ]);
  treeView.set_model(model);
  treeView.append_column(column);
  column.pack_start(iconRenderer);
  column.add_attribute(iconRenderer, "pixbuf", 0);
  column.pack_start(cellRenderer);
  column.add_attribute(cellRenderer, "text", 1);
  this.add(treeView);

///////////////////////////////////

}


