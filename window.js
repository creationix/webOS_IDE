var Gtk = imports.gi.Gtk,
    GtkSource = imports.gi.GtkSource,
    Pango = imports.gi.Pango;



Gtk.init(null, null);

var source_lang_mgr = new GtkSource.LanguageManager();
var js_lang = source_lang_mgr.get_language("js");

var ui = new Gtk.Builder();
ui.add_from_file("webOS_IDE.ui");
var window = ui.get_object("window");

var source_buf = new GtkSource.Buffer({language: js_lang});
var source_view = ui.get_object("source_view");
source_buf.text = "function Box(width, height) {\n\tthis.width = width;\n\tthis.height = height;\n}\n";
source_view.set_buffer(source_buf);
source_view.modify_font(Pango.font_description_from_string("monospace 12"));

window.resize(800, 600);
window.show_all();
Gtk.main();
