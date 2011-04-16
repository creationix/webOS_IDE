var Gtk = imports.gi.Gtk,
    GtkSource = imports.gi.GtkSource,
    Gio = imports.gi.Gio,
    Pango = imports.gi.Pango;

Gtk.init(null, null);

var currentFilename;
function loadFile(filename) {

  currentFilename = filename;
  window.title = "webOS IDE - " + filename;

  var file = Gio.file_new_for_path(filename);
  sourceBuf.text = file.read().get_contents();

}


var sourceLangMgr = new GtkSource.LanguageManager();
var styleSchemeMgr = new GtkSource.StyleSchemeManager();

var ui = new Gtk.Builder();
ui.add_from_file("webOS_IDE.ui");
var window = ui.get_object("window");

var sourceBuf = new GtkSource.Buffer({
  highlight_matching_brackets: true,
  language: sourceLangMgr.get_language("js"),
  style_scheme: styleSchemeMgr.get_scheme("oblivion")
});
var sourceView = new GtkSource.View({
  auto_indent: true,
//  completion: ?,
  draw_spaces: 1 << 1 | 1 << 4,
  highlight_current_line: true,
  indent_on_tab: true,
  indent_width: 2,
  insert_spaces_instead_of_tabs: true,
  right_margin_position: 80,
//  show_line_marks: true,
  show_line_numbers: true,
  show_right_margin: true,
  smart_home_end: true,
  tab_width: 2
});
ui.get_object("scrolledwindow1").add(sourceView);


sourceView.set_buffer(sourceBuf);
sourceView.modify_font(Pango.font_description_from_string("monospace 11"));

loadFile("window.js");

window.resize(1024, 600);
window.show_all();
Gtk.main();

