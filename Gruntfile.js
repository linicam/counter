module.exports = function(grunt) {

  var path = require("path");

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n',

    // Task configuration.
    uglify: {
      options: {
        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //banner: '<%= banner %>'
      },
      build: {
        src: 'lib/<%=pkg.file %>.js',
        dest: 'dest/<%= pkg.file %>.js'
      },
      modules: {
        files: [{
          expand: true,
          cwd: 'front',
          src: '**/*.js',
          dest: 'dest/modules'
        }]
      },
      handlebars: {
        files: [{
          expand: true,
          cwd: 'templates',
          src: '*.js',
          dest: 'dest/templates'
        }]
      }
    },
    handlebars: {
      options: {
        namespace: 'FCTPL',
        processName: function(filePath) {
          return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
        }
      },
      all: {
          files: {
            "front/templates/base.js": ["front/templates/base/*.hbs"],
          }
      }
    },
    // cmd_handlebars: {
    //   all: {
    //     options: {
    //       handlebars_id: 'handlebars',
    //       exports: 'this["FCTPL"]',
    //     },
    //     files: {
    //       src: ['front/templates/*.js']
    //     }
    //   }
    // },
    watch: {
      options: {
        atBegin: true
      },
      handlebars: {
        files: ['front/templates/*/*.hbs'],
        tasks: ['hbs_dev']
      }
    },
    clean: {
      build: ['.build']
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  // grunt.loadNpmTasks('grunt-cmd-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt.registerTask('modules', ['transport:modules', 'uglify:modules']);
  grunt.registerTask('hbs_dev', ['handlebars:all']);

  // Default task.
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['build' ,'clean']);

}
