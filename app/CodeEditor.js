var CodeEditor = (function () {

  var Gtk = imports.gi.Gtk,
      GtkSource = imports.gi.GtkSource,
      Gio = imports.gi.Gio,
      Pango = imports.gi.Pango;

  var languageManager = new GtkSource.LanguageManager();
  var styleManager = new GtkSource.StyleSchemeManager();
  
  function init() {

    // Private

    var sourceBuffer = new GtkSource.Buffer();
    var sourceView = new GtkSource.View.with_buffer(sourceBuffer);
    
    // Public
    
    this.loadFile = function (path) {
      print("Loading file: " + path);
      sourceBuffer.text = Gio.simple_read(path);
    };
    
    // Implementation

    sourceBuffer.set_highlight_matching_brackets(true);
    sourceBuffer.set_language(languageManager.get_language("js"));
    sourceBuffer.set_style_scheme(styleManager.get_scheme("oblivion"));

    sourceView.set_auto_indent(true);
    sourceView.set_draw_spaces(1 << 1 | 1 << 4);
    sourceView.set_highlight_current_line(true);
    sourceView.set_indent_on_tab(true);
    sourceView.set_indent_width(2);
    sourceView.set_insert_spaces_instead_of_tabs(true);
    sourceView.set_right_margin_position(80);
    sourceView.set_show_line_numbers(true);
    sourceView.set_show_right_margin(true);
    sourceView.set_smart_home_end(true);
    sourceView.set_tab_width(2);
    sourceView.modify_font(Pango.font_description_from_string("monospace 11"));

    this.add(sourceView)
  }
  
  return new GType({
    parent: Gtk.ScrolledWindow.type,
    name: "CodeEditor",
    init: init
  });
  
}());

