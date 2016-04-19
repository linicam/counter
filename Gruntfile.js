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
          src: '**/*.js',
          dest: '.build/modules'
        }]
      },
      lang: {
        options: {
          idleading: 'i18n/',
        },
        files: [{
          expand: true,
          cwd: 'i18n',
          src: '**/*.js',
          dest: '.build/i18n'
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
          src: '**/*.js',
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
      },
      api: {
        options: {
          banner: '/*! FangCloud Open Platorm JavaScript API - v<%= pkg.fangcloudApiVersion %> */\n'
        },
        files:  {'.apibuild/fangcloud.js': '.apibuild/fangcloud.js'}
      }
      // ,lib: {
      //  files: [{
      //    expand: true,
      //    cwd: 'lib',
      //    // src: ['**/*.js', '!**/*.min.js', '!pdfjs/**', '!compatible/**', '!zeroclipboard/**'],
      //    src: ['egeui/0.1.6/egeui.js'],
      //    dest: 'lib',
      //    rename: function(dest, matchedSrcPath){
      //      return path.join(dest, matchedSrcPath.slice(0, -3) + '.min.js');
      //    }
      //  }]
      // }
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
          src: ['templates/*.js']
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      handlebars: {
        files: ['templates/*/*.hbs'],
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

  // Switch static environment to test static resource distribute between dev, local and remote.
  grunt.registerTask("env", "Switch static environment to test static resource distribute.", function(env) {
    // switch env
    var filepath = "../../application/config/asset.php";
    var code = grunt.file.read(filepath);
    var env_vars = {
      "dev": {
        'path': "assets/app/",
      },
      "local": {
        'path': "assets/dist/",
        'watermark': '本地测试'
      },
      // "remote":  {
      //   'url': "https://static.fangcloud.com/",
      //   'watermark': '远程测试'
      // },
    }
    code = code.replace(/\$config\['asset_path'\]\s*=\s*'[^']+'/, "$config['asset_path'] = '" + env_vars[env].path + "'");
    // code = code.replace(/STATIC_URL\s*=\s*'[\w\-\/\.:]+'/, "STATIC_URL = '" + env_vars[env].url + "'");
    grunt.file.write(filepath, code);

    // add water mark to indicate test env
    var layoutTpls = ['../../application/views/layout/main.php', '../../application/views/layout/guest.php', '../../application/views/layout/home.php'];
    var WATERMARK = '<div style="position:fixed;top:0;left:48%;z-index:99999;width:100px;height:30px;color:#fff;background-color:rgba(4, 79, 239, 0.5);font-size:18px;text-align:center">ENV</div>';
    layoutTpls.forEach(function(tpl){
      code = grunt.file.read(tpl);
      code = code.replace(new RegExp(WATERMARK.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace('ENV', '[^<]+'), 'g') , '');
      if(env_vars[env].watermark){
        code = code.replace('</body>', WATERMARK.replace('ENV', env_vars[env].watermark) + '</body>');
      }
      grunt.file.write(tpl, code);
    })

    grunt.log.oklns('Now static environment is: ' + env)
  })

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
