# grunt-cmd-handlebars

> Wrap Precompile Handlebars file to CMD module.

[![Build Status](https://travis-ci.org/xsbear/grunt-cmd-handlebars.png?branch=master)](https://travis-ci.org/xsbear/grunt-cmd-handlebars)

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cmd-handlebars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cmd-handlebars');
```

## The "cmd_handlebars" task

### Overview
In your project's Gruntfile, add a section named `cmd_handlebars` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cmd_handlebars: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.handlebars_id
Type: `String`

Dependency module's id of handlebars runtime, like `'handlebars/1.3.1/runtime'`.

#### options.exports
Type: `String`

Exports of output cmd handlebars, like `'this["JST"]'`. If use [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars) to precompile handlebars templates, please inehrit of the [namespace](https://github.com/gruntjs/grunt-contrib-handlebars#namespace) option.

### Usage Examples
```js
grunt.initConfig({
  cmd_handlebars: {
    tests: {
      options: {
        handlebars_id: 'handlebars/1.3.1/runtime',
        exports: 'this["JST"]',
      },
      files: [{
        src: ['test/fixtures/handlebars_compile.js'],
      }],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**Apr 15, 2014** `0.1.1`

Remove default options, force user specify self options.

**Apr 15, 2014** `0.1.0`

First release.
