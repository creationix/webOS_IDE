// Some nice utility functions
exports.dump = function dump(obj) { print(realDump(obj, "")); }
exports.dir = function dir(obj) { print(realDir(obj, "", [])); }
exports.readdir = readdir;

function stringifyDescriptor(descriptor) {
  if (descriptor.get) {
    if (descriptor.set) return "[get/set]";
    return "[get]";
  }
  if (descriptor.set) return "[set]";
  return stringify(descriptor.value);
}

function stringify(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  switch (typeof value) {
    case "string": return JSON.stringify(value);
    case "number": case "boolean": return value.toString();
  }
}

function checkBuiltin(value) {
  switch (value) {
    case Date: return "Date";
    case Array: return "Array";
    case Object: return "Object";
    case RegExp: return "RegExp";
    case Function: return "Function";
    case Date.prototype: return "Date.prototype";
    case Array.prototype: return "Array.prototype";
    case Object.prototype: return "Object.prototype";
    case RegExp.prototype: return "RegExp.prototype";
    case Function.prototype: return "Function.prototype";
  }
}

function realDump(obj, indent) {
  var value = stringify(obj);
  if (value) return value;
  var newIndent = indent + "  ";
  var lines = Object.getOwnPropertyNames(obj).map(function (name) {
    var descr = Object.getOwnPropertyDescriptor(obj, name);
    if (descr.enumerable) {
      key = name;
    } else {
      key = "[" + name + "]";
    }
    var value = stringifyDescriptor(descr);
    if (!value) {
      value = checkBuiltin(descr.value);
      if (!value) {
        value = descr.value;
        if (typeof value === "function") {
          value = "[Function" + (value.name ? " " + value.name : "") + "]"
        } else if (typeof value === "object") {
          value = "[Object]";
        } else {
          throw new Error("Unknown type: " + value);
        }
      }
    }
    return key + ": " + value;
  });
  if (obj.__proto__) {
    var proto = checkBuiltin(obj.__proto__);
    if (!proto) proto = realDump(obj.__proto__, newIndent); 
    lines.push("[__proto__]: " + proto);
  }
  return "{\n" + newIndent + lines.join(",\n" + newIndent) + "\n" + indent + "}";
}

function realDir(obj, indent, refs) {
  var value = stringify(obj);
  if (value) return value;
  if (refs.indexOf(obj) >= 0) return "[Already Seen]";
  
  var newIndent = indent + "  ";
  refs.push(obj);
  var lines = Object.getOwnPropertyNames(obj).map(function (name) {
    var descr = Object.getOwnPropertyDescriptor(obj, name);
    var key;
    if (descr.enumerable) {
      key = name;
    } else {
      key = "[" + name + "]";
    }
    var value = stringifyDescriptor(descr);
    if (!value) {
      value = checkBuiltin(descr.value);
      if (!value) {
        value = realDir(descr.value, newIndent, refs);
      }
    }
    return key + ": " + value;
  });
  return "{\n" + newIndent + lines.join(",\n" + newIndent) + "\n" + indent + "}";
}

function readdir(path) {
  var directory = imports.gi.Gio.file_new_for_path(path);
  var enumerator = directory.enumerate_children(imports.gi.Gio.FILE_ATTRIBUTE_STANDARD_NAME, 0);
  var file_info;
  var result = [];
  while ((file_info = enumerator.next_file()) != null) {
    result.push(file_info.get_name());
  }
  return result;
}

