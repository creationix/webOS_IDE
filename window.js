(function wrap() {

var Gtk = imports.gi.Gtk,
    GtkSource = imports.gi.GtkSource,
    Pango = imports.gi.Pango;



Gtk.init(null, null);

var source_lang_mgr = new GtkSource.LanguageManager();
var style_scheme_mgr = new GtkSource.StyleSchemeManager();

var ui = new Gtk.Builder();
ui.add_from_file("webOS_IDE.ui");
var window = ui.get_object("window");

var source_buf = new GtkSource.Buffer({
  highlight_matching_brackets: true,
  language: source_lang_mgr.get_language("js"),
  style_scheme: style_scheme_mgr.get_scheme("oblivion")
});
var source_view = new GtkSource.View({
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
ui.get_object("scrolledwindow1").add(source_view);


source_buf.text = wrap.toString();
source_view.set_buffer(source_buf);
source_view.modify_font(Pango.font_description_from_string("monospace 12"));

window.resize(800, 600);
window.show_all();
Gtk.main();

}());
