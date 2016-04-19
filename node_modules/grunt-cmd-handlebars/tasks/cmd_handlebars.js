/*
 * grunt-cmd-handlebars
 * https://github.com/hwp/grunt-cmd-handlebars
 *
 * Copyright (c) 2014 xsbear
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cmd_handlebars', 'Wrap Handlebars precompiling file to CMD module.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      handlebars_id: '',
      exports: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      if(!options.handlebars_id){
        grunt.fail.fatal('must specify "handlebars_id" option.');
      }
      if(!options.exports){
        grunt.fail.fatal('must specify "exports" option.');
      }

      var cmd_tpl = [
        'define("__MODULE_NAME__", ["' + options.handlebars_id + '"], function(require, exports, module) {',
        '  var Handlebars = require("' + options.handlebars_id + '");',
        '  __REPLACE_CODE__',
        '  return ' + options.exports + ';',
        '})'
      ].join('\n');

      // Wrap handlebars file to cmd
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var code = grunt.file.read(filepath);
        var cmd_code = cmd_tpl.replace('__MODULE_NAME__', filepath).replace('__REPLACE_CODE__', code);
        if(f.dest && f.dest !== 'src'){
          grunt.file.write(f.dest, cmd_code);
        } else {
          grunt.file.write(filepath, cmd_code);
        }
        grunt.log.oklns('Wrap cmd handlebars file: "' + filepath + '" OK.');
      });
    });
  });

};
