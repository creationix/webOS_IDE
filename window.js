var Gtk = imports.gi.Gtk,
    GtkSource = imports.gi.GtkSource;

Gtk.init(null, null);


var ui = new Gtk.Builder();
ui.add_from_file("webOS_IDE.ui");

var window = ui.get_object("window");

window.resize(800, 600);
window.show_all();

Gtk.main();
