var FileTree = (function () {

  var Gtk = imports.gi.Gtk,
      Gio = imports.gi.Gio;

  function readdir(path) {
    var directory = Gio.file_new_for_path(path);
    var enumerator = directory.enumerate_children(Gio.FILE_ATTRIBUTE_STANDARD_NAME, 0);
    var file_info;
    var result = {};
    while ((file_info = enumerator.next_file()) != null) {
      result[file_info.get_name()] = file_info;
    }
    return result;
  }

  function init() {

    // Private

    
    // Public
    
    
    // Implementation

  }
  
  return new GType({
    parent: Gtk.ScrolledWindow.type,
    name: "FileTree",
    init: init
  });
  
}());

