module.exports = function(grunt) {

  var path = require("path");

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n',

    // Task configuration.
    transport: {
      options: {
        debug: false,
        paths: ['']
      },
      modules: {
        options: {
          idleading: 'modules/',
          alias: {
            'jquery': 'jquery',
            'underscore': 'underscore',
            'backbone': 'backbone',
            'handlebars': 'handlebars',
            'egeui': 'egeui',
            'pikaday': 'pikaday',
          }
        },
        files: [{
          expand: true,
          cwd: 'front',
          src: 'front/**/*.js',
          dest: '.build/modules'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      modules: {
        files: [{
          expand: true,
          cwd: '.build/modules',
          src: 'front/**/*.js',
          dest: '.build/modules'
        }]
      },
      handlebars: {
        files: [{
          expand: true,
          cwd: 'templates',
          src: '*.js',
          dest: '.build/templates'
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
    cmd_handlebars: {
      all: {
        options: {
          handlebars_id: 'handlebars',
          exports: 'this["FCTPL"]',
        },
        files: {
          src: ['front/templates/*.js']
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      handlebars: {
        files: ['front/templates/*/*.hbs'],
        tasks: ['hbs_dev']
      }
    },
    copy: {
      lib: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['compatible/**', 'pdfjs/**', 'zeroclipboard/**', 'bootstrap/**', 'ztree/**', 'videojs/**', 'excanvas/**'],
          dest: 'lib-dist/',
        }, {
          expand: true,
          cwd: 'lib/',
          src: ['**/*.min.js'],
          dest: 'lib-dist/',
          rename: function(dest, matchedSrcPath){
            return path.join(dest, matchedSrcPath.slice(0, -7) + '.js');
          }
        }]
      },
      app: {
        files: [{
          src: 'images/mail/**',
          dest: '../dist/'
        }, {
          src: 'images/pdfview/**',
          dest: '../dist/'
        }, {
          src: 'html/wechat_career/**',
          dest: '../dist/'
        }, {
          src: 'html/custom_logo/**',
          dest: '../dist/'
        }, {
          expand: true,
          cwd: 'lib-dist/',
          src: '**',
          dest: '../dist/lib/'
        }, {
          src: 'seajs/**',
          dest: '../dist/'
        }, {
          src: '.apibuild/fangcloud.js',
          dest: '../dist/api/<%= pkg.fangcloudApiVersion %>/fangcloud.js'
        },{
          expand: true,
          cwd: '.build/i18n/',
          src: '**',
          dest: '../dist/i18n'
        }]
      }
    },
    clean: {
      build: ['.build', '.apibuild', 'lib-dist']
    }
  });

  grunt.registerTask("api-base-url", "Change fangcloud.js base url to prd", function(env) {
    var filepath = "api/fangcloud.js";
    var code = grunt.file.read(filepath);
    code = code.replace(/mod\.baseUrl = '[^']+'/, "mod.baseUrl = 'https://www.fangcloud.com'");
    grunt.file.write('.apibuild/fangcloud.js', code);

    grunt.log.oklns('Modify Ok')
  })

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-cmd-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('modules', ['transport:modules', 'uglify:modules']);
  grunt.registerTask('hbs_dev', ['handlebars:all', 'cmd_handlebars:all']);

  // Default task.
  grunt.registerTask('build', ['api-base-url', 'transport', 'uglify', 'copy']);
  grunt.registerTask('default', ['build' ,'clean']);

}
