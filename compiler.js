function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Extend String prototype to support splice operation
  if (!String.prototype.splice) {
      /**
       * The splice() method changes the content of a string by removing a range of
       * characters and/or adding new characters.
       *
       * @this {String}
       * @param {number} start Index at which to start changing the string.
       * @param {number} delCount An integer indicating the number of old chars to remove.
       * @param {string} newSubStr The String that is spliced in.
       * @return {string} A new string with the spliced substring.
       */
      String.prototype.splice = function(start, delCount, newSubStr) {
          return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
      };
  }
  
  // Function to process and replace CSS code with custom logic
  function replaceCss(css_code) {
      var EXPRESSION_DEFINER = [";", ":", "(", ")", ","];
      var parsedcss = css_code;
      var new_css = parsedcss;
      var finished_operation_code = [];
      var regexp = new RegExp(' [+-/*] ', 'g');
      var match;
  
      while ((match = regexp.exec(parsedcss)) !== null) {
          var index = match.index;
          var start = 0, end = 0;
          var current_index = index - 1;
          
          // Find start of the operation
          while (start == 0) {
              var char = parsedcss.charAt(current_index);
              if (EXPRESSION_DEFINER.indexOf(char) != -1) {
                  start = current_index + 2;
                  break;
              }
              if (current_index == 0) break;
              current_index--;
          }
          
          // Find end of the operation
          current_index = index + 2;
          while (end == 0) {
              var char = parsedcss.charAt(current_index);
              if (EXPRESSION_DEFINER.indexOf(char) != -1) {
                  end = current_index - 1;
                  break;
              }
              if (current_index == parsedcss.length) break;
              current_index++;
          }
  
          var begin_code = parsedcss.substr(0, start);
          var end_code = parsedcss.substring(end + 1, parsedcss.length);
          var rawoperationcode = parsedcss.substring(start - 1, end + 1);
          var operationcode = "calc(" + rawoperationcode + ")";
          
          // Replace only if not already processed
          if (finished_operation_code.indexOf(rawoperationcode) == -1) {
              new_css = new_css.replace(rawoperationcode, operationcode);
          } else {
              break;
          }
          finished_operation_code.push(rawoperationcode);
      }
      
      // Replace custom variables and return modified CSS
      new_css = new_css.replace(/\$(\w+)\s*:/g, "--$1:");
      new_css = new_css.replace(/\$(\w+)/g, "var(--$1)");
      return new_css;
  }
  
  // Patterns for 'if' and hook extraction
  let if_pattern = /if @(\w+)\s*\?\s*(.*)\s*>\s*(.*);/g;
  
  // Templates for conditional CSS
  function if_else_template(_if, _else, key) {
      return `\n--if_${key}:${_if};--else_${key}:${_else};\n`
  }
  function if_else_var_template(key) {
      return `var(--else_${key},var(--if_${key}));`
  }
  
  // Compile ACSS to standard CSS
  function compileAcss(code) {
      let SELECTOR_DEFINER = /}(.|\n)[^{]*/g;
      let match;
      let selectors = [];
      let newcode = code;
  
      while ((match = if_pattern.exec(code)) != null) {
          let data = {};
          let key = uuid();
          let _value = match[0];
          let _event = match[1];
          let _if = match[2].trim(); // Trim spaces around values
          let _else = match[3].trim(); // Trim spaces around values
  
          let length = _value.length;
          let index = match.index;
          let start = null;
          let current_index = index;
          let var_code = if_else_var_template(key);
  
          code = code.splice(index, length, var_code);
  
          let PROPERTY_DEFINER = ["\s", "\n", ";"];
          while (!start) {
              let char = code.charAt(current_index);
              if (PROPERTY_DEFINER.indexOf(char) != -1) {
                  start = current_index;
                  break;
              }
              current_index--;
          }
  
          let if_else_code = if_else_template(_if, _else, key);
          code = code.splice(start, 0, if_else_code);
  
          let new_start = null;
          current_index = start;
          let selector = "";
          let status = false;
          while (!new_start) {
              let char = code.charAt(current_index);
              if (char == "}") {
                  status = false;
                  break;
              }
              if (status) {
                  selector = char + selector;
              }
              if (char == "{") {
                  status = true;
              }
              if (current_index == 0) break;
              current_index--;
          }
          selector = selector.trim();
          data = { _event, _if, _else, selector, key };
          selectors.push(data);
      }
      let hook = compileGlobalHook(code);
      return [hook[1], selectors, hook[0]];
  }
  
  // Compile global hook for event handlers
  function compileGlobalHook(code) {
      let reg_pattern = /@(\w+) as (\w+)/g;
      let global_hook_data = [];
      let match;
      while ((match = reg_pattern.exec(code)) != null) {
          let event = match[1];
          let index = match.index;
          let event_as = match[2];
          let start = null;
          let current_index = index - 2;
          let selector = "";
          let length_selector = 0;
          let length_input = match[0].length;
  
          while (!start) {
              let char = code.charAt(current_index);
              if (char != "}" && current_index != 0) {
                  selector = char + selector;
              } else {
                  start = current_index;
                  break;
              }
              length_selector++;
              current_index--;
          }
          code = code.splice(start, length_input + length_selector + 3, "");
          selector = selector.trim();
          global_hook_data.push({
              selector: selector, event, event_as
          });
      }
      return [global_hook_data, code];
  }
  
  var fs = require('fs');
  let args = process.argv.slice(2);
  let filename = args[0];
  let js_filename = args[1];
  
  // Watch for file changes and process ACSS files
  function watch_acss() {
      let css_data = fs.readFileSync(filename, 'utf8');
      if (args[0].includes(".acss")) {
          let new_css_data = replaceCss(css_data);
          new_css_data = compileAcss(new_css_data);
          let newfile = filename.slice(0, -5) + ".css";
          fs.writeFileSync(newfile, new_css_data[0]);
          fs.writeFileSync(js_filename, `
          let setup_json = ${JSON.stringify(new_css_data[1])}
          let external_hook = ${JSON.stringify(new_css_data[2])}
          window.onload = () => installAcss()
          `);
      } else {
          console.log("Unknown extension. Please use an .acss file.");
      }
  }
  
  // Initial file processing
  console.log("Watching file changes...");
  fs.watchFile(filename, {}, () => {
      watch_acss();
      console.log("Recompiled the changes");
  });
  watch_acss();
  
  module.exports = { replaceCss, compileAcss };
  